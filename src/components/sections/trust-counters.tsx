import type { SiteSettingsData } from "@/lib/data";

/** Headline trust counters. Zero/unset CMS values are hidden (no fake numbers). */
export function TrustCounters({ settings }: { settings: SiteSettingsData }) {
  const stats = [
    settings.yearsExperience > 0
      ? { value: `${settings.yearsExperience}+`, label: "Years experience" }
      : null,
    settings.customersServed > 0
      ? {
          value: `${settings.customersServed.toLocaleString()}+`,
          label: "Customers served",
        }
      : null,
    settings.brandsCount > 0
      ? { value: `${settings.brandsCount}+`, label: "Tyre brands fitted" }
      : null,
    { value: "24/7", label: "Emergency call-out" },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section className="border-y bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-16 sm:py-20 lg:grid-cols-4">
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
