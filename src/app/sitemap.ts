import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/site-config";
import { BRAND_PAGE_SLUGS } from "@/lib/brand-pages";
import { LIVE_AREAS, areaHref } from "@/data/areas";
import { REGIONS } from "@/data/regions";
import { EXCLUDED_SERVICE_SLUGS } from "@/lib/data";

/**
 * Dynamic sitemap. Includes static pages plus every published county, town,
 * service and guide (article) pulled from the database, so new CMS pages appear
 * automatically. Revalidated hourly alongside the rest of the site.
 */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  // Static, always-present routes.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/areas`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/reviews`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/book`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/refund`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const [services, posts] = await Promise.all([
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  // Regional tier: the six /areas/[region] pages (200-status, indexable). The
  // old root region URLs (/london etc.) 301 to these and are NOT listed. The
  // legacy /[county]/[town] system was retired and likewise stays out.
  const regionRoutes: MetadataRoute.Sitemap = REGIONS.map((r) => ({
    url: `${base}/areas/${r.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services
    .filter((s) => !EXCLUDED_SERVICE_SLUGS.has(s.slug))
    .map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // Guides (formerly /blog) - published articles only, drafts excluded by the
  // `published: true` query above.
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/guides/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Brand cluster pages (/brands/[slug]) are code-defined, not in the database,
  // so they are listed explicitly from the brand-pages registry.
  const brandRoutes: MetadataRoute.Sitemap = BRAND_PAGE_SLUGS.map((slug) => ({
    url: `${base}/brands/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Town pages at their NESTED /areas/[region]/[town] URLs: only status "live"
  // slugs are listed (pending towns are excluded until their pages are
  // published). The old flat /areas/[town] URLs 301 and are NOT listed. The
  // /areas hub is in staticRoutes above.
  const areaRoutes: MetadataRoute.Sitemap = LIVE_AREAS.map((a) => ({
    url: `${base}${areaHref(a)}`,
    changeFrequency: "monthly",
    priority: 0.8, // local intent pages are an SEO priority
  }));

  return [
    ...staticRoutes,
    ...regionRoutes,
    ...serviceRoutes,
    ...brandRoutes,
    ...areaRoutes,
    ...postRoutes,
  ];
}
