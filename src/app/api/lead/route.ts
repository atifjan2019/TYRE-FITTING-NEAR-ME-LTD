import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { leadSchema } from "@/lib/validation";

/**
 * Booking/quote form handler. Validates the payload, then emails the business
 * via Elastic Email's SMTP relay (nodemailer). Degrades gracefully: if the SMTP
 * credentials aren't set, it logs the lead server-side and still returns success
 * so the UX isn't blocked in dev.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;

  // Honeypot: a filled "company" field means a bot - silently accept & drop.
  if (lead.company) return NextResponse.json({ ok: true });

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_NOTIFY_TO;
  const from = process.env.LEAD_NOTIFY_FROM;

  const html = `
    <h2>New tyre fitting enquiry</h2>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(lead.name)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(lead.phone)}</li>
      <li><strong>Postcode/location:</strong> ${escapeHtml(lead.postcode)}</li>
      <li><strong>Tyre size:</strong> ${escapeHtml(lead.tyreSize || "-")}</li>
      <li><strong>Service:</strong> ${escapeHtml(lead.service || "-")}</li>
      <li><strong>Message:</strong> ${escapeHtml(lead.message || "-")}</li>
    </ul>
  `;

  if (host && port && user && pass && to && from) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        // Port 465 uses implicit TLS; 587/2525 use STARTTLS.
        secure: port === 465,
        auth: { user, pass },
      });
      await transporter.sendMail({
        from,
        to,
        subject: `New enquiry: ${lead.name} (${lead.postcode})`,
        html,
      });
    } catch (err) {
      console.error("Failed to send lead email:", err);
      return NextResponse.json(
        { error: "Could not send your request" },
        { status: 502 }
      );
    }
  } else {
    // Dev / unconfigured: log so nothing is lost.
    console.info("[lead] (SMTP not configured) New enquiry:", lead);
  }

  return NextResponse.json({ ok: true });
}

/** Minimal HTML escaping for values interpolated into the email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
