import Link from "next/link";
import { ShieldCheck, Clock, MapPin, Star } from "lucide-react";
import { CtaButtons } from "@/components/sections/cta-buttons";
import { Button } from "@/components/ui/button";
import type { SiteSettingsData } from "@/lib/data";

/**
 * Homepage hero. Uses a CSS gradient (no large hero image) to keep LCP fast.
 * The H1 is the main local-SEO headline; CTAs are above the fold on mobile.
 */
export function Hero({ settings }: { settings: SiteSettingsData }) {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Decorative gradient + subtle grid; pointer-events-none so it never blocks taps */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,106,0,0.28),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </span>
            Rated 5 stars by {settings.customersServed.toLocaleString()}+ drivers
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            24/7 Mobile Tyre Fitting{" "}
            <span className="text-accent">That Comes To You</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/90">
            Flat tyre at home, at work or stuck at the roadside? Our mobile vans
            fit, repair and balance tyres on the spot across London, Kent,
            Sussex, Essex, the West Midlands &amp; Scotland - day or night, no
            call-out fee.
          </p>

          <CtaButtons
            phone={settings.phone}
            whatsapp={settings.whatsapp}
            className="mt-8"
          />

          <div className="mt-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <Link href="/book">Get a fast quote →</Link>
            </Button>
          </div>

          {/* Trust chips */}
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-primary-foreground/90">
            <li className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" /> Open 24/7, 365 days
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" /> We come to you
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" /> No hidden call-out fee
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
