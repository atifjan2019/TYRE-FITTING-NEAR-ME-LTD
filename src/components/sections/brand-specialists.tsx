import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { BRAND_SPECIALISTS } from "@/lib/homepage-content";

/**
 * Section 6b - Premium and performance vehicle specialists. Anchors the brand
 * cluster pages on the homepage. Cards link only to brand pages that exist
 * (passed in `builtSlugs`); the rest render as non-linked text until built, so
 * no 404 ships. Brand logos (SVG) are owner input; wordmarks render for now.
 */
export function BrandSpecialists({ builtSlugs }: { builtSlugs: Set<string> }) {
  return (
    <section className="bg-secondary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Premium and performance specialists"
          title="Mobile Tyre Fitting for Premium and Performance Vehicles"
          subtitle="Tyre Fitting Near Me Ltd carries OE-spec and manufacturer-approved tyres for premium and performance vehicles, fitting them on-site for owners of Tesla, BMW, Audi, Mercedes-Benz, Range Rover, Porsche, Bentley, Rolls-Royce, Ferrari, McLaren and Lamborghini cars across our six UK coverage regions, using calibrated torque equipment set to each manufacturer's exact specification."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_SPECIALISTS.map((b) => {
            const linked = builtSlugs.has(b.slug);
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-extrabold text-primary">
                    {b.brand}
                  </span>
                  <span className="rounded-full bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary">
                    {b.badge}
                  </span>
                </div>
                <h3 className="mt-3 font-heading text-base font-bold text-primary">
                  {b.brand} Mobile Tyre Fitting
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{b.description}</p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
                    linked ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {linked ? (
                    <>
                      View {b.brand} tyre service <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    "Page coming soon"
                  )}
                </span>
              </>
            );

            const cardClass =
              "flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none";

            return linked ? (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className={`${cardClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                {inner}
              </Link>
            ) : (
              <div key={b.slug} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
