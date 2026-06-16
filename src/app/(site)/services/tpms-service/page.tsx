import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import {
  buildMetadata,
  localBusinessJsonLd,
  organizationJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";

import { Hero } from "@/components/tpms-service/hero";
import { Faq } from "@/components/tpms-service/faq";
import { PageAnalytics } from "@/components/tpms-service/page-analytics";
import {
  ThreeJobs,
  WhatIsTpms,
  ValveVsSensor,
  WhyMot,
  Process,
  WithEveryTyreChange,
  DirectIndirect,
  Costs,
  VehiclesCovered,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/tpms-service/content-sections";
import { FAQS, AREAS, PROCESS_STEPS, PRICE } from "@/lib/tpms-service-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/tpms-service";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "TPMS Service Near Me | Mobile Valve Service, Sensor Replacement, UK",
    absoluteTitle: true,
    description:
      "Mobile TPMS service at home or work. TPMS valve service, sensor replacement, and warning light reset. Pass your MOT, fix the light. From £15. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function TpmsServicePage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "TPMS Service", path: PAGE_PATH },
  ];

  // --- JSON-LD: 8 discrete schema blocks, one <script> each ------------------
  const logoUrl = settings.logo
    ? settings.logo.startsWith("http")
      ? settings.logo
      : `${SITE.url}${settings.logo}`
    : undefined;
  const socials = (
    [settings.facebookUrl, settings.instagramUrl, settings.tiktokUrl] as (string | null)[]
  ).filter((u): u is string => Boolean(u));

  // 1. Organization (enriched: contactPoint + image)
  const organization = organizationJsonLd({ settings }) as Record<string, unknown>;
  organization.contactPoint = {
    "@type": "ContactPoint",
    telephone: "+447883288831",
    email: "bookings@tyrefittingnearme.co.uk",
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: ["English"],
  };
  if (logoUrl) organization.image = logoUrl;

  // 2. LocalBusiness (enriched: image, priceRange, daily hours, sameAs)
  const business = localBusinessJsonLd({
    settings,
    name: `${settings.brandName} - TPMS Service`,
    description:
      "Mobile TPMS service at your home, workplace or roadside across UK mainland. TPMS valve service, sensor replacement and diagnostic warning light reset, MOT-ready, every day of the year.",
    url: PAGE_URL,
    areaServed: AREAS.map((a) => a.region),
    image: settings.defaultOgImage,
  }) as Record<string, unknown>;
  if (logoUrl) business.image = logoUrl;
  business.priceRange = "££";
  business.openingHoursSpecification = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  };
  if (socials.length) business.sameAs = socials;

  // 3. Service (provider, areaServed, hasOfferCatalog of TPMS-cluster services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "TPMS Service",
    additionalType: "https://schema.org/AutoRepair",
    name: "TPMS Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Tyre Fitting Near Me Ltd",
      telephone: "+447883288831",
      email: "bookings@tyrefittingnearme.co.uk",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "London" },
      { "@type": "AdministrativeArea", name: "Kent" },
      { "@type": "AdministrativeArea", name: "Sussex" },
      { "@type": "AdministrativeArea", name: "Essex" },
      { "@type": "AdministrativeArea", name: "West Midlands" },
      { "@type": "AdministrativeArea", name: "Scotland" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "TPMS Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TPMS Valve Service" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TPMS Sensor Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TPMS Diagnostic and Reset" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile TPMS Service" } },
      ],
    },
  };

  // 4. HowTo (the 5 service steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile TPMS Service Works",
    description:
      "The mobile TPMS service process from booking to relearn and sign-off, with a diagnostic that confirms the cause before any part is fitted.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (per-wheel valve service fee). Benchmarked against UK mobile TPMS
  // services. Schema price is the numeric value only (no symbol).
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "TPMS Valve Service",
    description:
      "Per-wheel TPMS valve service replacing the perishable grommet, valve core, cap and retaining nut, including technician travel and a diagnostic to confirm the cause. No call-out fee in standard hours.",
    priceCurrency: "GBP",
    price: "15", // per-wheel valve service; sensor replacement £45, diagnostic and reset £25.
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "TPMS Service Near Me, Valve Service, Sensor Replacement and Reset",
    description:
      "Mobile TPMS service at home or work. TPMS valve service, sensor replacement and warning light reset, MOT-ready across UK mainland.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".tpms-definition", ".valve-vs-sensor"],
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Tyre Fitting Near Me Ltd",
      url: SITE.url,
    },
  };

  return (
    <>
      {/* Structured data: 8 discrete blocks, each a uniquely-id'd <script> */}
      <JsonLd id="schema-organization" data={organization} />
      <JsonLd id="schema-localbusiness" data={business} />
      <JsonLd id="schema-breadcrumb" data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        id="schema-faq"
        data={faqPageJsonLd(FAQS.map((f) => ({ question: f.question, answer: f.answer })))}
      />
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd id="schema-howto" data={howToSchema} />
      <JsonLd id="schema-offer" data={offerSchema} />
      <JsonLd id="schema-webpage" data={webPageSchema} />

      {/* Client-only conversion tracking (GA4 / dataLayer) */}
      <PageAnalytics />

      {/* 1. Hero with booking form */}
      <Hero phone={phone} whatsapp={whatsapp} />

      {/* 2. The three TPMS jobs (disambiguation icon row) */}
      <Reveal><ThreeJobs /></Reveal>

      {/* 3. What is a TPMS service? */}
      <Reveal><WhatIsTpms /></Reveal>

      {/* 4. Valve service vs sensor replacement (SIGNATURE visual) */}
      <Reveal><ValveVsSensor /></Reveal>

      {/* 5. Why a TPMS warning light fails your MOT */}
      <Reveal><WhyMot /></Reveal>

      {/* 6. How mobile TPMS service works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 7. TPMS valve service with every tyre change (cluster attach) */}
      <Reveal><WithEveryTyreChange /></Reveal>

      {/* 8. Direct and indirect TPMS */}
      <Reveal><DirectIndirect /></Reveal>

      {/* 9. Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="TPMS warning light on before an MOT?"
            subtitle={`Mobile valve service, sensor replacement and warning light reset across UK mainland. Valve service from ${PRICE} per wheel, diagnostic confirms the cause first.`}
          />
        </Reveal>
      </div>

      {/* 10. TPMS service cost (Offer schema above) */}
      <Reveal><Costs /></Reveal>

      {/* 11. Vehicles and TPMS systems covered */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 12. Why drivers choose us */}
      <Reveal><WhyChoose /></Reveal>

      {/* 13. Pre-arrival checklist */}
      <Reveal><Checklist /></Reveal>

      {/* 14. Coverage across the UK */}
      <Reveal><AreasCoverage /></Reveal>

      {/* 15. Illustrative scenario */}
      <Reveal><CaseStudy /></Reveal>

      {/* 16. FAQs (FAQPage schema above) */}
      <div data-section="faq">
        <Reveal>
          <Faq faqs={FAQS} title="TPMS Service FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book TPMS Service Near You"
            subtitle={`Enter the registration and postcode in the form for a planned service, or call and WhatsApp 0788 328 8831 for a warning light before an MOT. Servicing tyre pressure monitoring systems across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd.`}
          />
        </Reveal>
      </div>
    </>
  );
}
