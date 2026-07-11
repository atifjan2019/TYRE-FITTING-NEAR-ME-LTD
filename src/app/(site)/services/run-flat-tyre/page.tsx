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

import { Hero } from "@/components/run-flat-tyre/hero";
import { Faq } from "@/components/run-flat-tyre/faq";
import { PageAnalytics } from "@/components/run-flat-tyre/page-analytics";
import {
  WhyReplace,
  RunFlatRules,
  WhatYouGet,
  Process,
  SwitchAdvice,
  VehiclesCovered,
  TyresFitted,
  Cost,
  Emergency,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/run-flat-tyre/content-sections";
import { FAQS, AREAS, PROCESS_STEPS } from "@/lib/run-flat-tyre-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/run-flat-tyre";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Run-Flat Tyre Replacement Near Me | Mobile Fitting, Correct Spec, UK",
    absoluteTitle: true,
    description:
      "Mobile run-flat tyre replacement at home, work or roadside. Correct manufacturer-approved run-flats fitted, £20 fitting fee, TPMS-aware specialists. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function RunFlatTyrePage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Run-Flat Tyre Replacement", path: PAGE_PATH },
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

  // 2. LocalBusiness (enriched: image, priceRange, 24/7 hours, sameAs)
  const business = localBusinessJsonLd({
    settings,
    name: `${settings.brandName} - Run-Flat Tyre Replacement`,
    description:
      "Mobile run-flat tyre replacement at your home, work or roadside across UK mainland. Correct manufacturer-approved run-flats matched from the VRN, £20 flat fitting fee per tyre, TPMS checked and reset, 24/7 emergency cover.",
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

  // 3. Service (provider, areaServed, hasOfferCatalog of run-flat services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Run-Flat Tyre Replacement",
    additionalType: "https://schema.org/AutoRepair",
    name: "Run-Flat Tyre Replacement",
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
      name: "Run-Flat Tyre Replacement Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Run-Flat Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Run-Flat Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Matched-Pair Run-Flat Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Run-Flat to Conventional Changeover" } },
      ],
    },
  };

  // 4. HowTo (the 5 replacement steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile Run-Flat Tyre Replacement Works",
    description:
      "The mobile run-flat replacement process from booking to the 12-month workmanship guarantee, with the correct manufacturer-approved run-flat matched from the VRN and fitted on-site.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (the £20 flat fitting fee per tyre).
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Run-Flat Tyre Fitting Fee (per tyre)",
    description:
      "Flat fitting fee per tyre covering technician travel, removal, fitment, balancing, valve, and disposal, with the TPMS checked and reset. The run-flat tyre itself is priced live from the VRN. No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed quote before dispatch.",
    priceCurrency: "GBP",
    price: "20",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Run-Flat Tyre Replacement Near Me, Fitted Where You Are",
    description:
      "Mobile run-flat tyre replacement at home, work or roadside. Correct manufacturer-approved run-flats fitted, £20 fitting fee, TPMS-aware specialists across UK mainland.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".replacement-only", ".run-flat-rules"],
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

      {/* 2. Why a punctured run-flat usually needs replacing (decision aid) */}
      <Reveal><WhyReplace /></Reveal>

      {/* 3. The run-flat rules (authority icon-card grid) */}
      <Reveal><RunFlatRules /></Reveal>

      {/* 4. What you get (trust tile grid) */}
      <Reveal><WhatYouGet /></Reveal>

      {/* 5. How the process works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 6. Should you switch to conventional tyres? */}
      <Reveal><SwitchAdvice /></Reveal>

      {/* 7. Vehicles and run-flat types covered (markings tag row) */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 8. Run-flat tyres fitted (tyre-only "from £90" anchor, priced live) */}
      <Reveal><TyresFitted /></Reveal>

      {/* 9. Run-flat tyre replacement cost (Offer schema above) */}
      <Reveal><Cost /></Reveal>

      {/* 10. Emergency replacement 24/7 */}
      <Reveal><Emergency /></Reveal>

      {/* Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Run-flat warning on?"
            subtitle="24/7 UK mainland cover · 30 to 60 minute typical emergency response · the correct run-flat matched from the VRN and brought to you before the 50-mile run-on limit."
          />
        </Reveal>
      </div>

      {/* 11. Why drivers choose us */}
      <Reveal><WhyChoose /></Reveal>

      {/* 12. Pre-arrival checklist */}
      <Reveal><Checklist /></Reveal>

      {/* 13. Coverage across the UK */}
      <Reveal><AreasCoverage /></Reveal>

      {/* 14. Illustrative scenario */}
      <Reveal><CaseStudy /></Reveal>

      {/* 15. FAQs (FAQPage schema above) */}
      <div data-section="faq">
        <Reveal>
          <Faq faqs={FAQS} title="Run-Flat Tyre Replacement FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Run-Flat Tyre Replacement Near You"
            subtitle="Enter the registration and postcode in the form for planned replacement, or call and WhatsApp 0788 328 8831 for an active run-flat warning. Replacing run-flat tyres across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd."
          />
        </Reveal>
      </div>
    </>
  );
}
