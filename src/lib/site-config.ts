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
    description:
      "Tell us your tyre size, postcode and what you need by phone or WhatsApp, and we lock in your price and arrival time.",
    micro: "60-second quote, no call-out fee",
    icon: "phone",
  },
  {
    title: "Fitter dispatched",
    description:
      "We dispatch your nearest insured mobile technician with the correct tyres already in stock for your vehicle.",
    micro: "30 to 60 minute arrival",
    icon: "truck",
  },
  {
    title: "Fitted on-site",
    description:
      "We remove, replace and dynamically balance your tyres, check the valve and TPMS, then torque to manufacturer spec.",
    micro: "Calibrated equipment, guaranteed",
    icon: "wrench",
  },
  {
    title: "Drive away safely",
    description:
      "We recycle your old tyres, issue your paperwork and take card payment on-site, leaving your vehicle road-legal.",
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
  { label: "5.0 Google rating", icon: "star" },
  { label: "Workmanship guaranteed", icon: "badge-check" },
  { label: "British Standard AU 159 repairs", icon: "shield-check" },
  { label: "15+ tyre brands in stock", icon: "circle-dot" },
];

/**
 * Tyre-brand logos for the homepage "brands" section. These are curated static
 * assets committed under /public/uploads/brands (see .gitignore exception).
 * To add a brand: drop the logo in that folder and add a line here with alt text.
 * (Alternatively, manage brands with logos via /admin → Brands.)
 */
// `maxHeight` (px) fine-tunes a logo's size on desktop (default 48).
// `maxHeightMobile` overrides it on small screens (defaults to maxHeight).
export const BRAND_LOGOS: {
  src: string;
  alt: string;
  maxHeight?: number;
  maxHeightMobile?: number;
}[] = [
  { src: "/uploads/brands/dunlop-tyre.png", alt: "Dunlop tyres" },
  {
    src: "/uploads/brands/davanti-tyres-logo-png_seeklogo-364573-removebg-preview.png",
    alt: "Davanti tyres",
  },
  {
    src: "/uploads/brands/Adobe-Express-file.png",
    alt: "Tyre brand",
    maxHeight: 64,
    maxHeightMobile: 96, // 50% bigger on mobile
  },
  {
    src: "/uploads/brands/Adobe-Express-file-3.png",
    alt: "Tyre brand",
    maxHeight: 58,
    maxHeightMobile: 87, // 50% bigger on mobile
  },
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
  {
    title: "5.0 out of 5 on Google",
    description:
      "UK drivers rate our mobile tyre fitting 5.0 on Google for speed, fairness and a tidy on-site job.",
    icon: "star",
  },
  {
    title: "Workmanship guaranteed",
    description:
      "Every fitting is backed by our workmanship guarantee and repaired to British Standard AU 159.",
    icon: "badge-check",
  },
];
