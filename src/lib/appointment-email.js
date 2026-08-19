import {
  BUSINESS_TIMEZONE,
  formatSlotDay,
  formatSlotLabel,
} from "@/lib/appointment-slots";
import { contact, siteName } from "@/lib/seo";

/** "Africa/Addis_Ababa" → "Addis Ababa time". */
function businessTimezoneLabel() {
  const city = BUSINESS_TIMEZONE.split("/").pop().replace(/_/g, " ");
  return `${city} time`;
}

/**
 * Builds the confirmation note the team sends once a booking is confirmed.
 *
 * This produces a *draft* for the staff member's own mail client rather than
 * sending anything: the reply then comes from a real mailbox the visitor can
 * reply to, and staff get a chance to add context before it goes out.
 */
export function appointmentConfirmationDraft(item) {
  const when = `${formatSlotDay(item.date)} at ${formatSlotLabel(item.time)}`;

  const lines = [
    `Hi ${item.name?.split(" ")[0] || "there"},`,
    "",
    `Your appointment with ${siteName} is confirmed.`,
    "",
    `Date: ${formatSlotDay(item.date)}`,
    `Time: ${formatSlotLabel(item.time)} (${businessTimezoneLabel()})`,
    `Duration: ${item.durationMinutes || 30} minutes`,
  ];

  if (item.topic) lines.push(`Topic: ${item.topic}`);
  // Recorded at booking time; naming it avoids a timezone mix-up on the call.
  if (item.visitorTimezone) {
    lines.push(`Your timezone at booking: ${item.visitorTimezone}`);
  }
  if (item.googleEventLink) {
    lines.push("", `Calendar invite: ${item.googleEventLink}`);
  }

  lines.push(
    "",
    "If you need to reschedule, just reply to this email and we'll sort out a new time.",
    "",
    "Looking forward to speaking with you.",
    "",
    siteName,
    contact.email,
    contact.phoneDisplay,
  );

  return {
    to: item.email,
    subject: `Your ${siteName} appointment is confirmed — ${when}`,
    // CRLF is what mail clients expect between body lines.
    body: lines.join("\r\n"),
  };
}

/** Turns a draft into a mailto: URL the OS mail handler understands. */
export function buildMailtoUrl({ to, subject, body }) {
  const query = new URLSearchParams({ subject, body });
  return (
    // URLSearchParams encodes a space as "+", which mail clients render
    // literally rather than as a space, so those are put back as %20.
    `mailto:${to}?${query.toString().replace(/\+/g, "%20")}`
  );
}
