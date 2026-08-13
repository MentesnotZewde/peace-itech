import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import MediaItem from "@/lib/models/MediaItem";
import { getCurrentUser, jsonError, requireAuth } from "@/lib/auth";
import { deleteAsset } from "@/lib/cloudinary";
import { uploadCoverImage } from "@/lib/media-assets";
import { updateMediaSchema, parseMediaBody } from "@/lib/validation/media";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/media/:id — public for published items, signed-in for drafts.
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!isValidId(id)) return jsonError("Invalid media id", 400);

    await connectDB();
    const item = await MediaItem.findById(id);
    if (!item) return jsonError("Media item not found", 404);

    if (item.status !== "Published") {
      const user = await getCurrentUser(request);
      // A draft shouldn't even confirm it exists to the public.
      if (!user) return jsonError("Media item not found", 404);
    }

    return NextResponse.json({ item: item.toJSON() });
  } catch (error) {
    console.error("GET /api/media/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}

// PATCH /api/media/:id — Admin only. A new cover image replaces the old one.
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid media id", 400);

    const { data, files } = await parseMediaBody(request);
    const parsed = updateMediaSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    const updates = parsed.data;
    if (!files.image && Object.keys(updates).length === 0) {
      return jsonError("No fields to update", 422);
    }

    await connectDB();
    const item = await MediaItem.findById(id);
    if (!item) return jsonError("Media item not found", 404);

    let supersededId = null;
    if (files.image) {
      try {
        const uploaded = await uploadCoverImage(files.image);
        supersededId = item.image?.publicId || null;
        item.image = uploaded;
      } catch (uploadError) {
        return jsonError(uploadError.message || "Image upload failed", 400);
      }
    }

    Object.assign(item, updates);
    await item.save();

    // Only after the save succeeds, so a failed write can't strand the item
    // without a cover.
    if (supersededId) await deleteAsset(supersededId);

    return NextResponse.json({ item: item.toJSON() });
  } catch (error) {
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("PATCH /api/media/[id]", error);
    // Detail stays in the log; clients get nothing about internals.
    return jsonError("Something went wrong", 500);
  }
}

// PUT is accepted as an alias for PATCH so either verb works from the client.
export const PUT = PATCH;

// DELETE /api/media/:id — Admin only.
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    if (!isValidId(id)) return jsonError("Invalid media id", 400);

    await connectDB();
    const item = await MediaItem.findById(id);
    if (!item) return jsonError("Media item not found", 404);

    await item.deleteOne();
    await deleteAsset(item.image?.publicId);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("DELETE /api/media/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}
