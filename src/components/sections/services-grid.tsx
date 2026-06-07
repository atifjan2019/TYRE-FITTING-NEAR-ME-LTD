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
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <SectionHeading
            eyebrow="What we do"
            title="Our mobile tyre services"
            subtitle="One call covers it — fitting, repairs, balancing and more, wherever you are."
          />
        ) : null}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {s.shortDescription}
              </p>
              <div className="mt-4 flex items-center justify-between">
                {s.priceFrom ? (
                  <span className="text-sm font-semibold text-primary">
                    {s.priceFrom}
                  </span>
                ) : (
                  <span />
                )}
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
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
