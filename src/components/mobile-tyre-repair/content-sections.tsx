import Link from "next/link";
import { Check, X } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  ELIGIBLE_YES,
  ELIGIBLE_NO,
  BENEFITS,
  PROCESS_STEPS,
  AVAILABILITY,
  CAUSES_INTRO,
  CAUSES,
  VEHICLES,
  CUSTOMERS,
  VEHICLES_NOTE,
  RUNFLAT_NOTE,
  COST_INCLUDED,
  COST_SEPARATE,
  COST_CALLOUT,
  WHY_TILES,
  CHECKLIST,
  CHECKLIST_MOTORWAY,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/mobile-tyre-repair-content";

/* ---------------------------------------------------------------------------
   Linkify the "locking wheel nut key" phrase inside a checklist title, pointing
   at the locking wheel nut removal service. Returns the plain string unchanged
   when the phrase is absent so other checklist items render normally.
   --------------------------------------------------------------------------- */
function renderChecklistTitle(title: string) {
  const phrase = "locking wheel nut key";
  const idx = title.toLowerCase().indexOf(phrase);
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + phrase.length);
  const after = title.slice(idx + phrase.length);
  return (
    <>
      {before}
      <Link
        href="/services/locking-wheel-nut-removal"
        className="font-medium text-accent hover:underline"
      >
        {match}
      </Link>
      {after}
    </>
  );
}

/* ===========================================================================
   Section 2 - Why driving on a puncture costs more than the repair
   (clone of the fitting page's WhyGarage prose block)
   =========================================================================== */
export function WhyDriving() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Why Driving on a Puncture Costs More Than the Repair
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            Driving on a punctured or deflating tyre grinds the sidewall, destroys the
            inner liner, and converts a [£XX] repair into a full tyre replacement. A flat
            tyre dragged even a short distance overheats the rubber and damages the
            structure beyond repair. UK Construction and Use Regulations classify a tyre
            below the 1.6mm legal tread limit as unroadworthy, and a deflated or damaged
            tyre carries the same exposure to fines and penalty points.
          </p>
          <p>
            A slow puncture left for weeks does the same damage in slow motion, weakening
            the casing every mile. Mobile repair is the intervention that arrives before
            the damage spreads, at your door, your workplace or the roadside. Drivers in
            2026 expect a repair-first service rather than an automatic replacement, and a
            tyre that meets BS AU 159 deserves a repair, not a sale.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Eligibility (SIGNATURE VISUAL)
   Replaces the fitting page's "Problems Solved On-Site" card grid with a
   two-column YES (Repairable) / NO (Not repairable) layout.
   =========================================================================== */
export function Eligibility() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="BS AU 159"
          title="Can Your Puncture Be Repaired? The BS AU 159 Rules in Plain English"
          subtitle="British Standard BS AU 159 defines exactly when a tyre repair is safe and legal, and every callout starts with this assessment."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Repairable (green) */}
          <div className="rounded-2xl border border-[var(--color-success)]/30 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[var(--color-success)]/20 pb-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-success)]/10 text-[var(--color-success)]">
                <Check className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-bold text-[var(--color-success)]">Repairable</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {ELIGIBLE_YES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not repairable (red) */}
          <div className="rounded-2xl border border-destructive/30 bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-destructive/20 pb-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <X className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-heading text-xl font-bold text-destructive">Not repairable</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {ELIGIBLE_NO.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-l-4 border-l-accent bg-card p-6 text-center leading-relaxed text-foreground/80">
          Where the tyre fails assessment, the repair fee is waived against a replacement
          fitted on the same visit through our{" "}
          <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
            mobile tyre fitting
          </Link>{" "}
          service.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What you get (trust tile grid, clone of fitting Benefits)
   =========================================================================== */
export function WhatYouGet() {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          What You Get with Every Mobile Puncture Repair
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.stat + b.body}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-2xl font-extrabold">{b.stat}</p>
              <p className="mt-2 text-sm text-primary-foreground/80">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How the process works (5-step timeline, clone of fitting Process)
   =========================================================================== */
export function Process() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How the Mobile Puncture Repair Process Works" />
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
   Section 6 - 24/7 availability (clone of fitting Availability)
   =========================================================================== */
export function Availability() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="24/7 Mobile Puncture Repair, Including Roadside" />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <dl className="divide-y divide-border rounded-2xl border bg-card p-2 shadow-sm">
            {AVAILABILITY.hours.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
                <dt className="font-heading font-bold text-primary sm:w-2/5">{row.label}</dt>
                <dd className="text-sm text-muted-foreground sm:w-3/5">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-2xl border border-l-4 border-l-accent bg-card p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-primary">{AVAILABILITY.pricingHeading}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{AVAILABILITY.pricingBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - Slow punctures, nails, screws and pressure loss (card grid,
   clone of fitting SpecialistServices)
   =========================================================================== */
export function Causes() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Common causes"
          title="Slow Punctures, Nails, Screws and Pressure Loss"
          subtitle={CAUSES_INTRO}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAUSES.map((c) => (
            <div key={c.name} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">{c.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Sealant kits vs permanent repair (PROSE, replaces the fitting
   page's tyre-brands tier grid slot)
   =========================================================================== */
export function SealantVsRepair() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Tyre Sealant Kits vs a Permanent Plug-Patch Repair
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            Emergency sealant kits and aerosol foams are temporary get-home measures, not
            repairs. A sealant fills the tyre with liquid latex that plugs the leak for a
            short distance at low speed. Certain sealants coat the inner liner and prevent
            the vulcanised bond a permanent patch needs, turning a repairable tyre into a
            replacement.
          </p>
          <p className="rounded-2xl border border-l-4 border-l-accent bg-card p-5 font-medium text-primary">
            Use a sealant only when stranded with no alternative, then book a professional
            assessment immediately and tell the technician sealant was used.
          </p>
          <p>
            String-plug external repairs are the other false economy. A string plug skips
            the internal inspection and fails BS AU 159 outright. A permanent plug-patch
            repair seals the puncture channel and the inner liner together, and lasts the
            legal life of the tyre.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Costs (pricing two-column block, clone of fitting Costs)
   =========================================================================== */
export function Costs() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Mobile Puncture Repair Cost and What's Included" />
        <p className="pricing-summary mt-6 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
          [£XX] per puncture repair
          <span className="mt-1 block text-lg font-bold text-accent">
            Fee waived against a replacement if the tyre fails assessment
          </span>
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
              <Check className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
              What&apos;s included
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COST_INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-primary">Quoted separately</h3>
            <ul className="mt-4 space-y-2.5">
              {COST_SEPARATE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-l-4 border-l-accent bg-secondary p-6">
          <h3 className="font-heading text-lg font-bold text-primary">{COST_CALLOUT.heading}</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{COST_CALLOUT.body}</p>
          <p className="mt-3 font-semibold text-primary">{COST_CALLOUT.freshness}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Vehicles covered (clone of fitting VehiclesDrivers)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles Covered by Mobile Puncture Repair
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each vehicle class is torqued and inflated to its own specification, applied
            correctly on every callout.
          </p>
          <span className="mt-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary/5 text-primary">
            <Icon name="truck" className="h-8 w-8" />
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">Vehicles we repair</h3>
            <ul className="mt-4 space-y-2.5">
              {VEHICLES.map((v) => (
                <li key={v.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={v.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{v.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-card p-4 text-sm text-muted-foreground">{VEHICLES_NOTE}</p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">Drivers we serve</h3>
            <ul className="mt-4 space-y-2.5">
              {CUSTOMERS.map((c) => (
                <li key={c.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={c.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl border border-l-4 border-l-accent bg-card p-4 text-sm text-muted-foreground">
              {(() => {
                const phrase = "Run-flat tyres";
                const idx = RUNFLAT_NOTE.indexOf(phrase);
                if (idx === -1) return RUNFLAT_NOTE;
                return (
                  <>
                    <Link
                      href="/services/run-flat-tyre"
                      className="font-medium text-accent hover:underline"
                    >
                      {phrase}
                    </Link>
                    {RUNFLAT_NOTE.slice(idx + phrase.length)}
                  </>
                );
              })()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Why drivers choose us (stat tiles, clone of fitting WhyChoose)
   Brand mention 1 in H2, brand mention 2 in the lead line.
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Drivers Across the UK Choose Tyre Fitting Near Me Ltd" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd combines true round-the-clock cover with
          authority-level repair standards.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {WHY_TILES.map((tile) => (
            <div key={tile.stat + tile.label} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <p className="font-heading text-2xl font-extrabold text-accent sm:text-3xl">{tile.stat}</p>
              <p className="mt-2 text-sm text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-medium text-primary">
          Every repair includes wheel rebalancing and pressure correction as standard.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Before the technician arrives (checklist, clone of fitting)
   =========================================================================== */
export function Checklist() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          What to Have Ready Before the Technician Arrives
        </h2>
        <ol className="mt-8 space-y-5">
          {CHECKLIST.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-heading text-sm font-bold text-accent-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-heading font-bold text-primary">{renderChecklistTitle(item.title)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 rounded-2xl border border-l-4 border-l-primary bg-card p-6 leading-relaxed text-muted-foreground">
          {CHECKLIST_MOTORWAY}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 13 - Coverage across the UK (area cards, clone of fitting Areas)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Mobile Puncture Repair Coverage Across the UK" subtitle={AREAS_INTRO} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area) => (
            <div key={area.region} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
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
   Section 14 - Illustrative scenario (timestamps card, clone of fitting Case)
   =========================================================================== */
export function CaseStudy() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            {CASE_STUDY.label}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Mobile Puncture Repair in Action
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
