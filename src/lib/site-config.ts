/**
 * Static, structural site configuration that does NOT change often and is not
 * worth a database round-trip (navigation, default copy, the WhatsApp message).
 *
 * Editable CONTENT (phone number, counters, services, locations, etc.) lives in
 * the database and is managed from /admin — see src/lib/data.ts.
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
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
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
 * The "4 simple steps to book" shown on the homepage. Static UI copy — kept in
 * code because it's a fixed brand process, not per-page content.
 */
export const BOOKING_STEPS = [
  {
    title: "Call or WhatsApp",
    description: "Tell us your tyre size, location and what you need. 24/7.",
    icon: "phone",
  },
  {
    title: "Get a fast quote",
    description: "Upfront, fair pricing with no hidden call-out fees.",
    icon: "badge-pound-sterling",
  },
  {
    title: "We come to you",
    description: "Our mobile van arrives at your home, work or roadside.",
    icon: "truck",
  },
  {
    title: "Fitted on the spot",
    description: "New tyres fitted and balanced — you're back on the road.",
    icon: "circle-check-big",
  },
] as const;
