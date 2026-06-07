import { Check, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { AvailabilityFinder } from "@/components/sections/availability-finder";
import { telHref, whatsappHref } from "@/lib/utils";
import { SITE } from "@/lib/site-config";
import type { SiteSettingsData } from "@/lib/data";

/**
 * Homepage hero. Two columns on desktop: the value proposition + CTAs on the
 * left, and the "find a fitter near you" finder card on the right. Light
 * background so the navy headline (with a red keyword) reads with strong
 * contrast. Rating/stats come from the CMS so claims stay accurate.
 */
export function Hero({
  settings,
  stats,
}: {
  settings: SiteSettingsData;
  stats: { average: number; count: number };
}) {
  const ratingLabel =
    stats.count > 0
      ? `Rated ${stats.average.toFixed(1)}★ on Google`
      : "Rated 5★ on Google";

  const bullets = [
    "24/7 emergency response",
    ratingLabel,
    "All major brands in stock",
    "30-60 min typical arrival",
  ];

  return (
    <section className="border-b bg-gradient-to-b from-white to-[var(--color-muted-blue)]/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        {/* Left: value proposition + CTAs */}
        <div>
          {/* Google rating badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-medium shadow-sm">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-muted-foreground">
              {stats.average.toFixed(1)} / 5
              {stats.count > 0 ? ` · ${stats.count}+ reviews` : ""}
            </span>
          </div>

          <h1 className="font-heading text-4xl font-extrabold italic leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {/* Keep on a single line at every width (scales to fit). */}
            <span className="block whitespace-nowrap text-accent text-[clamp(1.5rem,6vw,2.75rem)]">
              MOBILE TYRE FITTING
            </span>
            <span className="block text-primary">WE COME TO YOU, FAST</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            24/7 emergency mobile tyre fitting across London, Kent, Sussex, Essex,
            the West Midlands &amp; Scotland. Home, work or roadside - there&apos;s
            no garage to visit, we come to you.
          </p>

          {/* Trust bullets */}
          <ul className="mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 font-medium text-primary">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {settings.phone ? (
              <Button asChild variant="cta" size="xl">
                <a href={telHref(settings.phone)}>
                  <Phone /> Call Now
                </a>
              </Button>
            ) : null}
            {settings.whatsapp ? (
              <Button asChild variant="whatsapp" size="xl">
                <a
                  href={whatsappHref(settings.whatsapp, SITE.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> WhatsApp your location &amp; tyre size
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-3 text-sm font-semibold text-accent">
            Roadside help available now - 24/7, 365 days a year.
          </p>
        </div>

        {/* Right: availability finder */}
        <div className="lg:pl-6">
          <AvailabilityFinder />
        </div>
      </div>
    </section>
  );
}
