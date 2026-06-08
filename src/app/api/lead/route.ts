import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { isMailConfigured, sendNotifyEmail, escapeHtml } from "@/lib/mailer";

/**
 * Booking/quote form handler. Validates the payload, then emails the business
 * via Elastic Email's SMTP relay. Degrades gracefully: if SMTP isn't configured,
 * it logs the lead server-side and still returns success so the UX isn't blocked
 * in dev.
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

  // Persist so the enquiry shows in the admin (best-effort: a DB hiccup must not
  // lose the lead, since the email below is the backup notification).
  // If a leadKey is present, this booking came from the availability flow - so
  // UPGRADE that search row into a full booking rather than creating a second
  // lead. upsert keeps it to one row even if the search row was never written.
  const data = {
    type: "booking",
    name: lead.name,
    phone: lead.phone,
    postcode: lead.postcode,
    tyreSize: lead.tyreSize || "",
    service: lead.service || "",
    message: lead.message || "",
    source: request.headers.get("referer") ?? "",
  };
  try {
    if (lead.leadKey) {
      await prisma.lead.upsert({
        where: { sessionKey: lead.leadKey },
        update: data,
        create: { ...data, sessionKey: lead.leadKey },
      });
    } else {
      await prisma.lead.create({ data });
    }
  } catch (err) {
    console.error("Failed to save lead to DB:", err);
  }

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

  if (isMailConfigured()) {
    try {
      await sendNotifyEmail(
        `New enquiry: ${lead.name} (${lead.postcode})`,
        html
      );
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
