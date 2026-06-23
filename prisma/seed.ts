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

  // --- Counties (hubs) ------------------------------------------------------
  const counties: {
    name: string;
    slug: string;
    intro: string;
    coverageNotes: string;
    order: number;
  }[] = [
    {
      name: "London",
      slug: "london",
      intro:
        "24/7 mobile tyre fitting across Greater London - from the City to the suburbs, we come to you.",
      coverageNotes:
        "All London boroughs covered, including routes along the A406 North Circular, A205 South Circular and the M25 orbital.",
      order: 0,
    },
    {
      name: "Kent",
      slug: "kent",
      intro:
        "Fast mobile tyre fitting throughout Kent - home, work or roadside, day or night.",
      coverageNotes:
        "Covering the M20, M2, M26 and A2 corridors and all major Kent towns from Dartford to Dover.",
      order: 1,
    },
    {
      name: "Sussex",
      slug: "sussex",
      intro:
        "Mobile tyre fitters covering East and West Sussex with rapid call-out times.",
      coverageNotes:
        "Coverage across the A23, A27 and A259 including the Brighton, Crawley and Eastbourne areas.",
      order: 2,
    },
    {
      name: "Essex",
      slug: "essex",
      intro:
        "We bring the tyre garage to you anywhere in Essex, 24 hours a day.",
      coverageNotes:
        "Covering the A12, A13, A127 and M11 including Chelmsford, Romford, Basildon and Colchester.",
      order: 3,
    },
    {
      name: "Birmingham & West Midlands",
      slug: "west-midlands",
      intro:
        "Mobile tyre fitting across Birmingham and the wider West Midlands conurbation.",
      coverageNotes:
        "Covering the M5, M6, M42 and A38(M) Aston Expressway, plus Solihull, Wolverhampton, Coventry and Dudley.",
      order: 4,
    },
    {
      name: "Scotland",
      slug: "scotland",
      intro:
        "Mobile tyre fitting across Scotland's central belt and beyond - we come to you.",
      coverageNotes:
        "Covering the M8, M9, M74 and M90 including Glasgow, Edinburgh, Stirling and Falkirk.",
      order: 5,
    },
  ];

  const countyIdBySlug: Record<string, string> = {};
  for (const c of counties) {
    const row = await prisma.county.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        intro: c.intro,
        coverageNotes: c.coverageNotes,
        order: c.order,
      },
      create: {
        name: c.name,
        slug: c.slug,
        intro: c.intro,
        coverageNotes: c.coverageNotes,
        order: c.order,
        body: `<p>${c.intro}</p><p>${c.coverageNotes}</p><p>Whatever you drive, our mobile technicians carry a wide range of tyres and can fit, balance and repair on site - usually within the hour.</p>`,
        responseTimeText: "Typical call-out: 30-60 minutes",
        seoDescription: c.intro,
      },
    });
    countyIdBySlug[c.slug] = row.id;
  }
  console.log(`✓ ${counties.length} counties`);

  // --- Example towns (the SEO money pages - genuinely unique content) -------
  // One example town per county (add more towns later in /admin).
  const towns: {
    name: string;
    slug: string;
    countySlug: string;
    intro: string;
    localNotes: string;
    responseTimeText: string;
    faqs: { question: string; answer: string }[];
  }[] = [
    {
      name: "Maidstone",
      slug: "maidstone",
      countySlug: "kent",
      intro:
        "Need a tyre fitted in Maidstone? Our mobile vans cover the county town and surrounding villages day and night - at your home, your workplace or stuck at the roadside.",
      localNotes:
        "We regularly attend call-outs along the M20 (Junctions 5-8), the A20 through Bearsted and Allington, and the A229 to Bluewater and the Medway towns. Common spots include the Eclipse Park and Parkwood industrial estates, Maidstone Hospital, and the Lockmeadow and Fremlin Walk retail areas.",
      responseTimeText: "Typical Maidstone call-out: 30-45 minutes",
      faqs: [
        {
          question: "How quickly can you reach me in Maidstone?",
          answer:
            "Most Maidstone call-outs are reached within 30-45 minutes. Roadside emergencies on the M20 are prioritised.",
        },
        {
          question: "Do you cover the villages around Maidstone?",
          answer:
            "Yes - we cover Bearsted, Headcorn, Coxheath, Boughton Monchelsea, Yalding and the surrounding villages.",
        },
      ],
    },
    {
      name: "Bromley",
      slug: "bromley",
      countySlug: "london",
      intro:
        "Mobile tyre fitting across Bromley and the South East London suburbs. We come to you in Bromley town centre, the residential roads, or anywhere you've broken down.",
      localNotes:
        "We frequently cover the A21 Bromley Road, the A232 through Bromley Common, and routes towards Orpington and Beckenham. Regular call-outs around The Glades shopping centre, Bromley South station and the surrounding business parks.",
      responseTimeText: "Typical Bromley call-out: 30-50 minutes",
      faqs: [
        {
          question: "Can you fit tyres near Bromley South station?",
          answer:
            "Yes - we can meet you at the station car parks or your workplace nearby and fit while you carry on with your day.",
        },
      ],
    },
    {
      name: "Solihull",
      slug: "solihull",
      countySlug: "west-midlands",
      intro:
        "From Shirley to Knowle, our Solihull mobile tyre fitters bring the garage to your door across the borough and the wider West Midlands.",
      localNotes:
        "We cover the M42 (Junctions 4-6), the A34 Stratford Road through Shirley, and routes to Birmingham Airport and the NEC. Frequent call-outs around Touchwood shopping centre, Blythe Valley Park and Jaguar Land Rover sites.",
      responseTimeText: "Typical Solihull call-out: 30-45 minutes",
      faqs: [
        {
          question: "Do you cover Birmingham Airport and the NEC?",
          answer:
            "Yes - we regularly attend the airport, NEC and Birmingham Business Park for both private cars and fleet vehicles.",
        },
      ],
    },
    {
      name: "Brighton",
      slug: "brighton",
      countySlug: "sussex",
      intro:
        "Mobile tyre fitting across Brighton & Hove. We come to you in the city centre, the lanes and the surrounding Sussex coast - at home, at work or roadside.",
      localNotes:
        "We cover the A23 and A27 around Brighton, Hove and Shoreham, plus the seafront and Marina, the London Road and Lewes Road areas, and the universities at Falmer.",
      responseTimeText: "Typical Brighton call-out: 30-50 minutes",
      faqs: [
        {
          question: "Do you cover Hove and the wider Brighton area?",
          answer:
            "Yes - we cover Brighton, Hove, Portslade, Shoreham and the surrounding Sussex coast.",
        },
      ],
    },
    {
      name: "Chelmsford",
      slug: "chelmsford",
      countySlug: "essex",
      intro:
        "Mobile tyre fitting in Chelmsford and across mid-Essex. Our vans come to your home, workplace or the roadside, day or night.",
      localNotes:
        "We regularly attend the A12 and A414 around Chelmsford, plus Springfield, Great Baddow and Boreham, and the retail and business parks off Westway and Waterhouse Lane.",
      responseTimeText: "Typical Chelmsford call-out: 30-50 minutes",
      faqs: [
        {
          question: "Can you reach me on the A12 near Chelmsford?",
          answer:
            "Yes - roadside breakdowns on the A12 and A414 are prioritised and we carry a wide range of tyres on board.",
        },
      ],
    },
    {
      name: "Glasgow",
      slug: "glasgow",
      countySlug: "scotland",
      intro:
        "Mobile tyre fitting across Glasgow and the surrounding area. We come to you - home, work or roadside - 24 hours a day.",
      localNotes:
        "We cover the M8 through the city, the M77 and M74 approaches, the city centre, the West End and the East End, plus the surrounding towns across the central belt.",
      responseTimeText: "Typical Glasgow call-out: 30-60 minutes",
      faqs: [
        {
          question: "Do you cover the Glasgow city centre and motorways?",
          answer:
            "Yes - we cover the city centre and the M8/M77/M74 routes, with roadside emergencies prioritised.",
        },
      ],
    },
  ];

  // Keep exactly the towns defined above (one per county) and remove any extras
  // from previous seeds. NOTE: re-seeding also removes towns added in /admin.
  await prisma.town.deleteMany({});

  for (const t of towns) {
    const countyId = countyIdBySlug[t.countySlug];
    const town = await prisma.town.upsert({
      where: { countyId_slug: { countyId, slug: t.slug } },
      update: {
        name: t.name,
        intro: t.intro,
        localNotes: t.localNotes,
        responseTimeText: t.responseTimeText,
      },
      create: {
        name: t.name,
        slug: t.slug,
        countyId,
        intro: t.intro,
        localNotes: t.localNotes,
        responseTimeText: t.responseTimeText,
        body: `<p>${t.intro}</p><h2>Why choose our ${t.name} mobile tyre service?</h2><p>We carry a wide range of tyres for cars, vans and 4x4s and fit them wherever you are - no garage visit, no hassle. Every tyre is balanced on site and your old tyre is taken away for recycling.</p>`,
        seoDescription: t.intro.slice(0, 155),
      },
    });

    // Replace this town's local FAQs & reviews so re-seeding stays clean.
    await prisma.faq.deleteMany({ where: { townId: town.id } });
    await prisma.review.deleteMany({ where: { townId: town.id } });

    await prisma.faq.createMany({
      data: t.faqs.map((f, i) => ({
        question: f.question,
        answer: f.answer,
        category: "location",
        townId: town.id,
        order: i,
      })),
    });
    // NOTE: reviews are intentionally NOT seeded - add only real reviews in /admin.
  }
  console.log(`✓ ${towns.length} towns (one per county; add more in /admin)`);

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
