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

import { Hero } from "@/components/wheel-balancing/hero";
import { Faq } from "@/components/wheel-balancing/faq";
import { PageAnalytics } from "@/components/wheel-balancing/page-analytics";
import {
  SignsGrid,
  VsAlignment,
  WhatYouGet,
  Process,
  Availability,
  WhenToBook,
  DynamicBalancing,
  VehiclesCovered,
  Costs,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/wheel-balancing/content-sections";
import { FAQS, AREAS, PROCESS_STEPS, PRICE } from "@/lib/wheel-balancing-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/wheel-balancing";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Mobile Wheel Balancing Near Me | We Come to You, 24/7 UK",
    absoluteTitle: true,
    description:
      "Mobile wheel balancing at your home, work or roadside. Fix steering wheel vibration at 40-70mph. Calibrated digital balancing, [£7.99] per wheel. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function WheelBalancingPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Wheel Balancing", path: PAGE_PATH },
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
    name: `${settings.brandName} - Mobile Wheel Balancing`,
    description:
      "24/7 mobile wheel balancing at your home, work or roadside across UK mainland. Calibrated digital dual-plane balancing, dynamic balancing as standard, 60-minute emergency response, wheels up to 20 inches.",
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

  // 3. Service (provider, areaServed, hasOfferCatalog of balancing-cluster services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Wheel Balancing",
    name: "Mobile Wheel Balancing",
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
      name: "Mobile Wheel Balancing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dynamic Wheel Balancing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vibration Diagnosis" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wheel Weight Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pressure and Torque Check" } },
      ],
    },
  };

  // 4. HowTo (the 5 balancing steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How the Mobile Wheel Balancing Process Works",
    description:
      "The mobile wheel balancing process from booking to the 12-month workmanship guarantee, balanced with a calibrated digital dual-plane balancer on-site.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (per-wheel price). NOTE: replace the "[£7.99]" placeholder with the
  // real numeric price (e.g. "7.99") before deploy.
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Mobile Wheel Balancing",
    description:
      "Calibrated digital dual-plane wheel balancing per wheel, including technician travel, wheel-off inspection, digital spin measurement, counterweight correction, re-spin to zero, pressure set and torque to specification. No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed quote before dispatch.",
    priceCurrency: "GBP",
    price: PRICE, // "[£7.99]" placeholder, replace with the real figure before deploy.
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mobile Wheel Balancing Near Me, At Home, Work or Roadside",
    description:
      "Mobile wheel balancing near you, 24/7 across the UK. Calibrated digital dual-plane balancing, fix steering vibration at 40-70mph, wheels up to 20 inches.",
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

      {/* 2. Signs your wheels need balancing (signature icon card grid) */}
      <Reveal><SignsGrid /></Reveal>

      {/* 3. Wheel balancing vs wheel alignment (signature comparison table) */}
      <Reveal><VsAlignment /></Reveal>

      {/* 4. What you get (trust tile grid + sibling links) */}
      <Reveal><WhatYouGet /></Reveal>

      {/* 5. How the process works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 6. 24/7 availability */}
      <Reveal><Availability /></Reveal>

      {/* 7. When wheels need balancing */}
      <Reveal><WhenToBook /></Reveal>

      {/* 8. Dynamic balancing explained */}
      <Reveal><DynamicBalancing /></Reveal>

      {/* 9. Vehicles covered */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 10. Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Steering wheel shaking at speed?"
            subtitle={`24/7 UK coverage · 60-minute emergency response · calibrated digital dual-plane balancing from ${PRICE} per wheel.`}
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
          <Faq faqs={FAQS} title="Mobile Wheel Balancing FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Mobile Wheel Balancing Near You"
            subtitle={`Book through the form with your postcode, registration and a short symptom note, or call or WhatsApp 0788 328 8831. We come to you, ${PRICE} per wheel, 24/7. Available now across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd.`}
          />
        </Reveal>
      </div>
    </>
  );
}
