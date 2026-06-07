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
      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-green-500" />
      </span>
    </a>
  );
}
