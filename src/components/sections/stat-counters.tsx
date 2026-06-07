"use client";

import { useEffect, useRef, useState } from "react";

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** If set, shown verbatim (no count-up) - e.g. "30-60". */
  display?: string;
};

/**
 * Animated stat counters. Counts up from 0 when scrolled into view (once).
 * Honours prefers-reduced-motion by showing the final value immediately.
 * Values are passed in from the CMS so the numbers stay accurate.
 */
export function StatCounters({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActive(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Never render a "0" placeholder: drop numeric stats with no real value.
  const visible = stats.filter((s) => s.display || s.value > 0);
  if (visible.length === 0) return null;

  return (
    <section className="bg-primary text-primary-foreground">
      <div
        ref={ref}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-16 sm:py-20 lg:grid-cols-4"
      >
        {visible.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-heading text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">
              {s.display ? (
                s.display
              ) : (
                <Counter
                  active={active}
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              )}
            </div>
            <div className="mt-1 text-sm font-medium text-primary-foreground/80">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({
  active,
  value,
  decimals,
  prefix = "",
  suffix = "",
}: {
  active: boolean;
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const duration = 1400;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setN(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  // Show the real value until the count-up runs, so SSR / no-JS / crawlers
  // never see a "0" placeholder.
  const shown = active ? n : value;
  const formatted = shown.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
