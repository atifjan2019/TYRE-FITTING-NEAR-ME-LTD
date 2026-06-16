import * as React from "react";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Signature two-column comparison block - the visual centrepiece of each
 * service page (e.g. "Van Tyres Are Not Car Tyres", "Run-Flat vs Conventional").
 *
 * Crawlable HTML (real <ul>/<li> text, not an image) so it stays eligible for
 * AI Overview and featured snippets. The LEFT column is the recommended option
 * (navy header bar, green ticks, faint green wash); the RIGHT column is the
 * secondary option (muted neutral header bar, red crosses for genuine drawbacks
 * or neutral grey dashes when neither option is wrong).
 *
 * `className` is applied to the outer wrapper so a page can attach a speakable
 * schema selector (e.g. "load-rating-explainer") that still encloses all text.
 */
export type ComparisonColumn = {
  title: string;
  items: string[];
};

export function ComparisonBlock({
  className,
  left,
  right,
  /** "cross" = red X for real drawbacks; "dash" = neutral grey dash. */
  rightMode = "cross",
  /** Small red "Recommended" pill on the left header (omit for neutral aids). */
  recommendedPill = true,
  /** Optional honest-summary caption rendered beneath the block. */
  caption,
}: {
  className?: string;
  left: ComparisonColumn;
  right: ComparisonColumn;
  rightMode?: "cross" | "dash";
  recommendedPill?: boolean;
  caption?: React.ReactNode;
}) {
  const divider = "border-[rgba(11,23,54,0.10)]";

  return (
    <div className={cn("mx-auto max-w-[860px]", className)}>
      <div className="overflow-hidden rounded-2xl bg-card shadow-[0_4px_20px_rgba(11,23,54,0.10)]">
        <div className="grid md:grid-cols-2">
          {/* LEFT - recommended option */}
          <div className={cn("flex flex-col bg-[var(--compare-left-tint)] md:border-r", divider)}>
            <div className="relative flex items-center gap-2.5 bg-primary px-6 py-4 sm:px-7">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--color-success)] text-white">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-lg font-bold text-white">{left.title}</h3>
              {recommendedPill ? (
                <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.04em] text-accent-foreground">
                  Recommended
                </span>
              ) : null}
            </div>
            <ul className="space-y-3.5 px-6 py-6 sm:px-7 sm:py-7">
              {left.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-success)] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[15px] leading-[1.5] text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT - secondary option */}
          <div className={cn("flex flex-col border-t bg-card md:border-t-0", divider)}>
            <div className="flex items-center gap-2.5 bg-[var(--compare-neutral)] px-6 py-4 sm:px-7">
              <h3 className="font-heading text-lg font-bold text-primary">{right.title}</h3>
            </div>
            <ul className="space-y-3.5 px-6 py-6 sm:px-7 sm:py-7">
              {right.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  {rightMode === "cross" ? (
                    <X
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  ) : (
                    <Minus
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--compare-muted-text)]"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-[15px] leading-[1.5] text-[var(--compare-muted-text)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {caption ? (
        <p className="mx-auto mt-6 max-w-[640px] text-center text-sm leading-relaxed text-muted-foreground">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
