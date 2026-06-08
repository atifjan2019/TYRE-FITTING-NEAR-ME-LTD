import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * DVLA Vehicle Enquiry Service (VES) proxy.
 * ---------------------------------------------------------------------------
 * Looks up basic vehicle details from a UK registration so the tyre-lookup
 * form can confirm the vehicle before quoting. The DVLA API key is read from
 * `DVLA_API_KEY` and never exposed to the browser (this runs server-side).
 *
 * DVLA VES returns make, year, colour, fuel type, engine size, MOT/tax status
 * — it does NOT return the model or tyre size (no public API does), so the
 * fitting team still confirms the exact tyre on WhatsApp.
 *
 * Docs: https://developer-portal.driver-vehicle-licensing.api.gov.uk/
 */

const DVLA_URL =
  process.env.DVLA_API_URL ??
  "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

const schema = z.object({
  // Accept any reasonable plate; we normalise (strip spaces, uppercase) below.
  registrationNumber: z.string().min(1).max(10),
});

export async function POST(request: Request) {
  const apiKey = process.env.DVLA_API_KEY;
  if (!apiKey) {
    // Not configured yet — let the client fall back to the WhatsApp flow.
    return NextResponse.json(
      { error: "Vehicle lookup is not configured." },
      { status: 503 }
    );
  }

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

  const registrationNumber = parsed.data.registrationNumber
    .replace(/\s+/g, "")
    .toUpperCase();

  try {
    const res = await fetch(DVLA_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registrationNumber }),
      // DVLA data is effectively static for a plate; cache briefly to be kind.
      cache: "no-store",
    });

    if (res.status === 404) {
      return NextResponse.json(
        { error: "We couldn't find a vehicle with that registration." },
        { status: 404 }
      );
    }
    if (!res.ok) {
      console.error("DVLA lookup failed:", res.status, await res.text());
      return NextResponse.json(
        { error: "Vehicle lookup is temporarily unavailable." },
        { status: 502 }
      );
    }

    const v = await res.json();
    // Return only the fields the UI needs (don't leak the full payload).
    return NextResponse.json({
      registrationNumber: v.registrationNumber ?? registrationNumber,
      make: v.make ?? null,
      colour: v.colour ?? null,
      fuelType: v.fuelType ?? null,
      yearOfManufacture: v.yearOfManufacture ?? null,
      engineCapacity: v.engineCapacity ?? null,
      motStatus: v.motStatus ?? null,
      taxStatus: v.taxStatus ?? null,
    });
  } catch (err) {
    console.error("DVLA lookup error:", err);
    return NextResponse.json(
      { error: "Vehicle lookup is temporarily unavailable." },
      { status: 502 }
    );
  }
}
