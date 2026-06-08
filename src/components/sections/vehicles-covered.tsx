import { Check } from "lucide-react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { VEHICLE_TYPES } from "@/lib/homepage-content";

/**
 * Section 6 - Vehicles we cover. Names every vehicle entity (car, van, SUV, EV,
 * hybrid, fleet) in visible copy with a formula sentence and EAV bullets.
 */
export function VehiclesCovered() {
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Vehicles we cover"
          title="Mobile Tyre Fitting for Every Vehicle Type"
          subtitle="We fit tyres to cars, vans, SUVs, 4x4s, electric vehicles, hybrids and fleet vehicles on-site, matching the manufacturer load index and speed rating for safe, road-legal running."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VEHICLE_TYPES.map((vehicle) => (
            <div key={vehicle.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/5 text-primary">
                <Icon name={vehicle.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-primary">
                {vehicle.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{vehicle.description}</p>
              <ul className="mt-4 space-y-1.5">
                {vehicle.eav.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
