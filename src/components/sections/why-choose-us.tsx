import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { WHY_CHOOSE } from "@/lib/site-config";

/** "Why choose us" — 4 reassurance blocks. Reusable on service/location pages. */
export function WhyChooseUs() {
  return (
    <section className="bg-[var(--color-muted-blue)] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="The Tyre Fitting Near Me difference"
          title="Why drivers choose us"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item) => (
            <div key={item.title} className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent/10 text-accent">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
