import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { SiteSettingsData } from "@/lib/data";
import { localBusinessJsonLd, faqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { CtaBand } from "@/components/sections/cta-band";
import { BookingForm } from "@/components/forms/booking-form";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  getLiveArea,
  LIVE_AREAS,
  LIVE_TOWN_SLUG_BY_NAME,
  areaHref,
  areaRegionSlug,
  type Area,
} from "@/data/areas";
import { getRegion } from "@/data/regions";

/** Join a list naturally with commas and a final "and". */
function naturalList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Money-page services. `emphasis` maps to the foregrounded card. */
const SERVICES: { label: string; href: string }[] = [
  { label: "Mobile tyre fitting", href: "/services/mobile-tyre-fitting" },
  { label: "Puncture repair", href: "/services/mobile-tyre-repair" },
  { label: "24/7 emergency callout", href: "/services/emergency-tyre-fitting" },
  { label: "Wheel balancing", href: "/services/wheel-balancing" },
  { label: "Locking wheel nut removal", href: "/services/locking-wheel-nut-removal" },
  { label: "TPMS service", href: "/services/tpms-service" },
  { label: "Run-flat replacement", href: "/services/run-flat-tyre" },
  { label: "Van and fleet fitting", href: "/services/van-tyre-fitting" },
];

const EMPHASIS_HREF: Record<Area["emphasis"], string> = {
  emergency: "/services/emergency-tyre-fitting",
  van: "/services/van-tyre-fitting",
  fitting: "/services/mobile-tyre-fitting",
};

/** Nested href for a live neighbour town, by display name. */
function neighbourHref(name: string): string | undefined {
  const slug = LIVE_TOWN_SLUG_BY_NAME[name.toLowerCase()];
  if (!slug) return undefined;
  const area = LIVE_AREAS.find((a) => a.slug === slug);
  return area ? areaHref(area) : undefined;
}

/* --- Skeleton variants (selected by area.variant). Each set differs in
   structure, not just synonyms, so two towns with different variants never
   share a sentence skeleton once proper nouns are stripped. ----------------- */

function servicesIntro(a: Area, pc: string): string {
  return [
    `Every tyre job in ${a.town} is handled on-site, from a single puncture to a full set, across the ${pc} area.`,
    `From a quick repair to a four-tyre change, the services below come to you anywhere in ${a.town} and the ${pc} postcodes.`,
    `Drivers in ${a.town} book any of these services to the kerb, with the fitter and the stock arriving at the ${pc} address.`,
  ][a.variant];
}

function whyChooseLead(a: Area, pc: string): string {
  return [
    `Drivers in ${a.town} choose a mobile fitter for the time saved and a price agreed before dispatch.`,
    `The reasons drivers in ${a.town} book us come down to convenience, hours and honest pricing.`,
    `Across the ${pc} area, the case for a mobile fitter in ${a.town} is straightforward.`,
  ][a.variant];
}

function howFast(a: Area, pc: string): string {
  return [
    `A response of 30 to 60 minutes is typical across ${pc}, postcode-dependent, with the arrival time confirmed when you call.`,
    `Most ${a.town} callouts are reached in 30 to 60 minutes, varying by postcode within ${pc}, and the realistic arrival time is given on the phone.`,
    `Expect 30 to 60 minutes to most ${pc} addresses, dependent on the exact postcode, with a firm window confirmed on the call.`,
  ][a.variant];
}

function finalCtaSubtitle(a: Area, pc: string): string {
  return [
    `Call or WhatsApp 0788 328 8831 for a 30 to 60 minute response across ${pc}. Tyres fitted at your home, work or roadside in ${a.town}, 24/7.`,
    `One call to 0788 328 8831 brings a fitter to ${a.town}, day or night, with a 30 to 60 minute typical response across ${pc}.`,
    `Reach 0788 328 8831 by phone or WhatsApp, and a fitter comes to your ${a.town} address 24/7, usually within 30 to 60 minutes.`,
  ][a.variant];
}

/** Hero subline, ordered by the town's real character. */
function heroSubline(a: Area, pc: string): string {
  if (a.emphasis === "emergency")
    return `Open 24/7 for emergencies, with the nearest fitter sent to the ${a.roads[0]} and across ${pc} fast, day or night.`;
  if (a.emphasis === "van")
    return `Van and fleet fitting at the depot, yard or roadside keeps working vehicles in ${a.town} moving.`;
  return `Most jobs are tyres fitted at the kerb at home or work, at a £20 flat fitting fee per tyre with no garage trip.`;
}

/** Why-choose points, ordered per emphasis (most locally relevant first). */
function whyChoosePoints(a: Area, pc: string): string[] {
  const comeToYou = `We come to you in ${a.town}, with no drive to a garage and no ordering tyres online first.`;
  const open247 = `Open 24/7, including nights, weekends and bank holidays.`;
  const response = `A 30 to 60 minute typical response across the wider ${a.town} area.`;
  const price = `A transparent £20 flat fitting fee per tyre, quoted before dispatch.`;
  const repair = `An honest repair before replacement where a puncture passes assessment.`;
  const guarantee = `A 12-month workmanship guarantee on every fitting.`;
  const emergencyLead = `Open 24/7 for emergencies, with the nearest fitter sent to the ${a.roads[0]} and across ${pc} fast.`;
  const vanLead = `Depot, yard and workplace fitting that keeps working vehicles in ${a.town} moving.`;

  if (a.emphasis === "emergency") return [emergencyLead, response, comeToYou, price, repair, guarantee];
  if (a.emphasis === "van") return [vanLead, comeToYou, open247, response, price, guarantee];
  return [comeToYou, price, open247, response, repair, guarantee];
}

export function townFaqs(a: Area, pc: string): { id: string; question: string; answer: string }[] {
  const others = a.postcodes.slice(1);
  return [
    {
      id: "how-quick",
      question: `How quickly can you reach ${a.town}?`,
      answer: `A response of 30 to 60 minutes is typical across ${pc}, with the exact window confirmed on the call.`,
    },
    {
      id: "postcode",
      question: `Do you cover ${a.postcodes[0]}?`,
      answer: others.length
        ? `Yes, ${a.postcodes[0]}, ${naturalList(others)} and the surrounding ${a.town} area are all covered.`
        : `Yes, ${a.postcodes[0]} and the surrounding ${a.town} area are all covered.`,
    },
    {
      id: "night",
      question: `Do you come out to ${a.town} at night?`,
      answer: `Yes. We run 24/7, 365 days a year through 2026, so a fitter reaches ${a.town} day or night, weekends and bank holidays included.`,
    },
    {
      id: "cost",
      question: `How much is tyre fitting in ${a.town}?`,
      answer: `Fitting is a £20 flat fee per tyre plus the tyre price, quoted before dispatch. No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed quote before dispatch.`,
    },
    {
      id: "ev",
      question: `Do you fit tyres on electric vehicles in ${a.town}?`,
      answer: `Yes. We carry EV-rated, load-rated tyres for electric cars and SUVs, matched from your registration and fitted at your ${a.town} home, work or roadside, with the correct load index and acoustic-foam construction where the model specifies it.`,
    },
    // Town-specific FAQ from the data (unique information gain).
    { id: "local", question: a.localFaq.q, answer: a.localFaq.a },
  ];
}

export { naturalList as townNaturalList };

export function TownView({ area, settings }: { area: Area; settings: SiteSettingsData }) {
  const { phone, whatsapp } = settings;
  const regionSlug = areaRegionSlug(area);
  const region = getRegion(regionSlug);
  const pagePath = areaHref(area);
  const pageUrl = `${SITE.url}${pagePath}`;
  const pc = naturalList(area.postcodes);
  const foregroundHref = EMPHASIS_HREF[area.emphasis];

  // Home > Areas > [Region] > [Town]: the breadcrumb mirrors the nested URL.
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: region?.name ?? area.region, path: `/areas/${regionSlug}` },
    { name: area.town, path: pagePath },
  ];

  const faqs = townFaqs(area, pc);

  // --- Schema ----------------------------------------------------------------
  const business = localBusinessJsonLd({
    settings,
    name: `Tyre Fitting Near Me Ltd - Mobile Tyre Fitting in ${area.town}`,
    description: `Mobile tyre fitting in ${area.town}, covering the ${area.postcodes.join(
      ", "
    )} postcode area and neighbouring ${naturalList(area.neighbours)}. 24/7, 30 to 60 minute typical response.`,
    url: pageUrl,
    areaServed: [area.town, ...area.postcodes],
    image: settings.defaultOgImage,
  }) as Record<string, unknown>;
  business.priceRange = "££";
  business.openingHoursSpecification = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Tyre Fitting",
    name: `Mobile Tyre Fitting in ${area.town}`,
    description: `Mobile tyre fitting, puncture repair assessed to BS AU 159, and replacement in ${area.town}. Tread is checked against the 1.6mm legal minimum and tyre age against the DOT date code at every visit.`,
    provider: { "@id": `${pageUrl}#business` },
    areaServed: [
      { "@type": "City", name: area.town },
      ...area.postcodes.map((p) => ({ "@type": "PostalCodeRangeSpecification", postalCode: p })),
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Mobile Tyre Fitting in ${area.town}, ${area.region}`,
    url: pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".local-note"],
    },
    isPartOf: { "@type": "WebSite", name: "Tyre Fitting Near Me Ltd", url: SITE.url },
  };

  return (
    <>
      <JsonLd id="schema-localbusiness" data={business} />
      <JsonLd id="schema-breadcrumb" data={breadcrumbJsonLd(crumbs)} />
      <JsonLd id="schema-faq" data={faqPageJsonLd(faqs)} />
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd id="schema-webpage" data={webPageSchema} />

      {/* 1. HERO */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <Breadcrumbs items={crumbs} light />
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
              Mobile Tyre Fitting in {area.town}, {area.region}
            </h1>
            <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
              Mobile tyre fitting in {area.town} and the surrounding {pc} postcode area, covering{" "}
              {naturalList(area.neighbours)}, with fitters working the {area.roads[0]} and nearby
              roads. Through 2026 we run 24/7 with a 30 to 60 minute typical response.
            </p>
            <p className="mt-4 max-w-2xl font-medium text-primary-foreground">{heroSubline(area, pc)}</p>
            <CtaButtons phone={phone} whatsapp={whatsapp} className="mt-8" />
            <p className="mt-4 text-sm text-primary-foreground/70">
              Or use the booking form with your registration and postcode.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div
              data-section="hero-form"
              className="rounded-2xl bg-card p-1 text-card-foreground shadow-xl lg:sticky lg:top-24"
            >
              <h2 className="px-5 pt-5 font-heading text-xl font-bold text-primary">
                Book a Fitter in {area.town}
              </h2>
              <div className="p-1">
                <BookingForm
                  phone={phone}
                  defaultService="Mobile Tyre Fitting"
                  defaultPostcode={area.postcodes[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOCAL COVERAGE (unique data: localNote is the primary asset) */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Tyre Fitting Across {area.town} and Nearby
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              We cover the {pc} postcode{area.postcodes.length > 1 ? "s" : ""} in and around {area.town},
              fitting tyres at your home, workplace or roadside.
            </p>
            <p className="local-note callout font-medium text-primary">{area.localNote}</p>
            <p>Local fitters work the {naturalList(area.roads)}.</p>
            <p>Recognisable local anchors include {naturalList(area.landmarks)}.</p>
          </div>
        </div>
      </section>

      {/* 3. SERVICES IN TOWN (emphasis service foregrounded) */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Services"
            title={`Our Tyre Services in ${area.town}`}
            subtitle={servicesIntro(area, pc)}
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const lead = s.href === foregroundHref;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={
                    lead
                      ? "surface-card flex items-center justify-between border-2 border-accent p-4 text-sm font-semibold text-primary"
                      : "surface-card surface-card-hover flex items-center justify-between p-4 text-sm font-semibold text-primary"
                  }
                >
                  <span>
                    {s.label}
                    {lead ? (
                      <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-accent">
                        Most used in {area.town}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-accent">&rarr;</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY DRIVERS CHOOSE US (ordered per emphasis) */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Why Drivers in {area.town} Choose Tyre Fitting Near Me Ltd
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{whyChooseLead(area, pc)}</p>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed text-foreground/80">
            {whyChoosePoints(area, pc).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-6 font-medium text-primary">
            No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed
            quote before dispatch. The £20 flat fitting fee per tyre and the tyre price are quoted
            in full before a fitter sets off.
          </p>
        </div>
      </section>

      {/* 5. HOW FAST WE REACH TOWN (variant phrasing) */}
      <section className="section-pad bg-secondary">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            How Fast We Reach {area.town}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>{howFast(area, pc)}</p>
            <p>For an emergency on the {area.roads[0]}, the nearest fitter is dispatched straight away.</p>
          </div>
        </div>
      </section>

      {/* 5b. TYRE SAFETY AND THE LAW (reference / E-E-A-T, same facts every town) */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Tyre Safety and the Law in {area.town}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Every tyre fitted in {area.town} has to meet the legal standard. The legal minimum tread
              depth is 1.6mm across the central three-quarters of the tread and around the full
              circumference, and a tyre below that figure is an MOT failure. Tread worn below 1.6mm
              cannot pass, so a worn tyre is replaced rather than signed off.
            </p>
            <p>
              A puncture is assessed against BS AU 159 before any repair. A repair is permitted only
              within the central three-quarters of the tread, the minor repair area, and only on a tyre
              that has not been run flat. A puncture in the sidewall or shoulder, or a tyre driven on
              while flat, cannot be repaired safely and is replaced.
            </p>
            <p>
              Tyre age matters separately from tread. Rubber hardens and cracks with age regardless of
              mileage, read from the four-digit DOT date code stamped on the sidewall. Low-mileage cars
              in {area.town} often carry tyres that look sound but have aged past safe service, so the
              DOT code is checked at every visit.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LOCAL SCENARIO (unique: built from the scenario object) */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="surface-card p-5 sm:p-8">
            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
              Illustrative scenario
            </span>
            <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Mobile Tyre Fitting in {area.town}: A Recent Callout
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/80">
              A {area.scenario.vehicle} had {area.scenario.situation}. The nearest fitter was dispatched
              to the {area.scenario.road}, and the job was done on-site, {area.scenario.outcome}.
            </p>
          </div>
        </div>
      </section>

      {/* 6b. VEHICLES WE COVER (EV coverage + brand-silo links, max 2 live brands) */}
      <section className="section-pad bg-secondary">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles We Cover in {area.town}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Our mobile fitters in {area.town} cover cars, vans up to 3.5 tonnes, 4x4s, SUVs and
              electric vehicles, with the correct tyre matched from the registration. Every tyre is
              fitted to the load index, speed rating and size the manufacturer specifies, then balanced
              and torqued on-site.
            </p>
            <p>
              Electric vehicles run heavier than the petrol equivalent and need the correct load-rated
              tyre, often built with acoustic foam to keep the cabin quiet. We carry EV-rated tyres and
              fit them at your {area.town} home, workplace or roadside.
            </p>
            <p>
              For marque-specific fitting, see our{" "}
              <Link
                href="/brands/tesla-mobile-tyre-fitting"
                className="font-medium text-accent hover:underline"
              >
                Tesla mobile tyre fitting
              </Link>{" "}
              and{" "}
              <Link
                href="/brands/bmw-mobile-tyre-fitting"
                className="font-medium text-accent hover:underline"
              >
                BMW mobile tyre fitting
              </Link>{" "}
              pages.
            </p>
          </div>
        </div>
      </section>

      {/* 7. AREAS NEAR TOWN (adjacency mesh, live neighbours only) */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={`Areas We Cover Near ${area.town}`} />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {area.neighbours.map((n) => {
              const href = neighbourHref(n);
              return href ? (
                <li key={n}>
                  <Link
                    href={href}
                    className="inline-block rounded-full border border-[rgba(11,23,54,0.08)] bg-card px-4 py-2 text-sm font-semibold text-accent shadow-[0_2px_8px_rgba(11,23,54,0.06)] hover:underline"
                  >
                    Tyre fitting in {n}
                  </Link>
                </li>
              ) : (
                <li
                  key={n}
                  className="inline-block rounded-full border border-[rgba(11,23,54,0.08)] bg-card px-4 py-2 text-sm font-medium text-muted-foreground"
                >
                  {n}
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            See{" "}
            <Link href={`/areas/${regionSlug}`} className="font-medium text-accent hover:underline">
              tyre fitting across {area.region}
            </Link>{" "}
            or all{" "}
            <Link href="/areas" className="font-medium text-accent hover:underline">
              areas we cover
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 8. LOCAL FAQS */}
      <section data-section="faq" className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="FAQs" title={`${area.town} Mobile Tyre Fitting FAQs`} />
          <div className="mx-auto mt-8 max-w-3xl divide-y border-y">
            {faqs.map((f) => (
              <details key={f.id} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left font-heading text-base font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span>{f.question}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-4 pt-0 leading-relaxed text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BAND (variant phrasing) */}
      <CtaBand
        phone={phone}
        whatsapp={whatsapp}
        title={`Need a tyre fitted in ${area.town}?`}
        subtitle={finalCtaSubtitle(area, pc)}
      />
    </>
  );
}

/** Look up helper re-exported for the route's metadata + params. */
export { getLiveArea };
