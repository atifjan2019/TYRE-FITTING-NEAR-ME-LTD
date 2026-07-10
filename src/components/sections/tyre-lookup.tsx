"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/utils";

/**
 * Section 7 - Find the right tyre for your vehicle. Two tabs: vehicle
 * registration and manual tyre size. The registration tab looks the plate up
 * via the DVLA Vehicle Enquiry Service (see /api/vehicle-lookup) to confirm the
 * vehicle, then hands the details to a WhatsApp quote (the fastest real
 * conversion path). The education block below covers every tyre attribute
 * entity (width, profile, rim, load, speed rating, etc.).
 */
type Vehicle = {
  registrationNumber: string;
  make: string | null;
  colour: string | null;
  fuelType: string | null;
  yearOfManufacture: number | null;
};

export function TyreLookup({ whatsapp }: { whatsapp: string }) {
  const [tab, setTab] = useState<"reg" | "size">("reg");
  const [reg, setReg] = useState("");
  const [width, setWidth] = useState("");
  const [profile, setProfile] = useState("");
  const [rim, setRim] = useState("");

  // DVLA lookup state for the registration tab.
  const [looking, setLooking] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  function openWhatsApp(message: string) {
    if (!whatsapp) return;
    window.open(whatsappHref(whatsapp, message), "_blank", "noopener,noreferrer");
  }

  function vehicleSummary(v: Vehicle) {
    return [v.colour, v.make, v.yearOfManufacture, v.fuelType]
      .filter(Boolean)
      .join(" ");
  }

  async function lookUpVehicle(e: React.FormEvent) {
    e.preventDefault();
    const plate = reg.trim();
    if (!plate) return;
    setLooking(true);
    setLookupError(null);
    setVehicle(null);
    try {
      const res = await fetch("/api/vehicle-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber: plate }),
      });
      if (res.ok) {
        setVehicle((await res.json()) as Vehicle);
      } else if (res.status === 404) {
        setLookupError("We couldn't find that registration. Check it and try again.");
      } else {
        // Not configured / temporarily down: fall back to the WhatsApp quote.
        openWhatsApp(
          `Hi, please quote tyres for my vehicle registration ${plate.toUpperCase()}. My location is …`
        );
      }
    } catch {
      openWhatsApp(
        `Hi, please quote tyres for my vehicle registration ${plate.toUpperCase()}. My location is …`
      );
    } finally {
      setLooking(false);
    }
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-primary">
            Tyre lookup
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Find the Right Tyre for Your Vehicle
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Enter your registration or your tyre size and we will confirm the correct fitment,
            stock and an all-in price on WhatsApp.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border bg-card p-2 shadow-sm">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-secondary p-1">
            <button
              type="button"
              onClick={() => setTab("reg")}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === "reg" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              Vehicle registration
            </button>
            <button
              type="button"
              onClick={() => setTab("size")}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === "size" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              Tyre size
            </button>
          </div>

          <div className="p-4 sm:p-6">
            {tab === "reg" ? (
              <form onSubmit={lookUpVehicle}>
                <label htmlFor="reg" className="text-sm font-semibold text-primary">
                  Vehicle registration
                </label>
                <input
                  id="reg"
                  value={reg}
                  onChange={(e) => {
                    setReg(e.target.value.toUpperCase());
                    setVehicle(null);
                    setLookupError(null);
                  }}
                  placeholder="e.g. AB12 CDE"
                  className="mt-1.5 w-full rounded-lg border border-input bg-white px-4 py-3.5 text-base uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />

                {lookupError ? (
                  <p className="mt-2 text-sm font-medium text-destructive">{lookupError}</p>
                ) : null}

                {vehicle ? (
                  <>
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-success)]" />
                      <div className="text-sm">
                        <p className="font-semibold text-primary">
                          {vehicleSummary(vehicle) || "Vehicle found"}
                        </p>
                        <p className="text-muted-foreground">
                          Registration {vehicle.registrationNumber}. Confirm your tyre size
                          with us and we&apos;ll quote the all-in price.
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="cta"
                      size="xl"
                      className="mt-4 w-full"
                      onClick={() =>
                        openWhatsApp(
                          `Hi, please quote tyres for my ${vehicleSummary(vehicle)} (reg ${vehicle.registrationNumber}). My location is …`
                        )
                      }
                    >
                      Get my tyre quote <ArrowRight className="h-5 w-5" />
                    </Button>
                  </>
                ) : (
                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="mt-4 w-full"
                    disabled={looking}
                  >
                    {looking ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Looking up your vehicle…
                      </>
                    ) : (
                      <>
                        Look up my vehicle <Search className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                )}
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  openWhatsApp(
                    `Hi, please quote tyres in size ${width}/${profile} R${rim}. My location is …`
                  );
                }}
              >
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="width" className="text-sm font-semibold text-primary">
                      Width
                    </label>
                    <input
                      id="width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="225"
                      inputMode="numeric"
                      className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-3.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="profile" className="text-sm font-semibold text-primary">
                      Profile
                    </label>
                    <input
                      id="profile"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                      placeholder="45"
                      inputMode="numeric"
                      className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-3.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="rim" className="text-sm font-semibold text-primary">
                      Rim
                    </label>
                    <input
                      id="rim"
                      value={rim}
                      onChange={(e) => setRim(e.target.value)}
                      placeholder="17"
                      inputMode="numeric"
                      className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-3.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                <Button type="submit" variant="cta" size="xl" className="mt-4 w-full">
                  Get my tyre quote <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border bg-secondary/50 p-6">
          <h3 className="font-heading text-base font-bold text-primary">
            How to read your tyre size
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your tyre size is printed on the sidewall, for example 225/45 R17 91W. The first
            number (225) is the tyre width in millimetres. The second number (45) is the profile,
            the sidewall height as a percentage of the width. The R means radial construction. The
            17 is the rim diameter in inches. The 91 is the load index, the maximum weight the tyre
            can carry. The final letter (W) is the speed rating. The sidewall also shows tread
            pattern and EU label ratings for wet grip, fuel efficiency and noise, and you should
            keep tread depth above the 1.6mm legal minimum.
          </p>
        </div>
      </div>
    </section>
  );
}
