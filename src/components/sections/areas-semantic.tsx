import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { SERVICE_REGIONS } from "@/lib/homepage-content";

/**
 * Section 11 - Areas we cover. Six regions, each with eight town entities named
 * in visible copy for local semantic coverage. Region titles link to the county
 * hub page; towns are listed as visible body copy.
 */
export function AreasSemantic({ availableSlugs }: { availableSlugs: Set<string> }) {
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Areas we cover"
          title="Mobile Tyre Fitting Areas Across the UK"
          subtitle="Tyre Fitting Near Me Ltd covers six regions for home, workplace and roadside drivers, dispatching the nearest insured mobile fitter to towns across London, Kent, Sussex, Essex, the West Midlands and Scotland."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_REGIONS.map((region) => (
            <div key={region.region} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-primary">
                <MapPin className="h-5 w-5 text-accent" />
                {availableSlugs.has(region.slug) ? (
                  <Link href={`/${region.slug}`} className="hover:text-accent hover:underline">
                    {region.region}
                  </Link>
                ) : (
                  <span>{region.region}</span>
                )}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {region.towns.map((town) => (
                  <li
                    key={town}
                    className="rounded-full border bg-secondary px-3 py-1 text-sm font-medium text-primary"
                  >
                    {town}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Not sure if we cover you? Enter your postcode in the checker above or send your
          location on WhatsApp and we will confirm availability straight away.
        </p>
      </div>
    </section>
  );
}
