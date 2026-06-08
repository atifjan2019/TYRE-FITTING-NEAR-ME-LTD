import { SectionHeading } from "@/components/sections/section-heading";
import { PRICING_ROWS } from "@/lib/homepage-content";

/**
 * Section 8 - Transparent mobile tyre fitting prices. Prices are "From £X"
 * placeholders until the business owner supplies real figures (flagged in the
 * audit appendix). The all-in, no-call-out-fee promise removes booking friction.
 */
export function PricingTable() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          eyebrow="Transparent pricing"
          title="Transparent Mobile Tyre Fitting Prices"
          subtitle="We quote a single all-in price covering the tyre, fitting, valve, balancing and disposal before we dispatch a fitter, with no call-out fee and no hidden charges added afterwards."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary/60 text-primary">
              <tr>
                <th className="px-4 py-3 font-bold sm:px-6">Service</th>
                <th className="px-4 py-3 font-bold sm:px-6">Typical price</th>
                <th className="hidden px-4 py-3 font-bold sm:table-cell sm:px-6">Includes</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_ROWS.map((row) => (
                <tr key={row.service} className="border-b last:border-0">
                  <td className="px-4 py-4 font-semibold text-foreground sm:px-6">
                    {row.service}
                    <span className="mt-1 block text-xs font-normal text-muted-foreground sm:hidden">
                      {row.includes}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-bold text-accent sm:px-6">
                    {row.price}
                  </td>
                  <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell sm:px-6">
                    {row.includes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center font-semibold text-primary">
          All quotes are confirmed before dispatch. The price we quote is the price you pay.
        </p>
      </div>
    </section>
  );
}
