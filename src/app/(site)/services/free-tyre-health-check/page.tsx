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

import { Hero } from "@/components/free-tyre-health-check/hero";
import { Faq } from "@/components/free-tyre-health-check/faq";
import { PageAnalytics } from "@/components/free-tyre-health-check/page-analytics";
import {
  Wedge,
  Honesty,
  ChecksGrid,
  CheckVsMatter,
  FixOnTheSpot,
  Process,
  WhyMatters,
  VehiclesCovered,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/free-tyre-health-check/content-sections";
import { FAQS, AREAS, PROCESS_STEPS } from "@/lib/free-tyre-health-check-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/free-tyre-health-check";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Free Tyre Health Check Near Me | Mobile, No Obligation, Fixed On the Spot",
    absoluteTitle: true,
    description:
      "Free mobile tyre health check at your home or work. Tread, sidewall, pressure, age and wear checked, honest report, no obligation. Fixed on the spot if you want. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function FreeTyreHealthCheckPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Free Tyre Health Check", path: PAGE_PATH },
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

  // 2. LocalBusiness / AutoRepair (enriched: image, priceRange, 24/7 hours, sameAs)
  const business = localBusinessJsonLd({
    settings,
    name: `${settings.brandName} - Free Tyre Health Check`,
    description:
      "Free, no-obligation mobile tyre health check at your home, work or roadside across UK mainland. Tread, sidewall, pressure, valve, age and wear pattern checked on every tyre, with an honest written report. Fixed on the spot only if you want it.",
    url: PAGE_URL,
    areaServed: AREAS.map((a) => a.region),
    image: settings.defaultOgImage,
  }) as Record<string, unknown>;
  if (logoUrl) business.image = logoUrl;
  business.priceRange = "Free";
  business.openingHoursSpecification = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  };
  if (socials.length) business.sameAs = socials;

  // 3. Service (provider, areaServed, hasOfferCatalog of the free-check services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Free Tyre Health Check",
    additionalType: "https://schema.org/AutoRepair",
    name: "Free Tyre Health Check",
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
      name: "Free Tyre Health Check Services",
      itemListElement: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          itemOffered: { "@type": "Service", name: "Free Mobile Tyre Check" },
        },
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          itemOffered: { "@type": "Service", name: "Tyre Safety Inspection" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Fix-On-The-Spot Tyre Fitting" },
        },
      ],
    },
  };

  // 4. HowTo (the 5 free-check steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How the Free Tyre Health Check Works",
    description:
      "The free tyre health check from booking to the honest written report, carried out at the driver's home, work or roadside with no obligation.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (the check is free; fitting if wanted is the standard fee)
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Free Tyre Health Check",
    description:
      "A free, no-obligation mobile tyre health check covering tread, sidewall, pressure, valve, age and wear pattern, with an honest written report. A fix is optional and never required. Where a fix is wanted, fitting is the standard £20 flat fee per tyre plus the tyre price, quoted before any work starts.",
    priceCurrency: "GBP",
    price: "0",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Tyre Health Check Near Me, We Come to You",
    description:
      "Free mobile tyre health check at your home, work or roadside. Tread, sidewall, pressure, valve, age and wear pattern checked, honest report, no obligation, fixed on the spot only if you want it.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".honest-promise", ".what-we-check"],
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

      {/* 1. Hero with booking form + free badge */}
      <Hero phone={phone} whatsapp={whatsapp} />

      {/* 2. The wedge: a free check that comes to you */}
      <Reveal><Wedge /></Reveal>

      {/* 3. Honesty, the trust engine (.honest-promise) */}
      <Reveal><Honesty /></Reveal>

      {/* 4. What the check covers, six icon cards (.what-we-check) */}
      <Reveal><ChecksGrid /></Reveal>

      {/* 5. Signature visual: What We Check vs Why It Matters */}
      <Reveal><CheckVsMatter /></Reveal>

      {/* 6. Fixed on the spot, only if you want (replaces paid pricing block) */}
      <Reveal><FixOnTheSpot /></Reveal>

      {/* 7. How the free check works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 8. Why a regular tyre check matters */}
      <Reveal><WhyMatters /></Reveal>

      {/* 9. Vehicles covered */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 10. Mid-page CTA strip (soft, free) */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Not sure if your tyres are safe?"
            subtitle="Book a free tyre health check at your home, work or roadside. No charge, no obligation, an honest report, and a fix only if you want one."
          />
        </Reveal>
      </div>

      {/* 11. Why drivers choose us */}
      <Reveal><WhyChoose /></Reveal>

      {/* 12. What to have ready (checklist) */}
      <Reveal><Checklist /></Reveal>

      {/* 13. Coverage across the UK */}
      <Reveal><AreasCoverage /></Reveal>

      {/* 14. Illustrative scenario (11:30 / 12:15) */}
      <Reveal><CaseStudy /></Reveal>

      {/* 15. FAQs (FAQPage schema above) */}
      <div data-section="faq">
        <Reveal>
          <Faq faqs={FAQS} title="Free Tyre Health Check FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Your Free Tyre Health Check"
            subtitle="Enter your registration and postcode in the form, or call or WhatsApp 0788 328 8831. No charge and no obligation. Free mobile tyre health checks across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd."
          />
        </Reveal>
      </div>
    </>
  );
}
