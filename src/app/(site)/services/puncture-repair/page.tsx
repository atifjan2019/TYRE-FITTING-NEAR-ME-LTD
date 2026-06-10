import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, faqPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";

import { Hero } from "@/components/puncture-repair/hero";
import { Faq } from "@/components/puncture-repair/faq";
import { PageAnalytics } from "@/components/puncture-repair/page-analytics";
import {
  WhyGarage,
  PunctureTypes,
  Repairability,
  RepairOrReplace,
  Process,
  Pricing,
  SpecialCases,
  Emergency,
  VehiclesDrivers,
  WhyChoose,
  Checklist,
  AreasCoverage,
  CaseStudy,
} from "@/components/puncture-repair/content-sections";
import { FAQS, PRICE_NUMBER } from "@/lib/puncture-repair-content";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
export const revalidate = 3600;

const PAGE_PATH = "/services/puncture-repair";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Puncture Repair | Mobile & 24/7, From £39 | Tyre Fitting Near Me",
    absoluteTitle: true,
    description:
      "Mobile puncture repair at your home, work or roadside, 24/7 across the UK. BS AU 159 permanent repairs from £39, no call-out fee, 60-minute emergency response. Call or WhatsApp now.",
    path: PAGE_PATH,
  });
}

export default async function PunctureRepairPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Puncture Repair", path: PAGE_PATH },
  ];

  // --- JSON-LD: Service, FAQPage, BreadcrumbList (no Review/AggregateRating) --
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Puncture Repair",
    name: "Mobile Puncture Repair",
    provider: {
      "@type": "LocalBusiness",
      name: "Tyre Fitting Near Me Ltd",
      telephone: "+447883288831",
      url: "https://tyrefittingnearme.co.uk",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    },
    areaServed: ["London", "Kent", "Sussex", "Essex", "West Midlands", "Scotland"],
    offers: {
      "@type": "Offer",
      price: PRICE_NUMBER,
      priceCurrency: "GBP",
      description:
        "Mobile puncture repair including travel, BS AU 159 inspection, permanent repair, new valve and wheel balancing. No call-out fee in standard hours.",
    },
    url: PAGE_URL,
  };

  return (
    <>
      {/* Structured data: 3 discrete blocks */}
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd
        id="schema-faq"
        data={faqPageJsonLd(FAQS.map((f) => ({ question: f.question, answer: f.answer })))}
      />
      <JsonLd id="schema-breadcrumb" data={breadcrumbJsonLd(crumbs)} />

      {/* Client-only conversion tracking (GA4 / dataLayer) */}
      <PageAnalytics />

      {/* 1. Hero (navy) with booking form */}
      <Hero phone={phone} whatsapp={whatsapp} />

      {/* 2. Why mobile beats the garage queue (white) */}
      <Reveal><WhyGarage /></Reveal>

      {/* 3. Puncture types we repair (grey) */}
      <Reveal><PunctureTypes /></Reveal>

      {/* 4. Repairability under BS AU 159 (white) */}
      <Reveal><Repairability /></Reveal>

      {/* 5. Repair or replace framework (grey) */}
      <Reveal><RepairOrReplace /></Reveal>

      {/* 6. Process (white) */}
      <Reveal><Process /></Reveal>

      {/* 7. Pricing (grey) */}
      <Reveal><Pricing /></Reveal>

      {/* Mid-page CTA band (navy), inserted between sections 7 and 8 */}
      <div data-section="mid-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Puncture right now? We answer 24/7."
            subtitle="60-minute emergency response, no call-out fee in standard hours."
          />
        </Reveal>
      </div>

      {/* 8. Special cases (white) */}
      <Reveal><SpecialCases /></Reveal>

      {/* 9. Emergency 24/7 (grey) */}
      <Reveal><Emergency /></Reveal>

      {/* 10. Vehicles and drivers (white) */}
      <Reveal><VehiclesDrivers /></Reveal>

      {/* 11. Why choose us (grey) */}
      <Reveal><WhyChoose /></Reveal>

      {/* 12. Pre-arrival checklist (white) */}
      <Reveal><Checklist /></Reveal>

      {/* 13. Service areas (grey) */}
      <Reveal><AreasCoverage /></Reveal>

      {/* 14. Case study (white) */}
      <Reveal><CaseStudy /></Reveal>

      {/* 15. Final CTA (navy). Brand mention 3 of 3 in the subtitle. */}
      <div data-section="final-cta">
        <Reveal>
          <CtaBand
            phone={phone}
            whatsapp={whatsapp}
            title="Book Your Mobile Puncture Repair Now"
            subtitle="Call or WhatsApp 0788 328 8831 for emergency response, or use the form for a written quote. 24/7 UK coverage, 60-minute emergency response, £39 with no call-out fee. Available across UK mainland postcodes in 2026 from Tyre Fitting Near Me Ltd."
          />
        </Reveal>
      </div>

      {/* 16. FAQs (white), last content section before the footer */}
      <div data-section="faq">
        <Reveal>
          <Faq faqs={FAQS} title="Puncture Repair FAQs" eyebrow="FAQs" />
        </Reveal>
      </div>
    </>
  );
}
