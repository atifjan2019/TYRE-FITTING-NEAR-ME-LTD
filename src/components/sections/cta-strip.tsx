import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { telHref, whatsappHref } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

/**
 * Mid-page conversion strip. Two visual variants so consecutive strips break the
 * pattern: "navy" (dark) and "purple" (light). Formula sub-line, dual click-to-
 * call / WhatsApp buttons with analytics + accessibility attributes.
 */
export function CtaStrip({
  phone,
  whatsapp,
  title,
  subtitle,
  variant = "navy",
}: {
  phone: string;
  whatsapp: string;
  title: string;
  subtitle: string;
  variant?: "navy" | "purple";
}) {
  const isNavy = variant === "navy";

  return (
    <section
      className={
        isNavy
          ? "bg-primary text-primary-foreground"
          : "bg-[#EEEAFB] text-primary"
      }
    >
      <div className="section-pad mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 text-center">
        <h3 className="font-heading text-2xl font-extrabold sm:text-3xl">{title}</h3>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          {phone ? (
            <Button asChild variant="cta" size="xl">
              <a href={telHref(phone)} data-conversion="call" aria-label={`Call ${phone}`}>
                <Phone /> Call {phone}
              </a>
            </Button>
          ) : null}
          {whatsapp ? (
            <Button asChild variant="whatsapp" size="xl">
              <a
                href={whatsappHref(whatsapp, SITE.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                data-conversion="whatsapp"
                aria-label="Message us on WhatsApp"
              >
                <WhatsAppIcon /> WhatsApp Now
              </a>
            </Button>
          ) : null}
        </div>
        <p className={isNavy ? "text-sm text-primary-foreground/80" : "text-sm text-primary/70"}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
