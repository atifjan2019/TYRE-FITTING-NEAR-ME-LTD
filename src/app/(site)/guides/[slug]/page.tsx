import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getPosts, getPostBySlug, getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RichText } from "@/components/rich-text";
import { CtaBand } from "@/components/sections/cta-band";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { BookingForm } from "@/components/forms/booking-form";
import { LIVE_AREAS } from "@/data/areas";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  // Self-referential canonical to the /guides/ URL (path drives the canonical
  // in buildMetadata). The retired /blog/ URL 301s here and carries no canonical
  // of its own.
  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/guides/${post.slug}`,
    ogImage: post.ogImage || post.coverImage,
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

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
    getPosts(),
  ]);

  if (!post) notFound();

  const url = `${SITE.url}/guides/${post.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: post.title, path: `/guides/${post.slug}` },
  ];

  // Other published guides for the sidebar (current article excluded).
  const otherGuides = allPosts.filter((p) => p.slug !== post.slug).slice(0, 5);
  // A handful of live areas for local intent links.
  const sidebarAreas = LIVE_AREAS.slice(0, 8);

  // How-to guides (e.g. the tread-depth 20p test) are TechArticles; everything
  // else is a plain Article.
  const isHowTo = /^how to\b/i.test(post.title);
  const articleType = isHowTo ? "TechArticle" : "Article";

  // Article / TechArticle structured data, reflecting the /guides/ URL.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": articleType,
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${SITE.url}${post.coverImage}` : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: settings.brandName },
    mainEntityOfPage: url,
    url,
  };

  // WebPage with speakable on the title + intro/definition line.
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: post.seoTitle || post.title,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#guide-title", "#guide-body p:first-of-type"],
    },
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, webPageJsonLd, breadcrumbJsonLd(crumbs)]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Breadcrumbs items={crumbs} />

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          {/* Article — left / main column */}
          <article className="lg:col-span-2">
            <h1
              id="guide-title"
              className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              {post.title}
            </h1>
            {(() => {
              // Only render the meta parts that exist, so a missing date or
              // author never leaves an orphan "·" separator under the title.
              const meta = [formatDate(post.publishedAt), post.author].filter(
                Boolean
              );
              return meta.length ? (
                <div className="mt-3 text-sm text-muted-foreground">
                  {meta.join(" · ")}
                </div>
              ) : null;
            })()}

            {post.coverImage ? (
              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            ) : null}

            <div id="guide-body" className="mt-8">
              <RichText html={post.body} />
            </div>
          </article>

          {/* Sidebar — right column (sticky on desktop) */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Quote form + CTA */}
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <h2 className="text-lg font-bold">Get a fast quote</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mobile fitting that comes to you, day or night. Call us or send
                  your details.
                </p>
                <CtaButtons
                  phone={settings.phone}
                  whatsapp=""
                  size="lg"
                  className="mt-4"
                />
                <div className="mt-5 border-t pt-5">
                  <BookingForm phone={settings.phone} />
                </div>
              </div>

              {/* More guides */}
              {otherGuides.length ? (
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                  <h2 className="text-lg font-bold">More guides</h2>
                  <ul className="mt-3 space-y-3">
                    {otherGuides.map((g) => (
                      <li key={g.id}>
                        <Link
                          href={`/guides/${g.slug}`}
                          className="group flex items-start gap-2 text-sm font-medium hover:text-primary"
                        >
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="group-hover:underline">{g.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/guides"
                    className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    See all guides →
                  </Link>
                </div>
              ) : null}

              {/* Areas we cover */}
              {sidebarAreas.length ? (
                <div className="rounded-xl border bg-card p-5 shadow-sm">
                  <h2 className="text-lg font-bold">Areas we cover</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sidebarAreas.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/areas/${a.slug}`}
                        className="inline-flex items-center gap-1 rounded-full border bg-secondary/40 px-3 py-1 text-xs font-medium hover:border-primary hover:text-primary"
                      >
                        <MapPin className="h-3 w-3" /> {a.town}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/areas"
                    className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                  >
                    See all areas →
                  </Link>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </div>

      <CtaBand
        phone={settings.phone}
        whatsapp=""
        subtitle="Call us and we'll come to you, day or night."
      />
    </>
  );
}
