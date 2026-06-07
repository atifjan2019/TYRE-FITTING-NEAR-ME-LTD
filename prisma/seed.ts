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
      whatsapp: "447000000000",
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
        "New tyres supplied and fitted at your home, work or roadside - no need to visit a garage.",
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
      title: "Battery Replacement",
      slug: "battery-replacement",
      shortDescription:
        "Flat battery? We test, supply and fit car batteries at your location while we're there.",
      icon: "battery-charging",
      features: ["Battery health check", "Quality batteries fitted", "Old battery recycled"],
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
  const towns: {
    name: string;
    slug: string;
    countySlug: string;
    intro: string;
    localNotes: string;
    responseTimeText: string;
    faqs: { question: string; answer: string }[];
    reviews: { author: string; rating: number; text: string }[];
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
      reviews: [
        {
          author: "James P.",
          rating: 5,
          text: "Flat tyre on the M20 near Maidstone at 6am - they were with me in 35 minutes and back on the road before work. Brilliant.",
        },
        {
          author: "Sarah W.",
          rating: 5,
          text: "Fitted two new tyres on my driveway in Bearsted while I worked from home. Fair price, lovely chap.",
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
      reviews: [
        {
          author: "Daniel K.",
          rating: 5,
          text: "Punctured outside The Glades. WhatsApped a photo of my tyre, got a quote straight back, sorted within the hour.",
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
      reviews: [
        {
          author: "Priya S.",
          rating: 5,
          text: "Landed at Birmingham Airport to a flat tyre in the car park. They came out same evening and fitted a new one. Lifesavers.",
        },
      ],
    },
  ];

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
  console.log(`✓ ${towns.length} example towns (rich content + local FAQs)`);

  // --- Full town coverage --------------------------------------------------
  // Names from the prioritised town list. These are created as published stubs
  // so the county hubs aren't empty. IMPORTANT: add genuinely unique local
  // detail (real roads, landmarks, areas) to each in /admin - thin duplicate
  // location pages hurt SEO. Re-seeding only updates the name, so your admin
  // edits are preserved.
  const TOWN_DATA: Record<string, string[]> = {
    london: ["Bromley", "Croydon", "Greenwich", "Bexley", "Lewisham", "Wandsworth", "Ealing", "Enfield", "Barnet", "Hounslow", "Romford", "Harrow", "Kingston", "Sutton", "Richmond", "Wembley", "Stratford", "Clapham", "Fulham", "Streatham"],
    kent: ["Maidstone", "Dartford", "Medway", "Canterbury", "Sevenoaks", "Tunbridge Wells", "Ashford", "Dover", "Gravesend", "Tonbridge", "Folkestone", "Sittingbourne", "Chatham", "Gillingham", "Margate"],
    sussex: ["Brighton", "Hove", "Crawley", "Worthing", "Eastbourne", "Hastings", "Horsham", "Chichester", "Bognor Regis", "Littlehampton", "Burgess Hill", "East Grinstead", "Bexhill", "Haywards Heath"],
    essex: ["Chelmsford", "Colchester", "Basildon", "Southend-on-Sea", "Brentwood", "Harlow", "Thurrock", "Braintree", "Clacton-on-Sea", "Loughton", "Romford", "Grays", "Canvey Island", "Witham"],
    "west-midlands": ["Birmingham", "Solihull", "Sutton Coldfield", "Wolverhampton", "Coventry", "West Bromwich", "Dudley", "Walsall", "Halesowen", "Stourbridge", "Smethwick", "Sutton", "Bromsgrove", "Tamworth"],
    scotland: ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Stirling", "Falkirk", "Paisley", "Livingston", "East Kilbride", "Cumbernauld", "Hamilton", "Kirkcaldy", "Perth", "Ayr"],
  };

  const slugify = (s: string) =>
    s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const richSlugs = new Set(["kent:maidstone", "london:bromley", "west-midlands:solihull"]);

  let stubCount = 0;
  for (const [countySlug, names] of Object.entries(TOWN_DATA)) {
    const countyId = countyIdBySlug[countySlug];
    if (!countyId) continue;
    const countyName = counties.find((c) => c.slug === countySlug)?.name ?? countySlug;
    for (const name of names) {
      const slug = slugify(name);
      if (richSlugs.has(`${countySlug}:${slug}`)) continue; // keep rich examples
      const intro = `Need a mobile tyre fitter in ${name}? We come to you across ${name} and the surrounding ${countyName} area - at home, at work or stuck at the roadside, 24/7.`;
      await prisma.town.upsert({
        where: { countyId_slug: { countyId, slug } },
        update: { name }, // preserve any admin-entered content on re-seed
        create: {
          name,
          slug,
          countyId,
          intro,
          body: `<p>${intro}</p><h2>Mobile tyre fitting in ${name}</h2><p>Our fully-equipped vans carry a wide range of tyres for cars, vans and 4x4s and fit them wherever you are - no garage visit needed. Every tyre is balanced on site and your old tyre is taken away for recycling. Add real local roads and landmarks for ${name} here to make this page genuinely unique.</p>`,
          responseTimeText: "Typical call-out: 30-45 minutes",
          seoDescription: intro.slice(0, 155),
        },
      });
      stubCount++;
    }
  }
  console.log(`✓ ${stubCount} additional town pages across all counties`);

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
  await prisma.blogPost.upsert({
    where: { slug: "how-to-check-your-tyre-tread-depth" },
    update: {},
    create: {
      title: "How to Check Your Tyre Tread Depth (The 20p Test)",
      slug: "how-to-check-your-tyre-tread-depth",
      excerpt:
        "The legal minimum tyre tread depth in the UK is 1.6mm. Here's a simple 20p test you can do in 60 seconds to stay safe and legal.",
      author: "Tyre Fitting Near Me Ltd",
      tags: ["tyre safety", "advice"],
      published: true,
      publishedAt: new Date("2026-01-15"),
      body: `<p>The legal minimum tread depth for car tyres in the UK is <strong>1.6mm</strong> across the central three-quarters of the tyre, around its entire circumference.</p><h2>The 20p test</h2><p>Place a 20p coin into the main tread grooves of your tyre. If you can't see the outer band of the coin, your tread is above the legal limit. If you can see the band, your tyres may be unsafe and should be checked.</p><h2>Why it matters</h2><p>Worn tyres dramatically increase stopping distances in the wet and risk a £2,500 fine and 3 penalty points <em>per tyre</em>. If your tread is low, give us a call - we'll fit new tyres wherever you are.</p>`,
      seoDescription:
        "Learn how to check your tyre tread depth with the simple 20p test. UK legal minimum is 1.6mm. Stay safe and avoid fines.",
    },
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
