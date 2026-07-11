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

import { Hero } from "@/components/mobile-tyre-repair/hero";
import { Faq } from "@/components/mobile-tyre-repair/faq";
import { PageAnalytics } from "@/components/mobile-tyre-repair/page-analytics";
import {
  WhyDriving,
  Eligibility,
  WhatYouGet,
  Process,
  Availability,
  Causes,
  SealantVsRepair,
  VehiclesCovered,
  Costs,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/mobile-tyre-repair/content-sections";
import { FAQS, AREAS, PROCESS_STEPS, PRICE } from "@/lib/mobile-tyre-repair-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/mobile-tyre-repair";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Mobile Puncture Repair Near Me | 24/7, 60-Minute Response, BS AU 159",
    absoluteTitle: true,
    description:
      "Mobile puncture repair near you, 24/7 across the UK. BS AU 159 permanent plug-patch repairs at home, work or roadside. Free repairability assessment. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function MobileTyreRepairPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Mobile Tyre Repair", path: PAGE_PATH },
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
    name: `${settings.brandName} - Mobile Puncture Repair`,
    description:
      "24/7 mobile puncture repair at your home, work or roadside across UK mainland. Permanent BS AU 159 plug-patch repairs, 60-minute emergency response, free repairability assessment on every callout.",
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

  // 3. Service (provider, areaServed, hasOfferCatalog of repair-cluster services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Puncture Repair",
    name: "Mobile Puncture Repair",
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
      name: "Mobile Puncture Repair Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "BS AU 159 Puncture Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Slow Puncture Diagnosis" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Valve Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wheel Rebalancing" } },
      ],
    },
  };

  // 4. HowTo (the 5 repair steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How the Mobile Puncture Repair Process Works",
    description:
      "The mobile puncture repair process from booking to the 12-month workmanship guarantee, repaired permanently to BS AU 159 on-site.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (repair fee): £39, carried over from the merged puncture-repair page.
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Mobile Puncture Repair",
    description:
      "Permanent BS AU 159 plug-patch puncture repair including technician travel, full repairability assessment, internal inspection, valve check, wheel rebalance and pressure set. No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed quote before dispatch.",
    priceCurrency: "GBP",
    price: "39",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mobile Puncture Repair Near Me, At Home, Work or Roadside",
    description:
      "Mobile puncture repair near you, 24/7 across the UK. Permanent BS AU 159 plug-patch repairs, 60-minute emergency response, free repairability assessment.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".pricing-summary"],
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

      {/* 2. Why driving on a puncture costs more than the repair */}
      <Reveal><WhyDriving /></Reveal>

      {/* 3. Eligibility (signature YES/NO visual) */}
      <Reveal><Eligibility /></Reveal>

      {/* 4. What you get (trust tile grid) */}
      <Reveal><WhatYouGet /></Reveal>

      {/* 5. How the process works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 6. 24/7 availability */}
      <Reveal><Availability /></Reveal>

      {/* 7. Slow punctures, nails, screws and pressure loss */}
      <Reveal><Causes /></Reveal>

      {/* 8. Sealant kits vs permanent repair (replaces brand-tier grid slot) */}
      <Reveal><SealantVsRepair /></Reveal>

      {/* 9. Vehicles covered */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 10. Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Got a puncture right now?"
            subtitle={`24/7 UK coverage · 60-minute emergency response · permanent BS AU 159 repairs from ${PRICE}, repair fee waived if the tyre fails assessment.`}
          />
        </Reveal>
      </div>

      {/* 11. Costs (Offer schema above) */}
      <Reveal><Costs /></Reveal>

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
          <Faq faqs={FAQS} title="Mobile Puncture Repair FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Mobile Puncture Repair Near You"
            subtitle={`Book through the form with your postcode and registration, or call or WhatsApp 0788 328 8831 for an emergency callout. 24/7 cover, a 60-minute emergency response target, permanent BS AU 159 repairs from ${PRICE}. Available now across UK mainland postcodes from Tyre Fitting Near Me Ltd.`}
          />
        </Reveal>
      </div>
    </>
  );
}
