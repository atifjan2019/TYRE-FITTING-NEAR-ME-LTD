import Link from "next/link";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";

type FaqLink = { phrase: string; href: string };
type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: FaqLink[];
};

/**
 * Run-flat-tyre FAQ accordion. Native <details>/<summary>: every answer is
 * rendered into the server HTML (crawlable, curl-able), visually collapsed by
 * the browser until expanded, never injected on click. Items carrying `links`
 * have each `phrase` (first occurrence) turned into a contextual <Link>. The
 * visible text stays byte-identical to the `answer` string that feeds the
 * FAQPage JSON-LD, so structured data and copy never diverge.
 */
function renderAnswer(f: FaqItem) {
  if (!f.links?.length) return f.answer;

  // Walk the answer left to right, splitting on each link phrase's first
  // occurrence in order, replacing it with a <Link> while keeping all
  // surrounding text identical to the schema string.
  const nodes: React.ReactNode[] = [];
  let rest = f.answer;
  let key = 0;

  for (const { phrase, href } of f.links) {
    const idx = rest.indexOf(phrase);
    if (idx === -1) continue;
    const before = rest.slice(0, idx);
    if (before) nodes.push(<Fragment key={key++}>{before}</Fragment>);
    nodes.push(
      <Link key={key++} href={href} className="font-medium text-accent hover:underline">
        {phrase}
      </Link>
    );
    rest = rest.slice(idx + phrase.length);
  }
  if (rest) nodes.push(<Fragment key={key++}>{rest}</Fragment>);

  return <>{nodes}</>;
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
