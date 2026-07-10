/**
 * Database seed - populates a fresh DB with realistic starter content so the
 * site is usable immediately and the templates can be reviewed.
 *
 * Run with:  npm run db:seed
 *
 * Idempotent: re-running updates existing rows (matched by slug/email) rather
 * than creating duplicates.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Admin login uses a single passcode (ADMIN_PASSCODE env var) - no user rows.

  // --- Site settings (singleton) -------------------------------------------
  await prisma.siteSetting.upsert({
    where: { id: "settings" },
    // Reset inflated placeholder counters to 0 (honest for a new company) so
    // they're hidden on the site until you enter real numbers in /admin.
    update: { customersServed: 0, yearsExperience: 0, brandsCount: 0 },
    create: {
      id: "settings",
      brandName: "Tyre Fitting Near Me Ltd",
      tagline: "24/7 Mobile Tyre Fitting - We Come To You",
      phone: "0800 000 0000",
      whatsapp: "447883288831",
      email: "bookings@tyrefittingnearme.co.uk",
      openingHours: "24 hours a day, 7 days a week",
      yearsExperience: 0,
      customersServed: 0,
      brandsCount: 0,
    },
  });
  console.log("✓ Site settings");

  // --- Services -------------------------------------------------------------
  // NOTE: prices are intentionally left blank - set real "from" prices per
  // service in /admin if/when you want to advertise them.
  const services: {
    title: string;
    slug: string;
    shortDescription: string;
    icon: string;
    features: string[];
  }[] = [
    {
      title: "Mobile Tyre Fitting",
      slug: "mobile-tyre-fitting",
      shortDescription:
        "New tyres supplied and fitted at your home, work or roadside. No need to visit a garage.",
      icon: "truck",
      features: [
        "All tyre brands & sizes",
        "Fitted & balanced on site",
        "Old tyre disposal included",
        "Same-day appointments",
      ],
    },
    {
      title: "Mobile Tyre Repair",
      slug: "mobile-tyre-repair",
      shortDescription:
        "Fast, safe tyre repairs that come to you - getting you moving without a costly replacement.",
      icon: "wrench",
      features: [
        "British Standard BS AU 159 repairs",
        "We assess if a repair is safe & legal",
        "Most repairs under 30 minutes",
      ],
    },
    {
      title: "Puncture Repair",
      slug: "puncture-repair",
      shortDescription:
        "Got a slow puncture or a nail in your tyre? We'll repair it on the spot where it's safe to do so.",
      icon: "circle-dot",
      features: ["Slow puncture diagnosis", "Nail & screw removal", "Valve replacement"],
    },
    {
      title: "Wheel Balancing",
      slug: "wheel-balancing",
      shortDescription:
        "Eliminate steering wheel vibration and uneven tyre wear with precision on-site wheel balancing.",
      icon: "gauge",
      features: ["Mobile balancing equipment", "Reduces tyre wear", "Smoother ride"],
    },
    {
      title: "Home Tyre Fitting",
      slug: "home-tyre-fitting",
      shortDescription:
        "Tyres fitted on your driveway while you carry on with your day. Evenings and weekends available.",
      icon: "house",
      features: ["Fitted on your driveway", "Evening & weekend slots", "Contactless payment"],
    },
    {
      title: "24/7 Emergency Tyre Fitting",
      slug: "emergency-tyre-fitting",
      shortDescription:
        "Stranded with a flat? Our emergency call-out runs day and night, 365 days a year.",
      icon: "siren",
      features: ["Round-the-clock call-out", "Rapid roadside response", "Motorway & A-road cover"],
    },
    {
      title: "Van Tyre Fitting",
      slug: "van-tyre-fitting",
      shortDescription:
        "Keep your fleet or work van moving with mobile commercial tyre fitting at your depot or roadside.",
      icon: "bus",
      features: ["Car-derived & commercial vans", "Fleet accounts welcome", "Minimal downtime"],
    },
    {
      title: "Locking Wheel Nut Removal",
      slug: "locking-wheel-nut-removal",
      shortDescription:
        "Lost your locking wheel nut key? We safely remove damaged or keyless locking nuts on site.",
      icon: "lock",
      features: ["Specialist removal tools", "No damage to your alloys", "Replacement nuts supplied"],
    },
    {
      title: "TPMS Service",
      slug: "tpms-service",
      shortDescription:
        "Tyre Pressure Monitoring System diagnosis, sensor replacement and reset - keep that warning light off.",
      icon: "activity",
      features: ["Sensor diagnostics", "Replacement & programming", "Valve service kits"],
    },
    {
      title: "Run-Flat Tyre Replacement",
      slug: "run-flat-tyre",
      shortDescription:
        "Punctured run-flat? We bring the correct manufacturer-approved run-flat to your home, work or roadside and fit it on site.",
      icon: "circle-dot",
      features: [
        "Correct run-flat marking matched from your reg",
        "TPMS checked and reset",
        "Replacement in matched axle pairs",
      ],
    },
    {
      title: "Caravan & Motorhome Tyre Fitting",
      slug: "caravan-tyre-fitting",
      shortDescription:
        "CP-rated and load-rated leisure tyres fitted where the caravan stands - storage compound, campsite, pitch or home, with a full DOT age and sidewall safety check.",
      icon: "bus",
      features: [
        "CP-rated camper & load-rated leisure tyres",
        "Replaced on age, 5 to 7 years by DOT code",
        "Single-axle, twin-axle & Tyron bands handled",
      ],
    },
    {
      title: "Free Tyre Health Check",
      slug: "free-tyre-health-check",
      shortDescription:
        "A free, no-obligation mobile tyre health check at your home, work or roadside. Tread, sidewall, pressure, valve, age and wear pattern checked, with an honest written report and a fix only if you want one.",
      icon: "shield-check",
      features: [
        "Free and no obligation, we come to you",
        "Six-point check on every tyre, honest written report",
        "Fixed on the spot only if you want it",
      ],
    },
  ];

  for (const [i, s] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        title: s.title,
        shortDescription: s.shortDescription,
        icon: s.icon,
        features: s.features,
        priceFrom: null,
        order: i,
      },
      create: {
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription,
        icon: s.icon,
        features: s.features,
        priceFrom: null,
        order: i,
        body: `<p>${s.shortDescription}</p><p>Our fully-equipped mobile vans bring the garage to you. Call or WhatsApp us with your tyre size and location for an upfront quote.</p>`,
        seoDescription: s.shortDescription,
      },
    });
  }
  console.log(`✓ ${services.length} services`);

  // --- Global FAQs ----------------------------------------------------------
  const globalFaqs = [
    {
      question: "Do you really come to me?",
      answer:
        "Yes. We are a fully mobile service - we come to your home, workplace or the roadside. There is no garage to visit.",
    },
    {
      question: "Is there a call-out fee?",
      answer:
        "No hidden call-out fees. You get an upfront, all-in price before we set off.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "London, Kent, Sussex, Essex, Birmingham & the West Midlands, and Scotland. Tell us your postcode and we'll confirm.",
    },
    {
      question: "How do I pay?",
      answer:
        "We accept card and contactless payments on site, as well as cash.",
    },
    {
      question: "Can you fit tyres at night?",
      answer:
        "Yes - our emergency tyre fitting service runs 24 hours a day, 365 days a year.",
    },
  ];
  await prisma.faq.deleteMany({ where: { category: "general" } });
  await prisma.faq.createMany({
    data: globalFaqs.map((f, i) => ({ ...f, category: "general", order: i })),
  });
  console.log(`✓ ${globalFaqs.length} global FAQs`);

  // --- Reviews: only REAL reviews belong on the site -----------------------
  // Clear any placeholder reviews so nothing invented is shown. Add genuine
  // Google/Trustpilot reviews via /admin -> Reviews.
  await prisma.review.deleteMany({});
  console.log("✓ Cleared placeholder reviews (add real ones in /admin)");

  // --- Blog post ------------------------------------------------------------
  // Content fields are defined once and applied on both create and update so a
  // re-seed corrects the production row (em dash sweep + filled SEO title +
  // tightened meta description). The em dash sweep replaced the spaced hyphen
  // "give us a call - we'll fit" with a full stop: "give us a call. We'll fit".
  // Compound hyphens (three-quarters) and number ranges are left intact.
  const treadDepthGuide = {
    title: "How to Check Your Tyre Tread Depth (The 20p Test)",
    excerpt:
      "The legal minimum tyre tread depth in the UK is 1.6mm. Here's a simple 20p test you can do in 60 seconds to stay safe and legal.",
    author: "Tyre Fitting Near Me Ltd",
    tags: ["tyre safety", "advice"],
    published: true,
    publishedAt: new Date("2026-01-15"),
    body: `<p>The legal minimum tread depth for car tyres in the UK is <strong>1.6mm</strong> across the central three-quarters of the tyre, around its entire circumference.</p><h2>The 20p test</h2><p>Place a 20p coin into the main tread grooves of your tyre. If you can't see the outer band of the coin, your tread is above the legal limit. If you can see the band, your tyres may be unsafe and should be checked.</p><h2>Why it matters</h2><p>Worn tyres dramatically increase stopping distances in the wet and risk a £2,500 fine and 3 penalty points <em>per tyre</em>. If your tread is low, give us a call. We'll fit new tyres wherever you are.</p>`,
    seoTitle: "How to Check Tyre Tread Depth: The 20p Test (UK)",
    seoDescription:
      "Check your tyre tread depth in 60 seconds with the simple 20p test. The UK legal minimum is 1.6mm. Stay safe, stay legal and avoid a £2,500 fine.",
  };

  await prisma.blogPost.upsert({
    where: { slug: "how-to-check-your-tyre-tread-depth" },
    update: treadDepthGuide,
    create: { slug: "how-to-check-your-tyre-tread-depth", ...treadDepthGuide },
  });
  console.log("✓ 1 blog post");

  console.log("\n✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
