import Link from "next/link";
import { Check, X, TriangleAlert } from "lucide-react";
import { Icon } from "@/components/icon";
import {
  PUNCTURE_TYPES,
  NON_REPAIRABLE,
  DECISION_TABLE,
  PROCESS_STEPS,
  PRICE_INCLUDED,
  PRICE_EXCLUDED,
  SPECIAL_CASES,
  EMERGENCY_HOURS,
  VEHICLES,
  DRIVERS,
  WHY_TILES,
  CHECKLIST,
  AREAS_INTRO,
  AREAS,
  CASE_STUDY,
} from "@/lib/puncture-repair-content";

/* ---------------------------------------------------------------------------
   Shared heading: red eyebrow (caps) + navy H2 + optional subtitle. Mirrors the
   sibling page's SectionHeading but forces the red eyebrow the design addendum
   asks for. `align="left"` is used by the prose sections.
   --------------------------------------------------------------------------- */
function Heading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}

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
   Section 2 - Why mobile beats the garage queue (WHITE, prose)
   =========================================================================== */
export function WhyGarage() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading eyebrow="Why mobile" title="Why Mobile Puncture Repair Beats the Garage Queue" align="left" />
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
          <p>
            A punctured tyre is the one fault a driver should never drive on. Garage
            repair demands the opposite, a drive to the fitting bay on the damaged tyre.
            Driving deflated destroys the sidewall in minutes. A £39 repair then becomes a
            full tyre replacement at £60 to £200. Every mile on a flat tyre also breaches
            the UK Construction and Use Regulations. The rules set legal limits on
            defective tyres, and roadside enforcement carries fines and penalty points for
            each illegal tyre.
          </p>
          <p>
            Mobile puncture repair removes the drive entirely. Our fitters bring the
            workshop to your door, your car park or the hard shoulder. The tyre stays where
            it sits until a fitter inspects it properly. Drivers across the UK in 2026
            refuse to lose half a working day to a single puncture. Booking a mobile fitter
            keeps the tyre repairable, keeps you legal and keeps your day intact. Compare
            the full callout range on our{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
              mobile tyre fitting
            </Link>{" "}
            service.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 3 - Puncture types we repair (LIGHT GREY, list pattern)
   =========================================================================== */
export function PunctureTypes() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading
          eyebrow="What we repair"
          title="Tyre Punctures We Repair at Your Home, Work or Roadside"
          subtitle="Our fitters diagnose and repair the full range of puncture faults at the kerbside, from a screw in the tread to a slow leak no warning light explains."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {PUNCTURE_TYPES.map((p, i) => (
            <li
              key={p.label}
              className={`flex gap-3 rounded-2xl border bg-card p-5 shadow-sm ${
                i === PUNCTURE_TYPES.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-heading font-bold text-primary">{p.label}</h3>
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
   Section 4 - Repairability under BS AU 159 (WHITE)
   Block A prose (snippet target) + Block B diagram + non-repairable checklist.
   =========================================================================== */
export function Repairability() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading
          eyebrow="The standard"
          title="When a Puncture Can Be Repaired Under British Standard BS AU 159"
          align="left"
        />

        {/* Block A: featured-snippet target (40-50 words, standalone) + explainer */}
        <div className="mt-6 max-w-3xl space-y-5 leading-relaxed">
          <p className="hero-definition text-lg font-medium text-foreground/90">
            A puncture qualifies for a permanent BS AU 159 repair when it sits within the
            central 75% of the tread, measures up to 6mm in diameter, and passes an
            internal inspection off the wheel. Sidewall damage, shoulder damage and bead
            damage never qualify for repair.
          </p>
          <p className="text-muted-foreground">
            BS AU 159 splits the tread into a minor repair area and a major repair area.
            The minor area covers the central three quarters of the tread width. A puncture
            there seals cleanly from the inside. The shoulder and sidewall form the major
            area, where the rubber flexes under load on every corner. A patch there works
            loose and fails. So the standard draws a hard line at the edge of the central
            75%.
          </p>
        </div>

        {/* Block B: repair-zone diagram (styled divs, no stock image) */}
        <RepairabilityDiagram />

        {/* Non-repairable list: two-column checklist with red X markers */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-l-4 border-l-accent bg-secondary p-6">
          <h3 className="font-heading text-lg font-bold text-primary">
            Punctures that never qualify, wherever they sit
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {NON_REPAIRABLE.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-8 max-w-3xl leading-relaxed text-foreground/80">
          Our fitters inspect every tyre off the wheel at your location. The fitter tells
          you honestly which side of the line the tyre falls before any repair begins.
        </p>
      </div>
    </section>
  );
}

/** Horizontal tyre cross-section: green central 75% repairable band, red outer zones. */
function RepairabilityDiagram() {
  const green = {
    backgroundColor: "color-mix(in srgb, var(--color-success) 16%, white)",
    color: "var(--color-success)",
  };
  const red = {
    backgroundColor: "color-mix(in srgb, var(--color-destructive) 16%, white)",
    color: "var(--color-destructive)",
  };
  return (
    <figure
      role="img"
      aria-label="BS AU 159 tyre puncture repair zones, repairable central tread area versus non-repairable sidewall"
      className="mx-auto mt-10 max-w-[560px] rounded-2xl border bg-card p-5 shadow-sm"
    >
      <div className="flex h-20 overflow-hidden rounded-xl border text-center">
        <div className="flex basis-[12.5%] items-center justify-center text-[10px] font-bold" style={red}>
          <span className="rotate-0">Shoulder</span>
        </div>
        <div
          className="flex basis-[75%] items-center justify-center px-2 text-xs font-bold leading-tight"
          style={green}
        >
          Repairable, central 75% of tread
        </div>
        <div className="flex basis-[12.5%] items-center justify-center text-[10px] font-bold" style={red}>
          Sidewall
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        BS AU 159 repair zones
      </figcaption>

      <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        <span className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold" style={green}>
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> Repairable, central 75%
        </span>
        <span className="flex items-center gap-2 rounded-lg px-3 py-2 font-semibold" style={red}>
          <X className="h-4 w-4 shrink-0" aria-hidden="true" /> Not repairable, sidewall and shoulder
        </span>
      </div>
    </figure>
  );
}

/* ===========================================================================
   Section 5 - Repair or replace framework (LIGHT GREY, responsive table)
   =========================================================================== */
export function RepairOrReplace() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading eyebrow="The decision" title="Puncture Repair or New Tyre, How the Decision Is Made" />

        {/* Desktop / >=640px: real table */}
        <div className="mx-auto mt-10 hidden max-w-[800px] overflow-hidden rounded-2xl border bg-card shadow-sm sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-primary/5">
                <th className="px-4 py-3 font-heading font-bold text-primary">Factor</th>
                <th className="px-4 py-3 font-heading font-bold" style={{ color: "var(--color-success)" }}>Repair when</th>
                <th className="px-4 py-3 font-heading font-bold text-destructive">Replace when</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {DECISION_TABLE.map((row) => (
                <tr key={row.factor}>
                  <td className="px-4 py-3 font-semibold text-primary">{row.factor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.repair}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.replace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile <640px: stacked label-value cards, never horizontal scroll */}
        <div className="mx-auto mt-10 grid max-w-md gap-4 sm:hidden">
          {DECISION_TABLE.map((row) => (
            <div key={row.factor} className="rounded-2xl border bg-card p-4 shadow-sm">
              <p className="font-heading font-bold text-primary">{row.factor}</p>
              <dl className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold" style={{ color: "var(--color-success)" }}>Repair when</dt>
                  <dd className="text-right text-muted-foreground">{row.repair}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-semibold text-destructive">Replace when</dt>
                  <dd className="text-right text-muted-foreground">{row.replace}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        {/* Commitment callout strip */}
        <p className="mx-auto mt-8 max-w-[800px] rounded-2xl border border-l-4 border-l-accent bg-accent/5 p-5 text-center font-bold text-primary">
          When the tyre passes BS AU 159, we repair it. We carry replacement stock only for
          tyres that fail.
        </p>
        <p className="mx-auto mt-5 max-w-3xl text-center leading-relaxed text-muted-foreground">
          A £39 repair stands against £60 to £200 or more for a replacement tyre. See the
          full fitting range on our{" "}
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
   Section 6 - Process (WHITE, numbered vertical timeline)
   =========================================================================== */
export function Process() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading eyebrow="Step by step" title="How Our Mobile Puncture Repair Process Works" align="left" />
        <ol className="mt-10 space-y-8">
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
   Section 7 - Pricing (LIGHT GREY, badges + two cards + comparison prose)
   =========================================================================== */
export function Pricing() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading eyebrow="Pricing" title="Puncture Repair Cost, £39 With Nothing Added After" />

        {/* Price headline strip: two badges */}
        <div className="pricing-summary mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-primary px-5 py-2 font-heading text-lg font-extrabold text-primary-foreground">
            £39 per repaired tyre
          </span>
          <span className="rounded-full bg-accent px-5 py-2 font-heading text-lg font-extrabold text-accent-foreground">
            No call-out charge
          </span>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
              <Check className="h-5 w-5 text-[var(--color-success)]" aria-hidden="true" />
              What&apos;s included in £39
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRICE_INCLUDED.map((item) => (
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
              {PRICE_EXCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 text-center leading-relaxed text-muted-foreground">
          <p>
            UK garage puncture repairs run £22 to £50 and require driving on the damaged
            tyre and waiting in a fitting bay. Mobile pricing includes the journey you no
            longer make.
          </p>
          <p className="font-semibold text-primary">Pricing held flat through 2026 for standard appointments.</p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 8 - Special cases (WHITE, three cards)
   =========================================================================== */
export function SpecialCases() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading
          eyebrow="Handled differently"
          title="Run-Flat Tyres, EV Tyres and Punctures We Handle Differently"
          subtitle="Some tyres change the repair assessment. Our fitters carry the right resolution for each on every van."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {SPECIAL_CASES.map((s) => (
            <div key={s.name} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {(() => {
                  const phrase = "matching replacement run-flat";
                  const idx = s.body.indexOf(phrase);
                  if (idx === -1) return s.body;
                  return (
                    <>
                      {s.body.slice(0, idx)}
                      <Link
                        href="/services/run-flat-tyre"
                        className="font-medium text-accent hover:underline"
                      >
                        {phrase}
                      </Link>
                      {s.body.slice(idx + phrase.length)}
                    </>
                  );
                })()}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          Fleet account terms with monthly invoicing are available for vans and managed
          fleets.{" "}
          <Link href="/contact" className="font-semibold text-accent hover:underline">
            Contact our team
          </Link>{" "}
          to set up an account.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 9 - Emergency 24/7 (LIGHT GREY, prose + 2x2 availability mini-grid)
   =========================================================================== */
export function Emergency() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading eyebrow="Emergency" title="Emergency Puncture Repair, 24 Hours a Day Across the UK" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 leading-relaxed text-foreground/80">
            <p>
              Overnight callouts run 365 days a year across UK mainland coverage. The
              60-minute response target holds inside covered postcodes, day or night. Taxi
              drivers, night-shift workers and stranded families rely on a fitter who answers
              when the rest of the trade sleeps. Motorway and hard shoulder work follows
              National Highways safety protocol. The fitter instructs you on safe positioning
              before any tyre work begins, with live traffic flowing feet away. Roadside
              safety comes before the repair, every time.
            </p>
            <p>
              At 11pm with a flat outside your house, every garage is closed. The mobile
              fitter is the one still answering. Out-of-hours callout terms are disclosed at
              booking before any work begins. Check response times for your postcode on
              our{" "}
              <Link href="/areas" className="font-semibold text-accent hover:underline">
                areas we cover
              </Link>{" "}
              page.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EMERGENCY_HOURS.map((row) => (
              <div key={row.label} className="rounded-2xl border bg-card p-5 shadow-sm">
                <dt className="font-heading font-bold text-primary">{row.label}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 10 - Vehicles and drivers (WHITE, two checklist cards)
   =========================================================================== */
export function VehiclesDrivers() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading
          eyebrow="Who we serve"
          title="Puncture Repairs for Cars, Vans, SUVs, EVs and Fleets"
          subtitle="Each vehicle class is torqued and inflated to its own specification, applied correctly on every callout."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-primary">Vehicles we repair</h3>
            <ul className="mt-4 space-y-2.5">
              {VEHICLES.map((v) => (
                <li key={v.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={v.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{v.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-primary">Drivers we serve</h3>
            <ul className="mt-4 space-y-2.5">
              {DRIVERS.map((d) => (
                <li key={d.label} className="flex items-start gap-2.5 text-sm">
                  <Icon name={d.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{d.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 11 - Why choose us (LIGHT GREY, six-stat grid). Brand mention 2 of 3.
   =========================================================================== */
export function WhyChoose() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading eyebrow="Why us" title="Why UK Drivers Choose Tyre Fitting Near Me Ltd for Puncture Repairs" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {WHY_TILES.map((tile) => (
            <div key={tile.stat + tile.label} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
              <p className="font-heading text-2xl font-extrabold text-accent sm:text-3xl">{tile.stat}</p>
              <p className="mt-2 text-sm text-muted-foreground">{tile.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center font-medium text-primary">
          Every repair includes off-the-wheel inspection, a new valve and rebalancing as
          standard. Read our{" "}
          <Link href="/reviews" className="font-semibold text-accent hover:underline">customer reviews</Link>{" "}
          or learn more{" "}
          <Link href="/about" className="font-semibold text-accent hover:underline">about us</Link>.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 12 - Pre-arrival checklist (WHITE, numbered + safety alert)
   =========================================================================== */
export function Checklist() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Heading eyebrow="Before we arrive" title="What to Have Ready Before Your Puncture Repair Appointment" align="left" />
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

        {/* Bold safety warning as a distinct alert strip */}
        <div
          className="mt-8 flex items-start gap-3 rounded-2xl border border-l-4 border-l-destructive p-5"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-destructive) 8%, white)" }}
        >
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
          <p className="font-bold text-primary">
            Do not drive on the flat to reach a better spot. Driving deflated turns a
            repairable puncture into a scrapped tyre.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 13 - Service areas (LIGHT GREY, six-region grid)
   =========================================================================== */
export function AreasCoverage() {
  return (
    <section className="bg-secondary py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Heading eyebrow="Local to you" title="Mobile Puncture Repair Service Areas" subtitle={AREAS_INTRO} />
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
          See our{" "}
          <Link href="/areas" className="font-medium text-accent hover:underline">areas we cover</Link>{" "}
          for local response times and the nearest fitter.
        </p>
      </div>
    </section>
  );
}

/* ===========================================================================
   Section 14 - Case study (WHITE, scenario + horizontal timeline)
   =========================================================================== */
export function CaseStudy() {
  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border bg-card p-6 shadow-md sm:p-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">{CASE_STUDY.label}</p>
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
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
