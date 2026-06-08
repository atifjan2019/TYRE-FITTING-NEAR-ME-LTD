import nodemailer from "nodemailer";

/**
 * Shared Elastic Email SMTP helper. Used by the lead form and the availability
 * finder so the transport config can't drift between routes.
 */

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

/** True when all SMTP env vars + a notify recipient/sender are configured. */
export function isMailConfigured(): boolean {
  return Boolean(
    host && port && user && pass && process.env.LEAD_NOTIFY_TO && process.env.LEAD_NOTIFY_FROM
  );
}

/** Send a notification email to the business. Throws on transport failure. */
export async function sendNotifyEmail(subject: string, html: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host,
    port,
    // Port 465 uses implicit TLS; 587/2525 use STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.LEAD_NOTIFY_FROM,
    to: process.env.LEAD_NOTIFY_TO,
    subject,
    html,
  });
}

/** Minimal HTML escaping for values interpolated into an email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
