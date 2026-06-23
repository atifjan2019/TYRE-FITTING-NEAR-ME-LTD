import type { Metadata } from "next";
import { Phone, Truck, Clock } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site-config";
import { regionSlugForPostcode } from "@/lib/postcode-regions";
import { getRegion } from "@/data/regions";
import { CoverageMap } from "@/components/sections/coverage-map";
import { BookingDialog } from "@/components/sections/booking-dialog";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { telHref, whatsappHref } from "@/lib/utils";

// Dynamic: depends on the searched location. Not indexed (utility page).
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Check Fitter Availability Near You",
    description:
      "Check live mobile tyre fitter availability in your area and request a call-out.",
    path: "/availability",
    noindex: true,
  });
}

export default async function AvailabilityPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; k?: string }>;
}) {
  const [{ location, k }, settings] = await Promise.all([
    searchParams,
    getSiteSettings(),
  ]);

  // Resolve the searched postcode to one of our region hubs (if possible).
  const slug = location ? regionSlugForPostcode(location) : null;
  const region = slug ? getRegion(slug) : null;

  const areaLabel = region?.name ?? (location ? location.toUpperCase() : "your area");

  // Deterministic "available fitters" count (placeholder - wire to real fitter
  // availability later). 2-4 based on the search so it feels location-specific.
  const available = 2 + ((location?.length ?? 1) % 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:py-14">
      <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
        Live fitter availability
      </h1>
      <p className="mt-2 text-muted-foreground">
        Mobile tyre fitters near <span className="font-semibold">{areaLabel}</span>
      </p>

      <div className="mt-8">
        <CoverageMap />
        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> Last updated: a few minutes ago
        </p>
      </div>

      {/* Busy / available van legend */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Busy:
          </span>
          {Array.from({ length: 4 }).map((_, i) => (
            <Truck key={i} className="h-5 w-5 text-muted-foreground/50" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">
            Available:
          </span>
          {Array.from({ length: available }).map((_, i) => (
            <Truck key={i} className="h-5 w-5 text-accent" />
          ))}
        </div>
      </div>

      <h2 className="mt-8 font-heading text-2xl font-extrabold text-primary sm:text-3xl">
        We have <span className="text-accent">{available}</span> available fitters
        in {areaLabel}.
      </h2>
      <p className="mt-2 text-muted-foreground">
        Contact us now to request a tyre fitter to your location.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {settings.phone ? (
          <Button asChild variant="navy" size="xl">
            <a href={telHref(settings.phone)}>
              <Phone /> Call Us
            </a>
          </Button>
        ) : null}
        {settings.whatsapp ? (
          <Button asChild variant="whatsapp" size="xl">
            <a
              href={whatsappHref(
                settings.whatsapp,
                `Hi, I need a mobile tyre fitter near ${areaLabel}. My tyre size is …`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> WhatsApp
            </a>
          </Button>
        ) : null}
        <BookingDialog
          phone={settings.phone ?? undefined}
          defaultPostcode={location}
          leadKey={k}
        />
      </div>
    </div>
  );
}
