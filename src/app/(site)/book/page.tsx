import type { Metadata } from "next";
import { Phone, MessageCircle, Clock } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/page-hero";
import { BookingForm } from "@/components/forms/booking-form";
import { Button } from "@/components/ui/button";
import { telHref, whatsappHref } from "@/lib/utils";
import { SITE } from "@/lib/site-config";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Book a Mobile Tyre Fitter | Get a Fast Quote",
    description:
      "Book mobile tyre fitting or get a fast, no-obligation quote. Call, WhatsApp or send your details and we'll come to you.",
    path: "/book",
  });
}

export default async function BookPage() {
  const settings = await getSiteSettings();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Book / Quote", path: "/book" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        title="Book a fitter or get a quote"
        subtitle="The fastest way to book is to call or WhatsApp us. Or send your details below and we'll get straight back to you."
        crumbs={crumbs}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-start">
        {/* Quick-contact options */}
        <div>
          <h2 className="text-2xl font-bold">Fastest ways to reach us</h2>
          <p className="mt-2 text-muted-foreground">
            Stuck at the roadside? Calling is quickest — we&apos;re available{" "}
            {settings.openingHours.toLowerCase()}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {settings.phone ? (
              <Button asChild variant="cta" size="xl">
                <a href={telHref(settings.phone)}>
                  <Phone /> Call {settings.phone}
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
                  <MessageCircle /> WhatsApp Us
                </a>
              </Button>
            ) : null}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" /> {settings.openingHours}
          </p>
        </div>

        {/* Form */}
        <div>
          <h2 className="mb-3 text-2xl font-bold">Or send your details</h2>
          <BookingForm phone={settings.phone} />
        </div>
      </div>
    </>
  );
}
