import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Terms & Conditions",
    description: "The terms and conditions for using Tyre Fitting Near Me Ltd's services.",
    path: "/terms",
  });
}

export default async function TermsPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="prose-content max-w-none">
          <p>
            These terms govern the services provided by {settings.brandName}. This is a
            starting template - please have it reviewed by a solicitor before launch.
          </p>

          <h2>Services</h2>
          <p>
            We provide mobile tyre fitting, repair and related services at a location of
            your choosing, subject to safe and lawful access. Whether a tyre can be
            safely repaired is at our technician&apos;s professional discretion.
          </p>

          <h2>Quotes &amp; pricing</h2>
          <p>
            Quotes are based on the information you provide. The final price may change
            if the work required differs from what was described (for example a
            different tyre size or additional damage). We&apos;ll always confirm before
            proceeding.
          </p>
          <p>
            No standard-hours call-out fee. Any out-of-hours charge is included in your
            confirmed quote before dispatch. The figure confirmed in your quote is the
            figure charged, with nothing added afterwards.
          </p>

          <h2>Payment</h2>
          <p>
            Payment is due on completion of the work unless otherwise agreed. We accept
            card, contactless and cash.
          </p>

          <h2>Cancellations</h2>
          <p>
            Please let us know as soon as possible if you need to cancel or rearrange so
            we can offer the slot to another customer.
          </p>

          <h2>Outsourced &amp; subcontracted work</h2>
          <p>
            Some bookings are fulfilled by independent third-party fitters, contractors
            and suppliers rather than by our own staff. Where a job is outsourced in this
            way, {settings.brandName} arranges the booking and allocates a suitable
            fitter — the work itself is carried out by that third party, on their own
            account.
          </p>
          <p>
            <strong>
              The third party is directly responsible for any work they carry out.
            </strong>{" "}
            That includes the standard of their workmanship, the tyres, parts and
            materials they supply, their conduct at your premises, and any loss, damage
            or delay arising from what they do or fail to do. They are responsible for
            holding their own insurance, qualifications and certifications, and we do not
            warrant or guarantee their work.
          </p>
          <p>
            {settings.brandName} does not accept responsibility or liability for work
            outsourced to a third party. Any claim, complaint or dispute about that work
            should be raised directly with the third party who carried it out. On request
            we will confirm who attended your booking and pass on their contact details
            so you can take the matter up with them.
          </p>

          <h2>Liability</h2>
          <p>
            Nothing in these terms limits our liability where it would be unlawful to do
            so, including liability for death or personal injury caused by negligence and
            for your statutory rights as a consumer. Our liability is otherwise limited
            to the value of the services provided, and does not extend to work carried
            out by an outsourced third party as set out above.
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
