import Link from "next/link";
import { MapPin, Check, ChevronDown, ArrowRight } from "lucide-react";
import type { Region } from "@/data/regions";
import type { SiteSettingsData } from "@/lib/data";
import { SITE } from "@/lib/site-config";
import {
  localBusinessJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/sections/section-heading";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { CtaBand } from "@/components/sections/cta-band";

/** Join a list naturally with commas and a final "and". */
function naturalList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const SUCCESS = "#1B9C5D";

/** Four trust points, mirroring the pillar's trust row. */
const TRUST_TICKS = [
  "All tyre brands and sizes",
  "Fitted and balanced on site",
  "Old tyre disposal included",
  "Same-day and 24/7 emergency",
];

/**
 * Money-page down-links. The first card links UP to the pillar (the only pillar
 * link on the page); the rest route to the service money pages. Anchors are
 * varied so no exact-match anchor repeats.
 */
const SERVICES: { href: string; anchor: string; line: string }[] = [
  {
    href: "/services/mobile-tyre-fitting",
    anchor: "Mobile tyre fitting",
    line: "Tyres supplied and fitted at your home, work or roadside, balanced on the spot.",
  },
  {
    href: "/services/puncture-repair",
    anchor: "Puncture repair",
    line: "Slow punctures, nails and screws assessed and repaired to BS AU 159 where safe.",
  },
  {
    href: "/services/emergency-tyre-fitting",
    anchor: "24/7 emergency callout",
    line: "Round-the-clock cover for blowouts and flats, day or night, every day of the year.",
  },
  {
    href: "/services/wheel-balancing",
    anchor: "On-site wheel balancing",
    line: "Calibrated mobile balancing that clears steering vibration and uneven wear.",
  },
  {
    href: "/services/locking-wheel-nut-removal",
    anchor: "Locking wheel nut removal",
    line: "Stubborn or keyless locking nuts removed without damaging the alloy.",
  },
  {
    href: "/services/tpms-service",
    anchor: "TPMS sensor service",
    line: "Pressure sensor diagnosis, replacement and reset to clear the dashboard warning.",
  },
  {
    href: "/services/run-flat-tyre",
    anchor: "Run-flat replacement",
    line: "Correct run-flat tyres matched to your vehicle and fitted in place.",
  },
  {
    href: "/services/van-tyre-fitting",
    anchor: "Van and fleet fitting",
    line: "Light commercial and fleet cover for vans up to 3.5 tonnes.",
  },
];

export function RegionTemplate({
  region,
  settings,
}: {
  region: Region;
  settings: SiteSettingsData;
}) {
  const { phone, whatsapp } = settings;
  const pageUrl = `${SITE.url}/areas/${region.slug}`;
  const pcAreas = naturalList(region.postcodeAreas);
  const liveTowns = region.towns.filter((t) => t.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: region.name, path: `/areas/${region.slug}` },
  ];

  const overviewLine = `Mobile tyre fitting across ${region.name} covers the ${pcAreas} postcode areas, with the nearest insured fitter dispatched to each one.`;

  // --- FAQ (answers rendered into the DOM and mirrored into FAQPage schema) ---
  const liveLinked = liveTowns.length > 0;
  const faqs: { id: string; question: string; answer: React.ReactNode; text: string }[] = [
    {
      id: "towns",
      question: `Which towns in ${region.name} do you cover?`,
      answer: (
        <>
          Coverage spans {region.towns.length} towns across {region.name}, from {region.headlineTowns[0]} to{" "}
          {region.headlineTowns[1]}. See the{" "}
          <Link href="/areas" className="font-semibold text-accent underline">
            full list of areas we cover
          </Link>{" "}
          for the towns with a dedicated local page.
        </>
      ),
      text: `Coverage spans ${region.towns.length} towns across ${region.name}, from ${region.headlineTowns[0]} to ${region.headlineTowns[1]}. See the full list of areas we cover for the towns with a dedicated local page.`,
    },
    {
      id: "how-fast",
      question: `How quickly can you reach ${region.name}?`,
      answer: (
        <>
          A response of 30 to 60 minutes is typical across {region.name}, postcode-dependent, with the realistic
          arrival window confirmed when you call.
        </>
      ),
      text: `A response of 30 to 60 minutes is typical across ${region.name}, postcode-dependent, with the realistic arrival window confirmed when you call.`,
    },
    {
      id: "night",
      question: `Do you come out across ${region.name} at night?`,
      answer: (
        <>
          Yes. We run 24/7, 365 days a year through 2026, so a fitter reaches drivers in {region.name} day or
          night, weekends and bank holidays included.
        </>
      ),
      text: `Yes. We run 24/7, 365 days a year through 2026, so a fitter reaches drivers in ${region.name} day or night, weekends and bank holidays included.`,
    },
    {
      id: "cost",
      question: `How much does tyre fitting cost in ${region.name}?`,
      answer: (
        <>
          Fitting is a flat £20 fee per tyre plus the price of the tyre, quoted in full before dispatch, with no
          call-out fee during standard hours.
        </>
      ),
      text: `Fitting is a flat £20 fee per tyre plus the price of the tyre, quoted in full before dispatch, with no call-out fee during standard hours.`,
    },
    {
      id: "headline",
      question: `Do you cover ${region.headlineTowns[0]} and ${region.headlineTowns[1]}?`,
      answer: (
        <>
          Yes, both {region.headlineTowns[0]} and {region.headlineTowns[1]} are covered, along with the
          surrounding {pcAreas} postcode areas{liveLinked ? " and the towns linked above" : ""}.
        </>
      ),
      text: `Yes, both ${region.headlineTowns[0]} and ${region.headlineTowns[1]} are covered, along with the surrounding ${pcAreas} postcode areas.`,
    },
  ];

  // --- Schema -----------------------------------------------------------------
  const business = localBusinessJsonLd({
    settings,
    name: `Tyre Fitting Near Me Ltd - Mobile Tyre Fitting in ${region.name}`,
    description: `Mobile tyre fitting across ${region.name}, covering the ${region.postcodeAreas.join(
      ", "
    )} postcode areas 24/7 with a 30 to 60 minute typical response.`,
    url: pageUrl,
    areaServed: [region.name, ...region.postcodeAreas],
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
    name: `Mobile Tyre Fitting in ${region.name}`,
    description: `Mobile tyre fitting, puncture repair and replacement across ${region.name}, fitted at the customer's home, workplace or roadside.`,
    provider: { "@id": `${pageUrl}#business` },
    areaServed: [
      { "@type": "AdministrativeArea", name: region.name },
      ...region.postcodeAreas.map((p) => ({ "@type": "PostalCodeRangeSpecification", postalCode: p })),
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Towns covered in ${region.name}`,
    itemListElement: region.towns.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      ...(t.slug ? { url: `${SITE.url}/areas/${t.slug}` } : {}),
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Mobile Tyre Fitting in ${region.name}`,
    url: pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".region-overview"],
    },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <JsonLd id="schema-localbusiness" data={business} />
      <JsonLd id="schema-breadcrumb" data={breadcrumbJsonLd(crumbs)} />
      <JsonLd id="schema-faq" data={faqPageJsonLd(faqs.map((f) => ({ question: f.question, answer: f.text })))} />
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd id="schema-itemlist" data={itemList} />
      <JsonLd id="schema-webpage" data={webPageSchema} />

      {/* 1. HERO */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
          <Breadcrumbs items={crumbs} light />
          <h1 className="mt-5 max-w-3xl font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Tyre Fitting in {region.name}
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <p className="region-overview mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            Mobile tyre fitting across {region.name} and the {pcAreas} postcode areas, with fitters who come to
            your home, workplace or roadside. Through 2026 we run 24/7 with a 30 to 60 minute typical response, so
            a flat or a worn tyre is sorted without a garage trip.
          </p>
          <p className="mt-4 text-base font-bold text-accent sm:text-lg">
            £20 flat fitting fee per tyre. No call-out fee, ever.
          </p>
          <CtaButtons
            phone={phone}
            whatsapp={whatsapp}
            message={`Hi, I need mobile tyre fitting in ${region.name}. My location is … and my tyre size is …`}
            className="mt-8"
          />
        </div>
      </section>

      {/* 2. TRUST TICKS */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_TICKS.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm font-medium text-foreground/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: SUCCESS }} aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. REGIONAL OVERVIEW */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Coverage</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Tyre Fitting Across {region.name}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            {overviewLine} Drivers reach a fitter along the{" "}
            {region.roads.map((road, i) => (
              <span key={road}>
                <strong className="font-semibold text-primary">{road}</strong>
                {i < region.roads.length - 2 ? ", " : i === region.roads.length - 2 ? " and " : ""}
              </span>
            ))}
            , whether a tyre fails on a fast dual carriageway or a wheel is kerbed near home. {region.contextNote}{" "}
            Home, workplace and roadside fitting all run to the same flat fee, so a {region.name} driver books once
            and a fitter arrives with the correct tyres already loaded.
          </p>
        </div>
      </section>

      {/* 4. TOWNS WE COVER (signature coverage grid) */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Local to you"
            title={`Towns We Cover in ${region.name}`}
            subtitle={`Pick a town for local coverage, response times and the nearest fitter across ${region.name}.`}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {region.towns.map((town) => {
              const pc = town.postcodes[0];
              if (town.slug) {
                return (
                  <Link
                    key={town.name}
                    href={`/areas/${town.slug}`}
                    aria-label={`Mobile tyre fitting in ${town.name}`}
                    className="group flex h-full flex-col rounded-[14px] border border-[#E7EAF0] bg-card p-6 shadow-[0_2px_8px_rgba(11,23,54,0.06)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(11,23,54,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
                        <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                        {town.name}
                      </h3>
                      <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                        {pc}
                      </span>
                    </div>
                    <p className="mt-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      30 to 60 min · 24/7
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      View {town.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                );
              }
              return (
                <div
                  key={town.name}
                  className="flex h-full flex-col rounded-[14px] border border-[#E7EAF0] bg-card/60 p-6"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-muted-foreground">
                      <MapPin className="h-5 w-5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                      {town.name}
                    </h3>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
                      {pc}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-muted-foreground">Coverage available</p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            See all{" "}
            <Link href="/areas" className="font-semibold text-accent hover:underline">
              areas we cover
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 5. OUR SERVICES (compact down-links) */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Services" title={`Our Services Across ${region.name}`} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex h-full flex-col rounded-[14px] border border-[#E7EAF0] bg-card p-6 shadow-[0_2px_8px_rgba(11,23,54,0.06)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(11,23,54,0.1)] motion-reduce:transform-none"
              >
                <h3 className="font-heading text-base font-bold text-primary">{s.anchor}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.line}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING (standout navy band) */}
      <section className="bg-primary text-primary-foreground">
        <div className="section-pad mx-auto max-w-4xl px-4 text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Pricing</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Transparent Pricing in {region.name}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-2xl font-extrabold sm:text-3xl">
            £20 flat fitting fee per tyre. <span className="text-accent">No call-out fee, ever.</span>
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            The tyre is priced by its size and quoted in full before a fitter is dispatched, so the figure agreed
            is the figure paid. Premium, mid-range and budget options cover every vehicle and budget across{" "}
            {region.name}.
          </p>
        </div>
      </section>

      {/* 7. WHY DRIVERS CHOOSE US */}
      <section className="section-pad bg-secondary">
        <div className="prose-col px-4">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Why us</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Why Drivers in {region.name} Choose Us
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Open 24/7, including nights, weekends and bank holidays.",
              `A 30 to 60 minute typical response across ${region.name}, postcode-dependent.`,
              "We come to you, with no drive to a garage and no ordering tyres online first.",
              "An honest repair before replacement where a puncture passes assessment.",
              "A 12-month workmanship guarantee on every fitting.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-base leading-relaxed text-foreground/85">
                <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: SUCCESS }} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. FAQ */}
      <section data-section="faq" className="section-pad bg-background">
        <div className="mx-auto max-w-3xl px-4">
          <SectionHeading eyebrow="FAQs" title={`${region.name} Mobile Tyre Fitting FAQs`} />
          <div className="mt-8 divide-y border-y">
            {faqs.map((f) => (
              <details key={f.id} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-heading text-base font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span>{f.question}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-4 leading-relaxed text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BAND */}
      <CtaBand
        phone={phone}
        whatsapp={whatsapp}
        title={`Book mobile tyre fitting in ${region.name} today`}
        subtitle="Call or WhatsApp us. We'll come to you, day or night."
        message={`Hi, I need mobile tyre fitting in ${region.name}.`}
      />
    </>
  );
}
