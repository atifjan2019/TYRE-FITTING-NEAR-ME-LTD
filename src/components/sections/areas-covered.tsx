import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { REGIONS } from "@/data/regions";

/**
 * Areas-covered section: the six region hubs, each linking to /areas/[region],
 * with a few of its towns surfaced beneath. Live towns (a built /areas/[town]
 * page) link directly; towns without a page render as plain text, never a 404.
 * Doubles as a strong internal-linking block for local SEO.
 */
export function AreasCovered({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <SectionHeading
            eyebrow="Local to you"
            title="Areas we cover"
            subtitle="Mobile tyre fitting across the UK. Find your region below or just give us a call."
          />
        ) : null}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((region) => {
            const shownTowns = region.towns.slice(0, 6);
            return (
              <div
                key={region.slug}
                className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                {/* Region header */}
                <Link href={`/areas/${region.slug}`} className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="font-heading text-lg font-bold text-primary group-hover:text-accent">
                    {region.name}
                  </span>
                </Link>

                {/* Town pills: live towns link, the rest are plain text */}
                <div className="mt-4 flex-1">
                  <div className="flex flex-wrap gap-2">
                    {shownTowns.map((town) =>
                      town.slug ? (
                        <Link
                          key={town.name}
                          href={`/areas/${town.slug}`}
                          className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-primary transition-colors hover:border-accent hover:text-accent"
                        >
                          {town.name}
                        </Link>
                      ) : (
                        <span
                          key={town.name}
                          className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {town.name}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Footer link */}
                <div className="mt-5 border-t pt-4">
                  <Link
                    href={`/areas/${region.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-accent transition-transform group-hover:translate-x-0.5"
                  >
                    View {region.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
