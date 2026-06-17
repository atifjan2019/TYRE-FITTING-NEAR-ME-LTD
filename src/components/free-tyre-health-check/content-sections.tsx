import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { ComparisonBlock } from "@/components/sections/comparison-block";
import {
  WEDGE,
  HONESTY,
  CHECKS_INTRO,
  CHECKS,
  CHECK_LEFT,
  CHECK_RIGHT,
  FIX,
  PROCESS_STEPS,
  WHY_MATTERS,
  VEHICLES,
  VEHICLES_NOTE,
  VEHICLES_CARAVAN_NOTE,
  WHY_TILES,
  CHECKLIST,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/free-tyre-health-check-content";

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
   Section 2 - The wedge: a free check that comes to you (prose block)
   =========================================================================== */
export function Wedge() {
  return (
    <section className="section-pad bg-background">
      <div className="prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {WEDGE.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {WEDGE.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Honesty (the trust engine). Wrapper carries .honest-promise for
   the WebPage speakable schema.
   =========================================================================== */
export function Honesty() {
  return (
    <section className="section-pad bg-secondary">
      <div className="honest-promise prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {HONESTY.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {HONESTY.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What the check covers (six-item icon card grid). Wrapper carries
   .what-we-check for the WebPage speakable schema.
   =========================================================================== */
export function ChecksGrid() {
  return (
    <section className="section-pad bg-background">
      <div className="what-we-check mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Six-point inspection"
          title="What the Free Tyre Health Check Covers"
          subtitle={CHECKS_INTRO}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {CHECKS.map((c) => (
            <div key={c.name} className="surface-card flex h-full flex-col p-5 sm:p-7">
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
   Signature visual - What We Check vs Why It Matters. Informative, not scary:
   green ticks on the left "We Check" column, neutral dashes on the right "Why
   It Matters" column, no red crosses and no "Recommended" pill. Crawlable HTML.
   =========================================================================== */
export function CheckVsMatter() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="What it means for you"
          title="What We Check, and Why It Matters"
          subtitle="Each point on the inspection answers a real safety, legal or running-cost question, recorded in plain terms on the written report."
        />
        <ComparisonBlock
          className="mt-10"
          left={{ title: "We check", items: CHECK_LEFT }}
          right={{ title: "Why it matters", items: CHECK_RIGHT }}
          rightMode="dash"
          recommendedPill={false}
        />
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - Fixed on the spot, only if you want it (distinct soft card, no
   hard CTA). Replaces the repair page's paid pricing block.
   =========================================================================== */
export function FixOnTheSpot() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Optional, no pressure" title={FIX.heading} />

        <div className="surface-card mt-10 p-5 sm:p-8">
          <p className="text-lg leading-relaxed text-foreground/80">{FIX.intro}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {FIX.options.map((o) => (
              <li
                key={o.label}
                className="flex flex-col gap-2 rounded-xl border border-[rgba(11,23,54,0.08)] bg-secondary/50 p-4"
              >
                <Check className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
                <span className="text-sm font-medium text-foreground">{o.label}</span>
                <Link href={o.href} className="text-sm font-semibold text-accent hover:underline">
                  {o.anchor} &rarr;
                </Link>
              </li>
            ))}
          </ul>

          <div className="callout mt-6">
            <p className="leading-relaxed text-muted-foreground">{FIX.price}</p>
            <p className="mt-3 font-semibold text-primary">{FIX.reassurance}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 6 - How the free check works (5-step timeline)
   =========================================================================== */
export function Process() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How the Free Tyre Health Check Works" />
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
   Section 7 - Why a regular tyre check matters (prose, no fear-mongering)
   =========================================================================== */
export function WhyMatters() {
  return (
    <section className="section-pad bg-background">
      <div className="prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          {WHY_MATTERS.heading}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {WHY_MATTERS.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Vehicles covered (caravan note links to caravan fitting)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles Covered by the Free Check
          </h2>
          <p className="mt-4 text-muted-foreground">
            The same six-point inspection applies whatever the vehicle, with the report set to the
            correct pressures for the make and load.
          </p>
        </div>

        <div className="lg:col-span-3">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {VEHICLES.map((v) => (
              <li key={v.label} className="flex items-start gap-2.5 text-sm">
                <Icon name={v.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{v.label}</span>
              </li>
            ))}
          </ul>
          <p className="surface-card mt-5 p-4 text-sm text-muted-foreground">{VEHICLES_NOTE}</p>
          <p className="callout mt-4 text-sm text-muted-foreground">
            {(() => {
              const phrase = "caravan and motorhome tyre fitting";
              const idx = VEHICLES_CARAVAN_NOTE.indexOf(phrase);
              if (idx === -1) return VEHICLES_CARAVAN_NOTE;
              return (
                <>
                  {VEHICLES_CARAVAN_NOTE.slice(0, idx)}
                  <Link
                    href="/services/caravan-tyre-fitting"
                    className="font-medium text-accent hover:underline"
                  >
                    {phrase}
                  </Link>
                  {VEHICLES_CARAVAN_NOTE.slice(idx + phrase.length)}
                </>
              );
            })()}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Why drivers choose us (stat tiles). Brand mention 1 in H2,
   brand mention 2 in the lead line.
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Drivers Choose Tyre Fitting Near Me Ltd" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd runs a genuinely free mobile check that comes to the driver,
          with an honest report and no pressure to buy.
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
          A free mobile check that comes to you, where other free checks make you book and drive in.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - What to have ready (checklist, locking nut reverse anchor)
   =========================================================================== */
export function Checklist() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          What to Have Ready for the Free Check
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
   Section 11 - Coverage across the UK (area cards)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Free Tyre Health Check Coverage Across the UK" subtitle={AREAS_INTRO} />
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
          City pages list the towns and areas within each region. See our{" "}
          <Link href="/areas" className="font-medium text-accent hover:underline">areas we cover</Link>{" "}
          for your exact postcode.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - A free check in action (illustrative scenario, 11:30 / 12:15)
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
            A Free Tyre Health Check in Action
          </h2>
          <p className="mt-4 leading-relaxed text-foreground/80">{CASE_STUDY.body}</p>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-6 text-center">
            {CASE_STUDY.stats.map((s) => (
              <div key={s.label}>
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
