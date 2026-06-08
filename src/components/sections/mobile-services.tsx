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
    <section className="py-16 sm:py-24">
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
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            Tyre Fitting Near Me Ltd also delivers wheel alignment, tyre rotation, safety
            inspections, leisure vehicle tyre fitting, commercial HGV tyre work and alloy wheel
            restoration to drivers across our six UK coverage regions, using the same insured
            certified mobile technicians and on-site equipment as our core tyre fitting service.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground shadow-sm">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
          Mobile &amp; 24/7
        </span>
      </div>

      <h4 className="mt-4 font-heading text-lg font-bold text-primary">{service.title}</h4>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {service.hypernym}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

      <ul className="mt-4 space-y-1.5">
        {service.eav.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {linked ? (
        <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start rounded-full bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
          Learn more <ArrowRight className="h-4 w-4" />
        </span>
      ) : null}
    </>
  );

  const cardClass =
    "flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-150 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.97] motion-reduce:transform-none";

  return linked ? (
    <Link
      href={`/services/${service.slug}`}
      className={`${cardClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
    >
      {inner}
    </Link>
  ) : (
    <div className={cardClass}>{inner}</div>
  );
}
