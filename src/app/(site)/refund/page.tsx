import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Refund Policy",
    description:
      "Tyre Fitting Near Me Ltd's refund policy. Deposits are non-refundable once a job is booked.",
    path: "/refund",
  });
}

export default async function RefundPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        title="Refund Policy"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Refund Policy", path: "/refund" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="prose-content max-w-none">
          <p>
            This Refund Policy explains how deposits and payments are handled when you
            book a service with {settings.brandName}.
          </p>

          <h2>Deposits are non-refundable</h2>
          <p>
            A deposit is required to secure your booking. <strong>Deposits are
            non-refundable.</strong> Once a job has been booked and the deposit has been
            taken, no refund will be initiated under any circumstances.
          </p>
          <p>
            By paying a deposit and confirming your booking, you acknowledge and agree
            that the deposit is non-refundable. It reserves your time slot and covers the
            cost of allocating a fitter and scheduling the call-out.
          </p>

          <h2>Cancellations &amp; rescheduling</h2>
          <p>
            If you need to cancel or rearrange, please let us know as soon as possible so
            we can offer the slot to another customer. While the deposit cannot be
            refunded, we will do our best to reschedule your booking to a more convenient
            time where reasonably possible.
          </p>

          <h2>Balance payment</h2>
          <p>
            The remaining balance for the work is due on completion, unless otherwise
            agreed in writing. We accept card, contactless and cash.
          </p>

          <h2>Your statutory rights</h2>
          <p>
            Nothing in this policy affects your statutory rights as a consumer where they
            apply and cannot lawfully be excluded.
          </p>

          <h2>Contact</h2>
          <p>
            {settings.brandName}
            {settings.email ? ` - ${settings.email}` : ""}
            {settings.phone ? ` - ${settings.phone}` : ""}.
          </p>
        </div>
      </div>
    </>
  );
}
