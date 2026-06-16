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

import { Hero } from "@/components/locking-wheel-nut-removal/hero";
import { Faq } from "@/components/locking-wheel-nut-removal/faq";
import { PageAnalytics } from "@/components/locking-wheel-nut-removal/page-analytics";
import {
  WhyProblems,
  NoDamagePromise,
  AfterRemoval,
  Process,
  ClusterBridge,
  VehiclesCovered,
  Costs,
  Emergency,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/locking-wheel-nut-removal/content-sections";
import { FAQS, AREAS, PROCESS_STEPS, PRICE } from "@/lib/locking-wheel-nut-removal-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/locking-wheel-nut-removal";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Locking Wheel Nut Removal Near Me | Mobile, No Alloy Damage, UK",
    absoluteTitle: true,
    description:
      "Lost your locking wheel nut key? Rounded or seized nut? Mobile locking wheel nut removal with no damage to your alloys, at home, work or roadside. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function LockingWheelNutRemovalPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Locking Wheel Nut Removal", path: PAGE_PATH },
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
    name: `${settings.brandName} - Locking Wheel Nut Removal`,
    description:
      "24/7 mobile locking wheel nut removal at your home, work or roadside across UK mainland. Specialist extraction with no damage to your alloys, a replacement nut fitted, and a 30 to 60 minute typical emergency response.",
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

  // 3. Service (provider, areaServed, hasOfferCatalog of locking-nut services)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Locking Wheel Nut Removal",
    additionalType: "https://schema.org/AutoRepair",
    name: "Locking Wheel Nut Removal",
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
      name: "Locking Wheel Nut Removal Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lost Key Locking Nut Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rounded Nut Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seized Nut Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spinning Collar Removal" } },
      ],
    },
  };

  // 4. HowTo (the 5 removal steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile Locking Wheel Nut Removal Works",
    description:
      "The mobile locking wheel nut removal process from booking to the no-damage and 12-month workmanship guarantees, with the nut extracted on-site and a replacement fitted.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (removal fee). NOTE: replace the [£XX] placeholder with the real
  // numeric price before deploy.
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Locking Wheel Nut Removal",
    description:
      "Specialist locking wheel nut extraction per nut, including technician travel, condition assessment, alloy-protected removal, a standard replacement nut fitted and torqued to specification, and a no-damage guarantee. No call-out fee in standard hours.",
    priceCurrency: "GBP",
    price: PRICE, // "[£XX]" placeholder, replace with the real figure before deploy.
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Locking Wheel Nut Removal Near Me, No Damage to Your Alloys",
    description:
      "Mobile locking wheel nut removal near you, 24/7 across the UK. Specialist extraction with no damage to your alloys, a replacement nut fitted, at home, work or roadside.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-definition", ".no-damage-promise"],
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

      {/* 2. Why your locking wheel nut will not come off (icon card grid) */}
      <Reveal><WhyProblems /></Reveal>

      {/* 3. No Damage vs DIY Damage (signature two-column visual) */}
      <Reveal><NoDamagePromise /></Reveal>

      {/* 4. What happens to the nut after removal */}
      <Reveal><AfterRemoval /></Reveal>

      {/* 5. How the process works (HowTo schema above) */}
      <Reveal><Process /></Reveal>

      {/* 6. Cluster bridge: removal plus the tyre work, one visit */}
      <Reveal><ClusterBridge /></Reveal>

      {/* 7. Vehicles and locking nut types covered */}
      <Reveal><VehiclesCovered /></Reveal>

      {/* 8. Mid-page CTA strip */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Locking nut stuck right now?"
            subtitle={`24/7 UK mainland cover, a 30 to 60 minute typical response, specialist extraction from ${PRICE} per nut with no damage to your alloys.`}
          />
        </Reveal>
      </div>

      {/* 9. Costs (Offer schema above) */}
      <Reveal><Costs /></Reveal>

      {/* 10. 24/7 and emergency removal */}
      <Reveal><Emergency /></Reveal>

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
          <Faq faqs={FAQS} title="Locking Wheel Nut Removal FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>

      {/* Final conversion CTA (brand mention 3 of 3 in subtitle) */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Locking Wheel Nut Removal Near You"
            subtitle={`Enter the registration, postcode, and a photo of the nut in the form, or call and WhatsApp 0788 328 8831 for urgent removal. Removing locking wheel nuts without alloy damage across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd.`}
          />
        </Reveal>
      </div>
    </>
  );
}
