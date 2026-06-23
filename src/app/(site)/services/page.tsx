import type { Metadata } from "next";
import Link from "next/link";
import { getServices, getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { CtaBand } from "@/components/sections/cta-band";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Our Mobile Tyre Services | Fitting, Repairs & More",
    description:
      "From mobile tyre fitting and puncture repair to wheel balancing, TPMS and 24/7 emergency call-out, we bring the garage to you across the UK.",
    path: "/services",
  });
}

export default async function ServicesIndexPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  // ItemList reflects the live grid (battery replacement excluded site-wide).
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mobile Tyre Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${SITE.url}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemList,
          localBusinessJsonLd({
            settings,
            name: `${settings.brandName} - Mobile Tyre Services`,
            url: `${SITE.url}/services`,
            areaServed: ["United Kingdom"],
          }),
        ]}
      />

      {/* HERO / INTRO */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <Breadcrumbs items={crumbs} light />
          <p className="mt-5 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Our services</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Tyre Services
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            Our full range of mobile tyre services comes to you. A trained, insured technician travels to your
            home, workplace or roadside and carries out the whole job on-site, 24/7 across the UK through 2026.
            From a single puncture to a full set of four, every service is booked in minutes by registration or
            tyre size, with the price agreed before a fitter sets off.
          </p>
          <p className="mt-4 text-base font-bold text-accent sm:text-lg">
            £20 flat fitting fee per tyre. No call-out fee, ever.
          </p>
          <CtaButtons
            phone={phone}
            whatsapp={whatsapp}
            message="Hi, I'd like to book a mobile tyre service. My location is … and my tyre size is …"
            className="mt-8"
          />
        </div>
      </section>

      {/* FRAMING LINE */}
      <section className="bg-background pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-base text-muted-foreground">
            Every service below is mobile and comes to your home, workplace or roadside.
          </p>
        </div>
      </section>

      <ServicesGrid
        heading={false}
        services={services.map((s) => ({
          title: s.title,
          slug: s.slug,
          shortDescription: s.shortDescription,
          icon: s.icon,
          priceFrom: s.priceFrom,
        }))}
      />

      {/* CLOSING: intent routing */}
      <section className="section-pad bg-secondary">
        <div className="prose-col px-4">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Find the right fix</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Not Sure Which Service You Need?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            A flat right now calls for our{" "}
            <Link href="/services/emergency-tyre-fitting" className="font-semibold text-accent underline">
              24/7 emergency tyre fitting
            </Link>
            . A slow puncture losing pressure by the day points to{" "}
            <Link href="/services/mobile-tyre-repair" className="font-semibold text-accent underline">
              mobile tyre repair
            </Link>
            . Steering vibration at speed usually means a wheel needs{" "}
            <Link href="/services/wheel-balancing" className="font-semibold text-accent underline">
              on-site wheel balancing
            </Link>
            . A lost or snapped locking wheel nut key is sorted with{" "}
            <Link href="/services/locking-wheel-nut-removal" className="font-semibold text-accent underline">
              locking wheel nut removal
            </Link>
            . A run-flat or an EV needs the correct load-rated tyre, covered by{" "}
            <Link href="/services/run-flat-tyre" className="font-semibold text-accent underline">
              run-flat replacement
            </Link>
            . For the full picture, start with our{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent underline">
              mobile tyre fitting service
            </Link>
            .
          </p>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            We cover towns across the UK. See every{" "}
            <Link href="/areas" className="font-semibold text-accent underline">
              area we cover
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand phone={phone} whatsapp={whatsapp} />
    </>
  );
}
