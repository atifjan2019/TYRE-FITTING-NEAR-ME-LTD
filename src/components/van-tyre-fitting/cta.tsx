import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { PHONE_DISPLAY, TEL_HREF, WA_HREF } from "@/lib/van-tyre-fitting-content";

/**
 * Phone + WhatsApp CTA pair for the van page. Equal weight (phone for urgent,
 * form for planned, WhatsApp for quick fleet enquiries). tel: and wa.me hrefs
 * are hardcoded to +447883288831 / wa.me/447883288831 so this page never
 * inherits the legacy sitewide WhatsApp-number bug.
 */
export function VanButtons({
  className = "",
  size = "xl",
}: {
  className?: string;
  size?: "lg" | "xl";
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button asChild variant="cta" size={size}>
        <a href={TEL_HREF}>
          <Phone /> Call {PHONE_DISPLAY}
        </a>
      </Button>
      <Button asChild variant="whatsapp" size={size}>
        <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> WhatsApp Us
        </a>
      </Button>
    </div>
  );
}

/**
 * Full-width CTA band, the van equivalent of the shared CtaBand, using the
 * hardcoded van tel:/wa.me hrefs.
 */
export function VanCtaBand({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="section-pad mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-lg text-primary-foreground/90">{subtitle}</p>
        <VanButtons className="w-full justify-center sm:w-auto" />
      </div>
    </section>
  );
}
