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
  tagline: "24/7 Mobile Tyre Fitting - We Come To You",
  phone: "",
  whatsapp: "",
  email: "",
  openingHours: "24/7, 365 days a year",
  yearsExperience: 10,
  customersServed: 15000,
  brandsCount: 50,
  facebookUrl: null,
  instagramUrl: null,
  tiktokUrl: null,
  defaultMetaTitle: "Mobile Tyre Fitting Near Me | 24/7 Call-Out",
  defaultMetaDescription:
    "24/7 mobile tyre fitting that comes to you - home, work or roadside. Fast call-out across London, Kent, Sussex, Essex, the West Midlands & Scotland.",
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

export const getServices = cache(async () => {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { title: "asc" }],
  });
});

export const getServiceBySlug = cache(async (slug: string) => {
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

// --- Counties & Towns (location pages) --------------------------------------

export const getCounties = cache(async () => {
  return prisma.county.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
    include: {
      towns: {
        where: { published: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
        select: { id: true, name: true, slug: true, intro: true },
      },
    },
  });
});

export const getCountyBySlug = cache(async (slug: string) => {
  return prisma.county.findFirst({
    where: { slug, published: true },
    include: {
      towns: {
        where: { published: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
        select: { id: true, name: true, slug: true, intro: true },
      },
      faqs: { where: { published: true }, orderBy: { order: "asc" } },
      reviews: {
        where: { published: true },
        orderBy: [{ order: "asc" }, { date: "desc" }],
      },
    },
  });
});

export const getTown = cache(async (countySlug: string, townSlug: string) => {
  return prisma.town.findFirst({
    where: {
      slug: townSlug,
      published: true,
      county: { slug: countySlug, published: true },
    },
    include: {
      county: true,
      faqs: { where: { published: true }, orderBy: { order: "asc" } },
      reviews: {
        where: { published: true },
        orderBy: [{ order: "asc" }, { date: "desc" }],
      },
    },
  });
});

/** All county/town slug pairs - used by generateStaticParams for SSG. */
export const getAllLocationPaths = cache(async () => {
  const towns = await prisma.town.findMany({
    where: { published: true, county: { published: true } },
    select: { slug: true, county: { select: { slug: true } } },
  });
  return towns.map((t) => ({ county: t.county.slug, town: t.slug }));
});

// --- Reviews & FAQs (global) -------------------------------------------------

export const getFeaturedReviews = cache(async (take = 9) => {
  return prisma.review.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { order: "asc" }, { date: "desc" }],
    take,
  });
});

export const getAllReviews = cache(async () => {
  return prisma.review.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { date: "desc" }],
  });
});

export const getGlobalFaqs = cache(async () => {
  return prisma.faq.findMany({
    where: { published: true, category: "general" },
    orderBy: { order: "asc" },
  });
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

// --- Brands ------------------------------------------------------------------

export const getBrands = cache(async () => {
  return prisma.brand.findMany({ orderBy: { order: "asc" } });
});
