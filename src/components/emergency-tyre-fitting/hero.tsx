import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookingForm } from "@/components/forms/booking-form";
import { EmergencyButtons } from "@/components/emergency-tyre-fitting/cta";
import { HERO } from "@/lib/emergency-tyre-fitting-content";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Emergency Tyre Fitting", path: "/services/emergency-tyre-fitting" },
];

/**
 * Section 1 - Phone-first emergency hero. The red "Call now" button is the
 * dominant element (full width on mobile). The booking form is a tertiary path:
 * a collapsed accordion on mobile ("Not urgent? Book a slot instead"), and the
 * always-visible right column on desktop. A single <details> drives both: the
 * summary is hidden on lg and the content is forced visible on lg via CSS, so
 * there is one form instance and no duplicate element ids.
 *
 * The definition paragraph carries class "hero-definition" for the WebPage
 * speakable schema.
 */
export function Hero({ phone }: { phone: string }) {
  return (
    <section data-section="hero" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-5 lg:gap-12">
        {/* Left: copy + phone-first CTAs (60%) */}
        <div className="lg:col-span-3">
          <Breadcrumbs items={CRUMBS} light />

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            24/7 Emergency Tyre Fitting Near Me, Across the UK
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />

          <p
            id="hero-definition"
            className="hero-definition mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90"
          >
            {HERO.definition}
          </p>

          <p className="mt-4 max-w-2xl font-semibold text-primary-foreground">
            {HERO.responseLine} {HERO.pricingLine}
          </p>

          {/* Phone-first CTA pair: red call button dominant, WhatsApp second */}
          <EmergencyButtons className="mt-8" />
          <p className="mt-3 text-sm text-primary-foreground/80">
            The line is answered 24/7. Location plus registration is all we need.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {HERO.ticks.map((tick) => (
              <li key={tick} className="flex items-start gap-2 text-sm font-medium">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-whatsapp)]" aria-hidden="true" />
                <span>{tick}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: booking form. Collapsed accordion on mobile, open column on lg. */}
        <div className="lg:col-span-2">
          <details
            data-section="hero-form"
            className="group rounded-2xl bg-card text-card-foreground shadow-xl lg:sticky lg:top-24"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-2xl px-5 py-4 font-heading text-base font-bold text-primary lg:hidden [&::-webkit-details-marker]:hidden">
              <span>Not urgent? Book a slot instead</span>
              <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-90">
                &rarr;
              </span>
            </summary>
            <div className="hidden group-open:block lg:block">
              <h2 className="px-5 pt-1 font-heading text-xl font-bold text-primary lg:pt-5">
                Book a Tyre Fitting Slot
              </h2>
              <div className="p-1">
                <BookingForm
                  phone={phone}
                  defaultService="24/7 Emergency Tyre Fitting"
                  messagePlaceholder="Your location (road, junction or postcode) and what happened…"
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
