import nodemailer from "nodemailer";

// Mail is sent straight from this server to an SMTP mailbox you control — no
// form service, no webhook relay, nothing in between. `nodemailer` is a client
// library, not a hosted service.
//
// Setup for a Gmail sender:
//   1. Turn on 2-Step Verification on the sending account.
//   2. Create an App Password (Google Account → Security → App passwords).
//   3. Put that 16-character password in SMTP_PASSWORD — never the real one.
// A domain mailbox works the same way; only the host/port change.

let cachedTransport = null;

function getConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password) return null;

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS after connecting.
    secure: port === 465,
    auth: { user, pass: password },
  };
}

/** True when the mailer has everything it needs to send. */
export function isMailerConfigured() {
  return getConfig() !== null;
}

function getTransport() {
  const config = getConfig();
  if (!config) return null;

  // Reused across requests so each message doesn't pay for a new TLS
  // handshake and login.
  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      ...config,
      pool: true,
      maxConnections: 2,
    });
  }

  return cachedTransport;
}

/**
 * Sends one message. Throws when the mailer is unconfigured or SMTP rejects
 * it, so callers can tell the visitor their message did not get through
 * rather than silently dropping it.
 */
export async function sendMail({ to, subject, text, html, replyTo }) {
  const transport = getTransport();
  if (!transport) {
    throw new Error("SMTP is not configured (set SMTP_HOST/USER/PASSWORD)");
  }

  return transport.sendMail({
    // Must be the authenticated mailbox: providers rewrite or reject a From
    // they did not authorise, which is what lands mail in spam.
    from: `"${process.env.SMTP_FROM_NAME || "Peace iTech Website"}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
    // Hitting reply goes to the person who filled in the form.
    replyTo,
  });
}
