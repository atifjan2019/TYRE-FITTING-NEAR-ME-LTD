import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { getSiteSettings, getCounties } from "@/lib/data";

/**
 * Layout for the public-facing site. Loads the DB-driven contact settings once
 * and threads them into the header/footer + the floating WhatsApp bubble.
 * (The sticky mobile call bar has been removed per request.)
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader
        brandName={settings.brandName}
        phone={settings.phone}
        logo={settings.logo}
      />
      <main id="main-content">{children}</main>
      <SiteFooter
        settings={settings}
        counties={counties.map((c) => ({ name: c.name, slug: c.slug }))}
      />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
      <MobileCtaBar phone={settings.phone} whatsapp={settings.whatsapp} />
    </>
  );
}
