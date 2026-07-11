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

import { Hero } from "@/components/van-tyre-fitting/hero";
import { Faq } from "@/components/van-tyre-fitting/faq";
import { PageAnalytics } from "@/components/van-tyre-fitting/page-analytics";
import { VanCtaBand } from "@/components/van-tyre-fitting/cta";
import {
  WhyDowntime,
  LoadRating,
  WhatYouGet,
  Process,
  Fleet,
  ModelsCovered,
  TyreOptions,
  Costs,
  EmergencyBridge,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/van-tyre-fitting/content-sections";
import { FAQS, AREAS, PROCESS_STEPS } from "@/lib/van-tyre-fitting-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/van-tyre-fitting";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Van Tyre Fitting Near Me | Mobile, C-Rated, Fleet Accounts, UK",
    absoluteTitle: true,
    description:
      "Mobile van tyre fitting at your depot, site or home. C-rated and reinforced van tyres, correct load index guaranteed, £20 fitting fee, fleet invoicing. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function VanTyreFittingPage() {
  const settings = await getSiteSettings();
  const { phone } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Van Tyre Fitting", path: PAGE_PATH },
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
    name: `${settings.brandName} - Van and Fleet Tyre Fitting`,
    description:
      "Mobile van and fleet tyre fitting at the depot, site or roadside across UK mainland. C-rated and reinforced commercial tyres, correct load index matched from the VRN, fleet accounts with consolidated invoicing, 24/7 emergency cover.",
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
    serviceType: "Van Tyre Fitting",
    additionalType: "https://schema.org/AutoRepair",
    name: "Van and Fleet Tyre Fitting",
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
      name: "Van and Fleet Tyre Fitting Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Van Tyre Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fleet Tyre Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Depot Tyre Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Van Tyre Callout" } },
      ],
    },
  };

  // 4. HowTo (the 5 van fitting steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile Van Tyre Fitting Works",
    description:
      "The mobile van tyre fitting process from booking to the 12-month workmanship guarantee, with the correct load index matched from the VRN and the wheels torqued to manufacturer figures on-site.",
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
    name: "Van Tyre Fitting Fee",
    description:
      "Flat fitting fee per van tyre, including technician travel, removal, fitment, wheel balancing, a new valve and old tyre disposal. The tyre is priced separately by size, tier and load rating, quoted in full before booking. Fleet account pricing on application.",
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
    name: "Van Tyre Fitting Near Me, At Your Depot, Site or Driveway",
    description:
      "Mobile van and fleet tyre fitting across the UK. C-rated and reinforced commercial tyres, correct load index guaranteed, £20 fitting fee, fleet invoicing.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".load-rating-explainer"],
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
      <Hero phone={phone} />

      {/* 2. Why van downtime costs more than the tyres */}
      <Reveal><WhyDowntime /></Reveal>

      {/* 3. Van tyres are not car tyres (signature comparison, speakable) */}
      <Reveal><LoadRating /></Reveal>

      {/* 4. What you get (trust tile grid + emergency link) */}
      <Reveal><WhatYouGet /></Reveal>

      {/* 5. How van tyre fitting works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 6. Fleet tyre fitting (B2B navy card + mini-CTA) */}
      <Reveal><Fleet /></Reveal>

      {/* 7. Vans and models covered (tag grid) */}
      <Reveal><ModelsCovered /></Reveal>

      {/* 8. Van tyre options (three tiers) */}
      <Reveal><TyreOptions /></Reveal>

      {/* 9. Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <VanCtaBand
            title="Van due new tyres?"
            subtitle="Book a depot, site or driveway slot, single van or full fleet. £20 flat fitting fee per tyre, correct load index matched from the VRN, fleet invoicing on account."
          />
        </Reveal>
      </div>

      {/* 10. Pricing (Offer schema above) */}
      <Reveal><Costs /></Reveal>

      {/* 11. Emergency van callouts (bridge to emergency + repair) */}
      <Reveal><EmergencyBridge /></Reveal>

      {/* 12. Why operators choose us */}
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
          <Faq faqs={FAQS} title="Van Tyre Fitting FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <VanCtaBand
            title="Book Van Tyre Fitting Near You"
            subtitle="Enter the registration and postcode in the form for planned fitting, or call and WhatsApp for urgent and fleet enquiries. Fitting commercial van tyres across UK mainland postcodes from Tyre Fitting Near Me Ltd."
          />
        </Reveal>
      </div>
    </>
  );
}
