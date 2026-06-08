import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { FITTER_STANDARDS } from "@/lib/homepage-content";

/**
 * Section 14 - The mobile tyre fitters and their standards. The E-E-A-T block:
 * certification, insurance, equipment and British Standard AU 159. Specific
 * numbers (years operating, technician count, founder bio) are owner input and
 * are flagged in the audit appendix rather than invented here.
 */
export function OurFitters() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Our standards"
          title="The Mobile Tyre Fitters Behind Tyre Fitting Near Me"
          subtitle="Every fitting is carried out by a certified, fully insured mobile tyre technician using calibrated equipment and repaired to British Standard AU 159, so the job is done to a verifiable professional standard."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FITTER_STANDARDS.map((item) => (
            <div key={item.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border bg-[var(--color-muted-blue)]/40 p-6 sm:p-8">
          <h3 className="font-heading text-lg font-bold text-primary">
            Equipment carried in every van
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Each mobile unit carries hydraulic jacks, a calibrated digital wheel balancer, a
            dedicated TPMS programmer, torque wrenches set to manufacturer specification, valve
            tools, run-flat-capable bead breakers and sealed tyre disposal containers. This is a
            fully equipped workshop on wheels, so removal, replacement, balancing, TPMS work and
            old tyre disposal are all completed at your location in a single visit.
          </p>
        </div>
      </div>
    </section>
  );
}
