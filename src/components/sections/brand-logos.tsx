import Image from "next/image";
import { BRAND_LOGOS } from "@/lib/site-config";

/**
 * Tyre-brand logo grid using the curated images in /public/uploads/brands.
 * (For brands you'd rather manage in the CMS with their own logos, use
 *  /admin → Brands instead.)
 */
export function BrandLogos() {
  if (!BRAND_LOGOS.length) return null;

  return (
    <section className="border-y bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          All major tyre brands in stock - plus quality budget options
        </p>
        <div className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {BRAND_LOGOS.map((b) => (
            <div key={b.src} className="flex h-14 items-center justify-center">
              <Image
                src={b.src}
                alt={b.alt}
                width={150}
                height={56}
                sizes="(max-width: 640px) 40vw, 150px"
                className="max-h-14 w-auto object-contain opacity-80 transition hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
