import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

/**
 * Official WhatsApp logo (Font Awesome brand glyph). Inherits the button's text
 * colour; pass a `className` (e.g. "h-5 w-5") to size it.
 */
export function WhatsAppIcon({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} />;
}
