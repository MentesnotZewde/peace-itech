import { z } from "zod";

// Anything a stranger can post ends up in an inbox, so every field is bounded
// and the two that matter are required.
export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(120, "That name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),
  phone: z
    .string()
    .trim()
    .max(40, "That phone number is too long")
    .optional()
    .or(z.literal("")),
  office: z
    .string()
    .trim()
    .max(120, "That office name is too long")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(3, "Please add a subject")
    .max(200, "That subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a sentence")
    .max(5000, "That message is too long"),
  // Honeypot: hidden from people, irresistible to naive bots. A filled value
  // means we drop the submission without sending anything.
  website: z.string().max(0).optional().or(z.literal("")),
});
