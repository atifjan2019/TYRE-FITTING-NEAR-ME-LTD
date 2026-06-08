import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isMailConfigured, sendNotifyEmail, escapeHtml } from "@/lib/mailer";

/**
 * Fired by the hero "Find a 24/7 mobile tyre fitter near you" finder. Notifies
 * the business that a visitor searched for availability in a given location, so
 * a search is captured as a lead even if they don't complete a full booking.
 * Best-effort: failures don't block the visitor's navigation to /availability.
 */
const schema = z.object({
  location: z.string().min(1).max(120),
  // Correlation key so a later booking upgrades THIS row (see /api/lead).
  key: z.string().max(64).optional().or(z.literal("")),
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

  const { location, key, company } = parsed.data;
  if (company) return NextResponse.json({ ok: true });

  // Persist so the search shows in the admin (best-effort). With a key, upsert
  // so re-searching in the same session updates one row instead of stacking up,
  // and never clobbers a row a booking already upgraded (only touch if still a
  // search).
  try {
    const source = request.headers.get("referer") ?? "";
    if (key) {
      const existing = await prisma.lead.findUnique({
        where: { sessionKey: key },
        select: { type: true },
      });
      if (!existing) {
        await prisma.lead.create({
          data: { type: "availability", postcode: location, source, sessionKey: key },
        });
      } else if (existing.type === "availability") {
        await prisma.lead.update({
          where: { sessionKey: key },
          data: { postcode: location, source },
        });
      }
      // else: a booking already exists for this key - leave it untouched.
    } else {
      await prisma.lead.create({
        data: { type: "availability", postcode: location, source },
      });
    }
  } catch (err) {
    console.error("Failed to save availability search to DB:", err);
  }

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
