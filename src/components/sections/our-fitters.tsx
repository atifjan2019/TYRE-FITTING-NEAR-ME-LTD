import Image from "next/image";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatCounter } from "@/components/ui/stat-counter";
import { FITTER_STANDARDS, FOUNDER, FOUNDER_STATS } from "@/lib/homepage-content";

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

        {/* Founder identity (E-E-A-T: identifiable person + track record) */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-2xl font-bold text-primary">
              Meet the Mobile Tyre Fitter Behind Tyre Fitting Near Me
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {FOUNDER.bio}
            </p>
            <p className="mt-4 font-semibold text-primary">
              {FOUNDER.name}, {FOUNDER.role}
            </p>
            <blockquote className="mt-6 border-l-4 border-accent pl-4 font-heading text-lg font-semibold italic text-primary">
              &ldquo;{FOUNDER.quote}&rdquo;
            </blockquote>
          </div>

          <figure className="mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-secondary shadow-sm">
              <Image
                src={FOUNDER.photo}
                alt={FOUNDER.photoAlt}
                fill
                sizes="(min-width: 1024px) 384px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              Mobile tyre fitting standards: calibrated tools, safe lifting and on-site fitting.
            </figcaption>
          </figure>
        </div>

        {/* Quantified track record (placeholder figures, owner confirms) */}
        <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border bg-card p-6 shadow-sm lg:grid-cols-4">
          {FOUNDER_STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              useCommas={stat.useCommas}
              label={stat.label}
            />
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
