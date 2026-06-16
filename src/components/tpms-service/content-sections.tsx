import Link from "next/link";
import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  THREE_JOBS,
  VALVE_FACTS,
  SENSOR_FACTS,
  PROCESS_STEPS,
  SYSTEMS,
  SYSTEMS_CLOSE,
  PRICING_LINES,
  CHECKLIST,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/tpms-service-content";

/* ===========================================================================
   The three TPMS jobs (icon row, structural swap 2)
   Disambiguates the three jobs the page covers, near the top.
   =========================================================================== */
export function ThreeJobs() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
          The Three TPMS Jobs
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {THREE_JOBS.map((job) => (
            <div key={job.title} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={job.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">{job.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{job.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 2 - What is a TPMS service? (prose, quotable definition)
   The definition paragraph carries class "tpms-definition" for speakable schema.
   =========================================================================== */
export function WhatIsTpms() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          What Is a TPMS Service?
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p className="tpms-definition">
            A tyre pressure monitoring system warns the driver when a tyre loses pressure,
            using either a direct sensor inside each wheel or an indirect reading from the
            ABS. A TPMS service keeps that system accurate and legal.
          </p>
          <p>The valve service replaces the perishable rubber and metal parts.</p>
          <p>Sensor replacement swaps a sensor whose sealed battery has died.</p>
          <p>A reset clears the warning light and relearns the sensor IDs to the ECU.</p>
          <p>
            Every car built since 2014 carries TPMS as standard, so the service applies to
            almost every vehicle on the road in 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Valve service vs sensor replacement (SIGNATURE VISUAL)
   Two-column layout, both columns neutral/informational. The page's most
   important block, given visual prominence with the "valve-vs-sensor" class.
   =========================================================================== */
export function ValveVsSensor() {
  return (
    <section className="valve-vs-sensor bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Which one you need"
          title="TPMS Valve Service or Sensor Replacement: Which One You Need"
          subtitle="The two jobs are confused constantly, and the difference decides whether the fix is cheap or costs more, so here is the honest distinction."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* TPMS valve service */}
          <div className="rounded-2xl border bg-card p-6 shadow-md">
            <div className="flex items-center gap-3 border-b pb-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name="circle-dot" className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-xl font-bold text-primary">TPMS Valve Service</h3>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Every direct TPMS sensor sits on a valve with a rubber grommet, a valve core, a
              cap, and a retaining nut, all of which perish, corrode, or leak over time. A valve
              service replaces that service pack. A perished grommet is a common cause of a slow
              air leak, and the valve service is done as standard whenever a tyre is removed from
              the rim.
            </p>
            <ul className="mt-5 space-y-3">
              {VALVE_FACTS.map((fact) => (
                <li key={fact} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TPMS sensor replacement */}
          <div className="rounded-2xl border bg-card p-6 shadow-md">
            <div className="flex items-center gap-3 border-b pb-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name="gauge" className="h-6 w-6" />
              </span>
              <h3 className="font-heading text-xl font-bold text-primary">TPMS Sensor Replacement</h3>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Each direct TPMS sensor contains a sealed battery that lasts 5 to 10 years and
              cannot be replaced on its own, so when the battery dies or the sensor fails, the
              complete sensor is replaced and relearned to the ECU.
            </p>
            <ul className="mt-5 space-y-3">
              {SENSOR_FACTS.map((fact) => (
                <li key={fact} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-l-4 border-l-accent bg-card p-6 text-center leading-relaxed text-foreground/80">
          A leaking valve needs a valve service, a dead sensor needs a replacement, and a quick
          diagnostic tells you which before any money is spent. Pricing is held flat through 2026
          for every standard appointment.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 4 - Why a TPMS warning light fails your MOT (prose)
   =========================================================================== */
export function WhyMot() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Why a TPMS Warning Light Fails Your MOT
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A TPMS warning light means a real fault: low pressure, a dead sensor, a leaking
            valve, or a failed relearn. TPMS has been part of the MOT for cars first registered
            from 1 January 2012, and a warning light on the dashboard is a direct MOT failure.
            Driving on it risks underinflation, longer braking, uneven tyre wear, and a blowout,
            on top of the failed test. The fix is a diagnostic to find the cause, then a valve
            service, sensor replacement, or reset as needed.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 5 - How mobile TPMS service works (5-step timeline, drives HowTo)
   =========================================================================== */
export function Process() {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Step by step" title="How Mobile TPMS Service Works" />
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
   Section 6 - TPMS valve service with every tyre change (prose, cluster attach)
   =========================================================================== */
export function WithEveryTyreChange() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          TPMS Valve Service With Every Tyre Change
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            The valve service pack perishes most when a tyre is removed from the rim, so the
            right time to service the TPMS valve is during a tyre change, while the tyre is
            already off. A new tyre fitted onto an old perished valve is the most common cause of
            a{" "}
            <Link href="/services/mobile-tyre-repair" className="font-medium text-accent hover:underline">
              slow leak
            </Link>{" "}
            straight after a fitting. Booked together on one visit, the tyre is fitted through{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-medium text-accent hover:underline">
              mobile tyre fitting
            </Link>{" "}
            and the TPMS valve serviced at the same time. Standalone TPMS service is booked the
            same way for a warning light or a failed sensor.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 7 - Direct and indirect TPMS (compact two-row info block)
   =========================================================================== */
export function DirectIndirect() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Direct and Indirect TPMS Explained" />
        <dl className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border bg-card shadow-sm">
          {SYSTEMS.map((sys) => (
            <div key={sys.name} className="flex flex-col gap-3 p-6 sm:flex-row sm:gap-6">
              <dt className="flex items-center gap-3 sm:w-1/4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary">
                  <Icon name={sys.icon} className="h-6 w-6" />
                </span>
                <span className="font-heading text-lg font-bold text-primary">{sys.name}</span>
              </dt>
              <dd className="text-muted-foreground sm:w-3/4">{sys.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-foreground/80">
          {SYSTEMS_CLOSE}
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - TPMS service cost (3-line pricing block + prose)
   =========================================================================== */
export function Costs() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="TPMS Service Cost" />
        <div className="mx-auto mt-8 max-w-2xl space-y-3">
          {PRICING_LINES.map((line) => (
            <p
              key={line}
              className="pricing-summary rounded-2xl border border-l-4 border-l-accent bg-card p-5 text-center font-heading text-xl font-extrabold text-primary"
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A valve service is the low-cost perishable fix, a sensor replacement costs more
            because the whole sealed unit is replaced, and the diagnostic confirms which is
            needed first. No call-out fee applies within standard hours. A dealership sensor
            replacement costs more, and a mobile service at the driveway saves the garage trip
            entirely. Pricing is held flat through 2026 for every standard appointment.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Vehicles and TPMS systems covered (prose)
   =========================================================================== */
export function VehiclesCovered() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Vehicles and TPMS Systems Covered
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            Cars, vans up to 3.5 tonnes, 4x4s, and SUVs. Direct and indirect systems on BMW,
            Mercedes, Audi, VW, Ford, Vauxhall, and Toyota, with OEM and programmable
            aftermarket sensors stocked. Sensors are matched and programmed to the vehicle from
            the registration.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Why drivers choose us (brand mention 1 in H2, mention 2 in lead)
   =========================================================================== */
export function WhyChoose() {
  const points = [
    "An honest diagnostic that fixes the cheap valve fault before selling a sensor",
    "Valve service done with any tyre change while the tyre is off",
    "MOT-ready warning light reset",
    "Direct and indirect systems handled",
    "Transparent per-wheel and per-sensor pricing",
    "12-month workmanship guarantee",
    "UK mainland coverage",
  ];
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Why Drivers Choose Tyre Fitting Near Me Ltd for TPMS" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Tyre Fitting Near Me Ltd is the only mobile TPMS service where every rival is
          garage-based.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-3 rounded-2xl border bg-card p-5 shadow-sm">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm text-foreground/80">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Before the technician arrives (checklist)
   The "locking wheel nut key" item links to the locking-wheel-nut-removal page.
   =========================================================================== */
function renderChecklistTitle(item: { title: string; link?: boolean }) {
  const phrase = "locking wheel nut key";
  if (!item.link || !item.title.includes(phrase)) return item.title;
  const idx = item.title.indexOf(phrase);
  return (
    <>
      {item.title.slice(0, idx)}
      <Link
        href="/services/locking-wheel-nut-removal"
        className="font-bold text-accent hover:underline"
      >
        {phrase}
      </Link>
      {item.title.slice(idx + phrase.length)}
    </>
  );
}

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
                <p className="font-heading font-bold text-primary">{renderChecklistTitle(item)}</p>
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
   Section 12 - Coverage across the UK (area cards, reuse AREAS)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="TPMS Service Coverage Across the UK" subtitle={AREAS_INTRO} />
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
   Section 13 - Illustrative scenario (timestamps card)
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
            TPMS Service in Action
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
