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
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-14">
        {crumbs ? (
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
        ) : null}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-lg text-primary-foreground/90">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
