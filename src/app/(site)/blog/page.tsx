import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Tyre Safety & Advice Blog",
    description:
      "Practical tyre safety, maintenance and advice articles from the Tyre Fitting Near Me team.",
    path: "/blog",
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

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        title="Tyre safety & advice"
        subtitle="Tips to keep you safe, legal and moving."
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {posts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
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
          <p className="text-muted-foreground">No articles yet - check back soon.</p>
        )}
      </div>
    </>
  );
}
