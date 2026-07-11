import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { LIVE_AREAS, getLiveArea, areaRegionSlug, areaHref } from "@/data/areas";
import { TownView } from "@/components/areas/town-view";

// Fully static: the complete region/town pair set is known at build time, so
// there is no time-based regeneration. Content updates are pushed via
// revalidatePath() from the admin publish pipeline, not a TTL.
export const revalidate = false;
// Only pairs returned by generateStaticParams() are valid. A town under the
// wrong region (or an unknown town) 404s at the edge without invoking the page.
export const dynamicParams = false;

/**
 * Town tier: /areas/[region]/[town]. Every live town builds under its parent
 * region so the URL path encodes the geographic hierarchy. The old flat
 * /areas/[town] URLs 301 here via next.config.ts.
 */
export function generateStaticParams() {
  return LIVE_AREAS.map((a) => ({ slug: areaRegionSlug(a), town: a.slug }));
}

/** Resolve a live area only when it sits under the requested region segment. */
function resolveArea(regionSlug: string, townSlug: string) {
  const area = getLiveArea(townSlug);
  if (!area || areaRegionSlug(area) !== regionSlug) return undefined;
  return area;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; town: string }>;
}): Promise<Metadata> {
  const { slug, town } = await params;

  const area = resolveArea(slug, town);
  if (area) {
    return buildMetadata({
      title: `Mobile Tyre Fitting in ${area.town} (${area.postcodes[0]}) | 24/7, We Come to You`,
      absoluteTitle: true,
      description: `Mobile tyre fitting in ${area.town} and ${area.neighbours[0]}, covering ${area.postcodes.join(
        ", "
      )}. 24/7 emergency callout, 30 to 60 minute response, tyres fitted at your home or roadside. Call 0788 328 8831.`,
      path: areaHref(area),
    });
  }

  return buildMetadata({ title: "Area not found", description: "", noindex: true });
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ slug: string; town: string }>;
}) {
  const { slug, town } = await params;
  const area = resolveArea(slug, town);
  if (!area) notFound();

  const settings = await getSiteSettings();
  return <TownView area={area} settings={settings} />;
}
