import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";

type ServiceCard = {
  title: string;
  slug: string;
  shortDescription: string;
  icon: string | null;
  priceFrom?: string | null;
};

/** Grid of service cards linking to each service page. */
export function ServicesGrid({
  services,
  heading = true,
}: {
  services: ServiceCard[];
  heading?: boolean;
}) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <SectionHeading
            eyebrow="What we do"
            title="Our mobile tyre services"
            subtitle="One call covers it. Fitting, repairs, balancing and more, wherever you are."
          />
        ) : null}
        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="surface-card surface-card-hover group relative flex h-full flex-col overflow-hidden p-5 hover:border-accent/40 sm:p-7"
            >
              {/* Accent bar that reveals on hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />

              <div className="flex items-start justify-between gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-primary-foreground">
                  {s.priceFrom ? s.priceFrom : <>Mobile &amp; 24/7</>}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-lg font-bold text-primary">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.shortDescription}
              </p>

              {/* Uniform Learn more button, pinned to the bottom of every card. */}
              <span className="mt-6 inline-flex w-fit items-center rounded-[8px] bg-accent px-5 py-3 font-heading text-sm font-semibold text-accent-foreground transition-colors duration-150 group-hover:bg-[var(--color-accent-hover)]">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
