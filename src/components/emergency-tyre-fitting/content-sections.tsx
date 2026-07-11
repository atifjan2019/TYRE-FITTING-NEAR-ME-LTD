import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { EmergencyButtons } from "@/components/emergency-tyre-fitting/cta";
import {
  SAFETY_INTRO,
  SAFETY_STEPS,
  EMERGENCIES,
  BENEFITS,
  BENEFITS_NOTE_PREFIX,
  BENEFITS_NOTE_SUFFIX,
  PROCESS_STEPS,
  RESPONSE,
  REPAIR,
  PRICING,
  VEHICLES,
  VEHICLES_NOTE,
  NIGHTS,
  WHY_TILES,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/emergency-tyre-fitting-content";

/* ===========================================================================
   Section 2 - Stranded? Do these five things first (E-E-A-T flagship)
   Replaces the repair page's YES/NO eligibility block. Calm navy styling, not
   red, so the safety guidance never reads as panic. The list carries class
   "safety-steps" for the WebPage speakable schema.
   =========================================================================== */
export function SafetySteps() {
  return (
    <section className="section-pad bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          Stranded with a Flat? Do These Five Things First
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/90">{SAFETY_INTRO}</p>

        <ol className="safety-steps mt-10 space-y-4">
          {SAFETY_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:gap-6 sm:p-7"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent font-heading text-xl font-extrabold text-accent-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold">
                  <Icon name={step.icon} className="h-5 w-5 text-[var(--color-whatsapp)]" />
                  {step.title}
                </h3>
                <p className="mt-1.5 text-primary-foreground/85">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Tyre emergencies we handle (icon card grid)
   =========================================================================== */
export function Emergencies() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="What we handle"
          title="Tyre Emergencies Handled 24/7"
          subtitle="Every common roadside failure is covered, day or night, with the correct tyre sized from your registration before the van sets off."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {EMERGENCIES.map((e) => (
            <div key={e.name} className="surface-card surface-card-hover flex h-full flex-col p-5 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={e.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold text-primary">{e.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What you get (trust tile grid) + repair-page link
   =========================================================================== */
export function WhatYouGet() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="What You Get with Emergency Tyre Fitting" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.stat + b.body} className="surface-card flex h-full flex-col p-5 text-center sm:p-7">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-2xl font-extrabold text-primary">{b.stat}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="callout mx-auto mt-10 max-w-3xl text-center leading-relaxed text-muted-foreground">
          {BENEFITS_NOTE_PREFIX}
          <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent hover:underline">
            mobile tyre repair
          </Link>
          {BENEFITS_NOTE_SUFFIX}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How the emergency callout works (drives HowTo schema)
   =========================================================================== */
export function Process() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How the Emergency Callout Works" />
        <ol className="mt-12 space-y-8">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 sm:gap-6">
              <div className="flex flex-col items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent font-heading text-lg font-bold text-accent-foreground">
                  {i + 1}
                </span>
                {i < PROCESS_STEPS.length - 1 && (
                  <span className="mt-1 w-px grow bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
                  <Icon name={step.icon} className="h-5 w-5 text-accent" />
                  Step {i + 1}: {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 6 - Response times across the UK (prose)
   =========================================================================== */
export function ResponseTimes() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {RESPONSE.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {RESPONSE.paras.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - Repair or replace at the roadside (prose + repair link)
   =========================================================================== */
export function RepairOrReplace() {
  const phrase = "mobile tyre repair";
  const [before, after] = REPAIR.linkLine.split(phrase);
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {REPAIR.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>{REPAIR.intro}</p>
          <p className="callout font-medium text-primary">
            {before}
            <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent hover:underline">
              {phrase}
            </Link>
            {after}
          </p>
          <p>{REPAIR.outro}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Emergency pricing (sitewide call-out claim)
   =========================================================================== */
export function Pricing() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title={PRICING.heading} />
        <p className="pricing-summary mx-auto mt-6 max-w-3xl text-center font-heading text-xl font-extrabold text-primary sm:text-2xl">
          {PRICING.lead}
        </p>

        <div className="mx-auto mt-10 max-w-3xl surface-card p-5 sm:p-7">
          <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
            <Check className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
            The £20 flat fitting fee covers
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {PRICING.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="callout mx-auto mt-6 max-w-3xl leading-relaxed text-muted-foreground">
          {PRICING.closing}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Vehicles covered (list)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles Covered by Emergency Callout
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each vehicle class is fitted, balanced and torqued to its own specification on every callout.
          </p>
        </div>

        <div className="lg:col-span-3">
          <ul className="grid gap-3 sm:grid-cols-2">
            {VEHICLES.map((v) => (
              <li key={v.label} className="flex items-start gap-2.5 surface-card p-4 text-sm">
                <Icon name={v.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{v.label}</span>
              </li>
            ))}
          </ul>
          <p className="callout mt-5 text-sm text-muted-foreground">
            {VEHICLES_NOTE}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Nights, weekends and bank holidays (prose)
   =========================================================================== */
export function Nights() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {NIGHTS.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>{NIGHTS.body}</p>
          <p className="callout font-medium text-primary">
            {NIGHTS.pricing}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Why drivers choose us (stat tiles).
   Brand mention 1 in H2, brand mention 2 in the lead line.
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Stranded Drivers Call Tyre Fitting Near Me Ltd" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd is the national 24/7 emergency provider that publishes its prices, where
          regional rivals stop at the county line and keep the cost off the page.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {WHY_TILES.map((tile) => (
            <div key={tile.stat + tile.label} className="surface-card p-5 text-center sm:p-7">
              <p className="font-heading text-2xl font-extrabold text-accent sm:text-3xl">{tile.stat}</p>
              <p className="mt-2 text-sm text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-medium text-primary">
          Roadside work follows National Highways guidance, with safe positioning set before any tool comes out.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Coverage across the UK (area cards)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Emergency Tyre Fitting Coverage Across the UK" subtitle={AREAS_INTRO} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {AREAS.map((area) => (
            <div key={area.region} className="surface-card surface-card-hover flex h-full flex-col p-5 sm:p-7">
              <div className="flex items-start gap-2">
                <Icon name="map-pin" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <h3 className="font-heading text-lg font-bold text-primary">{area.region}</h3>
              </div>
              <span className="mt-3 inline-block w-fit rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                {area.featured}
              </span>
              <p className="mt-3 text-sm text-muted-foreground">{area.cities.join(", ")}</p>
              <Link href={area.href} className="mt-4 text-sm font-semibold text-accent hover:underline">
                View {area.region} &rarr;
              </Link>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          City pages carry local response times and the nearest fitter. See our{" "}
          <Link href="/areas" className="font-medium text-accent hover:underline">areas we cover</Link>{" "}
          for your exact postcode.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 13 - Illustrative scenario (timestamps card)
   =========================================================================== */
export function CaseStudy() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="surface-card p-5 sm:p-8">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            {CASE_STUDY.label}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Emergency Tyre Fitting in Action
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/80">{CASE_STUDY.body}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-6 text-center">
            {CASE_STUDY.stats.map((s) => (
              <div key={s.time}>
                <p className="font-heading text-xl font-extrabold text-accent sm:text-2xl">{s.time}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-muted-foreground">{CASE_STUDY.meta}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 14 - Call now (phone-first close). Internal link to the planned
   mobile tyre fitting page. Brand mention 3 of 3 plus the closing 2026 anchor.
   =========================================================================== */
export function CallNow() {
  return (
    <section data-section="final-cta" className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-20">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          Get an Emergency Tyre Fitter Now
        </h2>
        <p className="max-w-2xl text-lg text-primary-foreground/90">
          Call or WhatsApp, and the line is answered 24/7. Your location plus your registration is all the
          dispatcher needs. Not an emergency? Use the form, or plan ahead with{" "}
          <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
            mobile tyre fitting
          </Link>{" "}
          for a booked appointment. Dispatching across UK mainland postcodes from Tyre Fitting Near Me Ltd.
        </p>
        <EmergencyButtons className="w-full justify-center sm:w-auto" />
      </div>
    </section>
  );
}
