import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  SIGNS_INTRO,
  SIGNS,
  SIGNS_HONESTY,
  VS_ALIGNMENT_INTRO,
  VS_ALIGNMENT_ROWS,
  VS_ALIGNMENT_CLOSE,
  BENEFITS,
  PROCESS_STEPS,
  AVAILABILITY,
  TRIGGERS_INTRO,
  TRIGGERS,
  TRIGGERS_EV,
  DYNAMIC,
  VEHICLES,
  CUSTOMERS,
  VEHICLES_NOTE,
  EV_NOTE,
  COST_INCLUDED,
  COST_SEPARATE,
  COST_CALLOUT,
  WHY_TILES,
  CHECKLIST,
  CHECKLIST_NOTE,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/wheel-balancing-content";

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
   Section 2 - Signs your wheels need balancing (SIGNATURE icon card grid)
   Replaces the repair page's WhyDriving prose slot with the diagnostic
   flagship: one icon card per symptom, six cards, plus the honesty note.
   =========================================================================== */
export function SignsGrid() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Diagnose the vibration"
          title="Signs Your Wheels Need Balancing"
          subtitle={SIGNS_INTRO}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SIGNS.map((s) => (
            <div key={s.name} className="surface-card surface-card-hover flex h-full flex-col p-5 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl surface-card border-l-4 border-l-accent p-5 leading-relaxed text-foreground/80 sm:p-7">
          {SIGNS_HONESTY}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Wheel balancing vs wheel alignment (SIGNATURE comparison)
   Replaces the repair page's YES/NO eligibility block. Rendered as a real
   crawlable HTML table (the AI Overview target), styled as a two-column
   comparison card.
   =========================================================================== */
export function VsAlignment() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Two different faults"
          title="Wheel Balancing vs Wheel Alignment: The Difference"
          subtitle={VS_ALIGNMENT_INTRO}
        />

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden surface-card">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Wheel balancing compared with wheel alignment by symptom, wear pattern, cause and fix
              </caption>
              <thead>
                <tr className="border-b">
                  <th scope="col" className="p-4 font-heading text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <span className="sr-only">Attribute</span>
                  </th>
                  <th scope="col" className="border-l bg-accent/5 p-4 font-heading text-base font-bold text-accent">
                    Wheel Balancing
                  </th>
                  <th scope="col" className="border-l p-4 font-heading text-base font-bold text-primary">
                    Wheel Alignment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {VS_ALIGNMENT_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="p-4 align-top font-heading font-bold text-primary">
                      {row.label}
                    </th>
                    <td className="border-l bg-accent/5 p-4 align-top text-foreground/80">{row.balancing}</td>
                    <td className="border-l p-4 align-top text-foreground/80">{row.alignment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl surface-card border-l-4 border-l-accent p-5 text-center font-medium leading-relaxed text-primary sm:p-7">
          {VS_ALIGNMENT_CLOSE}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What you get (trust tile grid) + sibling-link reminder
   =========================================================================== */
export function WhatYouGet() {
  return (
    <section className="section-pad bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          What You Get with Mobile Wheel Balancing
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.stat + b.body}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:p-7"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-2xl font-extrabold">{b.stat}</p>
              <p className="mt-2 text-sm text-primary-foreground/80">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-5 text-center leading-relaxed text-primary-foreground/90 sm:p-7">
          Balancing comes free with every tyre fitted through{" "}
          <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
            mobile tyre fitting
          </Link>{" "}
          or every puncture repaired through{" "}
          <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent hover:underline">
            mobile tyre repair
          </Link>{" "}
          by our technicians, so book this standalone service when the wheels need balancing on their own.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How the process works (5-step timeline, drives HowTo schema)
   =========================================================================== */
export function Process() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How the Mobile Wheel Balancing Process Works" />
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
   Section 6 - 24/7 availability
   =========================================================================== */
export function Availability() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="24/7 Mobile Wheel Balancing Across the UK" />
        <div className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2 lg:items-start">
          <dl className="divide-y divide-border surface-card p-2">
            {AVAILABILITY.hours.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
                <dt className="font-heading font-bold text-primary sm:w-2/5">{row.label}</dt>
                <dd className="text-sm text-muted-foreground sm:w-3/5">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="surface-card border-l-4 border-l-accent p-5 sm:p-7">
            <h3 className="font-heading text-xl font-bold text-primary">{AVAILABILITY.pricingHeading}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{AVAILABILITY.pricingBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - When wheels need balancing (trigger list + EV note)
   =========================================================================== */
export function WhenToBook() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Triggers" title="When Wheels Need Balancing" subtitle={TRIGGERS_INTRO} />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
          {TRIGGERS.map((t) => (
            <li key={t} className="flex items-start gap-2.5 surface-card p-4 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-3xl surface-card border-l-4 border-l-accent p-5 leading-relaxed text-muted-foreground sm:p-7">
          {TRIGGERS_EV}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Dynamic balancing explained (prose, max-w-3xl)
   =========================================================================== */
export function DynamicBalancing() {
  return (
    <section className="section-pad bg-secondary">
      <div className="prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {DYNAMIC.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {DYNAMIC.paras.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Vehicles covered (two-column list)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles Covered by Mobile Wheel Balancing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each vehicle class is balanced, torqued and inflated to its own specification, applied
            correctly on every callout.
          </p>
          <span className="mt-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary/5 text-primary">
            <Icon name="truck" className="h-8 w-8" />
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">Vehicles we balance</h3>
            <ul className="mt-4 space-y-2.5">
              {VEHICLES.map((v) => (
                <li key={v.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={v.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{v.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">{VEHICLES_NOTE}</p>
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
            <p className="mt-5 rounded-xl border border-l-4 border-l-accent bg-secondary p-4 text-sm text-muted-foreground">
              {EV_NOTE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Costs (pricing two-column block + comparison callout)
   =========================================================================== */
export function Costs() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Mobile Wheel Balancing Cost and What's Included" />
        <p className="pricing-summary mt-6 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
          [£7.99] per wheel
          <span className="mt-1 block text-lg font-bold text-accent">[£XX] for all four wheels</span>
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="surface-card flex h-full flex-col p-5 sm:p-7">
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
          <div className="surface-card flex h-full flex-col p-5 sm:p-7">
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

        <div className="mt-6 surface-card border-l-4 border-l-accent p-5 sm:p-7">
          <h3 className="font-heading text-lg font-bold text-primary">{COST_CALLOUT.heading}</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{COST_CALLOUT.body}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Balancing is already free with our{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
              mobile tyre fitting
            </Link>{" "}
            and puncture repair.
          </p>
          <p className="mt-3 font-semibold text-primary">{COST_CALLOUT.freshness}</p>
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
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Drivers Across the UK Choose Tyre Fitting Near Me Ltd" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd is the balancing service that travels to the driver rather than the
          other way round, with calibrated digital dual-plane equipment on every van.
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
          Honest diagnosis follows when balancing is not the fix, with a 60-minute emergency target across
          UK-wide postcode coverage.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Before the technician arrives (checklist)
   =========================================================================== */
export function Checklist() {
  return (
    <section className="bg-background py-12 sm:py-20">
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
        <p className="mt-8 rounded-2xl border border-l-4 border-l-primary bg-secondary p-6 leading-relaxed text-muted-foreground">
          {CHECKLIST_NOTE}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 13 - Coverage across the UK (area cards)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Mobile Wheel Balancing Coverage Across the UK" subtitle={AREAS_INTRO} />
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
   Section 14 - Illustrative scenario (timestamps card)
   =========================================================================== */
export function CaseStudy() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            {CASE_STUDY.label}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Mobile Wheel Balancing in Action
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
