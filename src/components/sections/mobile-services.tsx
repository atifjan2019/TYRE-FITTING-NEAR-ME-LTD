import Link from "next/link";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { MOBILE_SERVICES, ADDITIONAL_SERVICES } from "@/lib/homepage-content";

type ServiceItem = {
  title: string;
  slug: string;
  hypernym: string;
  icon: string;
  description: string;
  eav: string[];
};

/**
 * Section 5 - Mobile tyre services cluster anchor. Group 1 holds the 11 core
 * services; Group 2 holds the 6 additional tyre and wheel services. Cards only
 * link when their destination page exists in the DB, so we never ship a 404.
 */
export function MobileServices({ availableSlugs }: { availableSlugs: Set<string> }) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Mobile tyre services"
          title="Mobile Tyre Services We Provide at Your Home, Work or Roadside"
          subtitle="Every service below is a mobile vehicle maintenance service delivered on-site by certified fitters, so you replace, repair and maintain your tyres without visiting a garage."
        />

        {/* Group 1 - core services */}
        <h3 className="mt-12 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Core Mobile Tyre Services
        </h3>
        <div className="mt-4 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {MOBILE_SERVICES.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              linked={availableSlugs.has(service.slug)}
            />
          ))}
        </div>

        {/* Group 2 - additional services (collapsible to shorten the page) */}
        <details className="group/details mt-14" open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl">
            <h3 className="font-heading text-2xl font-bold text-primary">
              Additional Mobile Tyre and Wheel Services
            </h3>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-card text-primary transition-transform duration-200 group-open/details:rotate-180 motion-reduce:transition-none">
              <ChevronDown className="h-5 w-5" />
            </span>
          </summary>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Tyre Fitting Near Me Ltd also delivers tyre rotation, free safety inspections and
            leisure vehicle tyre fitting to drivers across our seven UK coverage regions, using the
            same insured certified mobile technicians and on-site equipment as our core tyre
            fitting service.
          </p>
          <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {ADDITIONAL_SERVICES.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                linked={availableSlugs.has(service.slug)}
              />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

function ServiceCard({ service, linked }: { service: ServiceItem; linked: boolean }) {
  const href = `/services/${service.slug}`;

  // The Learn more affordance is identical on every card so the grid is
  // uniform. When the whole card is already a <Link> it renders as a styled
  // <span> (no nested anchors); otherwise it is the card's own <Link>.
  const learnMoreClass =
    "mt-auto inline-flex w-fit items-center rounded-[8px] bg-accent px-5 py-3 font-heading text-sm font-semibold text-accent-foreground transition-colors duration-150 group-hover:bg-[var(--color-accent-hover)]";
  const learnMore = (
    <>
      Learn more
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground shadow-sm">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-primary-foreground">
          Mobile &amp; 24/7
        </span>
      </div>

      <h4 className="mt-5 font-heading text-lg font-bold text-primary">{service.title}</h4>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {service.hypernym}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

      <ul className="mb-6 mt-4 space-y-1.5">
        {service.eav.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {linked ? <span className={learnMoreClass}>{learnMore}</span> : null}
    </>
  );

  const cardClass =
    "surface-card surface-card-hover group flex h-full flex-col p-5 sm:p-7";

  // Unlinked cards (no live destination page) render as plain informational
  // cards with no Learn more link, so the homepage never ships a 404.
  return linked ? (
    <Link
      href={href}
      className={`${cardClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    >
      {inner}
    </Link>
  ) : (
    <div className={cardClass}>{inner}</div>
  );
}
