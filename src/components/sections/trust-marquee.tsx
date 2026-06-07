import { Icon } from "@/components/icon";
import { TRUST_STRIP } from "@/lib/site-config";

/**
 * Auto-scrolling trust strip. The badge list is duplicated so the CSS marquee
 * (see globals.css) loops seamlessly. Animation is disabled for users who
 * prefer reduced motion. Reusable on service/location pages.
 */
export function TrustMarquee() {
  // Duplicate the items so the -50% translate loops with no visible jump.
  const items = [...TRUST_STRIP, ...TRUST_STRIP];

  return (
    <section className="overflow-hidden border-y bg-primary py-3 text-primary-foreground">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap pr-8">
        {items.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className="flex items-center gap-2 text-sm font-medium"
            // Duplicated items are decorative for screen readers.
            aria-hidden={i >= TRUST_STRIP.length}
          >
            <Icon name={item.icon} className="h-4 w-4 text-accent" />
            {item.label}
            <span className="ml-8 text-accent">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
