import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import MediaItem from "@/lib/models/MediaItem";

// Drafts never leave the dashboard.
const PUBLISHED = { status: "Published" };

function serialise(item) {
  if (!item) return null;

  return {
    id: String(item._id),
    title: item.title || "",
    category: item.category || "",
    date: item.date || "",
    summary: item.summary || "",
    content: item.content || "",
    featured: Boolean(item.featured),
    image: item.image?.url || "",
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : "",
  };
}

/** Published items, newest publication date first. */
export async function getPublishedMedia(limit = 24) {
  try {
    await connectDB();
    const items = await MediaItem.find(PUBLISHED)
      .sort({ date: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return items.map(serialise);
  } catch (error) {
    console.error("media: could not load published items", error);
    return [];
  }
}

/** One published item, or null — drafts and bad ids both read as missing. */
export async function getPublishedMediaItem(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  try {
    await connectDB();
    const item = await MediaItem.findOne({ _id: id, ...PUBLISHED }).lean();
    return serialise(item);
  } catch (error) {
    console.error("media: could not load item", error);
    return null;
  }
}

/**
 * Counters for the media hub banner. Computed in one pass over the published
 * items so the numbers can never drift from the list shown above them.
 */
export async function getMediaStats() {
  const empty = { published: 0, updates: 0, topics: 0 };

  try {
    await connectDB();
    const [row] = await MediaItem.aggregate([
      { $match: PUBLISHED },
      {
        $group: {
          _id: null,
          published: { $sum: 1 },
          categories: { $addToSet: "$category" },
          updates: {
            $sum: {
              $cond: [
                { $in: ["$category", ["Events", "Company Updates"]] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    if (!row) return empty;

    return {
      published: row.published || 0,
      updates: row.updates || 0,
      topics: (row.categories || []).filter(Boolean).length,
    };
  } catch (error) {
    console.error("media: could not load stats", error);
    return empty;
  }
}

/** Sidebar list for the article page, excluding the article being read. */
export async function getRelatedMedia(excludeId, limit = 5) {
  const items = await getPublishedMedia(limit + 1);
  return items.filter((item) => item.id !== excludeId).slice(0, limit);
}
