import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { telHref, whatsappHref } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

/**
 * The primary call + WhatsApp button pair, reused across hero/CTA bands.
 * `message` lets a page pre-fill a location-specific WhatsApp message.
 */
export function CtaButtons({
  phone,
  whatsapp,
  message,
  size = "xl",
  className = "",
}: {
  phone: string;
  whatsapp: string;
  message?: string;
  size?: "lg" | "xl";
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      {phone ? (
        <Button asChild variant="cta" size={size}>
          <a href={telHref(phone)}>
            <Phone /> Call {phone}
          </a>
        </Button>
      ) : null}
      {whatsapp ? (
        <Button asChild variant="whatsapp" size={size}>
          <a
            href={whatsappHref(whatsapp, message ?? SITE.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> WhatsApp Us
          </a>
        </Button>
      ) : null}
    </div>
  );
}
