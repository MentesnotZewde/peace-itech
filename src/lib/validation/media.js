import { z } from "zod";
import { MEDIA_CATEGORIES, MEDIA_STATUSES } from "@/lib/models/MediaItem";

export { parseFormBody as parseMediaBody } from "@/lib/validation/form-body";

// Multipart sends everything as text, so booleans arrive as "true"/"false".
const boolean = z.union([
  z.boolean(),
  z.enum(["true", "false"]).transform((v) => v === "true"),
]);

const shape = {
  title: z.string().trim().min(2, "A title is required").max(200),
  category: z.enum(MEDIA_CATEGORIES),
  date: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a YYYY-MM-DD date"),
  ]),
  summary: z.string().trim().max(2000),
  content: z.string().trim().max(50000),
  status: z.enum(MEDIA_STATUSES),
  featured: boolean,
};

export const createMediaSchema = z.object(shape).partial().extend({
  title: shape.title,
  category: shape.category.default("News"),
  status: shape.status.default("Draft"),
  featured: boolean.default(false),
});

// No defaults here: an update must not silently reset status or featured.
export const updateMediaSchema = z.object(shape).partial();
