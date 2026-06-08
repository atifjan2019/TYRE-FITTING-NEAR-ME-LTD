"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrCreateLeadKey } from "@/lib/lead-key";

/**
 * "Find a 24/7 mobile tyre fitter near you" card (hero right column).
 * Whatever the visitor enters routes to the /availability page, which shows the
 * live-style coverage map and available fitters - mirroring the proven
 * competitor flow. The postcode is passed through as a query param.
 */
export function AvailabilityFinder() {
  const router = useRouter();
  const [value, setValue] = useState("");
  // isPending stays true until the destination page has rendered, so the button
  // shows a spinner during the (server-rendered) availability page's load.
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    const key = getOrCreateLeadKey();

    // Best-effort lead notification - don't block navigation on it.
    if (q) {
      void fetch("/api/availability-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: q, key }),
        keepalive: true,
      }).catch(() => {});
    }

    // Carry the key through the URL so the booking form on /availability can
    // upgrade this same lead instead of creating a duplicate.
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
        Find a <span className="text-accent">24/7 mobile tyre fitter</span> near
        you…
      </h2>

      <form onSubmit={onSubmit} className="mt-5">
        <label htmlFor="finder" className="sr-only">
          Enter your postcode or closest town
        </label>
        <input
          id="finder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your postcode or closest town"
          autoComplete="postal-code"
          disabled={isPending}
          className="w-full rounded-lg border border-input bg-white px-4 py-3.5 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        />
        <Button
          type="submit"
          size="xl"
          disabled={isPending}
          className="mt-3 w-full text-base sm:text-lg"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Checking availability…</span>
            </>
          ) : (
            <>
              <span className="sm:hidden">Check availability</span>
              <span className="hidden sm:inline">Check availability near you</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Live fitter availability across all our regions - no obligation.
      </p>
    </div>
  );
}
