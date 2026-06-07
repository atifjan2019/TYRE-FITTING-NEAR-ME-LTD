import Image from "next/image";
import { BRAND_LOGOS } from "@/lib/site-config";

/**
 * Tyre-brand logo grid using the curated images in /public/uploads/brands.
 * Each logo sits in a uniform white card so mixed logo sizes/shapes still line
 * up neatly. (Manage brands with their own logos via /admin -> Brands too.)
 */
export function BrandLogos() {
  if (!BRAND_LOGOS.length) return null;

  return (
    <section className="border-y bg-secondary py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-extrabold text-primary sm:text-3xl">
            Fitting all major tyre brands
          </h2>
          <p className="mt-2 text-muted-foreground">
            From premium names to quality budget options, supplied and fitted at
            your location.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {BRAND_LOGOS.map((b) => (
            <div
              key={b.src}
              className="flex h-24 items-center justify-center rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <Image
                src={b.src}
                alt={b.alt}
                width={140}
                height={64}
                sizes="(max-width: 640px) 40vw, 140px"
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
