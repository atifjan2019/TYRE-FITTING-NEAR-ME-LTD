import type { Metadata } from "next";
import {
  getSiteSettings,
  getServices,
  getCounties,
  getFeaturedReviews,
  getGlobalFaqs,
  getReviewStats,
} from "@/lib/data";
import {
  buildMetadata,
  localBusinessJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { BrandLogos } from "@/components/sections/brand-logos";
import { StepsToBook } from "@/components/sections/steps-to-book";
import { StatCounters, type Stat } from "@/components/sections/stat-counters";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { AreasCovered } from "@/components/sections/areas-covered";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";

// Statically generated, revalidated hourly (ISR) so the DB isn't hit per visit.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    // ~58 chars; absolute so the "| Tyre Fitting Near Me" template isn't appended.
    title: "Mobile Tyre Fitting Near Me | 24/7 Call-Out, We Come To You",
    absoluteTitle: true,
    description: settings.defaultMetaDescription,
    path: "/",
    ogImage: settings.defaultOgImage,
  });
}

export default async function HomePage() {
  const [settings, services, counties, reviews, faqs, stats] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getCounties(),
      getFeaturedReviews(6),
      getGlobalFaqs(),
      getReviewStats(),
    ]);

  // Animated counters - only real CMS values; anything missing is hidden (never
  // shown as 0). No invented "% insured". Response time & 24/7 are facts.
  const counterStats = [
    settings.customersServed > 0
      ? { label: "Tyres fitted", value: settings.customersServed, suffix: "+" }
      : null,
    stats.count > 0
      ? {
          label: `Rated on Google (${stats.count} review${stats.count === 1 ? "" : "s"})`,
          value: stats.average,
          decimals: 1,
          suffix: "★",
        }
      : null,
    settings.yearsExperience > 0
      ? { label: "Years experience", value: settings.yearsExperience, suffix: "+" }
      : null,
    { label: "Emergency call-out", value: 0, display: "24/7" },
  ].filter(Boolean) as Stat[];

  return (
    <>
      {/* Structured data: service-area business, FAQs, breadcrumb */}
      <JsonLd
        data={[
          localBusinessJsonLd({
            settings,
            url: SITE.url,
            areaServed: counties.map((c) => c.name),
            image: settings.defaultOgImage,
          }),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
          ...(faqs.length ? [faqPageJsonLd(faqs)] : []),
        ]}
      />

      {/* 1. Hero with finder */}
      <Hero settings={settings} stats={stats} />

      {/* 2. Auto-scrolling trust strip */}
      <TrustMarquee />

      {/* 3. Brand logo row */}
      <BrandLogos />

      {/* 4. How it works */}
      <StepsToBook />

      {/* 5. Animated stat counters */}
      <StatCounters stats={counterStats} />

      {/* 6. Reviews feed with overall rating */}
      <ReviewsSection reviews={reviews} stats={stats} />

      {/* 7. Services grid (each card links to its own page) */}
      <ServicesGrid
        services={services.map((s) => ({
          title: s.title,
          slug: s.slug,
          shortDescription: s.shortDescription,
          icon: s.icon,
          priceFrom: s.priceFrom,
        }))}
      />

      {/* 8. Popular areas */}
      <AreasCovered counties={counties} />

      {/* 9. Why choose us */}
      <WhyChooseUs />

      {/* 10. FAQ (+ FAQPage schema above) */}
      <FaqSection faqs={faqs} />

      {/* 11. Final CTA band */}
      <CtaBand
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title="Flat tyre? We come to you, 24/7"
        subtitle="Call or WhatsApp now - fast mobile tyre fitting at your home, work or roadside."
      />
    </>
  );
}
