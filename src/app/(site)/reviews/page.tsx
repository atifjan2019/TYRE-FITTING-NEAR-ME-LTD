import type { Metadata } from "next";
import { getAllReviews, getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { CtaBand } from "@/components/sections/cta-band";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Customer Reviews | Tyre Fitting Near Me",
    description:
      "Read reviews from drivers we've helped with mobile tyre fitting, repairs and emergency call-outs across our seven UK coverage regions.",
    path: "/reviews",
  });
}

export default async function ReviewsPage() {
  const [reviews, settings] = await Promise.all([
    getAllReviews(),
    getSiteSettings(),
  ]);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        title="What our customers say"
        subtitle="What drivers across our seven coverage regions say about our mobile tyre fitting."
        crumbs={crumbs}
      />
      <ReviewsSection reviews={reviews} heading={false} />
      <CtaBand phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
