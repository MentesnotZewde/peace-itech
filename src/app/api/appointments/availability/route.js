import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Appointment from "@/lib/models/Appointment";
import { jsonError } from "@/lib/auth";
import {
  BUSINESS_TIMEZONE,
  SLOT_MINUTES,
  availableSlots,
  isBookableDate,
  lastBookableDate,
  todayInBusinessTimezone,
} from "@/lib/appointment-slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/appointments/availability?date=YYYY-MM-DD
// Public: the booking form asks this as the visitor picks a day. Only free
// slot times are returned — who booked the others is never exposed.
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    const meta = {
      date,
      timezone: BUSINESS_TIMEZONE,
      slotMinutes: SLOT_MINUTES,
      minDate: todayInBusinessTimezone(),
      maxDate: lastBookableDate(),
    };

    // Closed days and out-of-range dates are a normal answer, not an error.
    if (!isBookableDate(date)) {
      return NextResponse.json({ ...meta, slots: [] });
    }

    await connectDB();
    const taken = await Appointment.find(
      { date, status: { $ne: "Cancelled" } },
      "time",
    ).lean();

    return NextResponse.json({
      ...meta,
      slots: availableSlots(
        date,
        taken.map((item) => item.time),
      ),
    });
  } catch (error) {
    console.error("GET /api/appointments/availability", error);
    return jsonError("Something went wrong", 500);
  }
}
