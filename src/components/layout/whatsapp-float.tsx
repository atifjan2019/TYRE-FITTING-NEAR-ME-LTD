import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { whatsappHref } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

/**
 * Floating WhatsApp bubble visible on every page (bottom-right).
 */
export function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  if (!whatsapp) return null;

  return (
    <a
      href={whatsappHref(whatsapp, SITE.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-3 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-white shadow-lg transition-transform hover:scale-105 lg:bottom-3 lg:right-5"
    >
      <WhatsAppIcon className="h-10 w-10" />
      {/* Notification badge with a "1" and a ping pulse */}
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px] font-bold leading-none text-white">
          1
        </span>
      </span>
    </a>
  );
}
