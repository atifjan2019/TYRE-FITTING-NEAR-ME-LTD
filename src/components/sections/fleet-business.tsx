import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { telHref, whatsappHref } from "@/lib/utils";

/**
 * Section 15 - Mobile tyre fitting for fleets and businesses. B2B block with the
 * formula (who we serve, what we provide, verification, outcome) and a dedicated
 * fleet-account CTA.
 */
export function FleetBusiness({
  phone,
  whatsapp,
  email,
}: {
  phone: string;
  whatsapp: string;
  email?: string;
}) {
  const benefits = [
    "Account billing with consolidated monthly invoicing",
    "Priority response for vehicles off the road",
    "Fixed, agreed pricing across your whole fleet",
    "Multi-vehicle scheduling at your depot or yard",
  ];

  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-foreground/70">
            Fleets and businesses
          </p>
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">
            Mobile Tyre Fitting for Fleets and Businesses
          </h2>
          <p className="mt-4 max-w-xl text-primary-foreground/85">
            We keep couriers, delivery fleets, taxi firms and trade businesses moving by fitting
            and repairing tyres at your depot, yard or roadside, using insured certified fitters
            and fixed fleet pricing, so vehicles are back earning the same day with zero garage
            downtime.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm font-medium text-primary-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-whatsapp)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
          <h3 className="font-heading text-xl font-bold">Set up a fleet account</h3>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Tell us your fleet size and base location and we will set up priority response and
            agreed pricing for your vehicles.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {phone ? (
              <Button asChild variant="cta" size="xl">
                <a href={telHref(phone)}>
                  <Phone /> Call our fleet line
                </a>
              </Button>
            ) : null}
            {whatsapp ? (
              <Button asChild variant="whatsapp" size="xl">
                <a
                  href={whatsappHref(
                    whatsapp,
                    "Hi, I would like to set up a fleet account for mobile tyre fitting. Our fleet size is … and our base location is …"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> Message us on WhatsApp
                </a>
              </Button>
            ) : null}
            {email ? (
              <a
                href={`mailto:${email}?subject=Fleet%20account%20enquiry`}
                className="text-center text-sm font-semibold text-primary-foreground/80 hover:text-white hover:underline"
              >
                Or email {email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
