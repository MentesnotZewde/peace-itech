import { z } from "zod";

import { APPOINTMENT_STATUSES } from "@/lib/appointment-status";
import {
  APPOINTMENT_TOPICS,
  isValidDate,
  isValidTime,
} from "@/lib/appointment-slots";

const text = (max) => z.string().trim().max(max);

// What the public booking form may send. Deliberately narrow: a visitor can
// never set a status, a Google event id, or the slot key.
export const createAppointmentSchema = z.object({
  name: text(120).min(2, "Please enter your name"),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  phone: text(40).optional().or(z.literal("")),
  company: text(160).optional().or(z.literal("")),
  topic: z.enum(APPOINTMENT_TOPICS).optional(),
  message: text(2000).optional().or(z.literal("")),
  date: z.string().refine(isValidDate, "Pick a valid date"),
  time: z.string().refine(isValidTime, "Pick a valid time"),
  visitorTimezone: text(64).optional().or(z.literal("")),
});

// Admin-side edits. Rescheduling is intentionally not exposed here: moving a
// booking means re-checking the slot and rewriting the calendar event, so it
// would need its own endpoint rather than a field on this one.
export const updateAppointmentSchema = z.object({
  status: z.enum(APPOINTMENT_STATUSES),
});
