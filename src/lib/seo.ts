import type { Metadata } from "next";
import { SITE } from "@/lib/site-config";
import type { SiteSettingsData } from "@/lib/data";

/**
 * Build a Next.js Metadata object from per-page values with sensible fallbacks.
 * Used by every page's `generateMetadata`.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  /** Path beginning with "/" — used for the canonical URL. */
  path?: string;
  ogImage?: string | null;
  noindex?: boolean;
}): Metadata {
  const url = opts.path ? `${SITE.url}${opts.path}` : SITE.url;
  const images = opts.ogImage
    ? [{ url: opts.ogImage.startsWith("http") ? opts.ogImage : `${SITE.url}${opts.ogImage}` }]
    : undefined;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      title: opts.title,
      description: opts.description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images,
    },
  };
}

// -----------------------------------------------------------------------------
// JSON-LD structured data builders.
// This is a SERVICE-AREA business, so we NEVER emit a postal/street address.
// We use the AutoRepair type (a subtype of LocalBusiness) with `areaServed`.
// -----------------------------------------------------------------------------

/**
 * LocalBusiness / AutoRepair schema. Pass the areas this page serves
 * (county/town names) so each location page advertises the right `areaServed`.
 */
export function localBusinessJsonLd(opts: {
  settings: SiteSettingsData;
  /** Page-specific name, e.g. "Mobile Tyre Fitting in Maidstone". */
  name?: string;
  description?: string;
  /** Canonical URL of the page this schema is embedded on. */
  url: string;
  /** Area names served, e.g. ["Maidstone", "Kent"]. */
  areaServed?: string[];
  image?: string | null;
}) {
  const { settings } = opts;
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${opts.url}#business`,
    name: opts.name ?? settings.brandName,
    description: opts.description ?? settings.defaultMetaDescription,
    url: opts.url,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    image: opts.image ? `${SITE.url}${opts.image}` : undefined,
    priceRange: "££",
    currenciesAccepted: "GBP",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    openingHours: "Mo-Su 00:00-24:00",
    // Service-area business: describe coverage, not a shop location.
    areaServed: (opts.areaServed ?? []).map((a) => ({
      "@type": "AdministrativeArea",
      name: a,
    })),
    serviceType: "Mobile tyre fitting",
  };
}

/** FAQPage schema for any page that lists FAQs. */
export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip HTML tags for the schema text value.
        text: f.answer.replace(/<[^>]+>/g, "").trim(),
      },
    })),
  };
}

/** BreadcrumbList schema. Pass items in order from Home -> current page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

/** AggregateRating helper (optional) for review-rich pages. */
export function aggregateRatingJsonLd(reviews: { rating: number }[]) {
  if (!reviews.length) return undefined;
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
}
