import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { jsonError, requireAuth } from "@/lib/auth";
import { uploadProfilePicture } from "@/lib/cloudinary";
import {
  createUserSchema,
  parseBody,
  formatZodError,
} from "@/lib/validation/user";

export const runtime = "nodejs";

// GET /api/users?search=&role=&department=&status=&page=&limit= — Admin only:
// the directory exposes every colleague's email, role, and department.
export async function GET(request) {
  try {
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit")) || 20));

    const filter = {};
    for (const key of ["role", "department", "status"]) {
      const value = searchParams.get(key);
      if (value) filter[key] = value;
    }

    const search = searchParams.get("search")?.trim();
    if (search) {
      const pattern = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { fullName: pattern },
        { email: pattern },
        { profession: pattern },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    return NextResponse.json({
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("GET /api/users", error);
    return jsonError("Something went wrong", 500);
  }
}

// POST /api/users — Admin only. Accepts JSON or multipart/form-data with a
// `profilePicture` file.
export async function POST(request) {
  try {
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    const { data, file } = await parseBody(request);
    const parsed = createUserSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    await connectDB();

    const existing = await User.findOne({ email: parsed.data.email });
    if (existing) {
      return jsonError("A user with that email already exists", 409);
    }

    let profilePicture;
    if (file) {
      try {
        profilePicture = await uploadProfilePicture(file);
      } catch (uploadError) {
        return jsonError(uploadError.message || "Image upload failed", 400);
      }
    }

    const user = await User.create({ ...parsed.data, profilePicture });

    return NextResponse.json({ user: user.toJSON() }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return jsonError("A user with that email already exists", 409);
    }
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("POST /api/users", error);
    // Detail stays in the log; clients get nothing about internals.
    return jsonError("Something went wrong", 500);
  }
}
