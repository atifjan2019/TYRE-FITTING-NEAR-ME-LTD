import { NextResponse } from "next/server";
import { z } from "zod";
import { isMailConfigured, sendNotifyEmail, escapeHtml } from "@/lib/mailer";

/**
 * Fired by the hero "Find a 24/7 mobile tyre fitter near you" finder. Notifies
 * the business that a visitor searched for availability in a given location, so
 * a search is captured as a lead even if they don't complete a full booking.
 * Best-effort: failures don't block the visitor's navigation to /availability.
 */
const schema = z.object({
  location: z.string().min(1).max(120),
  // Honeypot - must stay empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const { location, company } = parsed.data;
  if (company) return NextResponse.json({ ok: true });

  const html = `
    <h2>New availability search</h2>
    <p>A visitor checked fitter availability for:</p>
    <ul>
      <li><strong>Location:</strong> ${escapeHtml(location)}</li>
    </ul>
    <p>They may follow up by phone or WhatsApp - consider reaching out.</p>
  `;

  if (isMailConfigured()) {
    try {
      await sendNotifyEmail(`Availability search: ${location}`, html);
    } catch (err) {
      console.error("Failed to send availability-notify email:", err);
      // Best-effort - still report ok so the client navigation isn't blocked.
      return NextResponse.json({ ok: true });
    }
  } else {
    console.info("[availability-notify] (SMTP not configured) Search:", location);
  }

  return NextResponse.json({ ok: true });
}
