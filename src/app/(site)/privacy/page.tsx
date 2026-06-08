import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Privacy Policy",
    description: "How Tyre Fitting Near Me Ltd collects, uses and protects your personal data.",
    path: "/privacy",
    noindex: false,
  });
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        title="Privacy Policy"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="prose-content max-w-none">
          <p>
            This Privacy Policy explains how {settings.brandName} (&quot;we&quot;,
            &quot;us&quot;) collects and uses your personal information when you use our
            website or services. This is a starting template - please have it reviewed
            by a solicitor before launch.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you contact us or submit the booking form, we collect the details you
            provide: your name, phone number, location/postcode, vehicle and tyre
            information, and any message. We may also collect basic, anonymous
            analytics about how the site is used.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to your enquiry and provide a quote.</li>
            <li>To carry out the tyre fitting or repair service you request.</li>
            <li>To keep records for accounting and customer-service purposes.</li>
          </ul>

          <h2>Sharing your information</h2>
          <p>
            We do not sell your data. We only share it with service providers that help
            us operate (for example our email provider) and where required by law.
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK GDPR you have the right to access, correct or delete your personal
            data. To exercise these rights, contact us
            {settings.email ? ` at ${settings.email}` : ""}.
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
