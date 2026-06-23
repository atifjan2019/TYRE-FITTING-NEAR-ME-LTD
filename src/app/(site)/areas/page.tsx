import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/sections/section-heading";
import { AreasCovered } from "@/components/sections/areas-covered";
import { CtaBand } from "@/components/sections/cta-band";
import { areas, LIVE_AREAS, CLUSTER_LABELS } from "@/data/areas";

export const revalidate = 3600;

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Areas", path: "/areas" },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Mobile Tyre Fitting Areas We Cover | 24/7 Across the UK",
    description:
      "Mobile tyre fitting areas across South East London and the wider UK, with fitters dispatched to each postcode 24/7. Find your town for a 30 to 60 minute response.",
    path: "/areas",
  });
}

/** Ordered list of clusters that have at least one live area. */
function liveClusters() {
  const order = Object.keys(CLUSTER_LABELS);
  const present = new Set(LIVE_AREAS.map((a) => a.cluster));
  return order.filter((c) => present.has(c));
}

export default async function AreasPage() {
  const settings = await getSiteSettings();

  // ItemList of the live area pages (hub schema) + breadcrumb.
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mobile Tyre Fitting Areas",
    itemListElement: LIVE_AREAS.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Mobile Tyre Fitting in ${a.town}`,
      url: `${SITE.url}/areas/${a.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(CRUMBS), itemList]} />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <Breadcrumbs items={CRUMBS} light />
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Mobile Tyre Fitting Areas We Cover
          </h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-accent" />
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-primary-foreground/90">
            Tyre Fitting Near Me Ltd covers areas across South East London and the wider UK, with
            mobile fitters dispatched to each postcode, 24/7. Our{" "}
            <Link href="/services/mobile-tyre-fitting" className="font-semibold text-white underline">
              mobile tyre fitting
            </Link>{" "}
            comes to your home, work or roadside, so pick your town below for local coverage and a 30
            to 60 minute typical response.
          </p>
        </div>
      </section>

      {/* Cluster card grids */}
      {liveClusters().map((cluster) => {
        const clusterAreas = areas.filter((a) => a.cluster === cluster);
        return (
          <section key={cluster} className="section-pad bg-background">
            <div className="mx-auto max-w-7xl px-4">
              <SectionHeading eyebrow="Areas we cover" title={CLUSTER_LABELS[cluster]} />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {clusterAreas.map((a) => {
                  const live = a.status === "live";
                  const inner = (
                    <>
                      <span
                        className={
                          live
                            ? "inline-block w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
                            : "inline-block w-fit rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground"
                        }
                      >
                        {a.postcodes[0]}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-bold text-primary">
                        Mobile Tyre Fitting in {a.town}
                      </h3>
                      {live ? (
                        <>
                          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            30 to 60 min · 24/7
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Covering {a.town}, {a.neighbours.slice(0, 2).join(" and ")} and the {a.roads[0]}.
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                            View {a.town} tyre fitting &rarr;
                          </span>
                        </>
                      ) : (
                        <p className="mt-2 text-sm font-medium text-muted-foreground">Coming soon</p>
                      )}
                    </>
                  );

                  const cardBase =
                    "flex h-full flex-col rounded-xl border border-[rgba(11,23,54,0.08)] bg-card p-5 shadow-[0_2px_8px_rgba(11,23,54,0.06)] sm:p-6";

                  return live ? (
                    <Link
                      key={a.slug}
                      href={`/areas/${a.slug}`}
                      className={`${cardBase} transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none`}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div key={a.slug} className={`${cardBase} opacity-60`}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* Browse by region: the six /areas/[region] hubs and their towns. */}
      <AreasCovered heading />

      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
