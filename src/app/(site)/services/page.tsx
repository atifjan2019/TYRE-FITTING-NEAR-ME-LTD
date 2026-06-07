import type { Metadata } from "next";
import { getServices, getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBand } from "@/components/sections/cta-band";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Our Mobile Tyre Services | Fitting, Repairs & More",
    description:
      "From mobile tyre fitting and puncture repair to wheel balancing, TPMS and 24/7 emergency call-out — we bring the garage to you.",
    path: "/services",
  });
}

export default async function ServicesIndexPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        title="Our mobile tyre services"
        subtitle="One call covers it — wherever you are in the UK, day or night."
        crumbs={crumbs}
      />
      <ServicesGrid
        heading={false}
        services={services.map((s) => ({
          title: s.title,
          slug: s.slug,
          shortDescription: s.shortDescription,
          icon: s.icon,
          priceFrom: s.priceFrom,
        }))}
      />
      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
