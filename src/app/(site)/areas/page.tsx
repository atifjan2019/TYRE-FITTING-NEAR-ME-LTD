import type { Metadata } from "next";
import { getCounties, getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";
import { AreasCovered } from "@/components/sections/areas-covered";
import { CtaBand } from "@/components/sections/cta-band";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Areas We Cover | Mobile Tyre Fitting Across the UK",
    description:
      "Mobile tyre fitting across London, Kent, Sussex, Essex, Birmingham & the West Midlands, and Scotland. Find your town.",
    path: "/areas",
  });
}

export default async function AreasPage() {
  const [counties, settings] = await Promise.all([
    getCounties(),
    getSiteSettings(),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        title="Areas we cover"
        subtitle="We're a fully mobile service across the UK — choose your county to see the towns we cover."
        crumbs={crumbs}
      />
      <AreasCovered counties={counties} heading={false} />
      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
