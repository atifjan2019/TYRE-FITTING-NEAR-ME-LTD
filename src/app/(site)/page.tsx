import type { Metadata } from "next";
import {
  getSiteSettings,
  getServices,
  getCounties,
  getReviewStats,
} from "@/lib/data";
import {
  buildMetadata,
  localBusinessJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
  servicesJsonLd,
  howToJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE, BOOKING_STEPS } from "@/lib/site-config";
import {
  MOBILE_SERVICES,
  HOMEPAGE_FAQS,
  HOME_REVIEWS,
  SERVICE_REGIONS,
  FOUNDER,
} from "@/lib/homepage-content";

import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { TyreBrands } from "@/components/sections/tyre-brands";
import { StepsToBook } from "@/components/sections/steps-to-book";
import { MobileServices } from "@/components/sections/mobile-services";
import { CtaStrip } from "@/components/sections/cta-strip";
import { VehiclesCovered } from "@/components/sections/vehicles-covered";
import { TyreLookup } from "@/components/sections/tyre-lookup";
import { PricingTable } from "@/components/sections/pricing-table";
import { HomeReviews } from "@/components/sections/home-reviews";
import { RecentWork } from "@/components/sections/recent-work";
import { AreasSemantic } from "@/components/sections/areas-semantic";
import { MobileVsGarage } from "@/components/sections/mobile-vs-garage";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { OurFitters } from "@/components/sections/our-fitters";
import { FleetBusiness } from "@/components/sections/fleet-business";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

// Statically generated, revalidated hourly (ISR) so the DB isn't hit per visit.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title:
      "Mobile Tyre Fitting Near Me | 24/7 Call-Out Across London, Kent, Sussex, Essex, West Midlands & Scotland",
    absoluteTitle: true,
    description:
      "24/7 mobile tyre fitting that comes to your home, work or roadside. Certified, fully insured fitters supply, fit and balance car, van, SUV and EV tyres in 30 to 60 minutes. No call-out fee.",
    path: "/",
  });
}

export default async function HomePage() {
  const [settings, services, counties, stats] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getCounties(),
    getReviewStats(),
  ]);

  // Only link to destinations that actually exist (no shipped 404s).
  const serviceSlugs = new Set(services.map((s) => s.slug));
  const countySlugs = new Set(counties.map((c) => c.slug));

  const reviewCount = stats.count > 0 ? stats.count : HOME_REVIEWS.length;

  // LocalBusiness node, augmented with rating + reviews.
  const business: Record<string, unknown> = localBusinessJsonLd({
    settings,
    url: SITE.url,
    areaServed: SERVICE_REGIONS.map((r) => r.region),
    image: settings.defaultOgImage,
  });
  business.aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
  business.review = HOME_REVIEWS.map((r) => ({
    "@type": "Review",
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewBody: r.body,
  }));

  return (
    <>
      {/* Structured data: business+reviews, website, organization, services, how-to, FAQ, breadcrumb */}
      <JsonLd
        data={[
          business,
          websiteJsonLd(),
          organizationJsonLd({
            settings,
            founderName: FOUNDER.name,
            founderJobTitle: FOUNDER.role,
            founderImage: FOUNDER.photo,
          }),
          servicesJsonLd(
            MOBILE_SERVICES.map((s) => ({
              title: s.title,
              slug: s.slug,
              description: s.description,
              category: s.hypernym,
            }))
          ),
          howToJsonLd(
            "How mobile tyre fitting works",
            BOOKING_STEPS.map((s) => ({ title: s.title, description: s.description }))
          ),
          faqPageJsonLd(HOMEPAGE_FAQS),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ]}
      />

      {/* 1. Hero with finder */}
      <Hero settings={settings} stats={stats} />

      {/* 2. Live trust marquee */}
      <TrustMarquee />

      {/* 3. Tyre brands supplied and fitted */}
      <TyreBrands />

      {/* 4. How mobile tyre fitting works (HowTo schema above) */}
      <StepsToBook />

      {/* 5. Mobile tyre services cluster */}
      <MobileServices availableSlugs={serviceSlugs} />

      {/* CTA strip 1 (between services and vehicles) */}
      <CtaStrip
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title="Need a Mobile Tyre Fitter Now? We Arrive in 30 to 60 Minutes."
        subtitle="Live availability across all six regions. No call-out fee."
        variant="navy"
      />

      {/* 6. Vehicles we cover */}
      <VehiclesCovered />

      {/* 7. Tyre size / registration lookup */}
      <TyreLookup whatsapp={settings.whatsapp} />

      {/* 8. Transparent pricing */}
      <PricingTable />

      {/* 9. Real customer reviews */}
      <HomeReviews reviewCount={reviewCount} />

      {/* 10. Recent mobile tyre fittings */}
      <RecentWork />

      {/* 11. Areas we cover */}
      <AreasSemantic availableSlugs={countySlugs} />

      {/* 12. Mobile tyre fitting vs garage */}
      <MobileVsGarage />

      {/* CTA strip 2 (between comparison and why-choose) */}
      <CtaStrip
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title="Skip the Garage. Book a Mobile Tyre Fitter Instead."
        subtitle="Same-day mobile tyre fitting at your home, work or roadside, fully insured."
        variant="purple"
      />

      {/* 13. Why drivers choose us */}
      <WhyChooseUs />

      {/* 14. Our fitters and their standards */}
      <OurFitters />

      {/* 15. For fleets and businesses */}
      <FleetBusiness
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        email={settings.email}
      />

      {/* 16. FAQs (FAQPage schema above) */}
      <FaqSection faqs={HOMEPAGE_FAQS} title="Mobile Tyre Fitting FAQs" eyebrow="FAQs" />

      {/* 17. Final conversion CTA */}
      <CtaBand
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title="Flat Tyre? We Come to You, 24/7"
        subtitle="Certified, fully insured mobile fitters at your home, work or roadside in 30 to 60 minutes, with no call-out fee. Call or WhatsApp now."
      />
    </>
  );
}
