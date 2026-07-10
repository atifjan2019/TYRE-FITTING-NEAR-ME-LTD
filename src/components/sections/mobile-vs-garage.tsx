import { Check } from "lucide-react";
import { SectionHeading } from "@/components/sections/section-heading";
import { COMPARISON_ROWS, COMPARISON_SCENARIOS } from "@/lib/homepage-content";

/**
 * Section 12 - Mobile tyre fitting vs visiting a tyre garage. A comparison table
 * plus the scenarios where mobile fitting clearly wins, all on-topic to the
 * central entity.
 */
export function MobileVsGarage() {
  return (
    <section className="bg-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Mobile vs garage"
          title="Mobile Tyre Fitting vs Visiting a Tyre Garage"
          subtitle="Mobile tyre fitting brings the garage to you, removing travel, waiting and the risk of driving on a damaged tyre."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary/60 text-primary">
              <tr>
                <th className="px-4 py-3 font-bold sm:px-6">Factor</th>
                <th className="px-4 py-3 font-bold sm:px-6">Mobile Tyre Fitting</th>
                <th className="px-4 py-3 font-bold sm:px-6">Traditional Garage</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.factor} className="border-b last:border-0 align-top">
                  <td className="px-4 py-4 font-semibold text-primary sm:px-6">{row.factor}</td>
                  <td className="px-4 py-4 font-medium text-foreground sm:px-6">{row.mobile}</td>
                  <td className="px-4 py-4 text-muted-foreground sm:px-6">{row.garage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 rounded-2xl border bg-card p-6 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-primary">
            When mobile tyre fitting beats a garage
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {COMPARISON_SCENARIOS.map((scenario) => (
              <li key={scenario} className="flex gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{scenario}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
