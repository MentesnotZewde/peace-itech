import { z } from "zod";

// Kept re-exported so the project routes keep one import site.
export { parseFormBody as parseProjectBody } from "@/lib/validation/form-body";
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
  // Accepts a real boolean from JSON and the string a multipart form sends.
  portfolioApproved: z.union([
    z.boolean(),
    z.enum(["true", "false"]).transform((v) => v === "true"),
  ]),
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
