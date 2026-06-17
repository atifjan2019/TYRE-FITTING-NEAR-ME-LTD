import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookingForm } from "@/components/forms/booking-form";
import { CaravanButtons } from "@/components/caravan-tyre-fitting/cta";
import { HERO } from "@/lib/caravan-tyre-fitting-content";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Caravan & Motorhome Tyre Fitting", path: "/services/caravan-tyre-fitting" },
];

/**
 * Section 1 - Hero. Cloned from the van-tyre-fitting hero: 60/40 split on
 * desktop (copy left on navy, sticky booking form card right), stacked on
 * mobile. Phone and the booking form carry equal weight here. The definition
 * paragraph carries class "hero-definition" for the WebPage speakable schema.
 */
export function Hero({ phone }: { phone: string }) {
  return (
    <section data-section="hero" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-5 lg:gap-12">
        {/* Left: copy + CTAs (60%) */}
        <div className="lg:col-span-3">
          <Breadcrumbs items={CRUMBS} light />

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Caravan and Motorhome Tyre Fitting, At Your Storage Site, Pitch or Home
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />

          <p
            id="hero-definition"
            className="hero-definition mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90"
          >
            {HERO.definition}
          </p>

          <p className="mt-4 max-w-2xl font-semibold text-primary-foreground">{HERO.pricingLine}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {HERO.ticks.map((tick) => (
              <li key={tick} className="flex items-start gap-2 text-sm font-medium">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-whatsapp)]" aria-hidden="true" />
                <span>{tick}</span>
              </li>
            ))}
          </ul>

          <CaravanButtons className="mt-8" />

          <p className="mt-4 text-sm text-primary-foreground/70">
            Book with a postcode and the tyre size or registration, or call for urgent and roadside help.
          </p>
        </div>

        {/* Right: booking form card (40%) */}
        <div className="lg:col-span-2">
          <div
            data-section="hero-form"
            className="rounded-2xl bg-card p-1 text-card-foreground shadow-xl lg:sticky lg:top-24"
          >
            <h2 className="px-5 pt-5 font-heading text-xl font-bold text-primary">
              Book Caravan &amp; Motorhome Tyre Fitting
            </h2>
            <div className="p-1">
              <BookingForm
                phone={phone}
                defaultService="Caravan & Motorhome Tyre Fitting"
                messagePlaceholder="Tyre size or registration, location type (storage site, campsite, pitch, home), Tyron bands fitted?, best time to fit…"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
