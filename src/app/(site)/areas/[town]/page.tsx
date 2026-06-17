import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, localBusinessJsonLd, faqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { CtaBand } from "@/components/sections/cta-band";
import { BookingForm } from "@/components/forms/booking-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { LIVE_AREAS, getLiveArea, LIVE_TOWN_SLUG_BY_NAME, type Area } from "@/data/areas";

export const revalidate = 3600;

/** Only live slugs are built. Pending towns are not pre-rendered. */
export function generateStaticParams() {
  return LIVE_AREAS.map((a) => ({ town: a.slug }));
}

/** Join a list naturally with commas and a final "and". */
function naturalList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** The money-page services offered in every town (descriptive anchors). */
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

function localFaqs(area: Area): { id: string; question: string; answer: string }[] {
  const pc = naturalList(area.postcodes);
  const others = area.postcodes.slice(1);
  return [
    {
      id: "how-quick",
      question: `How quickly can you reach ${area.town}?`,
      answer: `A response of 30 to 60 minutes is typical across the ${pc} area, postcode-dependent, with the realistic arrival time confirmed when you call.`,
    },
    {
      id: "postcode",
      question: `Do you cover ${area.postcodes[0]}?`,
      answer: others.length
        ? `Yes. We cover ${area.postcodes[0]}, ${naturalList(others)} and the surrounding ${area.town} area.`
        : `Yes. We cover ${area.postcodes[0]} and the surrounding ${area.town} area.`,
    },
    {
      id: "night",
      question: `Do you come out to ${area.town} at night?`,
      answer: `Yes. We run 24/7, 365 days a year, so a fitter reaches ${area.town} day or night, including weekends and bank holidays.`,
    },
    {
      id: "cost",
      question: `How much is tyre fitting in ${area.town}?`,
      answer: `Fitting is a £20 flat fee per tyre plus the tyre price, quoted in full before we dispatch, with no call-out fee in standard hours.`,
    },
    {
      id: "near",
      question: `Which areas near ${area.town} do you cover?`,
      answer: `We cover ${naturalList(area.neighbours)}, plus the wider ${area.region} area.`,
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  const area = getLiveArea(town);
  if (!area) return buildMetadata({ title: "Area not found", description: "", noindex: true });
  return buildMetadata({
    title: `Mobile Tyre Fitting in ${area.town} (${area.postcodes[0]}) | 24/7, We Come to You`,
    absoluteTitle: true,
    description: `Mobile tyre fitting in ${area.town} and ${area.neighbours[0]}, covering ${area.postcodes.join(
      ", "
    )}. 24/7 emergency callout, 30 to 60 minute response, tyres fitted at your home or roadside. Call 0788 328 8831.`,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaTownPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town } = await params;
  const area = getLiveArea(town);
  if (!area) notFound();

  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;
  const pageUrl = `${SITE.url}/areas/${area.slug}`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: area.town, path: `/areas/${area.slug}` },
  ];

  const faqs = localFaqs(area);
  const pc = naturalList(area.postcodes);

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
      cssSelector: ["h1", ".local-coverage"],
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
              Mobile tyre fitting across {area.town} and the surrounding {pc} postcode area, covering{" "}
              {naturalList(area.neighbours)}, with fitters reaching the {area.roads[0]} and nearby
              roads. Open 24/7, with a 30 to 60 minute typical response.
            </p>
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

      {/* 2. LOCAL COVERAGE (unique-data block, speakable target) */}
      <section className="section-pad bg-background">
        <div className="local-coverage prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Tyre Fitting Across {area.town} and Nearby
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              We cover the {naturalList(area.postcodes)} postcode{area.postcodes.length > 1 ? "s" : ""} in and
              around {area.town}, fitting tyres at your home, workplace or roadside.
            </p>
            <p>
              Neighbouring areas covered from the same {area.town} dispatch include{" "}
              {naturalList(area.neighbours)}.
            </p>
            <p>
              Local fitters work the {naturalList(area.roads)}, so a callout reaches you quickly across
              the {area.town} road network.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SERVICES IN TOWN */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Services"
            title={`Our Tyre Services in ${area.town}`}
            subtitle={`Every mobile service is available in ${area.town} and the surrounding ${pc} area, fitted on-site by an insured technician.`}
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="surface-card surface-card-hover flex items-center justify-between p-4 text-sm font-semibold text-primary"
              >
                <span>{s.label}</span>
                <span className="text-accent">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY DRIVERS CHOOSE US */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Why Drivers in {area.town} Choose Tyre Fitting Near Me Ltd
          </h2>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed text-foreground/80">
            <li>We come to you in {area.town}, with no drive to a garage and no ordering tyres online first.</li>
            <li>Open 24/7, including nights, weekends and bank holidays.</li>
            <li>A 30 to 60 minute typical response across the {pc} area.</li>
            <li>A transparent £20 flat fitting fee per tyre, quoted before dispatch.</li>
            <li>An honest repair before replacement where a puncture passes assessment.</li>
            <li>A 12-month workmanship guarantee on every fitting.</li>
          </ul>
        </div>
      </section>

      {/* 5. RESPONSE TIME */}
      <section className="section-pad bg-secondary">
        <div className="prose-col px-4">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            How Fast We Reach {area.town}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              A response of 30 to 60 minutes is typical across the {pc} area, postcode-dependent, with the
              realistic arrival time confirmed on the call.
            </p>
            <p>
              For an emergency on the {area.roads[0]}, the nearest fitter is dispatched immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LOCAL SCENARIO */}
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
              A driver with a flat near the {area.roads[0]} in {area.town} books a callout. The fitter
              arrives within the typical 30 to 60 minute window, fits the correct tyre at the kerb, and
              has the driver moving again without a garage trip.
            </p>
          </div>
        </div>
      </section>

      {/* 7. AREAS NEAR TOWN (sideways cluster links to live neighbours only) */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={`Areas We Cover Near ${area.town}`} />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {area.neighbours.map((n) => {
              const slug = LIVE_TOWN_SLUG_BY_NAME[n.toLowerCase()];
              return slug ? (
                <li key={n}>
                  <Link
                    href={`/areas/${slug}`}
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
            See all{" "}
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

      {/* 9. FINAL CTA BAND */}
      <CtaBand
        phone={phone}
        whatsapp={whatsapp}
        title={`Need a tyre fitted in ${area.town}?`}
        subtitle={`Call or WhatsApp 0788 328 8831 for a 30 to 60 minute response across the ${pc} area. Mobile tyre fitting at your home, work or roadside, 24/7.`}
      />
    </>
  );
}
