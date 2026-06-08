import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata, localBusinessJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/lib/site-config";
import { PageHero } from "@/components/page-hero";
import { BookingForm } from "@/components/forms/booking-form";
import { telHref, whatsappHref } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Contact Us | Tyre Fitting Near Me",
    description:
      "Get in touch for 24/7 mobile tyre fitting. Call, WhatsApp or email - we come to you across the UK.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <JsonLd
        data={[
          localBusinessJsonLd({ settings, url: `${SITE.url}/contact` }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <PageHero
        title="Contact us"
        subtitle="We're a mobile service - there's no shop to visit. Reach us any time and we'll come to you."
        crumbs={crumbs}
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-2xl font-bold">Get in touch</h2>
          <ul className="mt-6 space-y-4">
            {settings.phone ? (
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <a href={telHref(settings.phone)} className="font-semibold hover:text-primary">
                  {settings.phone}
                </a>
              </li>
            ) : null}
            {settings.whatsapp ? (
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--color-whatsapp)]/10 text-[var(--color-whatsapp)]">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <a
                  href={whatsappHref(settings.whatsapp, SITE.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-primary"
                >
                  Message us on WhatsApp
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <a href={`mailto:${settings.email}`} className="font-semibold hover:text-primary">
                  {settings.email}
                </a>
              </li>
            ) : null}
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </span>
              <span>{settings.openingHours}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </span>
              <span>Mobile service across London, Kent, Sussex, Essex, the West Midlands &amp; Scotland</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold">Send us a message</h2>
          <BookingForm phone={settings.phone} />
        </div>
      </div>
    </>
  );
}
