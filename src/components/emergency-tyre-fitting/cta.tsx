import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { PHONE_DISPLAY, TEL_HREF, WA_HREF } from "@/lib/emergency-tyre-fitting-content";

/**
 * Phone-first CTA pair for the emergency page. The red "Call now" button is the
 * dominant element (full width on mobile), WhatsApp sits second. tel: and
 * wa.me hrefs are hardcoded to +447883288831 / wa.me/447883288831 so this page
 * never inherits the legacy sitewide WhatsApp-number bug. No booking-form
 * button here: the form is a deliberate tertiary path in the hero only.
 */
export function EmergencyButtons({
  className = "",
  size = "xl",
}: {
  className?: string;
  size?: "lg" | "xl";
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <Button asChild variant="cta" size={size} className="w-full sm:w-auto">
        <a href={TEL_HREF}>
          <Phone /> Call now: {PHONE_DISPLAY}
        </a>
      </Button>
      <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
        <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> WhatsApp
        </a>
      </Button>
    </div>
  );
}

/**
 * Full-width phone-first CTA band, the emergency equivalent of the shared
 * CtaBand. Phone button first, WhatsApp second, no form button.
 */
export function EmergencyCtaBand({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="section-pad mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-lg text-primary-foreground/90">{subtitle}</p>
        <EmergencyButtons className="w-full justify-center sm:w-auto" />
      </div>
    </section>
  );
}

/**
 * Sticky mobile call bar. Fixed to the bottom of the viewport on small screens,
 * brand red, tel: link, visible at every scroll position. The single
 * highest-converting element on an emergency page. Hidden on lg+ where the
 * hero CTAs and sticky form stay in view. Adds bottom padding to the page via
 * a spacer so it never covers the final content.
 */
export function StickyCallBar() {
  return (
    <>
      {/* Spacer so the fixed bar never overlaps the footer/last section on mobile */}
      <div aria-hidden="true" className="h-16 lg:hidden" />
      <div
        data-section="sticky-call-bar"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-accent p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.15)] lg:hidden"
      >
        <a
          href={TEL_HREF}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent font-heading text-base font-bold text-accent-foreground"
        >
          <Phone className="h-5 w-5" /> Call now: {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}
