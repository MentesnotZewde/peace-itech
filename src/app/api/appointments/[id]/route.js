import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Appointment from "@/lib/models/Appointment";
import { jsonError, requireAuth } from "@/lib/auth";
import { deleteCalendarEvent } from "@/lib/google-calendar";
import { updateAppointmentSchema } from "@/lib/validation/appointment";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/appointments/:id — staff only.
export async function GET(request, { params }) {
  try {
    const { response } = await requireAuth(request);
    if (response) return response;

    const { id } = await params;
    if (!isValidId(id)) return jsonError("Invalid appointment id", 400);

    await connectDB();
    const item = await Appointment.findById(id);
    if (!item) return jsonError("Appointment not found", 404);

    return NextResponse.json({ item: item.toJSON() });
  } catch (error) {
    console.error("GET /api/appointments/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}

// PATCH /api/appointments/:id — staff only; changes the status.
// Cancelling also removes the calendar event and frees the slot, which the
// model handles by dropping `slotKey` on save.
export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAuth(request);
    if (response) return response;

    const { id } = await params;
    if (!isValidId(id)) return jsonError("Invalid appointment id", 400);

    const body = await request.json().catch(() => null);
    const parsed = updateAppointmentSchema.safeParse(body ?? {});
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    await connectDB();
    const item = await Appointment.findById(id);
    if (!item) return jsonError("Appointment not found", 404);

    const wasCancelled = item.status === "Cancelled";
    item.status = parsed.data.status;

    try {
      await item.save();
    } catch (error) {
      // Re-activating a cancelled booking whose slot was taken meanwhile.
      if (error?.code === 11000) {
        return jsonError("That slot has since been booked by someone else", 409);
      }
      throw error;
    }

    if (!wasCancelled && item.status === "Cancelled" && item.googleEventId) {
      try {
        await deleteCalendarEvent(item.googleEventId);
        item.googleEventId = undefined;
        item.googleEventLink = undefined;
        await item.save();
      } catch (error) {
        // The status change is already saved and is what the team acts on.
        console.error("appointments: calendar delete failed", error);
      }
    }

    return NextResponse.json({ item: item.toJSON() });
  } catch (error) {
    console.error("PATCH /api/appointments/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}

// DELETE /api/appointments/:id — Admin only. Removes the record entirely;
// cancelling is usually the better option since it keeps the history.
export async function DELETE(request, { params }) {
  try {
    const { response } = await requireAuth(request, ["Admin"]);
    if (response) return response;

    const { id } = await params;
    if (!isValidId(id)) return jsonError("Invalid appointment id", 400);

    await connectDB();
    const item = await Appointment.findById(id);
    if (!item) return jsonError("Appointment not found", 404);

    if (item.googleEventId) {
      try {
        await deleteCalendarEvent(item.googleEventId);
      } catch (error) {
        console.error("appointments: calendar delete failed", error);
      }
    }

    await item.deleteOne();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/appointments/[id]", error);
    return jsonError("Something went wrong", 500);
  }
}
