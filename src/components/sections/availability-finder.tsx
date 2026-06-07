"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * "Find a 24/7 mobile tyre fitter near you" card (hero right column).
 * Whatever the visitor enters routes to the /availability page, which shows the
 * live-style coverage map and available fitters - mirroring the proven
 * competitor flow. The postcode is passed through as a query param.
 */
export function AvailabilityFinder() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/availability?location=${encodeURIComponent(q)}` : "/availability");
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

      <h2 className="font-heading text-2xl font-extrabold leading-tight text-primary">
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
          className="w-full rounded-lg border border-input bg-white px-4 py-3.5 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" size="xl" className="mt-3 w-full">
          Check availability near you <ArrowRight className="h-5 w-5" />
        </Button>
      </form>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Live fitter availability across all our regions - no obligation.
      </p>
    </div>
  );
}
