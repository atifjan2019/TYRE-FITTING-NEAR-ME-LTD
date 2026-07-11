import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { REGIONS, getRegion } from "@/data/regions";
import { RegionTemplate } from "@/components/region/region-template";

// Fully static: the complete slug set is known at build time (the regions), so
// there is no time-based regeneration. Content updates are pushed via
// revalidatePath() from the admin publish pipeline, not a TTL.
export const revalidate = false;
// Only slugs returned by generateStaticParams() are valid. Unknown slugs 404 at
// the edge without invoking the page or writing to the ISR cache.
export const dynamicParams = false;

/**
 * Regional tier: /areas/[region]. Town pages moved to the nested
 * /areas/[region]/[town] segment (see ./[town]/page.tsx); the old flat
 * /areas/[town] URLs 301 to their nested equivalents in next.config.ts.
 */
export function generateStaticParams() {
  return REGIONS.map((r) => ({ slug: r.slug }));
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

  return buildMetadata({ title: "Area not found", description: "", noindex: true });
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const settings = await getSiteSettings();
  return <RegionTemplate region={region} settings={settings} />;
}
