import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  WHY_GARAGE,
  PROBLEMS,
  BENEFITS,
  PROCESS_STEPS,
  AVAILABILITY,
  SPECIALIST_SERVICES,
  BRAND_TIERS,
  BRAND_STANDARDS,
  VEHICLES,
  DRIVERS,
  FLEET_NOTE,
  COST_INCLUDED,
  COST_SEPARATE,
  COST_CALLOUT,
  WHY_TILES,
  CHECKLIST,
  CHECKLIST_MOTORWAY,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/mobile-tyre-fitting-content";

/* ===========================================================================
   Section 4 - Why mobile tyre fitting replaces the garage visit
   =========================================================================== */
export function WhyGarage() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Why Mobile Tyre Fitting Replaces the Garage Visit
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          {WHY_GARAGE.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - Tyre problems solved on-site
   =========================================================================== */
export function Problems() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="On-site"
          title="Tyre Problems Solved On-Site"
          subtitle="Our mobile fitters handle the full range of tyre faults at the kerbside, from sudden failures to gradual wear."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <li key={p.label} className="flex gap-3 rounded-2xl border bg-card p-5 shadow-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-bold text-primary">{p.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 6 - What you get with mobile tyre fitting
   =========================================================================== */
export function Benefits() {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          What You Get with Mobile Tyre Fitting
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
   Section 7 - How the mobile tyre fitting process works
   =========================================================================== */
export function Process() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="Step by step"
          title="How the Mobile Tyre Fitting Process Works"
        />
        <ol className="mt-12 space-y-8">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 sm:gap-6">
              {/* Number + connecting line */}
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
   Section 8 - 24/7 availability
   =========================================================================== */
export function Availability() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading title="24/7 Mobile Tyre Fitting Availability" />
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* Hours model */}
          <dl className="divide-y divide-border rounded-2xl border bg-card p-2 shadow-sm">
            {AVAILABILITY.hours.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
                <dt className="font-heading font-bold text-primary sm:w-2/5">{row.label}</dt>
                <dd className="text-sm text-muted-foreground sm:w-3/5">{row.value}</dd>
              </div>
            ))}
          </dl>

          {/* Pricing transparency callout */}
          <div className="rounded-2xl border border-l-4 border-l-accent bg-card p-6 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-primary">
              {AVAILABILITY.pricingHeading}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {AVAILABILITY.pricingBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Specialist mobile tyre services on every van
   =========================================================================== */
export function SpecialistServices() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="On every van"
          title="Specialist Mobile Tyre Services on Every Van"
          subtitle="Capabilities beyond a standard tyre swap, carried as standard kit by every fitter."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPECIALIST_SERVICES.map((s) => (
            <div key={s.name} className="relative rounded-2xl border bg-card p-6 shadow-sm">
              {s.tag && (
                <span className="absolute right-4 top-4 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                  {s.tag}
                </span>
              )}
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Tyre brands fitted
   =========================================================================== */
export function BrandTiers() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          title="Tyre Brands Fitted by Our Mobile Technicians"
          subtitle="Our fitters carry three transparent tiers of tyre, matched to budget, mileage, and vehicle type, with no pressure to trade up."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {BRAND_TIERS.map((tier) => (
            <div key={tier.tier} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                {tier.tier}
              </span>
              <p className="mt-3 text-sm text-muted-foreground">{tier.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tier.brands.map((brand) => (
                  <li
                    key={brand}
                    className="rounded-lg border bg-background px-3 py-1.5 text-sm font-semibold text-primary"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
              {tier.note && (
                <p className="mt-3 text-sm italic text-muted-foreground">{tier.note}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-muted-foreground">
          {BRAND_STANDARDS}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Vehicles and drivers we serve
   =========================================================================== */
export function VehiclesDrivers() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles and Drivers We Serve
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cars to motorhomes, private drivers to managed fleets. Each vehicle class has its
            own torque and pressure specification, applied correctly every time.
          </p>
          <span className="mt-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary/5 text-primary">
            <Icon name="bus" className="h-8 w-8" />
          </span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">Vehicles we fit</h3>
            <ul className="mt-4 space-y-2.5">
              {VEHICLES.map((v) => (
                <li key={v.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={v.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{v.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-primary">Drivers we serve</h3>
            <ul className="mt-4 space-y-2.5">
              {DRIVERS.map((d) => (
                <li key={d.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={d.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{d.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">
              {FLEET_NOTE}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 13 - Mobile tyre fitting costs and what's included
   =========================================================================== */
export function Costs() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading title="Mobile Tyre Fitting Costs and What's Included" />
        <p className="mt-6 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
          £20 flat fitting fee per tyre
          <span className="mt-1 block text-lg font-bold text-accent">No call-out charge</span>
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Included */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
              <Check className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
              What&apos;s included in the £20
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
          {/* Quoted separately */}
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
   Section 14 - Why drivers across the UK choose us
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading title="Why Drivers Across the UK Choose Tyre Fitting Near Me Ltd" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {WHY_TILES.map((tile) => (
            <div
              key={tile.stat + tile.label}
              className="rounded-2xl border bg-card p-6 text-center shadow-sm"
            >
              <p className="font-heading text-2xl font-extrabold text-accent sm:text-3xl">
                {tile.stat}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-medium text-primary">
          Every appointment includes wheel balancing and tyre disposal as standard.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 15 - What to have ready before the technician arrives
   =========================================================================== */
export function Checklist() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
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
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 rounded-2xl border border-l-4 border-l-primary bg-secondary p-6 leading-relaxed text-muted-foreground">
          {CHECKLIST_MOTORWAY}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 16 - Mobile tyre fitting coverage across the UK
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Mobile Tyre Fitting Coverage Across the UK" subtitle={AREAS_INTRO} />
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
              <Link
                href={area.href}
                className="mt-4 text-sm font-semibold text-accent hover:underline"
              >
                View {area.region} &rarr;
              </Link>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          City-specific information available for{" "}
          <Link href="/london" className="font-medium text-accent hover:underline">London</Link>,{" "}
          Manchester, Birmingham, Leeds, Glasgow, Bristol, and other UK cities. See our{" "}
          <Link href="/areas" className="font-medium text-accent hover:underline">areas we cover</Link>{" "}
          for local response times and the nearest fitter.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 17 - Mobile tyre fitting in action: a recent callout
   =========================================================================== */
export function CaseStudy() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
            {CASE_STUDY.label}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
            Mobile Tyre Fitting in Action
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
