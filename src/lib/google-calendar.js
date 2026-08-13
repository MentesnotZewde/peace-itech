import { SignJWT, importPKCS8 } from "jose";

import { BUSINESS_TIMEZONE, slotInterval } from "@/lib/appointment-slots";

// Talks to the Calendar REST API directly with a service-account JWT rather
// than pulling in `googleapis`, which is a large dependency for two calls.
//
// Setup (one time):
//   1. Google Cloud console → new project → enable the Google Calendar API.
//   2. Create a service account, then a JSON key for it.
//   3. In Google Calendar, share the target calendar with the service
//      account's email, giving it "Make changes to events".
//   4. Set the env vars below. GOOGLE_CALENDAR_ID is the calendar's id
//      (its address, e.g. hello@peaceitech.com, or the long ...@group.calendar
//      .google.com id of a secondary calendar).
//
// Note: a service account has no mailbox, so it cannot send Google's own
// invitation emails. Events are created with the visitor as an attendee, which
// makes the booking visible to the team; the visitor is emailed by us, not by
// Google.
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API = "https://www.googleapis.com/calendar/v3/calendars";
const SCOPE = "https://www.googleapis.com/auth/calendar.events";

function getConfig() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!email || !key || !calendarId) return null;

  return {
    email,
    // Env files store the PEM with literal \n, which must become real
    // newlines before the key will parse.
    key: key.replace(/\\n/g, "\n"),
    calendarId,
  };
}

/** True when the calendar integration has everything it needs to run. */
export function isCalendarConfigured() {
  return getConfig() !== null;
}

// Access tokens last an hour; keeping the live one avoids a token round trip
// on every booking.
let cachedToken = null;

async function getAccessToken(config) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const privateKey = await importPKCS8(config.key, "RS256");
  const assertion = await new SignJWT({ scope: SCOPE })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(config.email)
    .setAudience(TOKEN_URL)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(
      `Google token request failed: ${payload.error_description || payload.error || response.status}`,
    );
  }

  cachedToken = {
    value: payload.access_token,
    expiresAt: Date.now() + (payload.expires_in ?? 3600) * 1000,
  };

  return cachedToken.value;
}

async function calendarFetch(config, path, init = {}) {
  const token = await getAccessToken(config);

  const response = await fetch(
    `${CALENDAR_API}/${encodeURIComponent(config.calendarId)}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    },
  );

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Google Calendar ${init.method || "GET"} ${path} failed: ${payload.error?.message || response.status}`,
    );
  }

  return payload;
}

/**
 * Adds a booking to the company calendar.
 * Returns { id, htmlLink }, or null when the integration is not configured —
 * callers treat that as "no calendar", never as a failed booking.
 */
export async function createCalendarEvent(appointment) {
  const config = getConfig();
  if (!config) return null;

  const { start, end } = slotInterval(
    appointment.date,
    appointment.time,
    appointment.durationMinutes,
  );

  const details = [
    appointment.company && `Company: ${appointment.company}`,
    appointment.phone && `Phone: ${appointment.phone}`,
    appointment.topic && `Topic: ${appointment.topic}`,
    appointment.visitorTimezone && `Booked from: ${appointment.visitorTimezone}`,
    appointment.message && `\n${appointment.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const event = await calendarFetch(config, "/events", {
    method: "POST",
    body: JSON.stringify({
      summary: `Consultation — ${appointment.name}`,
      description: details || undefined,
      start: { dateTime: start.toISOString(), timeZone: BUSINESS_TIMEZONE },
      end: { dateTime: end.toISOString(), timeZone: BUSINESS_TIMEZONE },
      attendees: [{ email: appointment.email, displayName: appointment.name }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "popup", minutes: 30 },
          { method: "email", minutes: 60 },
        ],
      },
    }),
  });

  return { id: event.id, htmlLink: event.htmlLink };
}

/** Removes a booking's event. A missing event counts as already removed. */
export async function deleteCalendarEvent(eventId) {
  const config = getConfig();
  if (!config || !eventId) return;

  try {
    await calendarFetch(config, `/events/${encodeURIComponent(eventId)}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (String(error.message).includes("410")) return;
    throw error;
  }
}
