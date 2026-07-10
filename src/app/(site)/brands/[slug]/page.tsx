import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Phone, Star } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { getBrandPage, BRAND_PAGE_SLUGS } from "@/lib/brand-pages";
import {
  buildMetadata,
  localBusinessJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { SERVICE_REGIONS } from "@/lib/homepage-content";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { GoogleGlyph } from "@/components/icons/google-glyph";
import { SectionHeading } from "@/components/sections/section-heading";
import { AreasSemantic } from "@/components/sections/areas-semantic";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { telHref, whatsappHref } from "@/lib/utils";

// Fully static: BRAND_PAGE_SLUGS is the complete, code-defined slug set. No
// time-based regeneration.
export const revalidate = false;
// Only the prebuilt brand slugs are valid. Unknown slugs 404 at the edge
// without invoking the page or writing to the ISR cache.
export const dynamicParams = false;

/** Brands whose models run run-flat tyres from the factory (Rule 5 link target). */
const RUN_FLAT_BRAND_SLUGS = new Set([
  "bmw-mobile-tyre-fitting",
  "mercedes-mobile-tyre-fitting",
  "rolls-royce-mobile-tyre-fitting",
  "bentley-mobile-tyre-fitting",
]);

export function generateStaticParams() {
  return BRAND_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getBrandPage(slug);
  if (!page) return buildMetadata({ title: "Brand not found", description: "", noindex: true });
  return buildMetadata({
    title: page.metaTitle,
    absoluteTitle: true,
    description: page.metaDescription,
    path: `/brands/${slug}`,
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getBrandPage(slug);
  if (!page) notFound();

  const settings = await getSiteSettings();

  const business: Record<string, unknown> = localBusinessJsonLd({
    settings,
    name: `${page.brand} Mobile Tyre Fitting`,
    url: `${SITE.url}/brands/${slug}`,
    areaServed: SERVICE_REGIONS.map((r) => r.region),
    image: settings.defaultOgImage,
  });

  const pageUrl = `${SITE.url}/brands/${slug}`;

  // Quote-based Offer: brand pricing is "Get a quote" / "from registration", so
  // we never assert a fixed numeric price. priceSpecification carries the policy.
  const serviceNode = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.brand} Mobile Tyre Fitting`,
    serviceType: `${page.brand} Mobile Tyre Fitting`,
    category: `${page.brand} Mobile Tyre Fitting`,
    vehicleType: page.brand,
    description: page.hero.intro,
    provider: { "@id": `${SITE.url}#business` },
    areaServed: SERVICE_REGIONS.map((r) => ({ "@type": "AdministrativeArea", name: r.region })),
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: pageUrl,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        description: `Tyre supplied and fitted for your ${page.brand}, quoted on request from the registration, with no call-out fee.`,
      },
    },
  };

  const webPageNode = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.metaTitle,
    url: pageUrl,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".brand-intro"],
    },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <JsonLd
        data={[
          business,
          organizationJsonLd({ settings }),
          serviceNode,
          webPageNode,
          faqPageJsonLd(page.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Brands", path: "/brands" },
            { name: `${page.brand} Mobile Tyre Fitting`, path: `/brands/${slug}` },
          ]),
        ]}
      />

      {/* Section 1 - Hero */}
      <section className="border-b bg-gradient-to-b from-white to-[var(--color-muted-blue)]/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <h1 className="font-heading text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
            {page.hero.h1}
          </h1>
          <p className="brand-intro mt-5 max-w-3xl text-lg text-muted-foreground">{page.hero.intro}</p>

          <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-2.5 sm:grid-cols-2">
            {page.hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm font-medium text-primary">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {settings.phone ? (
              <Button asChild variant="cta" size="xl">
                <a href={telHref(settings.phone)} data-conversion="call" aria-label={`Call ${settings.phone}`}>
                  <Phone /> Call {settings.phone}
                </a>
              </Button>
            ) : null}
            {settings.whatsapp ? (
              <Button asChild variant="whatsapp" size="xl" className="whitespace-normal">
                <a
                  href={whatsappHref(settings.whatsapp, page.hero.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-conversion="whatsapp"
                  aria-label={`Message us on WhatsApp about ${page.brand} tyre fitting`}
                >
                  <WhatsAppIcon /> WhatsApp your model &amp; tyre size
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Section 2 - Models we service */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Models we service"
            title={`${page.brand} Models Our Mobile Tyre Fitters Service`}
            subtitle={`We fit OE-spec tyres on-site for owners across our six UK regions, covering the full current ${page.brand} range and recent generations, balanced and torqued to manufacturer specification.`}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.modelGroups.map((g) => (
              <div key={g.label} className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="font-heading text-base font-bold text-primary">{g.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.models.map((m) => (
                    <li
                      key={m}
                      className="rounded-full border bg-secondary px-3 py-1 text-sm font-medium text-primary"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - OE specs */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="OE specifications"
            title={`${page.brand} Tyre Specifications We Match`}
            subtitle={page.oeIntro}
          />
          <ul className="mx-auto mt-8 grid max-w-3xl gap-2.5">
            {page.oePoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-secondary/60 text-primary">
                <tr>
                  <th className="px-4 py-3 font-bold sm:px-6">Model</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Front size</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Rear size</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Run-flat OE</th>
                </tr>
              </thead>
              <tbody>
                {page.sizeTable.map((row) => (
                  <tr key={row.model} className="border-b last:border-0">
                    <td className="px-4 py-3 font-semibold text-primary sm:px-6">{row.model}</td>
                    <td className="px-4 py-3 text-foreground sm:px-6">{row.front}</td>
                    <td className="px-4 py-3 text-foreground sm:px-6">{row.rear}</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">{row.runFlat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Sizes are a guide. We confirm the exact OE specification for your registration before fitting.
          </p>
        </div>
      </section>

      {/* Section 4 - Technical flagship (run-flat for BMW/Mercedes, EV for Tesla,
          N-rating for Porsche, marque approval for supercars, etc.) */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={page.s4Eyebrow ?? "Run-flat specialist"}
            title={page.s4Title ?? `${page.brand} Run-Flat Tyre Replacement On-Site`}
          />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{page.runFlatBody}</p>
        </div>
      </section>

      {/* Section 5 - Second technical section (TPMS for most, fitment precision /
          discretion for supercars and luxury marques) */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow={page.s5Eyebrow ?? "TPMS reset included"}
            title={page.s5Title ?? `${page.brand} TPMS Reset Included with Every Tyre Change`}
          />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{page.tpmsBody}</p>

          {/* Directional internal links (cluster web): up to the pillar plus the
              relevant service spokes for this marque. One contextual link each. */}
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Stranded with a flat? See our{" "}
            <Link href="/services/emergency-tyre-fitting" className="font-medium text-accent hover:underline">
              24/7 emergency tyre fitting
            </Link>
            . For a sensor warning we run a dedicated{" "}
            <Link href="/services/tpms-service" className="font-medium text-accent hover:underline">
              TPMS service
            </Link>
            {RUN_FLAT_BRAND_SLUGS.has(slug) ? (
              <>
                , and a punctured run-flat is a{" "}
                <Link href="/services/run-flat-tyre" className="font-medium text-accent hover:underline">
                  run-flat replacement
                </Link>{" "}
                rather than a repair
              </>
            ) : null}
            . For any other vehicle, our general{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-medium text-accent hover:underline">
              mobile tyre fitting
            </Link>{" "}
            covers all makes across the same six regions.
          </p>
        </div>
      </section>

      {/* Section 6 - Reviews */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="5.0 / 5.0 on Google"
            title={`What ${page.brand} Drivers Say About Our Mobile Tyre Service`}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.reviews.map((r) => (
              <article key={r.id} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <GoogleGlyph className="h-5 w-5" />
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{r.body}&rdquo;
                </p>
                <footer className="mt-4 border-t pt-4">
                  <p className="font-semibold text-primary">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.location} · {r.date}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 - Pricing */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Transparent pricing"
            title={`Transparent Pricing for ${page.brand} Tyre Fitting`}
            subtitle="We confirm the exact all-in price for your model and size before we dispatch a fitter, with no call-out fee and no hidden charges."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-secondary/60 text-primary">
                <tr>
                  <th className="px-4 py-3 font-bold sm:px-6">Service</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Typical price</th>
                  <th className="hidden px-4 py-3 font-bold sm:table-cell sm:px-6">Includes</th>
                </tr>
              </thead>
              <tbody>
                {page.pricing.map((row) => (
                  <tr key={row.service} className="border-b last:border-0">
                    <td className="px-4 py-4 font-semibold text-foreground sm:px-6">{row.service}</td>
                    <td className="whitespace-nowrap px-4 py-4 sm:px-6">
                      <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                        {row.price}
                      </span>
                    </td>
                    <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell sm:px-6">{row.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 8 - Areas */}
      <AreasSemantic />

      {/* Section 9 - FAQs */}
      <FaqSection
        faqs={page.faqs}
        title={`${page.brand} Mobile Tyre Fitting FAQs`}
        eyebrow="FAQs"
      />

      {/* Section 10 - Final CTA */}
      <CtaBand
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        title={`${page.brand} down with a flat? We come to you 24/7`}
        subtitle={`Certified, fully insured mobile fitters with the right tyre for your ${page.brand}, at your home, work or roadside in 30 to 60 minutes.`}
        message={page.hero.whatsappPrefill}
      />
    </>
  );
}
