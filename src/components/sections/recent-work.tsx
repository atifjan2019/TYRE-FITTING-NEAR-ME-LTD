import { Camera } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { RECENT_WORK } from "@/lib/homepage-content";

/**
 * Section 10 - Recent mobile tyre fittings gallery. Real photographs are owner
 * input (flagged in the audit appendix); until supplied, each tile renders an
 * entity-rich caption (brand, size, vehicle, location, service time) so the
 * semantic value is present now and photos drop in by filename later.
 */
export function RecentWork() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Recent work"
          title="Recent Mobile Tyre Fittings We Have Completed"
          subtitle="A sample of recent on-site fittings, showing the brand, tyre size, vehicle and location our mobile fitters worked on across the UK."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {RECENT_WORK.map((item) => (
            <figure
              key={item.file}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm"
            >
              {/* Placeholder until a real photo at item.file is supplied. */}
              <div
                role="img"
                aria-label={item.alt}
                data-status="placeholder"
                data-src={item.file}
                className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-secondary to-[var(--color-muted-blue)]/60 text-muted-foreground"
              >
                <Camera className="h-8 w-8" />
              </div>
              <figcaption className="p-3 text-xs font-medium text-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
