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
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <SectionHeading
            eyebrow="What we do"
            title="Our mobile tyre services"
            subtitle="One call covers it - fitting, repairs, balancing and more, wherever you are."
          />
        ) : null}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              {/* Accent bar that reveals on hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />

              <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                <Icon name={s.icon} className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-lg font-bold text-primary">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.shortDescription}
              </p>
              <div className="mt-5 flex items-center justify-between border-t pt-4">
                {s.priceFrom ? (
                  <span className="text-sm font-semibold text-primary">
                    {s.priceFrom}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    Mobile &amp; 24/7
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-transform group-hover:translate-x-0.5">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
