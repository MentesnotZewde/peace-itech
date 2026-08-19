// Booking rules for the public appointment page. Everything here is expressed
// in the company's own timezone (BUSINESS_TIMEZONE) — a visitor in another
// country still books the slot as the team sees it on their calendar.

export const BUSINESS_TIMEZONE = "Africa/Addis_Ababa";

/** Minutes per appointment. Slot starts are generated on this stride. */
export const SLOT_MINUTES = 30;

// 0 = Sunday. Weekends are closed, so they generate no slots at all.
const OPEN_HOURS = {
  1: { start: "09:00", end: "17:00" },
  2: { start: "09:00", end: "17:00" },
  3: { start: "09:00", end: "17:00" },
  4: { start: "09:00", end: "17:00" },
  5: { start: "09:00", end: "17:00" },
};

// A lunch break is carved out of every open day.
const BREAK = { start: "12:30", end: "13:30" };

/** How far ahead the calendar may be booked, and the earliest bookable day. */
export const MAX_DAYS_AHEAD = 60;
export const MIN_HOURS_NOTICE = 4;

export const APPOINTMENT_TOPICS = [
  "Web & App Development",
  "ERP Systems",
  "Business Automation",
  "Cybersecurity",
  "Digital Marketing",
  "Point of Sale",
  "IT Support",
  "General enquiry",
];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const isValidDate = (value) =>
  typeof value === "string" && DATE_PATTERN.test(value);
export const isValidTime = (value) =>
  typeof value === "string" && TIME_PATTERN.test(value);

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const toTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
    minutes % 60,
  ).padStart(2, "0")}`;

/**
 * The weekday of a YYYY-MM-DD string, read as a plain calendar date.
 * Parsed as UTC on purpose: `new Date("2026-08-18")` is already UTC midnight,
 * so using getUTCDay avoids the server's own timezone shifting the day.
 */
function weekdayOf(date) {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

/** Today in the business timezone, as YYYY-MM-DD. */
export function todayInBusinessTimezone() {
  // en-CA formats as YYYY-MM-DD, which is exactly the shape stored.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** The last date the form will accept, as YYYY-MM-DD. */
export function lastBookableDate() {
  const start = new Date(`${todayInBusinessTimezone()}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() + MAX_DAYS_AHEAD);
  return start.toISOString().slice(0, 10);
}

/**
 * The offset of BUSINESS_TIMEZONE at a given instant, as "+03:00". Read from
 * the runtime's own tz database rather than hardcoded, so the code keeps
 * working if the business timezone is ever changed to one that has DST.
 */
function offsetAt(utcDate) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIMEZONE,
    timeZoneName: "longOffset",
  })
    .formatToParts(utcDate)
    .find((part) => part.type === "timeZoneName");

  // "GMT+03:00" → "+03:00"; plain "GMT" means UTC.
  const offset = (parts?.value || "GMT").replace("GMT", "");
  return offset || "+00:00";
}

/**
 * A slot's start as a real instant. The wall-clock date/time is interpreted in
 * the business timezone, which is what makes "09:00" mean the same moment for
 * the visitor, the database, and Google Calendar.
 */
export function slotToDate(date, time) {
  // Approximate the instant first, then re-read the offset for that instant so
  // a date near a DST boundary resolves against the correct offset.
  const guess = new Date(`${date}T${time}:00Z`);
  return new Date(`${date}T${time}:00${offsetAt(guess)}`);
}

/** RFC3339 start/end for a slot, with the offset Google Calendar expects. */
export function slotInterval(date, time, minutes = SLOT_MINUTES) {
  const start = slotToDate(date, time);
  const end = new Date(start.getTime() + minutes * 60_000);
  return { start, end };
}

/** True when the date is a working day inside the bookable window. */
export function isBookableDate(date) {
  if (!isValidDate(date)) return false;
  if (!OPEN_HOURS[weekdayOf(date)]) return false;
  return date >= todayInBusinessTimezone() && date <= lastBookableDate();
}

/**
 * Every slot the business offers on a date, before bookings are considered.
 * Returns [] for weekends and out-of-range dates.
 */
export function slotsForDate(date) {
  const hours = isBookableDate(date) ? OPEN_HOURS[weekdayOf(date)] : null;
  if (!hours) return [];

  const slots = [];
  const closing = toMinutes(hours.end);
  const breakStart = toMinutes(BREAK.start);
  const breakEnd = toMinutes(BREAK.end);

  for (
    let minute = toMinutes(hours.start);
    minute + SLOT_MINUTES <= closing;
    minute += SLOT_MINUTES
  ) {
    // Drop any slot that would run into the break.
    if (minute < breakEnd && minute + SLOT_MINUTES > breakStart) continue;
    slots.push(toTime(minute));
  }

  return slots;
}

/** A slot is too late to book once it is inside the notice window. */
export function hasEnoughNotice(date, time) {
  const cutoff = Date.now() + MIN_HOURS_NOTICE * 60 * 60_000;
  return slotToDate(date, time).getTime() >= cutoff;
}

/**
 * Slots a visitor may actually pick: on the schedule, far enough out, and not
 * already taken. `taken` is the list of booked times for that same date.
 */
export function availableSlots(date, taken = []) {
  const booked = new Set(taken);
  return slotsForDate(date).filter(
    (time) => !booked.has(time) && hasEnoughNotice(date, time),
  );
}

/** 09:00 → "9:00 AM", for display only. */
export function formatSlotLabel(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/**
 * "2026-08-19" → "Wed, 19 Aug 2026", for display only.
 *
 * Read in UTC against a midnight timestamp so the weekday can't slip a day for
 * a viewer west of Greenwich — the stored date is a wall-clock day, not an
 * instant.
 */
export function formatSlotDay(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
