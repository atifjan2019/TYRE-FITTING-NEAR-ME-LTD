"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up animation for a stat value like "12,000+", "10+", "8" or "6".
 * Parses the numeric part, animates 0 -> target over ~1.6s ease-out once when
 * scrolled into view, and re-attaches the prefix/suffix. Respects
 * prefers-reduced-motion by rendering the final value immediately.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const duration = 1600;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        function tick(ts: number) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setDisplay(Math.round(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        }
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [match, target]);

  // Non-numeric values render verbatim.
  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
