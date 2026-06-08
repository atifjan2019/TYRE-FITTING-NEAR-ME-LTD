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
  /** Path beginning with "/" - used for the canonical URL. */
  path?: string;
  ogImage?: string | null;
  noindex?: boolean;
  /** Use the title verbatim (no "| Tyre Fitting Near Me" template suffix). */
  absoluteTitle?: boolean;
}): Metadata {
  const url = opts.path ? `${SITE.url}${opts.path}` : SITE.url;
  const images = opts.ogImage
    ? [{ url: opts.ogImage.startsWith("http") ? opts.ogImage : `${SITE.url}${opts.ogImage}` }]
    : undefined;

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
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

/**
 * ItemList of Service nodes, one per mobile tyre service in the cluster. Each
 * Service is linked to the provider business and its dedicated service page.
 */
export function servicesJsonLd(
  services: { title: string; slug: string; description: string; category?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        serviceType: s.title,
        category: s.category,
        description: s.description,
        url: `${SITE.url}/services/${s.slug}`,
        provider: { "@id": `${SITE.url}#business` },
        areaServed: "United Kingdom",
      },
    })),
  };
}

/** HowTo schema for the "how mobile tyre fitting works" process. */
export function howToJsonLd(
  name: string,
  steps: { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
      image: `${SITE.url}/uploads/how-it-works/step-${i + 1}.jpg`,
    })),
  };
}

/**
 * Review array + AggregateRating, emitted standalone for the reviews section.
 * `count` is the real verified-review total (owner-supplied).
 */
export function reviewsJsonLd(
  reviews: { name: string; body: string; rating: number; date: string }[],
  count: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE.url}#business`,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: 5,
      worstRating: 1,
      reviewCount: count,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.body,
    })),
  };
}

/**
 * Organization schema for E-E-A-T (founder, employee, insurance references).
 * Founder name and employee count are owner-supplied; omitted cleanly if blank.
 */
export function organizationJsonLd(opts: {
  settings: SiteSettingsData;
  founderName?: string;
  founderJobTitle?: string;
  founderImage?: string;
  numberOfEmployees?: number;
  foundingDate?: string;
}) {
  const { settings } = opts;
  const sameAs = (
    [settings.facebookUrl, settings.instagramUrl, settings.tiktokUrl] as (string | null)[]
  ).filter((u): u is string => Boolean(u));
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    name: settings.brandName,
    url: SITE.url,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    logo: settings.logo ? `${SITE.url}${settings.logo}` : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    foundingDate: opts.foundingDate || undefined,
    numberOfEmployees: opts.numberOfEmployees || undefined,
    founder: opts.founderName
      ? {
          "@type": "Person",
          name: opts.founderName,
          jobTitle: opts.founderJobTitle,
          image: opts.founderImage ? `${SITE.url}${opts.founderImage}` : undefined,
        }
      : undefined,
    knowsAbout: [
      "Mobile tyre fitting",
      "Puncture repair",
      "Wheel balancing",
      "TPMS service",
      "Run-flat tyre replacement",
    ],
  };
}

/** WebSite schema with a sitelinks SearchAction. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/availability?location={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
