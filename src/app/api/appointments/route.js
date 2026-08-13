import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Appointment from "@/lib/models/Appointment";
import { jsonError, requireAuth } from "@/lib/auth";
import { createCalendarEvent } from "@/lib/google-calendar";
import {
  SLOT_MINUTES,
  availableSlots,
  isBookableDate,
} from "@/lib/appointment-slots";
import { createAppointmentSchema } from "@/lib/validation/appointment";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

// GET /api/appointments?status=&from=&to=
// Signed-in staff only: bookings carry visitor contact details.
export async function GET(request) {
  try {
    const { response } = await requireAuth(request);
    if (response) return response;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const filter = {};

    const status = searchParams.get("status");
    if (status && status !== "All") filter.status = status;

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = from;
      if (to) filter.date.$lte = to;
    }

    // Soonest first, which is the order the team works through them.
    const items = await Appointment.find(filter).sort({ date: 1, time: 1 });

    return NextResponse.json({ items, total: items.length });
  } catch (error) {
    console.error("GET /api/appointments", error);
    return jsonError("Something went wrong", 500);
  }
}

// POST /api/appointments — public. This is the booking form.
export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) return jsonError("Invalid request body", 400);

    const parsed = createAppointmentSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    const { date, time } = parsed.data;
    if (!isBookableDate(date)) {
      return jsonError("That date is not open for bookings", 422, {
        fields: { date: "That date is not open for bookings" },
      });
    }

    await connectDB();

    // Check the slot is still free. The unique index below is what actually
    // guarantees it — this check exists to return a helpful message in the
    // common case rather than a bare write error.
    const taken = await Appointment.find(
      { date, status: { $ne: "Cancelled" } },
      "time",
    ).lean();

    const free = availableSlots(
      date,
      taken.map((item) => item.time),
    );

    if (!free.includes(time)) {
      return jsonError("That time has just been taken", 409, {
        fields: { time: "That time is no longer available" },
        slots: free,
      });
    }

    let appointment;
    try {
      appointment = await Appointment.create({
        ...parsed.data,
        durationMinutes: SLOT_MINUTES,
        status: "Pending",
      });
    } catch (error) {
      // Two visitors submitting the same slot at once: the loser lands here.
      if (error?.code === 11000) {
        return jsonError("That time has just been taken", 409, {
          fields: { time: "That time is no longer available" },
        });
      }
      throw error;
    }

    // The booking is already saved, so a calendar outage must not fail the
    // request — the team still sees it in the dashboard, and the missing
    // googleEventId marks it as un-synced.
    try {
      const event = await createCalendarEvent(appointment);
      if (event) {
        appointment.googleEventId = event.id;
        appointment.googleEventLink = event.htmlLink;
        await appointment.save();
      }
    } catch (error) {
      console.error("appointments: calendar sync failed", error);
    }

    // Only the visitor's own booking comes back, never other bookings.
    return NextResponse.json(
      {
        appointment: {
          id: String(appointment._id),
          name: appointment.name,
          email: appointment.email,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return jsonError(error.message, 422);
    }
    console.error("POST /api/appointments", error);
    return jsonError("Something went wrong", 500);
  }
}
