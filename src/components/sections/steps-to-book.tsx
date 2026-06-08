import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { BOOKING_STEPS } from "@/lib/site-config";

/** "How it works" - 4 steps, each with a reassuring micro-line. */
export function StepsToBook() {
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="It couldn't be easier"
          title="How it works"
          subtitle="From flat tyre to back on the road - usually within the hour."
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
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-sm">
                <Icon name={step.icon} className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                {step.micro}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
