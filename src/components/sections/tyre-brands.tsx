import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { TYRE_BRAND_GROUPS } from "@/lib/homepage-content";
import { BRAND_LOGOS } from "@/lib/site-config";

/**
 * Section 3 - Premium and budget tyre brands supplied and fitted on-site.
 * Names every brand entity in visible copy (Rule 5) and groups by tier so the
 * entity layer reads topical breadth.
 */
export function TyreBrands() {
  return (
    <section className="border-y bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Tyre brands"
          title="Premium and Budget Tyre Brands Supplied and Fitted On-Site"
          subtitle="Tyre Fitting Near Me Ltd supplies and fits premium, mid-range and budget tyre brands for car, van, SUV and EV drivers across the UK, using certified mobile fitters and calibrated balancing equipment, with most fitted on-site within 30 to 60 minutes."
        />

        {BRAND_LOGOS.length ? (
          <div className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {BRAND_LOGOS.map((logo, i) => (
              <div
                key={`${logo.src}-${i}`}
                className="group grid h-24 place-items-center rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={56}
                  className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TYRE_BRAND_GROUPS.map((group) => (
            <div key={group.tier} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-primary">{group.tier}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{group.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.brands.map((brand) => (
                  <li
                    key={brand}
                    className="rounded-full border bg-secondary px-3 py-1 text-sm font-semibold text-primary"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Not sure which tyre suits your vehicle and budget?{" "}
          <Link href="/services/mobile-tyre-fitting" className="font-semibold text-accent hover:underline">
            See how mobile tyre fitting works
          </Link>{" "}
          or send your tyre size on WhatsApp for a same-day quote.
        </p>
      </div>
    </section>
  );
}
