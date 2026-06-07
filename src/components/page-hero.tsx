import { Breadcrumbs } from "@/components/breadcrumbs";

/** Compact page hero used by index/standard pages for visual consistency. */
export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs?: { name: string; path: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Decorative red glow + faint grid for depth (matches the homepage hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(237,28,36,0.28),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:40px_40px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
        {crumbs ? (
          <div className="mb-4">
            <Breadcrumbs items={crumbs} light />
          </div>
        ) : null}
        <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {/* Accent underline */}
        <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
