import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug, getSiteSettings, getCounties } from "@/lib/data";
import {
  buildMetadata,
  localBusinessJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RichText } from "@/components/rich-text";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { CtaBand } from "@/components/sections/cta-band";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { FaqSection } from "@/components/sections/faq-section";
import { AreasCovered } from "@/components/sections/areas-covered";
import { BookingForm } from "@/components/forms/booking-form";

export const revalidate = 3600; // ISR

export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    where: { published: true },
    select: { slug: true },
  });
  // `mobile-tyre-repair` has its own bespoke static route
  // (services/mobile-tyre-repair), which takes precedence over this dynamic
  // segment. Exclude it here so the two don't both build the same path.
  return services
    .filter((s) => s.slug !== "mobile-tyre-repair")
    .map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seoTitle || `${service.title} | Mobile & 24/7`,
    description: service.seoDescription || service.shortDescription,
    path: `/services/${service.slug}`,
    ogImage: service.ogImage,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const [service, settings, counties] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
    getCounties(),
  ]);

  if (!service) notFound();

  const features = Array.isArray(service.features)
    ? (service.features as string[])
    : [];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd({
            settings,
            name: `${settings.brandName} - ${service.title}`,
            description: service.shortDescription,
            url: `${SITE.url}/services/${service.slug}`,
            areaServed: counties.map((c) => c.name),
            image: service.ogImage,
          }),
          breadcrumbJsonLd(crumbs),
          ...(service.faqs.length ? [faqPageJsonLd(service.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mb-4">
            <Breadcrumbs items={crumbs} light />
          </div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            {service.title}
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
            {service.shortDescription}
          </p>
          {service.priceFrom ? (
            <p className="mt-2 text-sm font-semibold text-accent">
              {service.priceFrom}
            </p>
          ) : null}
          <CtaButtons
            phone={settings.phone}
            whatsapp={settings.whatsapp}
            message={`Hi, I'd like to book ${service.title.toLowerCase()}. My location is … and my tyre size is …`}
            className="mt-8"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {features.length ? (
              <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-whatsapp)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {service.body ? <RichText html={service.body} /> : null}
          </div>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-3 text-lg font-bold">Book {service.title}</h2>
              <BookingForm phone={settings.phone} defaultService={service.title} />
            </div>
          </aside>
        </div>
      </div>

      {service.reviews.length ? (
        <ReviewsSection reviews={service.reviews} />
      ) : null}
      {service.faqs.length ? (
        <FaqSection faqs={service.faqs} title={`${service.title} FAQs`} />
      ) : null}

      <AreasCovered counties={counties} />

      <CtaBand
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title={`Book ${service.title.toLowerCase()} today`}
      />
    </>
  );
}
