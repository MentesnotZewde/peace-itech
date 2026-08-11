import { z } from "zod";
import { DEPARTMENTS, ROLES, STATUSES } from "@/lib/models/User";

const fullName = z.string().trim().min(2, "Full name is required").max(120);
const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("A valid email is required"));
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128);
const role = z.enum(ROLES);
const department = z.enum(DEPARTMENTS);
const profession = z.string().trim().max(120);
const status = z.enum(STATUSES);

export const createUserSchema = z.object({
  fullName,
  email,
  password,
  role: role.default("User"),
  department: department.optional(),
  profession: profession.optional(),
  status: status.default("Active"),
});

// Defaults are deliberately left out here: an update must never silently reset
// role or status just because the client omitted them. `currentPassword` is
// not stored — it only proves the caller owns the account they're changing.
export const updateUserSchema = z
  .object({
    fullName,
    email,
    password,
    currentPassword: z.string().min(1),
    role,
    department,
    profession,
    status,
  })
  .partial();

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

/**
 * Reads a request body as either JSON or multipart/form-data, so the same route
 * works with a plain fetch and with a form carrying a profile picture.
 * Returns { data, file } where file is the uploaded profilePicture, if any.
 */
export async function parseBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const data = {};
    let file = null;

    for (const [key, value] of form.entries()) {
      if (key === "profilePicture" && typeof value !== "string") {
        if (value.size > 0) file = value;
        continue;
      }
      // Skip empty strings so a blank form field is treated as "not provided".
      if (typeof value === "string" && value.trim() === "") continue;
      data[key] = value;
    }

    return { data, file };
  }

  try {
    return { data: await request.json(), file: null };
  } catch {
    return { data: {}, file: null };
  }
}

export function formatZodError(error) {
  return error.issues.reduce((acc, issue) => {
    const key = issue.path.join(".") || "_";
    acc[key] = issue.message;
    return acc;
  }, {});
}
