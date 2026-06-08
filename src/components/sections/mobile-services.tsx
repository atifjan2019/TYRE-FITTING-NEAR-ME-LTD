import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { MOBILE_SERVICES } from "@/lib/homepage-content";

/**
 * Section 5 - Mobile tyre services cluster anchor. Eleven service cards, each
 * with a hypernym, a formula description and three EAV bullets, linking to its
 * dedicated service page. Battery replacement is intentionally excluded to keep
 * topical focus on mobile tyre fitting.
 */
export function MobileServices() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Mobile tyre services"
          title="Mobile Tyre Services We Provide at Your Home, Work or Roadside"
          subtitle="Every service below is a mobile vehicle maintenance service delivered on-site by certified fitters, so you replace, repair and maintain your tyres without visiting a garage."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOBILE_SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                  Mobile &amp; 24/7
                </span>
              </div>

              <h3 className="mt-4 font-heading text-lg font-bold text-primary">
                {service.title}
              </h3>
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

              <Link
                href={`/services/${service.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
