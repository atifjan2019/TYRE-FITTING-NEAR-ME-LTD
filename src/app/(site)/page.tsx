import type { Metadata } from "next";
import {
  getSiteSettings,
  getServices,
  getCounties,
  getFeaturedReviews,
  getGlobalFaqs,
  getBrands,
} from "@/lib/data";
import { buildMetadata, localBusinessJsonLd, faqPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Hero } from "@/components/sections/hero";
import { TrustCounters } from "@/components/sections/trust-counters";
import { StepsToBook } from "@/components/sections/steps-to-book";
import { ServicesGrid } from "@/components/sections/services-grid";
import { BrandStrip } from "@/components/sections/brand-strip";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { AreasCovered } from "@/components/sections/areas-covered";
import { FaqSection } from "@/components/sections/faq-section";
import { BookingForm } from "@/components/forms/booking-form";
import { SectionHeading } from "@/components/sections/section-heading";

// Statically generated, revalidated hourly (ISR) so the DB isn't hit per visit.
// Admin edits also trigger on-demand revalidation (see admin server actions).
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title:
      "Mobile Tyre Fitting Near Me | 24/7 Call-Out - We Come To You",
    description: settings.defaultMetaDescription,
    path: "/",
    ogImage: settings.defaultOgImage,
  });
}

export default async function HomePage() {
  const [settings, services, counties, reviews, faqs, brands] =
    await Promise.all([
      getSiteSettings(),
      getServices(),
      getCounties(),
      getFeaturedReviews(6),
      getGlobalFaqs(),
      getBrands(),
    ]);

  return (
    <>
      {/* Structured data: service-area business + homepage FAQs */}
      <JsonLd
        data={localBusinessJsonLd({
          settings,
          url: SITE.url,
          areaServed: counties.map((c) => c.name),
          image: settings.defaultOgImage,
        })}
      />
      {faqs.length ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}

      <Hero settings={settings} />
      <TrustCounters settings={settings} />
      <StepsToBook />
      <ServicesGrid
        services={services.map((s) => ({
          title: s.title,
          slug: s.slug,
          shortDescription: s.shortDescription,
          icon: s.icon,
          priceFrom: s.priceFrom,
        }))}
      />
      <BrandStrip brands={brands} />
      <ReviewsSection reviews={reviews} />
      <AreasCovered counties={counties} />
      <FaqSection faqs={faqs} />

      {/* Quote / booking band */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="No call-out fee"
              title="Get a fast, no-obligation quote"
              subtitle="Prefer not to call? Send your details and we'll get straight back to you. For emergencies, calling is fastest."
            />
          </div>
          <BookingForm phone={settings.phone} />
        </div>
      </section>
    </>
  );
}
