import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { BookingForm } from "@/components/forms/booking-form";
import { HERO } from "@/lib/mobile-tyre-fitting-content";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Mobile Tyre Fitting", path: "/services/mobile-tyre-fitting" },
];

/**
 * Section 3 - Hero. 60/40 split on desktop (copy left on navy, booking form
 * card right), stacked on mobile. The definition paragraph carries id
 * "hero-definition" so the WebPage speakable schema can target it.
 */
export function Hero({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  return (
    <section data-section="hero" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-5 lg:gap-12">
        {/* Left: copy + CTAs (60%) */}
        <div className="lg:col-span-3">
          <Breadcrumbs items={CRUMBS} light />

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Tyre Fitting Near Me, Across the UK
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />

          <p
            id="hero-definition"
            className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90"
          >
            {HERO.definition}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {HERO.ticks.map((tick) => (
              <li key={tick} className="flex items-start gap-2 text-sm font-medium">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-whatsapp)]" aria-hidden="true" />
                <span>{tick}</span>
              </li>
            ))}
          </ul>

          <CtaButtons phone={phone} whatsapp={whatsapp} className="mt-8" />

          <p className="mt-4 text-sm text-primary-foreground/70">
            Or use the booking form for a written quote.
          </p>
        </div>

        {/* Right: booking form card (40%) */}
        <div className="lg:col-span-2">
          <div
            data-section="hero-form"
            className="rounded-2xl bg-card p-1 text-card-foreground shadow-xl lg:sticky lg:top-24"
          >
            <h2 className="px-5 pt-5 font-heading text-xl font-bold text-primary">
              Book Mobile Tyre Fitting
            </h2>
            <div className="p-1">
              <BookingForm phone={phone} defaultService="Mobile Tyre Fitting" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
