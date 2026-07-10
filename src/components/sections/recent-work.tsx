import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { RECENT_WORK } from "@/lib/homepage-content";

/**
 * Section 10 - Recent mobile tyre fittings gallery.
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
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={item.file}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
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
