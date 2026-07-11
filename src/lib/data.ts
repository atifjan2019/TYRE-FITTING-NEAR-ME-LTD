import { cache } from "react";
import { prisma } from "@/lib/prisma";

/**
 * Centralised, read-only data access for the public site.
 *
 * Every function is wrapped in React's `cache()` so that calling it multiple
 * times during a single render (e.g. once for <head> metadata and once for the
 * page body) only hits the database once. Pages are statically generated, so in
 * production these run at build/ISR time, not on every request.
 */

// --- Site settings -----------------------------------------------------------

/** Sensible defaults used before the settings row has been seeded. */
const DEFAULT_SETTINGS = {
  id: "settings",
  brandName: "Tyre Fitting Near Me Ltd",
  tagline: "24/7 Mobile Tyre Fitting. We Come To You",
  logo: null as string | null,
  favicon: null as string | null,
  // Fallback contact details so the call button + WhatsApp bubble still work if
  // the DB is briefly unreachable. The CMS overrides these when reachable.
  phone: "0788 328 8831",
  // Aligned to the displayed phone (+447883288831) and every bespoke service
  // page. The legacy 447722127759 conflicted with the sitewide number; the DB
  // settings row must be confirmed/updated via /admin, as it overrides this.
  whatsapp: "447883288831",
  email: "bookings@tyrefittingnearme.co.uk",
  openingHours: "24/7, 365 days a year",
  yearsExperience: 10,
  customersServed: 15000,
  brandsCount: 50,
  facebookUrl: null,
  instagramUrl: null,
  tiktokUrl: null,
  defaultMetaTitle: "Mobile Tyre Fitting Near Me | 24/7 Call-Out",
  defaultMetaDescription:
    "24/7 mobile tyre fitting that comes to you at home, work or roadside. Fast call-out across London, Kent, Sussex, Essex, the West Midlands, Scotland & Greater Manchester.",
  defaultOgImage: null,
};

export type SiteSettingsData = typeof DEFAULT_SETTINGS;

export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "settings" },
  });
  return (settings as SiteSettingsData) ?? DEFAULT_SETTINGS;
});

// --- Services ----------------------------------------------------------------

/**
 * Service slugs retired from the tyre-focused silo, excluded site-wide (grid,
 * pillar list, dynamic route, sitemap). The exclusion lives here so the DB rows
 * can stay without rendering anywhere. Each URL 301s in next.config.ts:
 *  - battery-replacement: not a confirmed offered service -> /services
 *  - puncture-repair: merged into /services/mobile-tyre-repair
 *  - home-tyre-fitting: merged into /services/mobile-tyre-fitting
 */
export const EXCLUDED_SERVICE_SLUGS = new Set<string>([
  "battery-replacement",
  "puncture-repair",
  "home-tyre-fitting",
]);

export const getServices = cache(async () => {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { title: "asc" }],
  });
  return services.filter((s) => !EXCLUDED_SERVICE_SLUGS.has(s.slug));
});

export const getServiceBySlug = cache(async (slug: string) => {
  if (EXCLUDED_SERVICE_SLUGS.has(slug)) return null;
  return prisma.service.findFirst({
    where: { slug, published: true },
    include: {
      faqs: { where: { published: true }, orderBy: { order: "asc" } },
      reviews: {
        where: { published: true },
        orderBy: [{ order: "asc" }, { date: "desc" }],
      },
    },
  });
});

// --- Reviews (global) --------------------------------------------------------

export const getAllReviews = cache(async () => {
  return prisma.review.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { date: "desc" }],
  });
});

/**
 * Aggregate review stats (count + average) computed from published reviews, so
 * the rating shown on the site always reflects the CMS content.
 */
export const getReviewStats = cache(async () => {
  const agg = await prisma.review.aggregate({
    where: { published: true },
    _avg: { rating: true },
    _count: true,
  });
  const count = agg._count ?? 0;
  const average = agg._avg.rating ?? 5;
  return { count, average: Math.round(average * 10) / 10 };
});

// --- Blog --------------------------------------------------------------------

export const getPosts = cache(async () => {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
});

export const getPostBySlug = cache(async (slug: string) => {
  return prisma.blogPost.findFirst({ where: { slug, published: true } });
});
