import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SITE } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

// We import the Font Awesome CSS above ourselves, so stop the library from
// injecting it at runtime (prevents a flash of oversized icons).
config.autoAddCss = false;

// Self-hosted Google fonts (no render-blocking external request) exposed as CSS
// variables. `display: swap` avoids invisible text during load (good for LCP).
// Inter = body (--font-sans); Poppins = headings/buttons (--font-heading).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: "Mobile Tyre Fitting Near Me | 24/7 Call-Out, We Come To You",
      template: `%s | ${SITE.shortName}`,
    },
    description:
      "24/7 mobile tyre fitting that comes to you - home, work or roadside. Fast call-out across London, Kent, Sussex, Essex, the West Midlands & Scotland.",
    applicationName: SITE.name,
    formatDetection: { telephone: true },
    // Favicon from the CMS (falls back to /favicon.ico if unset).
    icons: settings.favicon ? { icon: settings.favicon } : undefined,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Top progress bar: instant feedback on every navigation click. */}
        <NextTopLoader
          color="#ED1C24"
          height={3}
          shadow="0 0 10px #ED1C24, 0 0 5px #ED1C24"
          showSpinner={false}
          speed={300}
          crawlSpeed={150}
          zIndex={9999}
        />
        {children}
      </body>
    </html>
  );
}
