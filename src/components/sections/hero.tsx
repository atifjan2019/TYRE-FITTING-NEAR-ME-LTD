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
  const reviewCount = stats.count > 0 ? `${stats.count}+` : "50+";
  const ratingValue = stats.count > 0 ? stats.average.toFixed(1) : "5.0";

  const bullets = [
    "24/7 emergency response, 365 days a year",
    "30 to 60 minute typical arrival",
    `5.0 from ${reviewCount} verified Google reviews`,
    "30+ mobile fittings completed every week",
    "Public liability insured up to £5,000,000",
    "No call-out fee, all-in quote upfront",
  ];

  return (
    <section className="border-b bg-gradient-to-b from-white to-[var(--color-muted-blue)]/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
        {/* Left: value proposition + CTAs */}
        <div>
          <h1 className="font-heading text-4xl font-extrabold italic leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {/* Keep on a single line at every width (scales to fit). */}
            <span className="block whitespace-nowrap text-accent text-[clamp(1.9rem,8.5vw,3rem)]">
              MOBILE TYRE FITTING
            </span>
            <span className="block text-primary">WE COME TO YOU, FAST</span>
          </h1>

          {/* Google rating badge - immediately under H1 (eye-tracking) */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-sm font-medium shadow-sm">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-muted-foreground">
              {ratingValue} from {reviewCount} verified Google reviews
            </span>
          </div>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Tyre Fitting Near Me Ltd is a 24/7 mobile tyre fitting service for car,
            van, SUV, EV and fleet drivers across London, Kent, Sussex, Essex, the
            West Midlands and Scotland. Our fully insured certified fitters supply,
            fit and balance tyres at your home, work or roadside, returning you to
            the road within 30 to 60 minutes.
          </p>

          {/* Trust bullets - 2 cols on mobile (2x3), 3 cols on desktop (3x2) */}
          <ul className="mt-6 grid max-w-xl grid-cols-2 gap-2.5 lg:grid-cols-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm font-medium text-primary">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
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
                <a
                  href={telHref(settings.phone)}
                  data-conversion="call"
                  aria-label={`Call our 24/7 fitter line on ${settings.phone}`}
                >
                  <Phone /> Call {settings.phone}
                </a>
              </Button>
            ) : null}
            {settings.whatsapp ? (
              <Button asChild variant="whatsapp" size="xl" className="whitespace-normal">
                <a
                  href={whatsappHref(settings.whatsapp, SITE.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-conversion="whatsapp"
                  aria-label="Send your location and tyre size on WhatsApp"
                >
                  <WhatsAppIcon />
                  <span className="sm:hidden">WhatsApp Us</span>
                  <span className="hidden sm:inline">
                    WhatsApp your location &amp; tyre size
                  </span>
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Or send a photo of your tyre on WhatsApp. We will quote the all-in price in minutes.
          </p>
          <p className="mt-2 text-sm font-semibold text-accent">
            Roadside help available now, 24/7, 365 days a year.
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
