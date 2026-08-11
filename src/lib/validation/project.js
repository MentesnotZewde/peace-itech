import { z } from "zod";
import { ALL_STATUSES } from "@/lib/project-progress";

const text = (max = 200) => z.string().trim().max(max);

const shape = {
  name: text(120),
  email: z.union([z.literal(""), z.string().trim().toLowerCase().pipe(z.email())]),
  company: text(160),
  contact: text(40),
  category: text(120),
  title: text(200),
  description: text(2000),
  liveUrl: z.union([z.literal(""), z.string().trim().url()]),
  projectstatus: z.enum(ALL_STATUSES),
  // `progress` is intentionally absent: the model derives it from the status,
  // so anything a client sends for it is ignored.
  agreedprice: text(60),
  deliverydate: text(40),
};

// Both forms that write projects (the delivery table and the portfolio grid)
// send different subsets, so nothing is required beyond something to call it.
export const createProjectSchema = z
  .object(shape)
  .partial()
  .refine((data) => data.company || data.title, {
    message: "A company or a project title is required",
    path: ["company"],
  });

export const updateProjectSchema = z.object(shape).partial();

/**
 * Reads a project body as JSON or multipart/form-data.
 * Returns { data, files } where files holds the uploaded image / PDF.
 */
export async function parseProjectBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (!contentType.includes("multipart/form-data")) {
    try {
      return { data: await request.json(), files: {} };
    } catch {
      return { data: {}, files: {} };
    }
  }

  const form = await request.formData();
  const data = {};
  const files = {};

  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") {
      if (value.size > 0) files[key] = value;
      continue;
    }
    // Skip blanks so an untouched form field reads as "not provided".
    if (value.trim() === "") continue;
    data[key] = value;
  }

  return { data, files };
}
