import mongoose from "mongoose";

export const MEDIA_CATEGORIES = [
  "News",
  "Events",
  "Insights",
  "Company Updates",
];
export const MEDIA_STATUSES = ["Draft", "Published"];

const assetSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    name: String,
    resourceType: String,
  },
  { _id: false },
);

const mediaItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: MEDIA_CATEGORIES, default: "News" },
    // Kept as a plain YYYY-MM-DD string: it's a publication date chosen by an
    // editor, not a timestamp, and it must not shift with timezones.
    date: { type: String, trim: true },
    summary: { type: String, trim: true },
    // The article body shown on the detail page. Blank lines separate
    // paragraphs; there is no rich-text editor behind this yet.
    content: { type: String, trim: true },
    status: { type: String, enum: MEDIA_STATUSES, default: "Draft" },
    featured: { type: Boolean, default: false },
    image: assetSchema,
  },
  { timestamps: true },
);

// Drafts are never public, so the public listing filters on this constantly.
mediaItemSchema.index({ status: 1, date: -1 });

mediaItemSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// Mongoose caches compiled models on its singleton, which survives Next's hot
// reload — without this, schema edits keep using the stale model.
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.MediaItem;
}

export const MediaItem =
  mongoose.models.MediaItem || mongoose.model("MediaItem", mediaItemSchema);

export default MediaItem;
