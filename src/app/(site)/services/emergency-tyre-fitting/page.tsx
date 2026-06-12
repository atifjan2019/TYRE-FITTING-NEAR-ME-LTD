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
import { Reveal } from "@/components/ui/reveal";

import { Hero } from "@/components/emergency-tyre-fitting/hero";
import { Faq } from "@/components/emergency-tyre-fitting/faq";
import { PageAnalytics } from "@/components/emergency-tyre-fitting/page-analytics";
import { EmergencyCtaBand, StickyCallBar } from "@/components/emergency-tyre-fitting/cta";
import {
  SafetySteps,
  Emergencies,
  WhatYouGet,
  Process,
  ResponseTimes,
  RepairOrReplace,
  Pricing,
  VehiclesCovered,
  Nights,
  WhyChoose,
  AreasCoverage,
  CaseStudy,
  CallNow,
} from "@/components/emergency-tyre-fitting/content-sections";
import { FAQS, AREAS, PROCESS_STEPS } from "@/lib/emergency-tyre-fitting-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/emergency-tyre-fitting";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "24/7 Emergency Tyre Fitting Near Me | 30-60 Min Response, UK",
    absoluteTitle: true,
    description:
      "Emergency tyre fitting 24/7 across the UK. Blowouts, flats, no spare. 30 to 60 minute typical response, transparent pricing. Call 0788 328 8831 now.",
    path: PAGE_PATH,
  });
}

export default async function EmergencyTyreFittingPage() {
  const settings = await getSiteSettings();
  const { phone } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Emergency Tyre Fitting", path: PAGE_PATH },
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
    contactType: "emergency",
    areaServed: "GB",
    availableLanguage: ["English"],
  };
  if (logoUrl) organization.image = logoUrl;

  // 2. LocalBusiness (enriched: image, priceRange, explicit 24/7 hours, sameAs)
  const business = localBusinessJsonLd({
    settings,
    name: `${settings.brandName} - 24/7 Emergency Tyre Fitting`,
    description:
      "24/7 emergency tyre fitting at the roadside, home or work across UK mainland. Blowouts, flats and no-spare callouts, 30 to 60 minute typical response, no call-out fee, BS AU 159 roadside repair where the tyre passes assessment.",
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

  // 3. Service (serviceType + AutoRepair additionalType + hasOfferCatalog)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Emergency Tyre Fitting",
    additionalType: "https://schema.org/AutoRepair",
    name: "24/7 Emergency Tyre Fitting",
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
      name: "Emergency Tyre Fitting Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Tyre Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roadside Puncture Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Locking Wheel Nut Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TPMS Reset" } },
      ],
    },
  };

  // 4. HowTo (the 5 emergency callout steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How the Emergency Callout Works",
    description:
      "The emergency tyre fitting callout from the first phone call to the 12-month workmanship guarantee, with the tyre fitted or repaired on-site.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (the £20 flat fitting fee, Variant A: no call-out fee).
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Emergency Tyre Fitting Fee",
    description:
      "Flat fitting fee per tyre, including technician travel, removal, fitment, wheel balancing, a new valve and old tyre disposal. No call-out fee at any hour, day or night, 365 days a year. The fitting fee and the tyre price are the only charges, quoted in full before dispatch.",
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
    name: "24/7 Emergency Tyre Fitting Near Me, Across the UK",
    description:
      "24/7 emergency tyre fitting across the UK. Blowouts, flats and no-spare callouts, 30 to 60 minute typical response, transparent pricing.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".safety-steps"],
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

      {/* 1. Phone-first hero with collapsible booking form */}
      <Hero phone={phone} />

      {/* 2. Stranded? Do these five things first (safety, speakable target) */}
      <Reveal><SafetySteps /></Reveal>

      {/* 3. Tyre emergencies we handle (icon card grid) */}
      <Reveal><Emergencies /></Reveal>

      {/* 4. What you get */}
      <Reveal><WhatYouGet /></Reveal>

      {/* 5. How the callout works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 6. Response times */}
      <Reveal><ResponseTimes /></Reveal>

      {/* 7. Repair or replace at the roadside */}
      <Reveal><RepairOrReplace /></Reveal>

      {/* 8. Mid-page phone-first CTA */}
      <div data-section="mid-cta">
        <Reveal>
          <EmergencyCtaBand
            title="Stranded right now?"
            subtitle="One call gets the nearest fitter moving. 30 to 60 minute typical response, no call-out fee, the line answered 24/7."
          />
        </Reveal>
      </div>

      {/* 9. Emergency pricing (Offer schema above) */}
      <Reveal><Pricing /></Reveal>

      {/* 10. Vehicles covered */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 11. Night, weekend and bank holiday */}
      <Reveal><Nights /></Reveal>

      {/* 12. Why drivers choose us */}
      <Reveal><WhyChoose /></Reveal>

      {/* 13. Coverage across the UK */}
      <Reveal><AreasCoverage /></Reveal>

      {/* 14. Illustrative scenario */}
      <Reveal><CaseStudy /></Reveal>

      {/* 15. FAQs (FAQPage schema above) */}
      <div data-section="faq">
        <Reveal>
          <Faq faqs={FAQS} title="Emergency Tyre Fitting FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final phone-first conversion CTA (brand mention 3 of 3) */}
      <Reveal><CallNow /></Reveal>

      {/* Sticky mobile call bar: highest-converting element, every scroll pos */}
      <StickyCallBar />
    </>
  );
}
