import { Fragment } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import type { FaqItem } from "@/lib/locking-wheel-nut-removal-content";

/**
 * Locking-wheel-nut-removal FAQ accordion. Native <details>/<summary>: every
 * answer is rendered into the server HTML (crawlable, curl-able), visually
 * collapsed by the browser until expanded, never injected on click. Items may
 * carry a `links` array, where each phrase's first occurrence is turned into a
 * contextual <Link>. Visible text stays byte-identical to the `answer` string
 * that feeds the FAQPage JSON-LD, so structured data and copy never diverge.
 */
function renderAnswer(f: FaqItem) {
  if (!f.links?.length) return f.answer;

  // Build replacement ranges (first occurrence of each phrase, non-overlapping).
  const ranges: { start: number; end: number; href: string }[] = [];
  for (const { phrase, href } of f.links) {
    let from = 0;
    while (from <= f.answer.length) {
      const idx = f.answer.indexOf(phrase, from);
      if (idx === -1) break;
      const end = idx + phrase.length;
      const overlaps = ranges.some((r) => idx < r.end && end > r.start);
      if (!overlaps) {
        ranges.push({ start: idx, end, href });
        break;
      }
      from = idx + 1;
    }
  }

  if (!ranges.length) return f.answer;
  ranges.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach((r, i) => {
    if (r.start > cursor) out.push(<Fragment key={`t${i}`}>{f.answer.slice(cursor, r.start)}</Fragment>);
    out.push(
      <Link key={`l${i}`} href={r.href} className="font-medium text-accent hover:underline">
        {f.answer.slice(r.start, r.end)}
      </Link>
    );
    cursor = r.end;
  });
  if (cursor < f.answer.length) out.push(<Fragment key="tail">{f.answer.slice(cursor)}</Fragment>);

  return <>{out}</>;
}

export function Faq({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "FAQs",
}: {
  faqs: FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-8 divide-y border-y">
          {faqs.map((f) => (
            <details key={f.id} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left font-heading text-base font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                <span>{f.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-4 pt-0 leading-relaxed text-muted-foreground">{renderAnswer(f)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
