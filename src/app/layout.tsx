import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SITE } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/data";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Mobile Tyre Fitting Near Me | 24/7 Call-Out - We Come To You",
    template: `%s | ${SITE.shortName}`,
  },
  description:
    "24/7 mobile tyre fitting that comes to you - home, work or roadside. Fast call-out across London, Kent, Sussex, Essex, the West Midlands & Scotland.",
  applicationName: SITE.name,
  formatDetection: { telephone: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
