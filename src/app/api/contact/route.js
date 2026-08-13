import { NextResponse } from "next/server";

import { jsonError } from "@/lib/auth";
import { sendMail } from "@/lib/mailer";
import { contactMessageSchema } from "@/lib/validation/contact";
import { formatZodError } from "@/lib/validation/user";

export const runtime = "nodejs";

// Where contact form submissions land. Overridable so staging can point
// somewhere else without a code change.
const RECIPIENT = process.env.CONTACT_RECIPIENT || "wkusw2013@gmail.com";

// Crude per-process rate limit: enough to stop someone holding the submit
// button, not a substitute for a real limiter behind a load balancer.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((at) => now - at < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived server.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// POST /api/contact — public. Emails the submission; nothing is stored.
export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";

    if (isRateLimited(ip)) {
      return jsonError("Too many messages. Please try again in a minute.", 429);
    }

    const body = await request.json().catch(() => null);
    if (!body) return jsonError("Invalid request body", 400);

    const parsed = contactMessageSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, {
        fields: formatZodError(parsed.error),
      });
    }

    const { name, email, phone, office, subject, message, website } =
      parsed.data;

    // A bot filled the hidden field. Answer as if it worked so it learns
    // nothing, but send no mail.
    if (website) {
      return NextResponse.json({ success: true });
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      office && `Office: ${office}`,
      `Subject: ${subject}`,
      "",
      message,
    ].filter(Boolean);

    await sendMail({
      to: RECIPIENT,
      subject: `Contact form: ${subject}`,
      text: lines.join("\n"),
      html: `
        <h2 style="margin:0 0 16px;font:600 18px system-ui">New contact form message</h2>
        <table style="border-collapse:collapse;font:14px system-ui">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ""}
          ${office ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Office</td><td>${escapeHtml(office)}</td></tr>` : ""}
          <tr><td style="padding:4px 12px 4px 0;color:#666">Subject</td><td>${escapeHtml(subject)}</td></tr>
        </table>
        <p style="margin:20px 0 0;font:14px/1.6 system-ui;white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
      replyTo: `"${name}" <${email}>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/contact", error);
    // Nothing is stored, so a failed send means the message is lost — say so
    // rather than showing a success screen for mail that never left.
    return jsonError(
      "We could not send your message. Please email us directly.",
      502,
    );
  }
}
