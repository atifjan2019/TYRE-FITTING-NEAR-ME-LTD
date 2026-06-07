import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";

type CountyWithTowns = {
  id: string;
  name: string;
  slug: string;
  towns: { id: string; name: string; slug: string }[];
};

/**
 * Areas-covered section: county hubs with their town pages listed beneath.
 * Doubles as a strong internal-linking block for local SEO.
 */
export function AreasCovered({
  counties,
  heading = true,
}: {
  counties: CountyWithTowns[];
  heading?: boolean;
}) {
  if (!counties.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <SectionHeading
            eyebrow="Local to you"
            title="Areas we cover"
            subtitle="Mobile tyre fitting across the UK - find your town below or just give us a call."
          />
        ) : null}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {counties.map((county) => (
            <div
              key={county.id}
              className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              {/* County header */}
              <Link href={`/${county.slug}`} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="font-heading text-lg font-bold text-primary group-hover:text-accent">
                  {county.name}
                </span>
              </Link>

              {/* Town pills */}
              <div className="mt-4 flex-1">
                {county.towns.length ? (
                  <div className="flex flex-wrap gap-2">
                    {county.towns.slice(0, 6).map((town) => (
                      <Link
                        key={town.id}
                        href={`/${county.slug}/${town.slug}`}
                        className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-primary transition-colors hover:border-accent hover:text-accent"
                      >
                        {town.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Full coverage across {county.name}.
                  </p>
                )}
              </div>

              {/* Footer link */}
              <div className="mt-5 border-t pt-4">
                <Link
                  href={`/${county.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-transform group-hover:translate-x-0.5"
                >
                  View {county.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
