import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { jsonError, requireAuth } from "@/lib/auth";
import { deleteProfilePicture, uploadProfilePicture } from "@/lib/cloudinary";
import {
  updateUserSchema,
  parseBody,
  formatZodError,
} from "@/lib/validation/user";

export const runtime = "nodejs";

// Fields only an Admin may change on any account — a non-Admin is left with
// their own name, password, and profile picture.
const ADMIN_ONLY_FIELDS = [
  "email",
  "role",
  "status",
  "department",
  "profession",
];

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/users/:id — Admins, or the user reading their own record.
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { user: currentUser, response } = await requireAuth(request);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid user id", 400);
    if (currentUser.role !== "Admin" && String(currentUser._id) !== id) {
      return jsonError("Forbidden", 403);
    }

    await connectDB();
    const user = await User.findById(id);
    if (!user) return jsonError("User not found", 404);

    return NextResponse.json({ user: user.toJSON() });
  } catch (error) {
    console.error("GET /api/users/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}

// PATCH /api/users/:id — Admins, or the user editing their own record.
// Accepts JSON or multipart/form-data with a `profilePicture` file.
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { user: currentUser, response } = await requireAuth(request);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid user id", 400);

    const isAdmin = currentUser.role === "Admin";
    const isSelf = String(currentUser._id) === id;
    if (!isAdmin && !isSelf) return jsonError("Forbidden", 403);

    const { data, file } = await parseBody(request);
    const parsed = updateUserSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    const updates = { ...parsed.data };
    // Proof of ownership, never a stored field.
    const currentPassword = updates.currentPassword;
    delete updates.currentPassword;

    if (!file && Object.keys(updates).length === 0) {
      return jsonError("No fields to update", 422);
    }

    await connectDB();

    const user = await User.findById(id).select("+password");
    if (!user) return jsonError("User not found", 404);

    // Changing your own password requires the old one. An Admin resetting
    // someone else's password has no way to know it, so they're exempt.
    if (updates.password && isSelf) {
      if (!currentPassword) {
        return jsonError("Your current password is required", 422, {
          fields: { currentPassword: "Enter your current password" },
        });
      }
      if (!(await user.comparePassword(currentPassword))) {
        return jsonError("Your current password is incorrect", 422, {
          fields: { currentPassword: "That password is incorrect" },
        });
      }
    }

    // Resending an unchanged value is harmless — only an actual change to a
    // restricted field is refused, so edit forms can post the whole record.
    if (!isAdmin) {
      const attempted = ADMIN_ONLY_FIELDS.filter(
        (f) => f in updates && updates[f] !== user[f],
      );
      if (attempted.length) {
        return jsonError(
          `Only an Admin can change: ${attempted.join(", ")}`,
          403,
        );
      }
    }

    if (updates.email && updates.email !== user.email) {
      const taken = await User.findOne({
        email: updates.email,
        _id: { $ne: user._id },
      });
      if (taken) return jsonError("A user with that email already exists", 409);
    }

    // An Admin must not be able to lock everyone out by demoting the last one.
    if (user.role === "Admin" && updates.role === "User") {
      const admins = await User.countDocuments({ role: "Admin" });
      if (admins <= 1) return jsonError("The last Admin cannot be demoted", 409);
    }

    let previousPublicId = null;
    if (file) {
      try {
        const uploaded = await uploadProfilePicture(file);
        previousPublicId = user.profilePicture?.publicId || null;
        user.profilePicture = uploaded;
      } catch (uploadError) {
        return jsonError(uploadError.message || "Image upload failed", 400);
      }
    }

    // Assigned field by field so the pre-save hook rehashes a changed password.
    Object.assign(user, updates);
    await user.save();

    if (previousPublicId) await deleteProfilePicture(previousPublicId);

    return NextResponse.json({ user: user.toJSON() });
  } catch (error) {
    if (error.code === 11000) {
      return jsonError("A user with that email already exists", 409);
    }
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("PATCH /api/users/[id]", error);
    return jsonError(error.message || "Something went wrong", 500);
  }
}

// PUT is accepted as an alias for PATCH so either verb works from the client.
export const PUT = PATCH;

// DELETE /api/users/:id — Admin only.
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { user: currentUser, response } = await requireAuth(request, [
      "Admin",
    ]);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid user id", 400);
    if (String(currentUser._id) === id) {
      return jsonError("You cannot delete your own account", 409);
    }

    await connectDB();

    const user = await User.findById(id);
    if (!user) return jsonError("User not found", 404);

    if (user.role === "Admin") {
      const admins = await User.countDocuments({ role: "Admin" });
      if (admins <= 1) return jsonError("The last Admin cannot be deleted", 409);
    }

    await user.deleteOne();
    await deleteProfilePicture(user.profilePicture?.publicId);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("DELETE /api/users/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}
