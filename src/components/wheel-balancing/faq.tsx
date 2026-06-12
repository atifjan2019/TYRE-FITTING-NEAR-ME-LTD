import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";

type FaqItem = { id: string; question: string; answer: string; link?: boolean };

/**
 * Wheel-balancing FAQ accordion. Native <details>/<summary>: every answer is
 * rendered into the server HTML (crawlable, curl-able), visually collapsed by
 * the browser until expanded, never injected on click. Items flagged `link`
 * have the phrase "mobile tyre fitting" turned into a contextual link to the
 * sibling service page. Visible text stays byte-identical to the `answer`
 * string that feeds the FAQPage JSON-LD, so structured data and copy never
 * diverge.
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
