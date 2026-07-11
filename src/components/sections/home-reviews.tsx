import { Star } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { HOME_REVIEWS } from "@/lib/homepage-content";

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
 * Section 9 - Customer testimonials. Six cards (3x2 grid on desktop, horizontal
 * swipe carousel on mobile). The stated count always equals the cards shown.
 *
 * FLAG: HOME_REVIEWS is placeholder testimonial content. These are deliberately
 * NOT labelled as Google reviews and carry no Review/AggregateRating schema.
 * Once the owner supplies a real Google Business Profile URL and real posted
 * reviews, swap the content in homepage-content.ts, restore the Google wording
 * and link, and reinstate the schema on the homepage.
 */
export function HomeReviews() {
  const countLabel = `${HOME_REVIEWS.length}`;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow={`Rated 5.0 / 5.0 · ${countLabel} customer testimonials`}
          title="What UK Drivers Say About Our Mobile Tyre Fitting Service"
          subtitle="Customer testimonials from drivers across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, shared after on-site mobile tyre fittings by Tyre Fitting Near Me Ltd, describing arrival times, workmanship and pricing."
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
      </div>
    </section>
  );
}
