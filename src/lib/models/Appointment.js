import mongoose from "mongoose";
// Relative rather than aliased so the model can also be imported by the plain
// node scripts in scripts/, which don't resolve jsconfig paths.
import { APPOINTMENT_STATUSES } from "../appointment-status.js";

export { APPOINTMENT_STATUSES };

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    topic: { type: String, trim: true },
    message: { type: String, trim: true },

    // Stored as plain calendar strings in the business timezone, for the same
    // reason media items store a plain date: a slot is a wall-clock time on a
    // schedule, and must not shift when the server's timezone changes.
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, default: 30 },
    // The visitor's own timezone, recorded so the team knows what time they
    // think they booked.
    visitorTimezone: { type: String, trim: true },

    status: {
      type: String,
      enum: APPOINTMENT_STATUSES,
      default: "Pending",
    },

    // Set once the event lands on the company Google Calendar. Absent means
    // the booking was saved but the calendar write failed or is not configured.
    googleEventId: { type: String, trim: true },
    googleEventLink: { type: String, trim: true },

    // "2026-08-18T09:00" while the booking holds its slot, and removed when it
    // is cancelled. A unique *sparse* index on this is what stops two visitors
    // taking the same slot: documents missing the field are not indexed, so a
    // cancelled booking releases the slot without blocking the next one.
    // (A partial index on `status` would be the obvious alternative, but
    // partialFilterExpression does not accept `$ne`.)
    slotKey: { type: String, trim: true },
  },
  { timestamps: true },
);

appointmentSchema.index({ slotKey: 1 }, { unique: true, sparse: true });

// The dashboard lists upcoming bookings first.
appointmentSchema.index({ date: 1, time: 1, status: 1 });

// Keeps slotKey in step with the booking, so callers only ever set `status`.
appointmentSchema.pre("save", function syncSlotKey() {
  if (this.status === "Cancelled") {
    this.slotKey = undefined;
    return;
  }

  this.slotKey = `${this.date}T${this.time}`;
});

appointmentSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// Mongoose caches compiled models on its singleton, which survives Next's hot
// reload — without this, schema edits keep using the stale model.
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Appointment;
}

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
