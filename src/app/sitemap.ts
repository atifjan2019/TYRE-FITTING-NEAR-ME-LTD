import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/site-config";
import { BRAND_PAGE_SLUGS } from "@/lib/brand-pages";
import { LIVE_AREAS } from "@/data/areas";

/**
 * Dynamic sitemap. Includes static pages plus every published county, town,
 * service and blog post pulled from the database, so new CMS pages appear
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
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/book`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/refund`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const [counties, towns, services, posts] = await Promise.all([
    prisma.county.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.town.findMany({
      where: { published: true, county: { published: true } },
      select: { slug: true, updatedAt: true, county: { select: { slug: true } } },
    }),
    prisma.service.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const countyRoutes: MetadataRoute.Sitemap = counties.map((c) => ({
    url: `${base}/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const townRoutes: MetadataRoute.Sitemap = towns.map((t) => ({
    url: `${base}/${t.county.slug}/${t.slug}`,
    lastModified: t.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9, // location pages are the SEO priority
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
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

  // Area pages: only status "live" slugs are listed (pending towns are excluded
  // until their pages are published). The /areas hub is in staticRoutes above.
  const areaRoutes: MetadataRoute.Sitemap = LIVE_AREAS.map((a) => ({
    url: `${base}/areas/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.8, // local intent pages are an SEO priority
  }));

  return [
    ...staticRoutes,
    ...countyRoutes,
    ...townRoutes,
    ...serviceRoutes,
    ...brandRoutes,
    ...areaRoutes,
    ...postRoutes,
  ];
}
