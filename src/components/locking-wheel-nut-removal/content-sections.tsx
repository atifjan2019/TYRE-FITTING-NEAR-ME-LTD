import Link from "next/link";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { ComparisonBlock } from "@/components/sections/comparison-block";
import {
  PROBLEMS_INTRO,
  PROBLEMS,
  NO_DAMAGE_LEAD,
  NO_DAMAGE_YES,
  NO_DAMAGE_NO,
  NO_DAMAGE_PROSE,
  AFTER_REMOVAL_PROSE,
  PROCESS_STEPS,
  VEHICLES_COVERED_PROSE,
  PRICING_SUMMARY,
  COST_PROSE,
  EMERGENCY_PROSE,
  PROOF_POINTS,
  CHECKLIST,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/locking-wheel-nut-removal-content";

/* ===========================================================================
   Section 2 - Why your locking wheel nut will not come off
   (icon card grid, clone of the repair page's Causes grid)
   =========================================================================== */
export function WhyProblems() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Common causes"
          title="Why Your Locking Wheel Nut Will Not Come Off"
          subtitle={PROBLEMS_INTRO}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {PROBLEMS.map((c) => (
            <div key={c.name} className="surface-card surface-card-hover flex h-full flex-col p-5 sm:p-7">
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
   Section 3 - No Damage vs DIY Damage (SIGNATURE VISUAL)
   Two-column GREEN (our extraction) / RED (DIY damage) layout, clone of the
   repair page's Eligibility block. Section carries class "no-damage-promise"
   for the WebPage speakable schema.
   =========================================================================== */
export function NoDamagePromise() {
  return (
    <section className="no-damage-promise section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="No-damage guarantee"
          title="Locking Wheel Nut Removal With No Damage to Your Alloys"
          subtitle={NO_DAMAGE_LEAD}
        />

        <ComparisonBlock
          className="mt-10"
          left={{ title: "Our specialist extraction", items: NO_DAMAGE_YES }}
          right={{ title: "DIY kits and unsafe methods", items: NO_DAMAGE_NO }}
          rightMode="cross"
          caption={NO_DAMAGE_PROSE}
        />
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - What happens to the nut after removal (prose block)
   =========================================================================== */
export function AfterRemoval() {
  return (
    <section className="section-pad bg-background">
      <div className="prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          What Happens to the Nut After Removal
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>{AFTER_REMOVAL_PROSE}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How mobile locking wheel nut removal works (5-step timeline,
   clone of repair Process, also drives HowTo schema)
   =========================================================================== */
export function Process() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How Mobile Locking Wheel Nut Removal Works" />
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
   Section 6 - Locking nut removal plus the tyre work, one visit (cluster
   bridge prose with three internal links)
   =========================================================================== */
export function ClusterBridge() {
  return (
    <section className="section-pad bg-background">
      <div className="prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Locking Nut Removal Plus the Tyre Work, One Visit
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A lost key usually surfaces at the worst moment: a flat tyre that cannot be
            changed, a puncture that cannot be repaired, an MOT that cannot proceed. Once
            the nut is off, the same technician on the same visit fits a new tyre through{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
              mobile tyre fitting
            </Link>
            , repairs the puncture where BS AU 159 allows through{" "}
            <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent hover:underline">
              puncture repair
            </Link>
            , or handles a roadside flat through{" "}
            <Link href="/services/emergency-tyre-fitting" className="font-semibold text-accent hover:underline">
              emergency tyre fitting
            </Link>
            . One callout, one fee structure, no second appointment.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - Vehicles and locking nut types covered (prose block)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="section-pad bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles and Locking Nut Types Covered
          </h2>
        </div>
        <div className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-foreground/80">{VEHICLES_COVERED_PROSE}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Locking wheel nut removal cost (clone of repair Costs)
   =========================================================================== */
export function Costs() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Locking Wheel Nut Removal Cost" />
        <p className="pricing-summary mt-6 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
          {PRICING_SUMMARY}
        </p>
        <div className="prose-col mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>{COST_PROSE}</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - 24/7 and emergency locking wheel nut removal (prose with link)
   =========================================================================== */
export function Emergency() {
  return (
    <section className="section-pad bg-secondary">
      <div className="prose-col px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          24/7 and Emergency Locking Wheel Nut Removal
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A locked-out wheel after a roadside flat is an emergency, so removal runs
            24/7/365 with a 30 to 60 minute typical response, postcode-dependent, alongside{" "}
            <Link href="/services/emergency-tyre-fitting" className="font-semibold text-accent hover:underline">
              emergency tyre fitting
            </Link>
            . Standard daytime slots cover planned removals before an MOT or a booked tyre
            change. Roadside removal follows National Highways protocol where the vehicle
            sits on a live road.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Why drivers choose us (proof points, clone of repair WhyChoose)
   Brand mention 1 in H2, brand mention 2 in the lead line.
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Drivers Choose Tyre Fitting Near Me Ltd for Removal" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd earns the call on seven proof points.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PROOF_POINTS.map((point) => (
            <div key={point} className="surface-card surface-card-hover flex h-full items-start gap-3 p-5 sm:p-7">
              <Icon name="circle-check-big" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-muted-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Before the technician arrives (checklist, clone of repair)
   =========================================================================== */
export function Checklist() {
  return (
    <section className="section-pad bg-secondary">
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
                <p className="font-heading font-bold text-primary">{item.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Coverage across the UK (area cards, clone of repair Areas)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Locking Wheel Nut Removal Coverage Across the UK" subtitle={AREAS_INTRO} />
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
   Section 13 - Illustrative scenario (timestamps card, clone of repair Case)
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
            Locking Wheel Nut Removal in Action
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
