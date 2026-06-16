import Link from "next/link";
import { Check, X } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  COMPARE_RUNFLAT,
  COMPARE_CONVENTIONAL,
  RUNFLAT_RULES,
  BENEFITS,
  PROCESS_STEPS,
  RUNFLAT_MARKINGS,
  CHECKLIST,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/run-flat-tyre-content";

/* ===========================================================================
   Section 2 - Why a punctured run-flat usually needs replacing
   Prose lead + "Run-Flat vs Conventional Tyre" decision-aid two-column block.
   =========================================================================== */
export function WhyReplace() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Why a Punctured Run-Flat Usually Needs Replacing, Not Repairing
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p className="replacement-only">
            A run-flat that has carried the vehicle on a deflated tyre has stressed its
            reinforced sidewall, so the internal structure is often compromised and
            manufacturer guidance is replacement rather than repair. A conventional puncture
            is a different case and is often repairable through{" "}
            <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent hover:underline">
              mobile tyre repair
            </Link>
            . A run-flat puncture is usually a new tyre, and the service is the replacement,
            brought to the vehicle.
          </p>
          <p>
            The driver with a run-flat warning is not choosing between a cheap repair and a
            replacement, the tyre construction has already decided, and the only question is
            who fits the correct replacement and where. Run-flat fitment on modern cars has
            grown through 2026, so the correct-spec replacement matters more than ever.
          </p>
        </div>

        {/* Run-Flat vs Conventional decision aid (neutral, not a sales pitch) */}
        <div className="mt-10">
          <h3 className="text-center font-heading text-xl font-bold text-primary sm:text-2xl">
            Run-Flat vs Conventional Tyre
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            A neutral decision aid. Neither tyre is wrong, the right choice depends on the
            vehicle and how it is set up.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Run-flat */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b pb-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary">
                  <Icon name="shield-check" className="h-6 w-6" />
                </span>
                <h4 className="font-heading text-xl font-bold text-primary">Run-Flat</h4>
              </div>
              <ul className="mt-5 space-y-3">
                {COMPARE_RUNFLAT.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conventional */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b pb-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary">
                  <Icon name="circle-dot" className="h-6 w-6" />
                </span>
                <h4 className="font-heading text-xl font-bold text-primary">Conventional</h4>
              </div>
              <ul className="mt-5 space-y-3">
                {COMPARE_CONVENTIONAL.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - The run-flat rules (PROMINENT ICON CARD GRID, authority centre)
   class "run-flat-rules" for the speakable schema to target.
   =========================================================================== */
export function RunFlatRules() {
  return (
    <section className="run-flat-rules bg-primary py-16 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          The Run-Flat Rules That Keep You Safe and Legal
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-primary-foreground/85">
          Run-flats carry rules conventional tyres do not, and getting them wrong is
          dangerous, so here is what a run-flat specialist checks.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RUNFLAT_RULES.map((rule) => (
            <div
              key={rule.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={rule.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold">{rule.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">
                {rule.title === "A working TPMS is mandatory" ? (
                  <>
                    {rule.body}{" "}
                    <Link
                      href="/services/tpms-service"
                      className="font-semibold text-accent hover:underline"
                    >
                      See our TPMS service
                    </Link>
                    .
                  </>
                ) : (
                  rule.body
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What you get with mobile run-flat replacement (trust tile grid)
   =========================================================================== */
export function WhatYouGet() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="What You Get with Mobile Run-Flat Replacement" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.stat + b.body} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-xl font-extrabold text-primary">{b.stat}</p>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-muted-foreground">
          A 30 to 60 minute typical{" "}
          <Link href="/services/emergency-tyre-fitting" className="font-medium text-accent hover:underline">
            emergency response
          </Link>{" "}
          for run-flat warnings, alongside standard{" "}
          <Link href="/services/mobile-tyre-fitting" className="font-medium text-accent hover:underline">
            mobile tyre fitting
          </Link>{" "}
          at the home, work, or roadside.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How mobile run-flat replacement works (5-step timeline, HowTo)
   =========================================================================== */
export function Process() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How Mobile Run-Flat Tyre Replacement Works" />
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
   Section 6 - Should you replace run-flats with conventional tyres? (prose)
   =========================================================================== */
export function SwitchAdvice() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Should You Replace Run-Flats With Conventional Tyres?
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A common question on BMW, MINI, and Mercedes is whether to switch from run-flats
            to conventional tyres, and the honest answer has two sides. Switching to
            conventional costs less per tyre and rides softer. Switching loses the run-flat
            safety margin of driving on after a puncture, changes the ride the suspension was
            tuned for, requires a full matched set rather than a single tyre, and means
            carrying a separate breakdown plan such as a sealant kit or cover. Staying with
            run-flats keeps the original safety design and the no-spare convenience at a
            higher tyre cost. The service fits either, with the correct spec, and gives
            straight guidance rather than a sales push.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - Vehicles and run-flat types covered (prose + markings tag row)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Vehicles and Run-Flat Types Covered
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            Cars, vans up to 3.5 tonnes, 4x4s, and SUVs. BMW, MINI, and Mercedes ship
            run-flats as standard, and any vehicle supplied with them is covered. Every
            run-flat marking is handled, the maker abbreviations for self-supporting
            construction. The correct marking is matched from the VRN, never guessed at the
            wheel.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Run-flat markings handled
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {RUNFLAT_MARKINGS.map((mark) => (
              <li
                key={mark}
                className="rounded-full border border-accent/30 bg-card px-4 py-1.5 text-sm font-bold text-primary shadow-sm"
              >
                {mark}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Run-flat tyres fitted: premium and mid-range (prose)
   Tyre-only "from" anchor, benchmarked against UK budget run-flats. The £20
   fitting fee is charged separately (see Section 9).
   =========================================================================== */
export function TyresFitted() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Run-Flat Tyres Fitted: Premium and Mid-Range
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            Premium run-flat ranges from Michelin, Continental, Pirelli, Bridgestone, and
            Goodyear, plus mid-range run-flat options, all manufacturer-approved and matched
            to the vehicle. Summer, winter, and all-season run-flats are available where the
            size exists. Every option carries the correct run-flat marking and load index
            confirmed against the VRN before fitting. All tyres are sourced from authorised
            UK distributors with the manufacturer warranty preserved.
          </p>
          <p className="rounded-2xl border border-l-4 border-l-accent bg-card p-5 font-medium text-primary">
            Run-flats are fitted from £90, priced live from the VRN.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Run-flat tyre replacement cost (prose, pricing-summary)
   =========================================================================== */
export function Cost() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Run-Flat Tyre Replacement Cost
        </h2>
        <p className="pricing-summary mt-6 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
          £20 flat fitting fee per tyre
          <span className="mt-1 block text-lg font-bold text-accent">
            The run-flat itself priced live from the VRN
          </span>
        </p>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            Run-flats cost more than conventional tyres because the reinforced
            self-supporting sidewall costs more to build. The £20 flat fitting fee per tyre
            covers travel, removal, fitment, balancing, valve, and disposal. The run-flat
            itself is priced by size, brand, and load rating, quoted in full from the VRN
            before booking, with nothing added after. Matched-pair replacement is quoted
            together. No call-out fee applies within standard hours. A drive-in tyre shop
            sells the tyre cheaper as a catalogue line but costs the garage trip and a
            compromised drive on the run-on tyre to reach it. Run-flat pricing is quoted live
            from the VRN through 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Run-flat warning on? Emergency replacement 24/7 (prose)
   =========================================================================== */
export function Emergency() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Run-Flat Warning On? Emergency Replacement 24/7
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A run-flat warning means the run-on clock has started, so replacement runs
            24/7/365 with a 30 to 60 minute typical response through{" "}
            <Link href="/services/emergency-tyre-fitting" className="font-semibold text-accent hover:underline">
              emergency tyre fitting
            </Link>
            . The technician brings the correct run-flat to the roadside or home before the
            50-mile limit is reached. Driving the full run-on distance to a garage is the
            risk the mobile service removes.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Why drivers choose us (stat-free prose + points)
   Brand mention 1 in H2, brand mention 2 in opening line.
   =========================================================================== */
export function WhyChoose() {
  const points = [
    "Correct manufacturer-approved run-flat matched from the VRN",
    "Run-flat-specific fitting tooling for the stiff sidewall",
    "TPMS checked and reset as part of the work",
    "Honest guidance on switching to conventional rather than a sales push",
    "Matched-pair replacement",
    "£20 transparent fitting fee",
    "24/7 emergency cover",
    "12-month workmanship guarantee",
    "UK mainland coverage",
  ];
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Drivers Choose Tyre Fitting Near Me Ltd for Run-Flats" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd is the only mobile run-flat specialist where rivals sell a
          catalogue and make you drive in.
        </p>
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 rounded-2xl border bg-card p-4 text-sm shadow-sm"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Before the fitter arrives (checklist)
   Anchors "locking wheel nut key" -> /services/locking-wheel-nut-removal.
   =========================================================================== */
const LOCK_NUT_TITLE = "Keep the locking wheel nut key in the vehicle so the wheels come off";
const LOCK_NUT_PHRASE = "locking wheel nut key";

function renderChecklistTitle(title: string) {
  if (title !== LOCK_NUT_TITLE) return title;
  const [before, after] = title.split(LOCK_NUT_PHRASE);
  return (
    <>
      {before}
      <Link href="/services/locking-wheel-nut-removal" className="text-accent hover:underline">
        {LOCK_NUT_PHRASE}
      </Link>
      {after}
    </>
  );
}

export function Checklist() {
  return (
    <section className="bg-background py-12 sm:py-20">
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
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 13 - Coverage across the UK (area cards, reuse AREAS)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Run-Flat Tyre Replacement Coverage Across the UK" subtitle={AREAS_INTRO} />
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
            Run-Flat Replacement in Action
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/80">{CASE_STUDY.body}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-6 text-center">
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
