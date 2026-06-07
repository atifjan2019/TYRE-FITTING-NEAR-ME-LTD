import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { BOOKING_STEPS } from "@/lib/site-config";

/** "4 simple steps to book" band. */
export function StepsToBook() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="It couldn't be easier"
          title="4 simple steps to book"
          subtitle="From flat tyre to back on the road — usually within the hour."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKING_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-xl border bg-card p-6 text-center shadow-sm"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                Step {i + 1}
              </div>
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                <Icon name={step.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
