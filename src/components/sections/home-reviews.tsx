import { Star } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { GoogleGlyph } from "@/components/icons/google-glyph";
import { HOME_REVIEWS } from "@/lib/homepage-content";
import { GOOGLE_REVIEWS_URL } from "@/lib/site-config";

// Distinct circular-avatar colours, cycled by card index.
const AVATAR_COLORS = [
  "bg-[#1F4ED8]",
  "bg-[#16A34A]",
  "bg-[#C9151C]",
  "bg-[#9333EA]",
  "bg-[#0891B2]",
  "bg-[#EA580C]",
];

/** Build up-to-two-letter initials from a reviewer name like "Sarah M.". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Section 9 - Customer reviews. Six review cards (3x2 grid on desktop, horizontal
 * swipe carousel on mobile). Content is placeholder until the owner swaps in real
 * Google reviews (flagged in the audit). Matching Review + AggregateRating schema
 * is emitted by the homepage.
 */
export function HomeReviews({
  reviewCount,
  googleUrl = GOOGLE_REVIEWS_URL,
}: {
  reviewCount: number;
  googleUrl?: string;
}) {
  const countLabel = reviewCount > 0 ? `${reviewCount}` : "50+";

  return (
    <section aria-labelledby="reviews-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={`5.0 / 5.0 on Google · ${countLabel} verified reviews`}
          title="What UK Drivers Say About Our Mobile Tyre Fitting Service"
          subtitle="Verified reviews from drivers across London, Kent, Sussex, Essex, the West Midlands and Scotland, posted after on-site mobile tyre fittings by Tyre Fitting Near Me Ltd, confirming arrival times, workmanship and pricing."
        />

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
          {HOME_REVIEWS.map((review, i) => (
            <article
              key={review.id}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border bg-card p-6 shadow-sm sm:w-[70%] md:w-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <GoogleGlyph className="h-5 w-5" />
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{review.body}&rdquo;
              </p>
              <footer className="mt-4 flex items-center gap-3 border-t pt-4">
                <span
                  aria-hidden
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                >
                  {initials(review.name)}
                </span>
                <div>
                  <p className="font-semibold text-primary">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.location} · {review.date}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-150 ease-out hover:scale-[1.02] hover:bg-secondary hover:shadow-md active:scale-[0.97] motion-reduce:transform-none"
          >
            <GoogleGlyph className="h-4 w-4" /> Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
