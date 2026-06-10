import Link from "next/link";
import { ChevronDown } from "lucide-react";

type FaqItem = { id: string; question: string; answer: string; link?: boolean };

/**
 * Puncture-repair FAQ accordion. Native <details>/<summary>: every answer is
 * rendered into the server HTML (crawlable, curl-able), visually collapsed by the
 * browser until expanded, never injected on click. The first item is open by
 * default. Items flagged `link` have the phrase "mobile tyre fitting" turned into
 * a contextual link to the sibling service page. Visible text stays identical to
 * the `answer` string that feeds the FAQPage JSON-LD.
 */
function renderAnswer(f: FaqItem) {
  const phrase = "mobile tyre fitting";
  if (!f.link || !f.answer.includes(phrase)) return f.answer;
  const [before, after] = f.answer.split(phrase);
  return (
    <>
      {before}
      <Link href="/services/mobile-tyre-fitting" className="font-medium text-accent hover:underline">
        {phrase}
      </Link>
      {after}
    </>
  );
}

export function Faq({ faqs, eyebrow = "FAQs", title }: { faqs: FaqItem[]; eyebrow?: string; title: string }) {
  if (!faqs.length) return null;

  return (
    <section className="bg-background py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">{eyebrow}</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mt-8 divide-y border-y">
          {faqs.map((f, i) => (
            <details key={f.id} className="group" open={i === 0}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left font-heading text-base font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
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
