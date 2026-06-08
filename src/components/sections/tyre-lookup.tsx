"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappHref } from "@/lib/utils";

/**
 * Section 7 - Find the right tyre for your vehicle. Two tabs: vehicle
 * registration and manual tyre size. A live DVLA/OE lookup API is owner input
 * (flagged in the appendix); until then, both tabs hand the details straight to
 * a WhatsApp quote, which is the fastest real conversion path. The education
 * block below covers every tyre attribute entity (width, profile, rim, load,
 * speed rating, etc.).
 */
export function TyreLookup({ whatsapp }: { whatsapp: string }) {
  const [tab, setTab] = useState<"reg" | "size">("reg");
  const [reg, setReg] = useState("");
  const [width, setWidth] = useState("");
  const [profile, setProfile] = useState("");
  const [rim, setRim] = useState("");

  function openWhatsApp(message: string) {
    if (!whatsapp) return;
    window.open(whatsappHref(whatsapp, message), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  openWhatsApp(
                    `Hi, please quote tyres for my vehicle registration ${reg.toUpperCase()}. My location is …`
                  );
                }}
              >
                <label htmlFor="reg" className="text-sm font-semibold text-primary">
                  Vehicle registration
                </label>
                <input
                  id="reg"
                  value={reg}
                  onChange={(e) => setReg(e.target.value)}
                  placeholder="e.g. AB12 CDE"
                  className="mt-1.5 w-full rounded-lg border border-input bg-white px-4 py-3.5 text-base uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button type="submit" variant="cta" size="xl" className="mt-4 w-full">
                  Get my tyre quote <ArrowRight className="h-5 w-5" />
                </Button>
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
