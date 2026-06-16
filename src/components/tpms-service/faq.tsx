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
 * TPMS-service FAQ accordion. Native <details>/<summary>: every answer is
 * rendered into the server HTML (crawlable, curl-able), visually collapsed by
 * the browser until expanded, never injected on click. Items may carry a `links`
 * array; renderAnswer replaces the first occurrence of each phrase with a
 * contextual <Link>. The visible text stays byte-identical to the `answer`
 * string that feeds the FAQPage JSON-LD, so structured data and copy never
 * diverge.
 */
function renderAnswer(f: FaqItem) {
  if (!f.links?.length) return f.answer;

  // Build ordered nodes by splitting on the first occurrence of each phrase in
  // turn, left to right, so each phrase is linked exactly once.
  let nodes: React.ReactNode[] = [f.answer];

  for (const { phrase, href } of f.links) {
    const next: React.ReactNode[] = [];
    let replaced = false;
    for (const node of nodes) {
      if (replaced || typeof node !== "string" || !node.includes(phrase)) {
        next.push(node);
        continue;
      }
      const idx = node.indexOf(phrase);
      const before = node.slice(0, idx);
      const after = node.slice(idx + phrase.length);
      if (before) next.push(before);
      next.push(
        <Link
          key={`${phrase}-${href}`}
          href={href}
          className="font-medium text-accent hover:underline"
        >
          {phrase}
        </Link>
      );
      if (after) next.push(after);
      replaced = true;
    }
    nodes = next;
  }

  return (
    <>
      {nodes.map((node, i) => (
        <Fragment key={i}>{node}</Fragment>
      ))}
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
