import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getPostBySlug, getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RichText } from "@/components/rich-text";
import { CtaBand } from "@/components/sections/cta-band";

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
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const url = `${SITE.url}/guides/${post.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: post.title, path: `/guides/${post.slug}` },
  ];

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

      <article className="mx-auto max-w-3xl px-4 py-10">
        <Breadcrumbs items={crumbs} />
        <h1
          id="guide-title"
          className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {post.title}
        </h1>
        <div className="mt-3 text-sm text-muted-foreground">
          {formatDate(post.publishedAt)} · {post.author}
        </div>

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

      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
