import { CtaButtons } from "@/components/sections/cta-buttons";

/**
 * Full-width call-to-action band reused on service & location pages.
 * `message` pre-fills a context-specific WhatsApp message (e.g. the town name).
 */
export function CtaBand({
  phone,
  whatsapp,
  title = "Need a tyre sorted now?",
  subtitle = "Call or WhatsApp us - we'll come to you, day or night.",
  message,
}: {
  phone: string;
  whatsapp: string;
  title?: string;
  subtitle?: string;
  message?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-14 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-lg text-primary-foreground/90">{subtitle}</p>
        <CtaButtons phone={phone} whatsapp={whatsapp} message={message} />
      </div>
    </section>
  );
}
