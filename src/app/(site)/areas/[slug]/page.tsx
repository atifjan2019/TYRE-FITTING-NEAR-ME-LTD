import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { LIVE_AREAS, getLiveArea } from "@/data/areas";
import { REGIONS, getRegion } from "@/data/regions";
import { TownView } from "@/components/areas/town-view";
import { RegionTemplate } from "@/components/region/region-template";

export const revalidate = 3600;

/**
 * Unified /areas/[slug] route. A slug resolves to EITHER a region (the regional
 * tier) or a live town page, so both tiers share one dynamic segment. Regions
 * are checked first; town slugs never collide with region slugs.
 */
export function generateStaticParams() {
  return [
    ...REGIONS.map((r) => ({ slug: r.slug })),
    ...LIVE_AREAS.map((a) => ({ slug: a.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const region = getRegion(slug);
  if (region) {
    return buildMetadata({
      title: `Mobile Tyre Fitting in ${region.name} | 24/7, We Come to You`,
      absoluteTitle: true,
      description: `Mobile tyre fitting across ${region.name}, covering the ${region.postcodeAreas.join(
        ", "
      )} postcode areas. 24/7 callout, 30 to 60 minute typical response, tyres fitted at your home, work or roadside. Call 0788 328 8831.`,
      path: `/areas/${region.slug}`,
    });
  }

  const area = getLiveArea(slug);
  if (area) {
    return buildMetadata({
      title: `Mobile Tyre Fitting in ${area.town} (${area.postcodes[0]}) | 24/7, We Come to You`,
      absoluteTitle: true,
      description: `Mobile tyre fitting in ${area.town} and ${area.neighbours[0]}, covering ${area.postcodes.join(
        ", "
      )}. 24/7 emergency callout, 30 to 60 minute response, tyres fitted at your home or roadside. Call 0788 328 8831.`,
      path: `/areas/${area.slug}`,
    });
  }

  return buildMetadata({ title: "Area not found", description: "", noindex: true });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const settings = await getSiteSettings();

  const region = getRegion(slug);
  if (region) return <RegionTemplate region={region} settings={settings} />;

  const area = getLiveArea(slug);
  if (area) return <TownView area={area} settings={settings} />;

  notFound();
}
