import type { SiteSettingsData } from "@/lib/data";

/** Headline trust counters (years experience, customers served, brands). */
export function TrustCounters({ settings }: { settings: SiteSettingsData }) {
  const stats = [
    { value: `${settings.yearsExperience}+`, label: "Years experience" },
    {
      value: `${settings.customersServed.toLocaleString()}+`,
      label: "Customers served",
    },
    { value: `${settings.brandsCount}+`, label: "Tyre brands fitted" },
    { value: "24/7", label: "Emergency call-out" },
  ];

  return (
    <section className="border-y bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm font-medium text-primary-foreground/80">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
