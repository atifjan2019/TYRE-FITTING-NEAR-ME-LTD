import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCountyBySlug, getSiteSettings, getServices } from "@/lib/data";
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
import { ServicesGrid } from "@/components/sections/services-grid";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { FaqSection } from "@/components/sections/faq-section";

export const revalidate = 3600; // ISR

// Pre-render every published county at build time.
export async function generateStaticParams() {
  const counties = await prisma.county.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return counties.map((c) => ({ county: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string }>;
}): Promise<Metadata> {
  const { county: slug } = await params;
  const county = await getCountyBySlug(slug);
  if (!county) return {};

  return buildMetadata({
    title:
      county.seoTitle ||
      `Mobile Tyre Fitting in ${county.name} | 24/7 Call-Out`,
    description:
      county.seoDescription ||
      county.intro ||
      `24/7 mobile tyre fitting across ${county.name}. We come to you — home, work or roadside.`,
    path: `/${county.slug}`,
    ogImage: county.ogImage,
  });
}

export default async function CountyPage({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county: slug } = await params;
  const [county, settings, services] = await Promise.all([
    getCountyBySlug(slug),
    getSiteSettings(),
    getServices(),
  ]);

  if (!county) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: county.name, path: `/${county.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd({
            settings,
            name: `${settings.brandName} — ${county.name}`,
            description: county.intro || undefined,
            url: `${SITE.url}/${county.slug}`,
            areaServed: [county.name, ...county.towns.map((t) => t.name)],
            image: county.ogImage,
          }),
          breadcrumbJsonLd(crumbs),
          ...(county.faqs.length ? [faqPageJsonLd(county.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Tyre Fitting in {county.name}
          </h1>
          {county.intro ? (
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
              {county.intro}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" /> {county.responseTimeText}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" /> We come to you
            </span>
          </div>
          <CtaButtons
            phone={settings.phone}
            whatsapp={settings.whatsapp}
            message={`Hi, I need mobile tyre fitting in ${county.name}. My location is … and my tyre size is …`}
            className="mt-8"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Towns covered */}
        {county.towns.length ? (
          <section className="mb-12">
            <h2 className="text-2xl font-bold">Towns we cover in {county.name}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {county.towns.map((town) => (
                <Link
                  key={town.id}
                  href={`/${county.slug}/${town.slug}`}
                  className="group flex items-start justify-between gap-2 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold">
                      <MapPin className="h-4 w-4 text-primary" />
                      {town.name}
                    </div>
                    {town.intro ? (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {town.intro}
                      </p>
                    ) : null}
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* Body content */}
        {county.body ? (
          <section className="mb-4 max-w-3xl">
            <RichText html={county.body} />
          </section>
        ) : null}

        {county.coverageNotes ? (
          <section className="mb-4 max-w-3xl rounded-xl border bg-secondary/40 p-6">
            <h2 className="text-lg font-bold">Coverage across {county.name}</h2>
            <p className="mt-2 text-muted-foreground">{county.coverageNotes}</p>
          </section>
        ) : null}
      </div>

      <ServicesGrid
        services={services.map((s) => ({
          title: s.title,
          slug: s.slug,
          shortDescription: s.shortDescription,
          icon: s.icon,
          priceFrom: s.priceFrom,
        }))}
      />

      {county.reviews.length ? <ReviewsSection reviews={county.reviews} /> : null}
      {county.faqs.length ? (
        <FaqSection
          faqs={county.faqs}
          title={`${county.name} tyre fitting FAQs`}
        />
      ) : null}

      <CtaBand
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title={`Mobile tyre fitting across ${county.name}`}
        message={`Hi, I need mobile tyre fitting in ${county.name}.`}
      />
    </>
  );
}
