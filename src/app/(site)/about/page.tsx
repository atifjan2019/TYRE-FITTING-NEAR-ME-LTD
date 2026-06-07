import type { Metadata } from "next";
import { ShieldCheck, Clock, Truck, ThumbsUp } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";
import { TrustCounters } from "@/components/sections/trust-counters";
import { CtaBand } from "@/components/sections/cta-band";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "About Us | Tyre Fitting Near Me",
    description:
      "We're a 24/7 mobile tyre fitting business that comes to you. Learn why thousands of UK drivers trust us for fitting, repairs and emergencies.",
    path: "/about",
  });
}

const VALUES = [
  {
    icon: Truck,
    title: "We come to you",
    text: "Home, work or roadside — our fully-equipped vans bring the garage to your location.",
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
    title: "Trusted by drivers",
    text: "Thousands of 5-star call-outs across the UK, from quick punctures to emergency rescues.",
  },
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
        subtitle="A mobile-first tyre service built around one idea: getting you safely back on the road, fast — wherever you are."
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose-content">
          <p>
            {settings.brandName} is a fully mobile tyre service. We don&apos;t run a
            shop or expect you to limp a dangerous tyre to a garage — instead, our
            technicians come to you with everything needed to fit, balance and
            repair tyres on the spot.
          </p>
          <p>
            With over {settings.yearsExperience} years&apos; experience and more than{" "}
            {settings.customersServed.toLocaleString()} customers served, we&apos;ve
            built our reputation on speed, honest pricing and genuinely caring
            about getting drivers moving again — especially when they&apos;re
            stranded at the roadside.
          </p>
          <p>
            We cover London, Kent, Sussex, Essex, Birmingham &amp; the West
            Midlands, and Scotland, fitting all major tyre brands for cars, vans
            and 4x4s.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-xl border bg-card p-6 shadow-sm">
              <v.icon className="h-7 w-7 text-primary" />
              <h2 className="mt-3 text-lg font-bold">{v.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      <TrustCounters settings={settings} />
      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
