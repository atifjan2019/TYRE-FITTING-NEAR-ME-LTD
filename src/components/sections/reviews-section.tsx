import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { StarRating } from "@/components/star-rating";

type ReviewCard = {
  id: string;
  author: string;
  rating: number;
  text: string;
  location: string | null;
  source: string;
};

/** Customer reviews grid. Used on the homepage and (full list) on /reviews. */
export function ReviewsSection({
  reviews,
  heading = true,
  stats,
}: {
  reviews: ReviewCard[];
  heading?: boolean;
  /** Optional overall-rating headline (computed from the CMS). */
  stats?: { average: number; count: number };
}) {
  if (!reviews.length) return null;

  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {heading ? (
          <SectionHeading
            eyebrow="Don't just take our word for it"
            title="What our customers say"
            subtitle="Reviews from drivers we've helped across our coverage regions."
          />
        ) : null}

        {stats && stats.count > 0 ? (
          <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-1 rounded-xl border bg-card p-5 text-center shadow-sm">
            <div className="font-heading text-4xl font-extrabold text-accent">
              {stats.average.toFixed(1)}
            </div>
            <StarRating rating={Math.round(stats.average)} />
            <p className="text-sm text-muted-foreground">
              Rated {stats.average.toFixed(1)} / 5 from {stats.count} customer
              {stats.count === 1 ? "" : "s"}
            </p>
          </div>
        ) : null}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
            >
              <Quote className="h-7 w-7 text-primary/20" aria-hidden />
              <StarRating rating={r.rating} className="mt-2" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{r.author}</span>
                {r.location ? (
                  <span className="text-muted-foreground"> · {r.location}</span>
                ) : null}
                <span className="block text-xs text-muted-foreground">
                  via {r.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
