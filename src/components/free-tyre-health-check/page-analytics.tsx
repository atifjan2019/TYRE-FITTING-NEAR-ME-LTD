"use client";

import { useEffect } from "react";

/**
 * Conversion tracking for the free tyre health check page. Pushes GA4-style
 * events to window.dataLayer (works with GTM and gtag's dataLayer). Uses event
 * delegation so it captures clicks inside reused components (CtaBand, FAQ
 * accordion) without forking them.
 *
 * Events: form_view, form_start, cta_click_phone, cta_click_whatsapp,
 * faq_open, scroll_depth_50, scroll_depth_90.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: DataLayerEvent[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}

/** Nearest section label for a clicked element (data-section on each section). */
function sectionOf(el: Element | null): string {
  return el?.closest<HTMLElement>("[data-section]")?.dataset.section ?? "unknown";
}

export function PageAnalytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      if (!target) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (anchor) {
        const href = anchor.getAttribute("href") ?? "";
        if (href.startsWith("tel:")) {
          track("cta_click_phone", { location: sectionOf(anchor) });
        } else if (href.includes("wa.me") || href.startsWith("https://wa.me")) {
          track("cta_click_whatsapp", { location: sectionOf(anchor) });
        }
      }

      const summary = target.closest<HTMLElement>('[data-section="faq"] summary');
      if (summary) {
        requestAnimationFrame(() => {
          const details = summary.closest("details");
          if (details?.open) {
            track("faq_open", { question: summary.textContent?.trim().slice(0, 120) });
          }
        });
      }
    }

    let formStarted = false;
    function onFocusIn(e: FocusEvent) {
      if (formStarted) return;
      const t = e.target as Element | null;
      if (t?.closest('[data-section="hero-form"]')) {
        formStarted = true;
        track("form_start");
      }
    }

    const firedDepths = new Set<number>();
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      for (const depth of [0.5, 0.9]) {
        if (scrolled >= depth && !firedDepths.has(depth)) {
          firedDepths.add(depth);
          track(`scroll_depth_${Math.round(depth * 100)}`);
        }
      }
    }

    const formEl = document.querySelector('[data-section="hero-form"]');
    let io: IntersectionObserver | null = null;
    if (formEl) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((en) => en.isIntersecting)) {
            track("form_view");
            io?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(formEl);
    }

    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return null;
}
