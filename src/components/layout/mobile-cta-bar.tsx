"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { telHref, whatsappHref } from "@/lib/utils";

/**
 * Sticky bottom call/WhatsApp bar for mobile only (hidden >= md). Click-to-call
 * is the primary conversion path for emergency-intent local searches. Hides while
 * the hero CTA is on screen (top ~600px) to avoid duplication, and slides away on
 * scroll up to keep content unobstructed.
 */
export function MobileCtaBar({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!phone && !whatsapp) return;
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      const inHeroZone = y < 600; // hide over the hero's own CTAs
      const scrollingDown = y > lastY;
      // Show on scroll down past the hero, hide on scroll up.
      setVisible(!inHeroZone && scrollingDown);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phone, whatsapp]);

  if (!phone && !whatsapp) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t bg-card p-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-250 ease-out md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      } motion-reduce:transition-none`}
      aria-hidden={!visible}
    >
      {phone ? (
        <a
          href={telHref(phone)}
          data-conversion="call"
          aria-label={`Call ${phone}`}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-accent text-base font-semibold text-accent-foreground active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" /> Call {phone}
        </a>
      ) : null}
      {whatsapp ? (
        <a
          href={whatsappHref(
            whatsapp,
            "Hi, I need a mobile tyre fitter. My postcode is _____, my tyre size is _____."
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-conversion="whatsapp"
          aria-label="Message us on WhatsApp"
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-whatsapp)] text-base font-semibold text-white active:scale-[0.98]"
        >
          <WhatsAppIcon /> WhatsApp Now
        </a>
      ) : null}
    </div>
  );
}
