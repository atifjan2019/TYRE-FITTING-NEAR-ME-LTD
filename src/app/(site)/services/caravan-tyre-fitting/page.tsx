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

import { Hero } from "@/components/caravan-tyre-fitting/hero";
import { Faq } from "@/components/caravan-tyre-fitting/faq";
import { PageAnalytics } from "@/components/caravan-tyre-fitting/page-analytics";
import { CaravanCtaBand } from "@/components/caravan-tyre-fitting/cta";
import {
  WhyDriveway,
  WhereWeFit,
  TyreAge,
  CpRated,
  WhatYouGet,
  Process,
  Tyron,
  VehiclesCovered,
  Costs,
  EmergencyBridge,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/caravan-tyre-fitting/content-sections";
import { FAQS, AREAS, PROCESS_STEPS } from "@/lib/caravan-tyre-fitting-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/caravan-tyre-fitting";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Mobile Caravan & Motorhome Tyre Fitting | At Your Storage Site or Pitch, UK",
    absoluteTitle: true,
    description:
      "Mobile caravan and motorhome tyre fitting at your storage compound, campsite, pitch or home. CP-rated tyres, age and safety checks, £20 fitting fee. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function CaravanTyreFittingPage() {
  const settings = await getSiteSettings();
  const { phone } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Caravan and Motorhome Tyre Fitting", path: PAGE_PATH },
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
    name: `${settings.brandName} - Caravan and Motorhome Tyre Fitting`,
    description:
      "Mobile caravan and motorhome tyre fitting at the storage compound, caravan park, campsite, seasonal pitch, dealership or home across UK mainland. CP-rated and load-rated leisure tyres, full DOT age and sidewall safety checks, 24/7 emergency cover for a tow blowout.",
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
    serviceType: "Caravan and Motorhome Tyre Fitting",
    additionalType: "https://schema.org/AutoRepair",
    name: "Caravan and Motorhome Tyre Fitting",
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
      name: "Caravan and Motorhome Tyre Fitting Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Caravan Tyre Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Motorhome Tyre Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Storage-Site Tyre Fitting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency Caravan Callout" } },
      ],
    },
  };

  // 4. HowTo (the 5 caravan and motorhome fitting steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile Caravan and Motorhome Tyre Fitting Works",
    description:
      "The mobile caravan and motorhome tyre fitting process from booking to the 12-month workmanship guarantee, with a full DOT age and sidewall safety check and pressures set for the laden weight on-site.",
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
    name: "Caravan and Motorhome Tyre Fitting Fee",
    description:
      "Flat fitting fee per tyre, including technician travel, removal, fitment, wheel balancing, a new valve and old tyre disposal. The caravan or motorhome tyre is priced separately by size and type, quoted in full before booking.",
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
    name: "Mobile Caravan and Motorhome Tyre Fitting, At Your Storage Site, Pitch or Home",
    description:
      "Mobile caravan and motorhome tyre fitting across the UK. CP-rated and load-rated leisure tyres, full DOT age and sidewall safety checks, £20 fitting fee, fitted where the vehicle stands.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".tyre-age-explainer", ".cp-rated-explainer"],
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

      {/* 2. Your caravan is not on your driveway (positioning wedge) */}
      <Reveal><WhyDriveway /></Reveal>

      {/* 2b. Where we fit (location card row) */}
      <Reveal><WhereWeFit /></Reveal>

      {/* 3. Caravan tyres age before they wear (signature comparison, speakable) */}
      <Reveal><TyreAge /></Reveal>

      {/* 4. CP-rated and load-rated tyres (three tiles, speakable) */}
      <Reveal><CpRated /></Reveal>

      {/* 5. What you get (trust tile grid + emergency link) */}
      <Reveal><WhatYouGet /></Reveal>

      {/* 6. How caravan and motorhome tyre fitting works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 7. Tyron safety bands removed and refitted (differentiator) */}
      <Reveal><Tyron /></Reveal>

      {/* 8. Leisure vehicles covered (tag grid + van page pointer) */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 9. Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <CaravanCtaBand
            title="Caravan due new tyres before the trip?"
            subtitle="Book a storage-site, campsite or pitch slot, single-axle or twin-axle. £20 flat fitting fee per tyre, CP-rated and load-rated stock, a full DOT age and sidewall safety check on every visit."
          />
        </Reveal>
      </div>

      {/* 10. Pricing (Offer schema above) */}
      <Reveal><Costs /></Reveal>

      {/* 11. Emergency and roadside (bridge to emergency + repair) */}
      <Reveal><EmergencyBridge /></Reveal>

      {/* 12. Why leisure owners choose us */}
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
          <Faq faqs={FAQS} title="Caravan and Motorhome Tyre Fitting FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CaravanCtaBand
            title="Book Caravan and Motorhome Tyre Fitting Near You"
            subtitle="Enter the tyre size or registration, postcode and location type in the form for planned pre-trip fitting, or call and WhatsApp for urgent and roadside help. Fitting caravan and motorhome tyres on-site across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd."
          />
        </Reveal>
      </div>
    </>
  );
}
