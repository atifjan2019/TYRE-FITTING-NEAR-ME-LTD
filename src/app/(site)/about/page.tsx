import type { Metadata } from "next";
import { ShieldCheck, Clock, Truck, ThumbsUp, Check } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { TrustCounters } from "@/components/sections/trust-counters";
import { CtaBand } from "@/components/sections/cta-band";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "About Us | Tyre Fitting Near Me",
    description:
      "A 24/7 mobile tyre fitting service that comes to you - home, work or roadside, across London, Kent, Sussex, Essex, the West Midlands & Scotland.",
    path: "/about",
  });
}

const VALUES = [
  {
    icon: Truck,
    title: "We come to you",
    text: "Home, work or roadside - our fully-equipped vans bring the garage to your location.",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    text: "Day or night, 365 days a year. A flat tyre never waits for office hours, and neither do we.",
  },
  {
    icon: ShieldCheck,
    title: "Fair, upfront pricing",
    text: "No hidden call-out fees. You get an all-in quote before we set off.",
  },
  {
    icon: ThumbsUp,
    title: "Treated like our only customer",
    text: "Friendly, no-pressure service and proper workmanship on every single call-out.",
  },
];

const PROMISES = [
  "No hidden call-out fees",
  "All major tyre brands & budget options",
  "Cars, vans & 4x4s",
  "Card, contactless & cash accepted",
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        title="About Tyre Fitting Near Me"
        subtitle="A mobile-first tyre service built around one idea: getting you safely back on the road, fast - wherever you are."
        crumbs={crumbs}
      />

      {/* Intro: prose + CTA card */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-3">
          <div className="prose-content lg:col-span-2">
            <p>
              {settings.brandName} is a fully mobile tyre service. We don&apos;t run
              a shop or expect you to limp a dangerous tyre to a garage - instead,
              our technicians come to you with everything needed to fit, balance
              and repair tyres on the spot.
            </p>
            <p>
              We&apos;re built around speed, honest pricing and genuinely caring
              about getting drivers moving again - especially when they&apos;re
              stranded at the roadside. No hidden call-out fees, no garage queues,
              just a fast fitter at your door.
            </p>
            <p>
              We cover London, Kent, Sussex, Essex, Birmingham &amp; the West
              Midlands, and Scotland, fitting all major tyre brands for cars, vans
              and 4x4s.
            </p>
          </div>

          {/* CTA / promises card */}
          <aside className="rounded-2xl border bg-[var(--color-muted-blue)] p-6 shadow-sm">
            <h2 className="font-heading text-lg font-extrabold text-primary">
              What you can count on
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm font-medium text-primary">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CtaButtons
                phone={settings.phone}
                whatsapp={settings.whatsapp}
                size="lg"
                className="!flex-col"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Why drivers choose us"
            title="The Tyre Fitting Near Me difference"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustCounters settings={settings} />
      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
