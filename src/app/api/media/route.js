import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import MediaItem from "@/lib/models/MediaItem";
import { getCurrentUser, jsonError, requireAuth } from "@/lib/auth";
import { uploadCoverImage } from "@/lib/media-assets";
import {
  createMediaSchema,
  parseMediaBody,
} from "@/lib/validation/media";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

// GET /api/media?category=&status=&search=&featured=
// Public: the marketing site reads this. Anonymous callers only ever see
// Published items — drafts require a signed-in user.
export async function GET(request) {
  try {
    await connectDB();

    const user = await getCurrentUser(request);
    const { searchParams } = new URL(request.url);
    const filter = {};

    const status = searchParams.get("status");
    filter.status = user ? (status || undefined) : "Published";
    if (!filter.status) delete filter.status;

    const category = searchParams.get("category");
    if (category && category !== "All") filter.category = category;

    if (searchParams.get("featured") === "true") filter.featured = true;

    const search = searchParams.get("search")?.trim();
    if (search) {
      const pattern = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i",
      );
      filter.$or = [{ title: pattern }, { summary: pattern }];
    }

    // Newest publication date first, falling back to creation order.
    const items = await MediaItem.find(filter).sort({
      date: -1,
      createdAt: -1,
    });

    return NextResponse.json({ items, total: items.length });
  } catch (error) {
    console.error("GET /api/media", error);
    return jsonError("Something went wrong", 500);
  }
}

// POST /api/media — Admin only. JSON, or multipart with an `image` file.
export async function POST(request) {
  try {
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    const { data, files } = await parseMediaBody(request);
    const parsed = createMediaSchema.safeParse(data);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    let image;
    if (files.image) {
      try {
        image = await uploadCoverImage(files.image);
      } catch (uploadError) {
        return jsonError(uploadError.message || "Image upload failed", 400);
      }
    }

    await connectDB();
    const item = await MediaItem.create({ ...parsed.data, image });

    return NextResponse.json({ item: item.toJSON() }, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("POST /api/media", error);
    // Detail stays in the log; clients get nothing about internals.
    return jsonError("Something went wrong", 500);
  }
}
