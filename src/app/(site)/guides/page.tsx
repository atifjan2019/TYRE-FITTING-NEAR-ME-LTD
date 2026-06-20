import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { PageHero } from "@/components/page-hero";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tyre Guides & Advice",
    description:
      "Practical tyre safety, maintenance and advice guides from the Tyre Fitting Near Me team. The evergreen home for our supporting content.",
    path: "/guides",
  });
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function GuidesHubPage() {
  const posts = await getPosts();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];

  // ItemList of published guides for the hub, plus the breadcrumb trail.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/guides/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), itemListJsonLd]} />
      <PageHero
        title="Tyre guides & advice"
        subtitle="Tips to keep you safe, legal and moving."
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/guides/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {post.coverImage ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs font-medium text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </time>
                  <h2 className="mt-1 text-lg font-bold group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-3 text-sm font-semibold text-primary">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No guides yet. Check back soon.</p>
        )}
      </div>
    </>
  );
}
