import Image from "next/image";

type Brand = { id: string; name: string; logo: string | null };

/**
 * Tyre-brand logo strip. Uses uploaded logos when present, otherwise a clean
 * text wordmark so the strip looks complete before logos are added in /admin.
 */
export function BrandStrip({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;

  return (
    <section className="border-b bg-background py-10">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          We fit all major tyre brands
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {brands.map((b) =>
            b.logo ? (
              <Image
                key={b.id}
                src={b.logo}
                alt={`${b.name} tyres`}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span
                key={b.id}
                className="text-xl font-extrabold tracking-tight text-muted-foreground/70"
              >
                {b.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
