import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { telHref, whatsappHref } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

/**
 * Fixed bottom action bar shown ONLY on mobile - the primary conversion path
 * for a stranded customer holding their phone. Two large thumb-friendly
 * buttons: Call Now + WhatsApp. Hidden on >= lg where the header CTA suffices.
 */
export function MobileCallBar({
  phone,
  whatsapp,
}: {
  phone: string;
  whatsapp: string;
}) {
  if (!phone && !whatsapp) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden">
      {phone ? (
        <a
          href={telHref(phone)}
          className="flex items-center justify-center gap-2 bg-accent py-3.5 text-base font-bold text-accent-foreground"
          aria-label="Call now"
        >
          <Phone className="h-5 w-5" /> Call Now
        </a>
      ) : null}
      {whatsapp ? (
        <a
          href={whatsappHref(whatsapp, SITE.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[var(--color-whatsapp)] py-3.5 text-base font-bold text-white"
          aria-label="Message us on WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp
        </a>
      ) : null}
    </div>
  );
}
