/**
 * Static, structural site configuration that does NOT change often and is not
 * worth a database round-trip (navigation, default copy, the WhatsApp message).
 *
 * Editable CONTENT (phone number, counters, services, locations, etc.) lives in
 * the database and is managed from /admin - see src/lib/data.ts.
 */

export const SITE = {
  name: "Tyre Fitting Near Me Ltd",
  shortName: "Tyre Fitting Near Me",
  /** Canonical production URL. Set NEXT_PUBLIC_SITE_URL in the environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Default pre-filled WhatsApp message for the float button & CTAs. */
  whatsappMessage:
    "Hi, I need mobile tyre fitting. My location is … and my tyre size is …",
  /** Locale used for hreflang / OG. */
  locale: "en_GB",
} as const;

/** Primary navigation shown in the header. */
export const MAIN_NAV: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Areas We Cover", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer link groups. */
export const FOOTER_NAV: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

/**
 * "How it works" - the 4-step booking process shown on the homepage. Static UI
 * copy (a fixed brand process), each with a reassuring micro-line.
 */
export const BOOKING_STEPS = [
  {
    title: "Call or WhatsApp",
    description: "Tell us your tyre size, location and what you need.",
    micro: "Quote in 60 seconds",
    icon: "phone",
  },
  {
    title: "Fitter dispatched",
    description: "Your nearest mobile fitter heads straight to you.",
    micro: "Fast local arrival",
    icon: "truck",
  },
  {
    title: "Fitted on-site",
    description: "We fit and balance your tyres wherever you are.",
    micro: "No garage needed",
    icon: "wrench",
  },
  {
    title: "Drive away safely",
    description: "Back on the road in no time, sorted properly.",
    micro: "Workmanship guaranteed",
    icon: "circle-check-big",
  },
] as const;

/**
 * Auto-scrolling trust strip badges. Static brand promises - safe to keep in
 * code (not per-page content).
 */
export const TRUST_STRIP: { label: string; icon: string }[] = [
  { label: "24/7 emergency call-outs", icon: "clock" },
  { label: "30-60 min typical response", icon: "gauge" },
  { label: "Home, work or roadside", icon: "map-pin" },
  { label: "All cards accepted", icon: "badge-pound-sterling" },
  { label: "Fully insured fitters", icon: "shield-check" },
  { label: "No hidden fees", icon: "circle-check-big" },
  { label: "Across all our regions", icon: "map" },
];

/**
 * Tyre-brand logos for the homepage "brands" section. These are curated static
 * assets committed under /public/uploads/brands (see .gitignore exception).
 * To add a brand: drop the logo in that folder and add a line here with alt text.
 * (Alternatively, manage brands with logos via /admin → Brands.)
 */
// `maxHeight` (px) fine-tunes an individual logo's size (default 48). Useful for
// logos with lots of built-in whitespace that look small next to the others.
export const BRAND_LOGOS: { src: string; alt: string; maxHeight?: number }[] = [
  { src: "/uploads/brands/dunlop-tyre.png", alt: "Dunlop tyres" },
  {
    src: "/uploads/brands/davanti-tyres-logo-png_seeklogo-364573-removebg-preview.png",
    alt: "Davanti tyres",
  },
  { src: "/uploads/brands/Adobe-Express-file.png", alt: "Tyre brand", maxHeight: 64 },
  { src: "/uploads/brands/Adobe-Express-file-3.png", alt: "Tyre brand", maxHeight: 58 },
  { src: "/uploads/brands/Adobe-Express-file-5.png", alt: "Tyre brand" },
  { src: "/uploads/brands/Adobe-Express-file-6.png", alt: "Tyre brand" },
  { src: "/uploads/brands/5860f81a4fc7f3474eb80db5.png", alt: "Tyre brand" },
  { src: "/uploads/brands/5860f8854fc7f3474eb80dba-scaled.png", alt: "Tyre brand" },
  { src: "/uploads/brands/5860f8f04fc7f3474eb80dbc-scaled.png", alt: "Tyre brand" },
  { src: "/uploads/brands/pngegg-7.png", alt: "Tyre brand" },
  { src: "/uploads/brands/pngegg-8.png", alt: "Tyre brand" },
];

/** "Why choose us" blocks shown on the homepage. */
export const WHY_CHOOSE: { title: string; description: string; icon: string }[] = [
  {
    title: "30-60 minute arrival",
    description:
      "A fitter is usually with you within the hour - we know a flat tyre can't wait.",
    icon: "gauge",
  },
  {
    title: "Fair, transparent pricing",
    description:
      "An upfront, all-in quote before we set off. No call-out fees, no surprises.",
    icon: "badge-pound-sterling",
  },
  {
    title: "24/7 emergency call-out",
    description:
      "Day or night, 365 days a year. Stranded at 3am? We'll still come to you.",
    icon: "clock",
  },
  {
    title: "Insured, certified fitters",
    description:
      "Fully insured, experienced technicians and quality tyres fitted to standard.",
    icon: "shield-check",
  },
];
