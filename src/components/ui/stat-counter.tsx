"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated stat counter. Counts 0 -> `end` over 1600ms (easeOutCubic) once when
 * scrolled into view. Numeric value is passed as a prop (never parsed from text).
 *
 * The REAL value is the initial state, so the server-rendered HTML, view-source
 * and no-JS visitors always see the true figure (never "0"). The count-up is a
 * hydration-only enhancement layered on top.
 *
 * Robustness: an IntersectionObserver handles scroll-into-view, AND an on-mount
 * bounding-rect check handles the case where the element is already visible on
 * first paint (the common cause of counters freezing at "0"/"1"). Respects
 * prefers-reduced-motion by snapping to the final value.
 */
export function StatCounter({
  end,
  suffix = "",
  label,
  useCommas = false,
}: {
  end: number;
  suffix?: string;
  label: string;
  useCommas?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Base state is the real value: SSR markup and crawlers never see 0.
  const [value, setValue] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animate() {
      if (started) return;
      started = true;

      if (reduced) {
        setValue(end);
        return;
      }

      const duration = 1600;
      let startTs = 0;
      function frame(ts: number) {
        if (!startTs) startTs = ts;
        const t = Math.min((ts - startTs) / duration, 1);
        if (t >= 1) {
          setValue(end); // snap exactly to end, no rounding drift
          return;
        }
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(end * eased));
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Already in view on first paint? Trigger immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate();
      io.disconnect();
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);

  const formatted = useCommas ? value.toLocaleString("en-GB") : String(value);

  return (
    <div ref={ref} className="text-center">
      <span className="block font-heading text-3xl font-extrabold text-accent">
        {formatted}
        {suffix}
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
