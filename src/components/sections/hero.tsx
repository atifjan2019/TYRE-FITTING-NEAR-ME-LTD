import { Check, Phone, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { AvailabilityFinder } from "@/components/sections/availability-finder";
import { HeroImage } from "@/components/sections/hero-image";
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
  // No invented review counts: the badge reflects the CMS average when real
  // reviews exist, otherwise the customer testimonials shown further down.
  const ratingValue = stats.count > 0 ? stats.average.toFixed(1) : "5.0";

  // `shield` marks the insurance/no-fee guarantees that render as shield badges.
  const bullets: { text: string; shield?: boolean }[] = [
    { text: "24/7 emergency response, 365 days a year" },
    { text: "30 to 60 minute typical arrival" },
    { text: `Rated ${ratingValue} / 5 by drivers we've helped` },
    { text: "30+ mobile fittings completed every week" },
    { text: "Public liability insured up to £5,000,000", shield: true },
    { text: "No standard-hours call-out fee, all-in quote upfront", shield: true },
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

          {/* Customer rating badge. Links to the on-page testimonials. FLAG:
              point this at the real Google Business Profile reviews URL (and
              restore the Google wording) once the owner supplies a verifiable
              profile with real reviews. */}
          <a
            href="#reviews"
            aria-label={`Rated ${ratingValue} out of 5 by our customers. Read customer reviews.`}
            className="mt-5 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-150 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.97] motion-reduce:transform-none"
          >
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-base font-bold text-primary">{ratingValue}</span>
            <span className="text-muted-foreground">/ 5 customer rating</span>
          </a>

          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            Tyre Fitting Near Me Ltd is a 24/7 mobile tyre fitting service for car,
            van, SUV, EV and fleet drivers across London, Kent, Sussex, Essex, the
            West Midlands, Scotland and Greater Manchester. Our fully insured certified fitters supply,
            fit and balance tyres at your home, work or roadside, returning you to
            the road within 30 to 60 minutes.
          </p>

          {/* Trust badges - shield/check pills */}
          <ul className="mt-6 flex max-w-xl flex-wrap gap-2">
            {bullets.map((b) => (
              <li
                key={b.text}
                className="inline-flex items-center gap-1.5 rounded-full border bg-white/70 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm"
              >
                <span className="grid h-4 w-4 shrink-0 place-items-center text-accent">
                  {b.shield ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                </span>
                {b.text}
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

        {/* Right: photo anchor with the finder card overlapping its lower half */}
        <div className="lg:pl-6">
          <div className="relative">
            <HeroImage />
            {/* Pull the form up by ~half the image height (4:3 -> 37.5% of width)
                so it sits in front of the bottom 50% of the photo, leaving the
                top half of the image visible. */}
            <div className="relative z-10 mx-auto -mt-[37.5%] w-[92%]">
              <AvailabilityFinder />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
