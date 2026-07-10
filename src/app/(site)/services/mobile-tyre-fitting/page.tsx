import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { REGIONS } from "@/data/regions";
import {
  buildMetadata,
  localBusinessJsonLd,
  organizationJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHeading } from "@/components/sections/section-heading";
import { AreasCovered } from "@/components/sections/areas-covered";
import { BookingForm } from "@/components/forms/booking-form";

// Statically generated, revalidated hourly (ISR) like the rest of the site.
// This pillar is the most-linked page on the site, so it has a bespoke route
// (like mobile-tyre-repair and puncture-repair) rather than the DB-driven
// /services/[service] template. The dynamic segment excludes this slug.
export const revalidate = 3600;

const PAGE_PATH = "/services/mobile-tyre-fitting";
const PAGE_URL = `${SITE.url}${PAGE_PATH}`;

const SUCCESS = "#1B9C5D";

// Single source of truth: the visible steps also feed the HowTo schema below.
const PROCESS_STEPS = [
  {
    title: "Get your all-in quote",
    description:
      "Enter your registration or tyre size for a full price covering the tyre, fitting and balancing, with no call-out fee.",
  },
  {
    title: "Book a slot or emergency callout",
    description:
      "Choose a same-day appointment at a time that suits you, or request a 24/7 emergency response if you are stranded.",
  },
  {
    title: "A fitter comes to you",
    description:
      "Your nearest insured technician arrives at your home, workplace or roadside with the correct tyres already loaded.",
  },
  {
    title: "Supplied, fitted and balanced on-site",
    description:
      "The fitter removes the old tyre, fits the new one, dynamically balances the wheel and sets the pressure and valve.",
  },
  {
    title: "Old tyre taken away",
    description:
      "We recycle your old tyre, issue your paperwork and take card payment before you drive off, road-legal.",
  },
];

// Down-links to every service money page. Varied descriptive anchors, one-line
// description each. This is the pillar's primary job.
const SERVICES: { href: string; anchor: string; line: string }[] = [
  {
    href: "/services/mobile-tyre-repair",
    anchor: "Mobile tyre repair",
    line: "Permanent BS AU 159 repairs carried out at the kerbside where the damage is safe and legal to fix.",
  },
  {
    href: "/services/puncture-repair",
    anchor: "Fix a slow puncture",
    line: "Diagnosis and repair of slow punctures, nails and screws, plus valve replacement on the spot.",
  },
  {
    href: "/services/emergency-tyre-fitting",
    anchor: "24/7 emergency tyre fitting",
    line: "Round-the-clock callout for blowouts and flats, day or night, 365 days a year.",
  },
  {
    href: "/services/wheel-balancing",
    anchor: "On-site wheel balancing",
    line: "Calibrated mobile balancing that removes steering vibration and evens out tyre wear.",
  },
  {
    href: "/services/locking-wheel-nut-removal",
    anchor: "Locking wheel nut removal",
    line: "Lost or broken locking key? We remove stubborn nuts without damaging the alloy.",
  },
  {
    href: "/services/tpms-service",
    anchor: "TPMS sensor service",
    line: "Tyre pressure monitoring diagnosis, sensor replacement and reset to clear the dashboard warning.",
  },
  {
    href: "/services/run-flat-tyre",
    anchor: "Run-flat replacement",
    line: "Correct run-flat tyres matched to your vehicle and fitted at home, work or roadside.",
  },
  {
    href: "/services/van-tyre-fitting",
    anchor: "Van and fleet fitting",
    line: "Light commercial and fleet cover for vans up to 3.5 tonnes, keeping working vehicles on the road.",
  },
  {
    href: "/services/caravan-tyre-fitting",
    anchor: "Caravan and motorhome fitting",
    line: "Touring tyres supplied and fitted on caravans and motorhomes, at the storage yard or campsite.",
  },
  {
    href: "/services/free-tyre-health-check",
    anchor: "Free tyre health check",
    line: "A no-obligation tread, pressure and condition inspection across all four tyres.",
  },
];

// FAQ: `text` feeds the FAQPage schema (plain text); `answer` is the rendered
// node, so the areas FAQ keeps its in-body link to the hub.
const FAQS: { q: string; text: string; answer: React.ReactNode }[] = [
  {
    q: "How much does mobile tyre fitting cost?",
    text: "Fitting is a flat £20 per tyre with no call-out fee. The tyre itself is priced by its size and brand, and you get the full quote before a fitter sets off, so there are no surprises on the day.",
    answer: (
      <>
        Fitting is a flat £20 per tyre with no call-out fee. The tyre itself is
        priced by its size and brand, and you get the full quote before a fitter
        sets off, so there are no surprises on the day.
      </>
    ),
  },
  {
    q: "How quickly can you come out?",
    text: "Same-day appointments are standard, and a fitter usually reaches you within 30 to 60 minutes on a 24/7 emergency callout. Across 2026 we hold emergency slots day and night.",
    answer: (
      <>
        Same-day appointments are standard, and a fitter usually reaches you
        within 30 to 60 minutes on a 24/7 emergency callout. Across 2026 we hold
        emergency slots day and night.
      </>
    ),
  },
  {
    q: "Do you fit at home and at work?",
    text: "Yes. A fitter comes to your driveway, your workplace car park or the roadside, wherever your vehicle is safely parked.",
    answer: (
      <>
        Yes. A fitter comes to your driveway, your workplace car park or the
        roadside, wherever your vehicle is safely parked.
      </>
    ),
  },
  {
    q: "Can you balance wheels on site?",
    text: "Yes. Every wheel is dynamically balanced on-site with calibrated mobile equipment, so you drive away without steering vibration or uneven wear.",
    answer: (
      <>
        Yes. Every wheel is dynamically balanced on-site with calibrated mobile
        equipment, so you drive away without steering vibration or uneven wear.
      </>
    ),
  },
  {
    q: "Do you fit run-flats and EV tyres?",
    text: "Yes. We carry run-flat tyres and EV-rated tyres, and we match the load rating and specification your vehicle requires.",
    answer: (
      <>
        Yes. We carry{" "}
        <Link href="/services/run-flat-tyre" className="font-semibold text-accent underline">
          run-flat tyres
        </Link>{" "}
        and EV-rated tyres, and we match the load rating and specification your
        vehicle requires.
      </>
    ),
  },
  {
    q: "What areas do you cover?",
    text: "We cover London, Kent, Sussex, Essex, the West Midlands and Scotland, with new towns added regularly. See the full list on our areas we cover hub.",
    answer: (
      <>
        We cover London, Kent, Sussex, Essex, the West Midlands and Scotland,
        with new towns added regularly. See the full list on our{" "}
        <Link href="/areas" className="font-semibold text-accent underline">
          areas we cover
        </Link>{" "}
        hub.
      </>
    ),
  },
  {
    q: "Do you supply the tyres or do I?",
    text: "We supply the tyres. We carry premium, mid-range and budget brands to suit your vehicle and budget, though you are welcome to ask about a specific make when you book.",
    answer: (
      <>
        We supply the tyres. We carry premium, mid-range and budget brands to
        suit your vehicle and budget, though you are welcome to ask about a
        specific make when you book.
      </>
    ),
  },
];

const FEATURES = [
  "All tyre brands & sizes",
  "Fitted & balanced on site",
  "Old tyre disposal included",
  "Same-day appointments",
];

// Tyre safety facts, kept verbatim but split into scannable sub-points.
const SAFETY = [
  {
    label: "Legal tread depth",
    body: "UK law sets the minimum legal tread depth at 1.6mm across the central three-quarters of the tyre and around its full circumference. A tyre below that limit is illegal, fails the MOT and cannot legally stay on the road.",
  },
  {
    label: "Repair standard BS AU 159",
    body: "Whether a puncture is repaired or replaced is judged against BS AU 159, the British Standard for tyre repair: damage inside the central repairable area gets a permanent plug-patch, while sidewall damage, a run-flat driven flat or a tyre worn past the limit cannot be repaired and needs replacing.",
  },
  {
    label: "Tyre age and the DOT code",
    body: "Tyre age matters too. The DOT code stamped on the sidewall shows the week and year of manufacture, and rubber hardens as it ages, so a tyre over roughly ten years old warrants replacement even with tread to spare.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Mobile Tyre Fitting Near Me | 24/7, Come To You, £20 Fitting",
    absoluteTitle: true,
    description:
      "Mobile tyre fitting across the UK that comes to you at home, work or roadside. £20 flat fitting fee, no call-out charge, same-day and 24/7 emergency slots. Call 0788 328 8831.",
    path: PAGE_PATH,
  });
}

export default async function MobileTyreFittingPage() {
  const settings = await getSiteSettings();
  const { phone, whatsapp } = settings;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Mobile Tyre Fitting", path: PAGE_PATH },
  ];

  const areaNames = REGIONS.map((r) => r.name);

  // --- JSON-LD: 8 discrete schema blocks, one <script> each ------------------
  const logoUrl = settings.logo
    ? settings.logo.startsWith("http")
      ? settings.logo
      : `${SITE.url}${settings.logo}`
    : undefined;
  const socials = (
    [settings.facebookUrl, settings.instagramUrl, settings.tiktokUrl] as (string | null)[]
  ).filter((u): u is string => Boolean(u));

  // 1. Organization (enriched: contactPoint + image)
  const organization = organizationJsonLd({ settings }) as Record<string, unknown>;
  organization.contactPoint = {
    "@type": "ContactPoint",
    telephone: "+447883288831",
    email: "bookings@tyrefittingnearme.co.uk",
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: ["English"],
  };
  if (logoUrl) organization.image = logoUrl;

  // 2. LocalBusiness (enriched: image, priceRange, 24/7 hours, sameAs)
  const business = localBusinessJsonLd({
    settings,
    name: `${settings.brandName} - Mobile Tyre Fitting`,
    description:
      "Mobile tyre fitting at your home, work or roadside across UK mainland. Tyres supplied, fitted and dynamically balanced on-site, with a £20 flat fitting fee, no call-out charge and 24/7 emergency response.",
    url: PAGE_URL,
    areaServed: areaNames,
    image: settings.defaultOgImage,
  }) as Record<string, unknown>;
  if (logoUrl) business.image = logoUrl;
  business.priceRange = "££";
  business.openingHoursSpecification = {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  };
  if (socials.length) business.sameAs = socials;

  // 3. Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Tyre Fitting",
    name: "Mobile Tyre Fitting",
    description:
      "Tyres supplied, fitted and balanced at the customer's home, workplace or roadside across the UK.",
    provider: {
      "@type": "LocalBusiness",
      name: "Tyre Fitting Near Me Ltd",
      telephone: "+447883288831",
      email: "bookings@tyrefittingnearme.co.uk",
    },
    areaServed: [
      ...areaNames.map((name) => ({ "@type": "AdministrativeArea", name })),
      { "@type": "Country", name: "United Kingdom" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mobile Tyre Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.anchor, url: `${SITE.url}${s.href}` },
      })),
    },
  };

  // 4. HowTo (the how-it-works steps)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Mobile Tyre Fitting Works",
    description:
      "The mobile tyre fitting process from quote to a fully fitted, balanced wheel with the old tyre taken away.",
    step: PROCESS_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  // 5. Offer (£20 flat fitting fee; tyre price quoted, not fixed)
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: "Mobile Tyre Fitting",
    description:
      "Flat £20 per-tyre fitting fee covering technician travel, fitting, dynamic balancing and old-tyre disposal. No call-out fee in standard hours. The tyre is priced by size and quoted in full before dispatch.",
    price: "20",
    priceCurrency: "GBP",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    seller: { "@type": "LocalBusiness", name: "Tyre Fitting Near Me Ltd" },
  };

  // 6. WebPage with speakable (voice search + featured snippet eligibility)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mobile Tyre Fitting Near Me, At Home, Work or Roadside",
    description:
      "Mobile tyre fitting across the UK that comes to you. £20 flat fitting fee, no call-out charge, same-day and 24/7 emergency slots.",
    url: PAGE_URL,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".service-lead", ".pricing-summary"],
    },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      {/* Structured data: 8 discrete blocks, each a uniquely-id'd <script> */}
      <JsonLd id="schema-organization" data={organization} />
      <JsonLd id="schema-localbusiness" data={business} />
      <JsonLd id="schema-breadcrumb" data={breadcrumbJsonLd(crumbs)} />
      <JsonLd id="schema-faq" data={faqPageJsonLd(FAQS.map((f) => ({ question: f.q, answer: f.text })))} />
      <JsonLd id="schema-service" data={serviceSchema} />
      <JsonLd id="schema-howto" data={howToSchema} />
      <JsonLd id="schema-offer" data={offerSchema} />
      <JsonLd id="schema-webpage" data={webPageSchema} />

      {/* 1. HERO (booking form lives in the hero, so no dead column below) */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <Breadcrumbs items={crumbs} light />
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
              Mobile Tyre Fitting
            </h1>
            <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
            <p className="service-lead mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
              New tyres supplied and fitted at your home, work or roadside. No need
              to visit a garage.
            </p>
            <p className="mt-3 text-base font-bold text-accent sm:text-lg">
              £20 flat fitting fee, no call-out charge
            </p>
            <CtaButtons
              phone={phone}
              whatsapp={whatsapp}
              message="Hi, I'd like to book mobile tyre fitting. My location is … and my tyre size is …"
              className="mt-8"
            />
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-card p-1 text-card-foreground shadow-xl lg:sticky lg:top-24">
              <h2 className="px-5 pt-5 font-heading text-xl font-bold text-primary">
                Book Mobile Tyre Fitting
              </h2>
              <div className="p-1">
                <BookingForm phone={phone} defaultService="Mobile Tyre Fitting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST TICKS */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm font-medium text-foreground/90">
                <Check className="mt-0.5 h-5 w-5 shrink-0" style={{ color: SUCCESS }} aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. OVERVIEW */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">What it is</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Mobile Tyre Fitting Across the UK
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Mobile tyre fitting brings a fully equipped tyre service to wherever your vehicle is parked. A trained
            fitter travels to you with the right tyres, a mobile rig and calibrated balancing gear, then carries
            out the whole job on your driveway, in a car park or at the roadside. The service suits busy drivers,
            parents, fleet operators and anyone facing a flat away from home. Through 2026 we cover{" "}
            <strong className="font-semibold text-primary">London</strong>,{" "}
            <strong className="font-semibold text-primary">Kent</strong>,{" "}
            <strong className="font-semibold text-primary">Sussex</strong>,{" "}
            <strong className="font-semibold text-primary">Essex</strong>, the{" "}
            <strong className="font-semibold text-primary">West Midlands</strong> and{" "}
            <strong className="font-semibold text-primary">Scotland</strong>, with same-day and 24/7 emergency
            slots. Booking takes about a minute by registration or tyre size, and payment is taken on-site by card
            or cash.
          </p>
        </div>
      </section>

      {/* 4. HOW IT WORKS (visual step cards) */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="The process" title="How Mobile Tyre Fitting Works" />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex h-full flex-col rounded-[14px] border border-[#E7EAF0] bg-card p-6 shadow-[0_2px_8px_rgba(11,23,54,0.06)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-heading text-base font-extrabold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. SERVICES (card grid down-links) */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Services"
            title="Our Mobile Tyre Services"
            subtitle="Every job below comes to you, fitted on-site by an insured technician. Pick the service that matches your situation."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex h-full flex-col rounded-[14px] border border-[#E7EAF0] bg-card p-6 shadow-[0_2px_8px_rgba(11,23,54,0.06)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(11,23,54,0.1)] motion-reduce:transform-none"
              >
                <h3 className="font-heading text-base font-bold text-primary">{s.anchor}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.line}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING (navy standout band) */}
      <section className="bg-primary text-primary-foreground">
        <div className="section-pad mx-auto max-w-7xl px-4 text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Pricing</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">Transparent Pricing</h2>
          <p className="mx-auto mt-6 max-w-2xl text-2xl font-extrabold sm:text-3xl">
            £20 flat fitting fee per tyre. <span className="text-accent">No call-out fee, ever.</span>
          </p>
          <p className="pricing-summary mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
            Pricing stays simple. We charge a flat £20 fitting fee for each tyre, and there is no call-out fee,
            ever, during standard hours. The tyre itself is priced by its size and specification, and we quote
            the full amount before a fitter is dispatched, so the figure agreed is the figure paid. We stock
            premium, mid-range and budget tyres, so you choose the brand that fits your vehicle and your budget.
            Payment is taken on-site by card or cash once the work is signed off.
          </p>
        </div>
      </section>

      {/* 7. VEHICLES WE COVER */}
      <section className="section-pad bg-background">
        <div className="prose-col px-4">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-accent">Vehicles</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Vehicles We Cover
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Cars", "Vans up to 3.5t", "4x4s", "SUVs", "Electric vehicles"].map((v) => (
              <span
                key={v}
                className="rounded-full border border-[#E7EAF0] bg-secondary px-3 py-1 text-sm font-semibold text-primary"
              >
                {v}
              </span>
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            We fit tyres on cars, vans up to 3.5 tonnes, 4x4s, SUVs and electric vehicles. Each job uses correctly
            load-rated tyres, and EV owners get EV-rated tyres built for the extra weight and instant torque of an
            electric drivetrain. Drivers of premium marques are well covered: see our dedicated pages for{" "}
            <Link href="/brands/bmw-mobile-tyre-fitting" className="font-semibold text-accent underline">
              BMW mobile tyre fitting
            </Link>
            ,{" "}
            <Link href="/brands/tesla-mobile-tyre-fitting" className="font-semibold text-accent underline">
              Tesla tyre replacement
            </Link>{" "}
            and{" "}
            <Link href="/brands/audi-mobile-tyre-fitting" className="font-semibold text-accent underline">
              Audi mobile fitting
            </Link>
            , each matched to the manufacturer&apos;s original specification.
          </p>
        </div>
      </section>

      {/* 8. TYRE SAFETY AND THE LAW (readable light band, facts intact) */}
      <section className="section-pad bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Safety and the law" title="Tyre Safety and the Law" align="left" />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {SAFETY.map((s) => (
              <div
                key={s.label}
                className="flex h-full flex-col rounded-[14px] border border-[#E7EAF0] bg-card p-6 shadow-[0_2px_8px_rgba(11,23,54,0.06)]"
              >
                <h3 className="font-heading text-base font-bold text-primary">{s.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="FAQs" title="Mobile Tyre Fitting FAQs" />
          <div className="mt-8 divide-y rounded-2xl border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-bold text-primary [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. AREAS WE COVER (single six-region grid, links to /areas/[region]) */}
      <AreasCovered />

      {/* 11. FINAL CTA BAND */}
      <CtaBand phone={phone} whatsapp={whatsapp} title="Book mobile tyre fitting today" />
    </>
  );
}
