import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { ComparisonBlock } from "@/components/sections/comparison-block";
import {
  DOWNTIME,
  LOAD_RATING_INTRO,
  LOAD_RATING_YES,
  LOAD_RATING_NO,
  LOAD_RATING_CLOSE,
  BENEFITS,
  PROCESS_STEPS,
  FLEET,
  MODELS,
  MODELS_NOTE,
  TYRE_TIERS,
  TYRE_OPTIONS_NOTE,
  COST_INCLUDED,
  COST_CALLOUT,
  WHY_TILES,
  CHECKLIST,
  CHECKLIST_NOTE,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/van-tyre-fitting-content";

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
   Section 2 - Why van downtime costs more than the tyres (prose)
   =========================================================================== */
export function WhyDowntime() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {DOWNTIME.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {DOWNTIME.paras.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Van tyres are not car tyres (SIGNATURE comparison)
   Two-column C-rated (green) vs standard car tyre on a van (red). Crawlable
   HTML, carrying class "load-rating-explainer" for the WebPage speakable schema.
   =========================================================================== */
export function LoadRating() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Load ratings explained"
          title="Van Tyres Are Not Car Tyres: Load Ratings Explained"
          subtitle={LOAD_RATING_INTRO}
        />

        <ComparisonBlock
          className="load-rating-explainer mt-10"
          left={{ title: "C-Rated Van Tyre", items: LOAD_RATING_YES }}
          right={{ title: "Standard Car Tyre on a Van", items: LOAD_RATING_NO }}
          rightMode="cross"
          caption={LOAD_RATING_CLOSE}
        />
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What you get (trust tile grid) + emergency-page link
   =========================================================================== */
export function WhatYouGet() {
  return (
    <section className="section-pad bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-3xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl">
          What You Get with Mobile Van Tyre Fitting
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.stat + b.body} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:p-7">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-2xl font-extrabold">{b.stat}</p>
              <p className="mt-2 text-sm text-primary-foreground/80">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-primary-foreground/90">
          A van that fails on the road reaches the same fitter through our{" "}
          <Link href="/services/emergency-tyre-fitting" className="font-semibold text-accent hover:underline">
            emergency tyre fitting
          </Link>{" "}
          service, with a 30 to 60 minute typical response and priority for fleet account vans.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How van tyre fitting works (drives HowTo schema)
   =========================================================================== */
export function Process() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How Mobile Van Tyre Fitting Works" />
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
   Section 6 - Fleet tyre fitting (distinct navy B2B card + mini-CTA)
   =========================================================================== */
export function Fleet() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg sm:p-12">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground/90">
            For fleet managers
          </span>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            {FLEET.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">{FLEET.intro}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {FLEET.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-whatsapp)]" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href={FLEET.ctaHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-heading text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              {FLEET.ctaLabel}
            </Link>
            <p className="text-sm text-primary-foreground/80">{FLEET.phoneLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - Vans and models covered (tag grid)
   =========================================================================== */
export function ModelsCovered() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Vans Covered up to 3.5 Tonnes" />
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {MODELS.map((model) => (
            <li
              key={model}
              className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm"
            >
              <Icon name="bus" className="h-4 w-4 text-accent" />
              {model}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-muted-foreground">
          {MODELS_NOTE}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Van tyre options (three commercial tiers)
   =========================================================================== */
export function TyreOptions() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Commercial Van Tyres Fitted: Premium to Budget" />
        <div className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-3">
          {TYRE_TIERS.map((t) => (
            <div key={t.tier} className="surface-card flex h-full flex-col p-5 sm:p-7">
              <h3 className="font-heading text-xl font-bold text-primary">{t.tier}</h3>
              <p className="mt-1 text-sm font-semibold text-accent">{t.brands}</p>
              <p className="mt-3 text-sm text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="callout mx-auto mt-8 max-w-3xl leading-relaxed text-muted-foreground">
          {TYRE_OPTIONS_NOTE}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Pricing
   =========================================================================== */
export function Costs() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Van Tyre Fitting Cost and What's Included" />
        <p className="pricing-summary mt-6 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
          £20 flat fitting fee per tyre
          <span className="mt-1 block text-lg font-bold text-accent">
            Tyre priced by size, tier and load rating, quoted before booking
          </span>
        </p>

        <div className="mx-auto mt-10 max-w-3xl surface-card p-5 sm:p-7">
          <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
            <Check className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
            The £20 fitting fee covers
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {COST_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="callout mx-auto mt-6 max-w-3xl">
          <h3 className="font-heading text-lg font-bold text-primary">{COST_CALLOUT.heading}</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{COST_CALLOUT.body}</p>
          <p className="mt-3 font-semibold text-primary">{COST_CALLOUT.freshness}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Emergency van callouts (bridge, links to emergency + repair)
   =========================================================================== */
export function EmergencyBridge() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Van Breakdown? Emergency Tyre Fitting 24/7
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A loaded van with a blowout on a delivery run gets the emergency treatment, with a 30 to 60
            minute typical response, 24 hours a day, 365 days a year.
          </p>
          <p>
            A roadside repair is offered where the tyre passes the BS AU 159 checks through our{" "}
            <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent hover:underline">
              mobile tyre repair
            </Link>{" "}
            service, and a replacement is fitted at the roadside where the damage fails assessment. See the{" "}
            <Link href="/services/emergency-tyre-fitting" className="font-semibold text-accent hover:underline">
              emergency tyre fitting
            </Link>{" "}
            page for the full callout process. Fleet account vans get priority dispatch.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Why operators choose us (stat tiles).
   Brand mention 1 in H2, brand mention 2 in the lead line.
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Van Operators Choose Tyre Fitting Near Me Ltd" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd is a dedicated van and fleet specialist, where national chains fold vans
          into a generic car-fitting page with no load-rating detail at all.
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
          Depot and site fitting kills the downtime a garage visit creates, backed by a 12-month workmanship
          guarantee.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Before the fitter arrives (checklist)
   =========================================================================== */
export function Checklist() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          What to Have Ready Before the Fitter Arrives
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
        <p className="callout mt-8 leading-relaxed text-muted-foreground">
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
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Van Tyre Fitting Coverage Across the UK" subtitle={AREAS_INTRO} />
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
   Section 14 - Illustrative scenario (timestamps card)
   =========================================================================== */
export function CaseStudy() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="surface-card p-5 sm:p-8">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            {CASE_STUDY.label}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Van Tyre Fitting in Action
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
