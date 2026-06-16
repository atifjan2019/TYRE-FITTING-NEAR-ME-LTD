import { SectionHeading } from "@/components/sections/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { id: string; question: string; answer: string };

/**
 * FAQ accordion. The matching FAQPage JSON-LD is emitted separately by each
 * page (see src/lib/seo.ts) so the answers are eligible for rich results.
 */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "Good to know",
}: {
  faqs: FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent>
                {/* Answers may contain light HTML from the editor. */}
                <div dangerouslySetInnerHTML={{ __html: f.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
