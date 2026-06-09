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

import { Hero } from "@/components/mobile-tyre-fitting/hero";
import { Faq } from "@/components/mobile-tyre-fitting/faq";
import { PageAnalytics } from "@/components/mobile-tyre-fitting/page-analytics";
import {
  WhyGarage,
  Problems,
  Benefits,
  Process,
  Availability,
  SpecialistServices,
  BrandTiers,
  VehiclesDrivers,
  Costs,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/mobile-tyre-fitting/content-sections";
import { FAQS, AREAS } from "@/lib/mobile-tyre-fitting-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/mobile-tyre-fitting";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      "Mobile Tyre Fitting Near Me | 24/7 Call-Out, 60-Minute Response, £20 Flat Fee",
    absoluteTitle: true,
    description:
      "Mobile tyre fitting near me, 24/7 across the UK. £20 flat fitting fee, 60-minute emergency response, 12-month workmanship guarantee. Book online or call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function MobileTyreFittingPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Mobile Tyre Fitting", path: PAGE_PATH },
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
    name: `${settings.brandName} - Mobile Tyre Fitting`,
    description:
      "24/7 mobile tyre fitting at your home, work or roadside across UK mainland. 60-minute emergency response, £20 flat fitting fee, no call-out charge.",
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

  // 3. Service (provider, areaServed, hasOfferCatalog of specialist services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Tyre Fitting",
    name: "Mobile Tyre Fitting",
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
      name: "Mobile Tyre Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Puncture Repair to BS AU 159" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wheel Balancing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TPMS Reset and Sensor Replacement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Run-Flat Tyre Fitment" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Valve Replacement" } },
      ],
    },
  };

  // 4. HowTo (5-step booking and fitment process)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile Tyre Fitting Works",
    description:
      "The complete mobile tyre fitting booking and fitment process from VRN entry to workmanship guarantee activation.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your vehicle registration and postcode",
        text: "Enter the vehicle registration and postcode in the booking form. Postcode verifies coverage and VRN pulls vehicle data.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Select your tyres or request a quote",
        text: "Choose from three tyre tiers: premium, mid-range, and budget. Request advice from a fitter if needed.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose your appointment slot or request emergency callout",
        text: "Select a standard slot window or request a 60-minute emergency callout via phone or WhatsApp.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "A mobile fitter arrives in a fully equipped van",
        text: "All 2026 fitting vans carry tyre changing and balancing technology compatible with wheels up to 20 inches, digital torque wrenches, and TPMS reset tools.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Fitment, balancing, and workmanship confirmation",
        text: "Every fitment includes on-site balancing, valve replacement, old tyre disposal, and activation of the 12-month workmanship guarantee.",
      },
    ],
  };

  // 5. Offer (£20 flat fitting fee, attached to the pricing section)
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Mobile Tyre Fitting Service",
    description:
      "Flat fitting fee per tyre with no call-out charge. Includes technician travel, old tyre removal, new tyre fitment, on-site wheel balancing, valve replacement, and old tyre disposal.",
    priceCurrency: "GBP",
    price: "20",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "20",
      priceCurrency: "GBP",
      valueAddedTaxIncluded: true,
    },
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mobile Tyre Fitting Near Me, Across the UK",
    description:
      "Mobile tyre fitting near you, 24/7 across the UK. £20 flat fitting fee, 60-minute response on emergency callouts, 12-month workmanship guarantee.",
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

      {/* 3. Hero with booking form */}
      <Hero phone={phone} whatsapp={whatsapp} />

      {/* 4. Why mobile replaces the garage visit */}
      <Reveal><WhyGarage /></Reveal>

      {/* 5. Tyre problems solved on-site */}
      <Reveal><Problems /></Reveal>

      {/* 6. What you get */}
      <Reveal><Benefits /></Reveal>

      {/* 7. How the process works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 8. 24/7 availability */}
      <Reveal><Availability /></Reveal>

      {/* 9. Specialist services on every van */}
      <Reveal><SpecialistServices /></Reveal>

      {/* 10. Tyre brands fitted */}
      <Reveal><BrandTiers /></Reveal>

      {/* 11. Vehicles and drivers we serve */}
      <Reveal><VehiclesDrivers /></Reveal>

      {/* 12. Mid-page CTA (forced touchpoint at the midpoint) */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Need tyres fitted today?"
            subtitle="24/7 UK coverage · 60-minute emergency response · £20 flat fitting fee, no call-out charge."
          />
        </Reveal>
      </div>

      {/* 13. Costs and what's included (Offer schema above) */}
      <Reveal><Costs /></Reveal>

      {/* 14. Why drivers choose us */}
      <Reveal><WhyChoose /></Reveal>

      {/* 15. Pre-appointment checklist */}
      <Reveal><Checklist /></Reveal>

      {/* 16. Coverage across the UK */}
      <Reveal><AreasCoverage /></Reveal>

      {/* 17. Case study */}
      <Reveal><CaseStudy /></Reveal>

      {/* 19. FAQs (FAQPage schema above) */}
      <div data-section="faq">
        <Reveal>
          <Faq faqs={FAQS} title="Mobile Tyre Fitting FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* 18. Final conversion CTA */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Mobile Tyre Fitting Near You"
            subtitle="Enter your VRN and postcode in the form, or call or WhatsApp 0788 328 8831 for emergency callouts. 24/7 UK coverage, 60-minute emergency response, £20 flat fitting fee. Available now across UK mainland postcodes in 2026."
          />
        </Reveal>
      </div>
    </>
  );
}
