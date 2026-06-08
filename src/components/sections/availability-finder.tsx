"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrCreateLeadKey } from "@/lib/lead-key";

/**
 * "Find a 24/7 mobile tyre fitter near you" card (hero right column).
 * Single-field postcode checker with real-time UK postcode validation, helper
 * text and a loading state. Town names are also accepted (the field doubles as a
 * location search), so a non-postcode entry still submits. Routing to
 * /availability is the success/result step.
 */

// Standard UK postcode format (with optional internal space).
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export function AvailabilityFinder() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const trimmed = value.trim();
  const isValidPostcode = UK_POSTCODE_RE.test(trimmed);
  // Show the red x only once it looks like a finished-but-wrong postcode attempt.
  const looksWrong = trimmed.length >= 5 && !isValidPostcode && /\d/.test(trimmed);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = trimmed;
    const key = getOrCreateLeadKey();

    if (q) {
      void fetch("/api/availability-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: q, key }),
        keepalive: true,
      }).catch(() => {});
    }

    startTransition(() => {
      if (!q) {
        router.push("/availability");
        return;
      }
      const params = new URLSearchParams({ location: q });
      if (key) params.set("k", key);
      router.push(`/availability?${params.toString()}`);
    });
  }

  return (
    <div className="w-full rounded-2xl border bg-card p-6 shadow-xl sm:p-8">
      {/* Step indicator (1 -> 2) */}
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          1
        </span>
        <span className="h-px flex-1 bg-border" />
        <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
          2
        </span>
      </div>

      <h2 className="text-center font-heading text-2xl font-extrabold leading-tight text-primary sm:text-left">
        Find a <span className="text-accent">24/7 mobile tyre fitter</span> near you…
      </h2>

      {/* Genuine demand-pattern social proof (not a fake live counter). */}
      <p className="mt-2 text-center text-sm font-medium text-[var(--color-whatsapp-dark)] sm:text-left">
        Mobile fitters available across all six regions now.
      </p>

      <form onSubmit={onSubmit} className="mt-5" noValidate>
        <label htmlFor="finder" className="sr-only">
          Enter your full postcode
        </label>
        <div className="relative">
          <input
            id="finder"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your postcode, e.g. SW1A 1AA"
            autoComplete="postal-code"
            disabled={isPending}
            aria-describedby="finder-help"
            aria-invalid={looksWrong}
            className="w-full rounded-lg border border-input bg-white px-4 py-3.5 pr-11 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          />
          {/* Real-time validation icon */}
          {isValidPostcode ? (
            <Check className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-success)]" />
          ) : looksWrong ? (
            <X className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-destructive" />
          ) : null}
        </div>
        <p id="finder-help" className="mt-1.5 text-xs text-muted-foreground">
          {looksWrong
            ? "That postcode does not look complete. Example: SW1A 1AA."
            : "Enter your full postcode, e.g. SW1A 1AA. You can also type your nearest town."}
        </p>

        <Button
          type="submit"
          size="xl"
          disabled={isPending}
          className="mt-3 w-full text-base sm:text-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Checking your area…</span>
            </>
          ) : (
            <>
              <span>Check availability now</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Live fitter availability across all our regions. No obligation.
      </p>
    </div>
  );
}
