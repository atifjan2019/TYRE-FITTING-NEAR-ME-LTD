import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
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
            <div key={county.id} className="rounded-xl border bg-card p-6 shadow-sm">
              <Link
                href={`/${county.slug}`}
                className="flex items-center gap-2 text-lg font-bold hover:text-primary"
              >
                <MapPin className="h-5 w-5 text-primary" />
                {county.name}
              </Link>
              {county.towns.length ? (
                <ul className="mt-3 space-y-1.5">
                  {county.towns.slice(0, 6).map((town) => (
                    <li key={town.id}>
                      <Link
                        href={`/${county.slug}/${town.slug}`}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        {town.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Full coverage across {county.name}.
                </p>
              )}
              <Link
                href={`/${county.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
              >
                View {county.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
