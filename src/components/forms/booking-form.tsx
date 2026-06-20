"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Phone, Search } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { telHref } from "@/lib/utils";

/**
 * Booking / quote form. Captures the essentials a fitter needs (tyre size,
 * postcode/location, phone) and POSTs to /api/lead which emails the business.
 * Phone/WhatsApp remain the primary conversion path - this is the fallback for
 * people who'd rather not call.
 *
 * `defaultService` lets a service page pre-select the relevant service.
 * `defaultPostcode` lets the availability finder prefill the searched location.
 * `leadKey` (from the availability search) de-duplicates the lead: when present,
 * this booking upgrades the existing search row instead of creating a new one.
 */
export function BookingForm({
  phone,
  defaultService,
  defaultPostcode,
  leadKey,
  messagePlaceholder,
  compact = false,
}: {
  phone?: string;
  defaultService?: string;
  defaultPostcode?: string;
  leadKey?: string;
  messagePlaceholder?: string;
  /**
   * Compact mode shows only phone, tyre size and postcode (e.g. in a sidebar).
   * The name field is omitted, so a default name is supplied to satisfy the
   * required-field schema — the phone number is what the team needs anyway.
   */
  compact?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Vehicle registration lookup (DVLA) — kept outside react-hook-form since the
  // lead schema doesn't include it; the result is folded into the message below.
  const [reg, setReg] = useState("");
  const [looking, setLooking] = useState(false);
  const [vehicle, setVehicle] = useState<string | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      service: defaultService ?? "",
      postcode: defaultPostcode ?? "",
      // Compact mode hides the name field; supply a placeholder so the required
      // schema passes (the team calls back on the phone number provided).
      name: compact ? "Website enquiry" : "",
    },
  });

  async function lookUpVehicle() {
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
        const v = await res.json();
        const summary = [v.colour, v.make, v.yearOfManufacture, v.fuelType]
          .filter(Boolean)
          .join(" ");
        setVehicle(summary || "Vehicle found");
      } else if (res.status === 404) {
        setLookupError("We couldn't find that registration. Check it and try again.");
      } else {
        // Not configured / temporarily down: keep the plate, skip the lookup.
        setLookupError("Couldn't look that up right now — we'll confirm your vehicle when we call.");
      }
    } catch {
      setLookupError("Couldn't look that up right now — we'll confirm your vehicle when we call.");
    } finally {
      setLooking(false);
    }
  }

  async function onSubmit(values: LeadInput) {
    setServerError(null);
    // Fold the registration (and confirmed vehicle, if looked up) into the
    // message so the team sees it without a schema/DB change.
    const plate = reg.trim().toUpperCase();
    const vehicleLine = plate
      ? `Vehicle: ${vehicle ? `${vehicle} ` : ""}(reg ${plate})`
      : "";
    const message = [values.message?.trim(), vehicleLine].filter(Boolean).join("\n\n");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, message, leadKey: leadKey ?? "" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setServerError(
        "Sorry, something went wrong. Please call us instead and we'll sort it right away."
      );
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-whatsapp)]" />
        <h3 className="mt-4 text-xl font-bold">Request received!</h3>
        <p className="mt-2 text-muted-foreground">
          Thanks - we&apos;ve got your details and will call you back shortly. For
          anything urgent, please call us now.
        </p>
        {phone ? (
          <Button asChild variant="cta" size="lg" className="mt-5">
            <a href={telHref(phone)}>
              <Phone /> Call {phone}
            </a>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={
        compact
          ? "" // sits inside the sidebar card, so no extra chrome
          : "rounded-xl border bg-card p-6 shadow-sm sm:p-8"
      }
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {compact ? (
          <>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone number *</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                {...register("phone")}
                className="mt-1.5"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="tyreSize">Tyre size (if known)</Label>
              <Input
                id="tyreSize"
                {...register("tyreSize")}
                className="mt-1.5"
                placeholder="e.g. 205/55 R16"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="postcode">Postcode / location *</Label>
              <Input
                id="postcode"
                {...register("postcode")}
                className="mt-1.5"
                placeholder="e.g. ME16 or 'M20 J6'"
                autoComplete="postal-code"
              />
              {errors.postcode && (
                <p className="mt-1 text-sm text-destructive">{errors.postcode.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
        <div className="sm:col-span-2">
          <Label htmlFor="name">Your name *</Label>
          <Input id="name" {...register("name")} className="mt-1.5" autoComplete="name" />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone number *</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            {...register("phone")}
            className="mt-1.5"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div>
          <Label htmlFor="postcode">Postcode / location *</Label>
          <Input
            id="postcode"
            {...register("postcode")}
            className="mt-1.5"
            placeholder="e.g. ME16 or 'M20 J6'"
            autoComplete="postal-code"
          />
          {errors.postcode && (
            <p className="mt-1 text-sm text-destructive">{errors.postcode.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="reg">Vehicle registration (optional)</Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              id="reg"
              value={reg}
              onChange={(e) => {
                setReg(e.target.value.toUpperCase());
                setVehicle(null);
                setLookupError(null);
              }}
              placeholder="e.g. AB12 CDE"
              className="uppercase tracking-wider"
              autoComplete="off"
            />
            <Button
              type="button"
              variant="outline"
              onClick={lookUpVehicle}
              disabled={looking || !reg.trim()}
              className="shrink-0"
            >
              {looking ? (
                <>
                  <Loader2 className="animate-spin" /> Looking up…
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" /> Look up
                </>
              )}
            </Button>
          </div>
          {lookupError && <p className="mt-1 text-sm text-destructive">{lookupError}</p>}
          {vehicle && (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
              <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" /> {vehicle}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="tyreSize">Tyre size (if known)</Label>
          <Input
            id="tyreSize"
            {...register("tyreSize")}
            className="mt-1.5"
            placeholder="e.g. 205/55 R16"
          />
        </div>

        <div>
          <Label htmlFor="service">What do you need?</Label>
          <Input
            id="service"
            {...register("service")}
            className="mt-1.5"
            placeholder="e.g. puncture repair"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Anything else?</Label>
          <Textarea
            id="message"
            {...register("message")}
            className="mt-1.5"
            rows={3}
            placeholder={
              messagePlaceholder ??
              "Vehicle make/model, what happened, best time to call…"
            }
          />
        </div>
          </>
        )}

        {/* Honeypot - off-screen anti-spam field. Real users never see or focus
            it; spam bots fill it and the submission is rejected server-side. Kept
            functional, but pulled out of layout, the a11y tree and tab order. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <label htmlFor="company-hp">Company</label>
          <input
            id="company-hp"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>
      </div>

      {serverError && (
        <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Get my quote"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We&apos;ll only use your details to respond to your enquiry. No spam, ever.
      </p>
    </form>
  );
}
