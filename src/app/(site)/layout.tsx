import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCallBar } from "@/components/layout/mobile-call-bar";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { getSiteSettings, getCounties } from "@/lib/data";

/**
 * Layout for the public-facing site. Loads the DB-driven contact settings once
 * and threads them into the persistent conversion UI (sticky call header,
 * mobile call bar, WhatsApp float) that appears on every page.
 *
 * `pb-16 lg:pb-0` reserves space so the fixed mobile call bar never covers
 * page content.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, counties] = await Promise.all([
    getSiteSettings(),
    getCounties(),
  ]);

  return (
    <>
      <SiteHeader brandName={settings.brandName} phone={settings.phone} />
      <main className="pb-16 lg:pb-0">{children}</main>
      <SiteFooter
        settings={settings}
        counties={counties.map((c) => ({ name: c.name, slug: c.slug }))}
      />
      <MobileCallBar phone={settings.phone} whatsapp={settings.whatsapp} />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
    </>
  );
}
