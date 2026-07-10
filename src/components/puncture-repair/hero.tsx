import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { BookingForm } from "@/components/forms/booking-form";
import { HERO } from "@/lib/puncture-repair-content";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Puncture Repair", path: "/services/puncture-repair" },
];

/**
 * Section 1 - Hero. Cloned from the mobile-tyre-fitting hero. Navy, two columns
 * on desktop (copy 55% left, booking form card 45% right). The form card pulls
 * down with a negative bottom margin so it overlaps the navy-to-white boundary
 * and breaks the fold line. On mobile the Call/WhatsApp buttons render above the
 * form card. The subline carries brand mention 1 of 3 and class "hero-definition".
 */
export function Hero({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  return (
    <section data-section="hero" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        {/* Left: copy + CTAs (55%) */}
        <div className="lg:col-span-7">
          <Breadcrumbs items={CRUMBS} light />

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Puncture Repair, We Come to You 24/7
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />

          <p
            id="hero-definition"
            className="hero-definition mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90"
          >
            Mobile puncture repair brings a qualified fitter to your home, work or
            roadside, 24 hours a day. Tyre Fitting Near Me Ltd targets a 60-minute
            emergency response, with permanent repairs from £39 and no call-out fee in
            standard hours. Repair or replace, your tyre gets resolved in a single visit.
          </p>

          {/* Buttons sit ABOVE the bullets and form on mobile (Call first) */}
          <CtaButtons phone={phone} whatsapp={whatsapp} className="mt-7" />

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {HERO.ticks.map((tick) => (
              <li key={tick} className="flex items-start gap-2 text-sm font-medium">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-whatsapp)]" aria-hidden="true" />
                <span>{tick}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: booking form card (45%), overlaps the navy/white boundary */}
        <div className="lg:col-span-5">
          <div
            data-section="hero-form"
            className="rounded-2xl bg-card p-1 text-card-foreground shadow-xl lg:sticky lg:top-24 lg:-mb-16"
          >
            <h2 className="px-5 pt-5 font-heading text-xl font-bold text-primary">
              Book Puncture Repair
            </h2>
            <div className="p-1">
              <BookingForm phone={phone} defaultService="Puncture Repair" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
