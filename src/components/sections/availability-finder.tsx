"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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
 *
 * When the input looks like a postcode, it is verified against postcodes.io
 * (a free, no-key UK postcode API) so we only green-light real postcodes.
 */

// Standard UK postcode format (with optional internal space).
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

type PostcodeCheck = "idle" | "checking" | "valid" | "invalid";

export function AvailabilityFinder() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [check, setCheck] = useState<PostcodeCheck>("idle");
  const [isPending, startTransition] = useTransition();

  const trimmed = value.trim();
  const looksLikePostcode = UK_POSTCODE_RE.test(trimmed);
  // Show the red x only once it looks like a finished-but-wrong postcode attempt.
  const looksWrong = trimmed.length >= 5 && !looksLikePostcode && /\d/.test(trimmed);
  // A postcode is only "valid" once the API confirms it actually exists.
  const isValidPostcode = looksLikePostcode && check === "valid";
  // It looks like a postcode but the API says it doesn't exist.
  const isUnknownPostcode = looksLikePostcode && check === "invalid";

  // Verify the postcode against postcodes.io, debounced, whenever it changes.
  useEffect(() => {
    if (!looksLikePostcode) {
      setCheck("idle");
      return;
    }
    setCheck("checking");
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.postcodes.io/postcodes/${encodeURIComponent(trimmed)}/validate`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setCheck(data?.result === true ? "valid" : "invalid");
      } catch (err) {
        // Network/abort errors: fall back to format-only validation (don't block).
        if ((err as Error)?.name !== "AbortError") setCheck("valid");
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed, looksLikePostcode]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = trimmed;
    // Block submission only when it looks like a postcode but isn't a real one.
    if (isUnknownPostcode || (looksLikePostcode && check === "checking")) return;
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
            onChange={(e) => setValue(e.target.value.toUpperCase())}
            placeholder="Enter your postcode, e.g. SW1A 1AA"
            autoComplete="postal-code"
            disabled={isPending}
            aria-describedby="finder-help"
            aria-invalid={looksWrong || isUnknownPostcode}
            className="w-full rounded-lg border border-input bg-white px-4 py-3.5 pr-11 text-base uppercase text-foreground outline-none placeholder:normal-case focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          />
          {/* Real-time validation icon */}
          {check === "checking" ? (
            <Loader2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground" />
          ) : isValidPostcode ? (
            <Check className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-success)]" />
          ) : looksWrong || isUnknownPostcode ? (
            <X className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-destructive" />
          ) : null}
        </div>
        <p id="finder-help" className="mt-1.5 text-xs text-muted-foreground">
          {isUnknownPostcode
            ? "We couldn't find that postcode. Please double-check it."
            : looksWrong
              ? "That postcode does not look complete. Example: SW1A 1AA."
              : "Enter your full postcode, e.g. SW1A 1AA. You can also type your nearest town."}
        </p>

        <Button
          type="submit"
          size="xl"
          disabled={isPending || isUnknownPostcode || (looksLikePostcode && check === "checking")}
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
