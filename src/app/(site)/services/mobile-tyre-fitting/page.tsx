import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import {
  buildMetadata,
  localBusinessJsonLd,
  organizationJsonLd,
  howToJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { Reveal } from "@/components/ui/reveal";

import { Hero } from "@/components/mobile-tyre-fitting/hero";
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
import { PROCESS_STEPS, FAQS, AREAS } from "@/lib/mobile-tyre-fitting-content";

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
      "24/7 mobile tyre fitting that comes to your home, work or roadside across UK mainland. 60-minute emergency response, £20 flat fitting fee, no call-out charge. Book online or call 0788 328 8831.",
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

  // --- JSON-LD: 8 schema blocks ---------------------------------------------
  const business = localBusinessJsonLd({
    settings,
    name: `${settings.brandName} - Mobile Tyre Fitting`,
    description:
      "24/7 mobile tyre fitting at your home, work or roadside across UK mainland. 60-minute emergency response, £20 flat fitting fee, no call-out charge.",
    url: PAGE_URL,
    areaServed: AREAS.map((a) => a.region),
    image: settings.defaultOgImage,
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Tyre Fitting",
    name: "Mobile Tyre Fitting",
    url: PAGE_URL,
    provider: { "@id": `${PAGE_URL}#business` },
    areaServed: AREAS.map((a) => ({ "@type": "AdministrativeArea", name: a.region })),
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "20",
      description: "Flat fitting fee per tyre, no call-out charge",
    },
  };

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Mobile Tyre Fitting",
    priceCurrency: "GBP",
    price: "20",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "20",
      priceCurrency: "GBP",
      valueAddedTaxIncluded: true,
    },
    description:
      "Flat fitting fee per tyre, no call-out charge. Includes travel, removal, fitment, balancing, valve, disposal.",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "Mobile Tyre Fitting Near Me, Across the UK",
    isPartOf: { "@id": `${SITE.url}#website` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero-definition"],
    },
  };

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd({ settings }),
          business,
          serviceSchema,
          breadcrumbJsonLd(crumbs),
          howToJsonLd(
            "How mobile tyre fitting works",
            PROCESS_STEPS.map((s) => ({ title: s.title, description: s.description }))
          ),
          offerSchema,
          faqPageJsonLd(FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
          webPageSchema,
        ]}
      />

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
          <FaqSection faqs={FAQS} title="Mobile Tyre Fitting FAQs" eyebrow="FAQs" />
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
