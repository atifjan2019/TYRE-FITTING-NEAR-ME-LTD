import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Clock, ShieldCheck } from "lucide-react";
import { getTown, getAllLocationPaths, getSiteSettings, getServices } from "@/lib/data";
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
import { BookingForm } from "@/components/forms/booking-form";

export const revalidate = 3600; // ISR

// Pre-render every published town (county/town pair) at build time.
export async function generateStaticParams() {
  return getAllLocationPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string; town: string }>;
}): Promise<Metadata> {
  const { county, town: townSlug } = await params;
  const town = await getTown(county, townSlug);
  if (!town) return {};

  return buildMetadata({
    title:
      town.seoTitle ||
      `Mobile Tyre Fitting in ${town.name} | 24/7 Call-Out`,
    description:
      town.seoDescription ||
      town.intro ||
      `Mobile tyre fitting in ${town.name}, ${town.county.name}. We come to you - fast 24/7 call-out.`,
    path: `/${town.county.slug}/${town.slug}`,
    ogImage: town.ogImage,
  });
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ county: string; town: string }>;
}) {
  const { county, town: townSlug } = await params;
  const [town, settings, services] = await Promise.all([
    getTown(county, townSlug),
    getSiteSettings(),
    getServices(),
  ]);

  if (!town) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: town.county.name, path: `/${town.county.slug}` },
    { name: town.name, path: `/${town.county.slug}/${town.slug}` },
  ];

  const waMessage = `Hi, I need mobile tyre fitting in ${town.name}. My location is … and my tyre size is …`;

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd({
            settings,
            name: `${settings.brandName} - ${town.name}`,
            description: town.intro || undefined,
            url: `${SITE.url}/${town.county.slug}/${town.slug}`,
            areaServed: [town.name, town.county.name],
            image: town.ogImage,
          }),
          breadcrumbJsonLd(crumbs),
          ...(town.faqs.length ? [faqPageJsonLd(town.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <div className="mb-4">
            <Breadcrumbs items={crumbs} light />
          </div>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Tyre Fitting in {town.name}
          </h1>
          {town.intro ? (
            <p className="mt-4 max-w-2xl text-lg text-primary-foreground/90">
              {town.intro}
            </p>
          ) : null}
          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
            <li className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" /> {town.responseTimeText}
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" /> We come to you in {town.name}
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> No call-out fee
            </li>
          </ul>
          <CtaButtons
            phone={settings.phone}
            whatsapp={settings.whatsapp}
            message={waMessage}
            className="mt-8"
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {town.body ? <RichText html={town.body} /> : null}

            {town.localNotes ? (
              <section className="mt-8 rounded-xl border bg-secondary/40 p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <MapPin className="h-5 w-5 text-primary" />
                  Local knowledge - {town.name}
                </h2>
                <p className="mt-2 text-muted-foreground">{town.localNotes}</p>
              </section>
            ) : null}
          </div>

          {/* Sidebar quote form (sticky on desktop) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-3 text-lg font-bold">
                Get a quote for {town.name}
              </h2>
              <BookingForm phone={settings.phone} />
            </div>
          </aside>
        </div>
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

      {town.reviews.length ? (
        <ReviewsSection reviews={town.reviews} />
      ) : null}
      {town.faqs.length ? (
        <FaqSection faqs={town.faqs} title={`${town.name} tyre fitting FAQs`} />
      ) : null}

      <CtaBand
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title={`Stuck in ${town.name}? We'll come to you`}
        message={waMessage}
      />
    </>
  );
}
