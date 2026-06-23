/**
 * Page content + data for the /services/free-tyre-health-check service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * This is a free, no-obligation lead-magnet page. The conversion engine is
 * honesty (telling a driver their tyres are fine), never urgency or upsell.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components (Why
 * Choose Us heading, Why Choose Us lead line, Final CTA). The name is NOT used
 * in this data file.
 */

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "A free tyre health check is a no-cost, no-obligation inspection of a vehicle's tyres, covering tread, sidewall, pressure, valve, age and wear pattern, carried out by a mobile technician at the driver's home, work or roadside. In 2026, drivers across UK mainland book the check online and stay exactly where they are.",
  badge: "Free, no obligation",
  promise: "Free, no obligation, an honest report, and fixed on the spot only if you want it.",
  ticks: [
    "No charge and no obligation",
    "Honest written report",
    "Fixed on the spot only if you want",
  ],
};

// --- Section 2: The wedge (free, comes to you) -------------------------------

export const WEDGE = {
  heading: "A Free Tyre Check That Comes to You",
  paragraphs: [
    "A free tyre check at a garage still costs the driver a trip for something that often turns out perfectly fine. A mobile free tyre check costs nothing at all, not the inspection and not the journey, because the technician travels to the home, workplace or roadside.",
    "There is no charge, no obligation and no commitment to buy anything. The easy answer is yes, because saying yes costs the driver neither money nor time. In 2026, drivers expect a check to come to them rather than the other way round, and a mobile service meets that expectation directly. An honest verdict follows the inspection, and that honesty is the next thing worth explaining.",
  ],
};

// --- Section 3: Honesty (the trust engine, .honest-promise) ------------------

export const HONESTY = {
  heading: "We Tell You Which Tyres Are Safe, and Which Are Not",
  paragraphs: [
    "The point of a free tyre check is an honest answer, not a sales pitch. When the tyres are safe, the technician says so and leaves, with no invented faults and no pressure of any kind.",
    "Where a tyre needs attention, the report states exactly what and why, the worn tread, the cracked sidewall or the wrong pressure, in plain terms the driver decides on. A free written report records which tyres pass and which need work, with no obligation attached to either outcome.",
    "Honest advice is the reason a driver trusts the verdict when a tyre genuinely needs replacing. A technician willing to confirm good tyres is a technician worth believing about bad ones.",
  ],
};

// --- Section 4: The six checks (icon card grid, .what-we-check) --------------

export const CHECKS_INTRO =
  "A free tyre health check is a full inspection, not a glance, covering six points on every tyre. The result is a clear written report, tyre by tyre, with 2026 safety standards applied to every reading.";

export const CHECKS: { name: string; body: string; icon: string }[] = [
  {
    name: "Tread depth",
    body: "Measured against the 1.6mm UK legal minimum, with the actual depth recorded for each tyre.",
    icon: "gauge",
  },
  {
    name: "Sidewall condition",
    body: "Checked for cracks, bulges, cuts and damage that no repair fixes.",
    icon: "shield-check",
  },
  {
    name: "Tyre pressure",
    body: "Checked and set to the correct figure for the vehicle and its load.",
    icon: "activity",
  },
  {
    name: "Valve condition",
    body: "Inspected for leaks and corrosion that cause slow pressure loss between top-ups.",
    icon: "circle-dot",
  },
  {
    name: "Tyre age",
    body: "Read from the DOT code on the sidewall, because rubber ages and cracks over time regardless of tread.",
    icon: "clock",
  },
  {
    name: "Wear pattern",
    body: "Read across the tread, because uneven wear reveals an alignment or pressure problem behind it.",
    icon: "wrench",
  },
];

// --- Signature comparison: What We Check vs Why It Matters -------------------
// Informative, not scary. Left "We Check" (green ticks), right "Why It Matters"
// (neutral dashes, no red crosses, no "recommended" pill). Crawlable HTML.

export const CHECK_LEFT: string[] = [
  "Tread depth against the 1.6mm legal minimum",
  "Sidewall for cracks, bulges and cuts",
  "Pressure set to the vehicle figure",
  "Valve for leaks and corrosion",
  "Tyre age from the DOT code",
  "Wear pattern across the tread",
];

export const CHECK_RIGHT: string[] = [
  "Below 1.6mm is illegal and an MOT failure",
  "A damaged sidewall is a blowout risk no repair fixes",
  "Wrong pressure raises fuel use and wears tyres faster",
  "A failing valve causes a slow puncture over time",
  "Aged rubber cracks and perishes regardless of tread",
  "Uneven wear points to an alignment or pressure fault",
];

// --- Section 5: Fixed on the spot (the conversion, soft, no pressure) --------

export const FIX = {
  heading: "Fixed On the Spot, Only If You Want It",
  intro:
    "Where the check finds a tyre that needs doing, the technician carries the equipment to fix it on the same visit, so the driver avoids a second trip. The work is the driver's choice and never assumed.",
  options: [
    { label: "A worn or illegal tyre replaced", href: "/services/mobile-tyre-fitting", anchor: "mobile tyre fitting" },
    { label: "A repairable puncture repaired", href: "/services/mobile-tyre-repair", anchor: "mobile tyre repair" },
    { label: "A wheel rebalanced", href: "/services/wheel-balancing", anchor: "wheel balancing" },
  ],
  price:
    "The price is the standard £20 flat fitting fee per tyre plus the tyre price, quoted in full before any work starts, with nothing added afterwards.",
  reassurance:
    "The check stays free whether or not the driver takes the fix. Any work carried out is covered by the 12-month workmanship guarantee.",
};

// --- Section 6: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book the free check",
    description:
      "Book the free check with the registration and postcode through the form, or call or WhatsApp 0788 328 8831. No payment and no deposit, because the check is free.",
    icon: "phone",
  },
  {
    title: "The technician arrives",
    description:
      "A technician reaches the home, workplace or roadside at the booked slot. The 2026 vans carry tread gauges, pressure equipment and full fitting equipment.",
    icon: "bus",
  },
  {
    title: "Every tyre is inspected",
    description:
      "Tread, sidewall, pressure, valve, age and wear pattern are checked on each wheel. The findings are recorded tyre by tyre.",
    icon: "circle-dot",
  },
  {
    title: "The driver gets an honest report",
    description:
      "A written report states which tyres are safe and which need attention. Safe tyres are confirmed safe, with no invented problems.",
    icon: "circle-check-big",
  },
  {
    title: "A fix follows only if wanted",
    description:
      "Where a fix is wanted, the work is quoted at the standard price and carried out on the same visit. Otherwise the technician simply leaves, with no obligation either way.",
    icon: "wrench",
  },
];

// --- Section 7: Why a regular tyre check matters (prose) ---------------------

export const WHY_MATTERS = {
  heading: "Why a Regular Tyre Check Matters",
  paragraphs: [
    "Tyres are the only contact between the vehicle and the road, so tread, pressure and condition decide grip and braking distance. A tyre below 1.6mm is illegal and an MOT failure. Underinflation wears tyres faster and raises fuel use across every mile.",
    "An aged or cracked sidewall is a blowout risk regardless of how much tread remains. A free tyre health check catches all of these before they become a fail, a fine or a roadside emergency. A check before a long trip or an MOT is the simplest safeguard there is.",
  ],
};

// --- Section 8: Vehicles covered ---------------------------------------------

export const VEHICLES: { label: string; icon: string }[] = [
  { label: "Cars, all makes and models", icon: "circle-check-big" },
  { label: "Vans up to 3.5 tonnes", icon: "bus" },
  { label: "4x4s and SUVs", icon: "truck" },
  { label: "Caravans and motorhomes", icon: "tent" },
];

export const VEHICLES_NOTE =
  "Every tyre on the vehicle is checked, including the spare on request. The same six-point inspection applies whatever the vehicle, with the report adjusted to the correct pressures for the make and load.";

// `caravan` flags the note that carries the caravan-tyre-fitting link.
export const VEHICLES_CARAVAN_NOTE =
  "Caravans and motorhomes get the age check that matters most on leisure vehicles through our caravan and motorhome tyre fitting service.";

// --- Section 9: Why drivers choose us (stat tiles) ---------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "Free", label: "Mobile check that comes to you, no charge" },
  { stat: "Honest", label: "Safe tyres confirmed, never invented faults" },
  { stat: "6 checks", label: "Tread, sidewall, pressure, valve, age, wear" },
  { stat: "No pressure", label: "Fix on the spot only if you want it" },
  { stat: "12 months", label: "Workmanship guarantee on any work" },
  { stat: "UK-wide", label: "Mainland coverage, verified at booking" },
];

// --- Section 10: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Registration ready at booking",
    body: "The registration confirms the correct tyre and pressure data for the report.",
  },
  {
    title: "Vehicle on flat ground with access to all four wheels",
    body: "A driveway or car park lets the technician reach every tyre safely.",
  },
  {
    title: "Note any symptom worth mentioning",
    body: "Tell us about a vibration or a slow puncture so the check looks closely at it.",
  },
  {
    title: "Locking wheel nut key in the vehicle",
    body: "The key is needed if a closer inspection or a fix is wanted on the visit.",
  },
  {
    title: "Keyholder reachable during the slot",
    body: "A keyholder reachable during the booked window is enough for the check to go ahead.",
  },
];

// --- Section 11: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Coverage runs across UK mainland, postcode-verified at the point of booking. The free check reaches the home, workplace or roadside in any covered postcode.";

export const AREAS: { region: string; featured: string; cities: string[]; href: string }[] = [
  { region: "London", featured: "Bromley", cities: ["Croydon", "Romford", "Enfield", "Kingston"], href: "/areas/london" },
  { region: "Kent", featured: "Maidstone", cities: ["Canterbury", "Dartford", "Ashford", "Medway"], href: "/areas/kent" },
  { region: "Sussex", featured: "Brighton", cities: ["Crawley", "Worthing", "Eastbourne", "Hastings"], href: "/areas/sussex" },
  { region: "Essex", featured: "Chelmsford", cities: ["Colchester", "Basildon", "Southend", "Harlow"], href: "/areas/essex" },
  { region: "Birmingham & West Midlands", featured: "Solihull", cities: ["Coventry", "Wolverhampton", "Walsall", "Dudley"], href: "/areas/west-midlands" },
  { region: "Scotland", featured: "Glasgow", cities: ["Edinburgh", "Aberdeen", "Dundee", "Stirling"], href: "/areas/scotland" },
];

// --- Section 12: Case study --------------------------------------------------

export const CASE_STUDY = {
  label: "Illustrative scenario",
  body:
    "A driver in Birmingham books a free check before a long motorway trip, unsure whether the tyres need doing. The technician arrives at 11:30, finds three tyres safe with good tread, and reads one front tyre at 1.8mm with uneven inner wear pointing to a pressure issue. The driver chooses to replace the worn tyre on the spot at the standard price, the other three confirmed safe, pressures reset, and the job finished by 12:15. The trip goes ahead on safe tyres, with no garage visit.",
  stats: [
    { time: "11:30", label: "Technician on-site" },
    { time: "1 tyre", label: "Replaced at the driver's choice" },
    { time: "12:15", label: "Done, three tyres confirmed safe" },
  ],
  meta: "Birmingham · Pre-trip free check · One front tyre at 1.8mm · Fix only where wanted",
};

// --- Section 13: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. Items flagged `link` contain a sibling
// service phrase the Faq component turns into a link at render time. Visible
// text stays byte-identical to the schema text.

export const FAQS: {
  id: string;
  question: string;
  answer: string;
  link?: { phrase: string; href: string };
}[] = [
  {
    id: "really-free",
    question: "Is the tyre health check really free?",
    answer:
      "Yes, the check is free with no obligation, no payment and no deposit. The technician comes to the home, workplace or roadside at no charge. There is no cost whether the tyres pass or need work, and no fee for the visit itself.",
  },
  {
    id: "what-covered",
    question: "What does the free tyre check cover?",
    answer:
      "The check covers tread depth, sidewall condition, tyre pressure, valve condition, tyre age from the DOT code, and wear pattern on every tyre. A written report records each reading, tyre by tyre, and states which tyres are safe and which need attention.",
  },
  {
    id: "buy-anything",
    question: "Do I have to buy anything?",
    answer:
      "No. When the tyres are safe the technician confirms it and leaves, with no invented faults. Any fix is the driver's choice with no pressure of any kind. The check stays free whether or not a fix is taken on the visit.",
  },
  {
    id: "same-visit",
    question: "Can you fix a problem on the same visit?",
    answer:
      "Yes, where wanted. A worn tyre, a puncture or a balance is fixed on the spot at the standard £20 fitting fee per tyre plus the tyre price, quoted first. 2026 vans carry full fitting and balancing equipment, so no second trip is needed. See our mobile tyre fitting service for a replacement on the same visit.",
    link: { phrase: "mobile tyre fitting", href: "/services/mobile-tyre-fitting" },
  },
  {
    id: "where",
    question: "Where do you carry out the free check?",
    answer:
      "At the home, workplace or roadside, mobile across UK mainland. There is no garage visit and no need to drive anywhere. The technician arrives at the booked slot with everything needed for the full inspection.",
  },
  {
    id: "legal-tread",
    question: "What is the legal tread depth?",
    answer:
      "1.6mm across the central three-quarters of the tyre, around the full circumference. Below 1.6mm a tyre is illegal and an MOT failure. The check measures and records the actual depth on each tyre against that minimum.",
  },
  {
    id: "tyre-age",
    question: "How do you check tyre age?",
    answer:
      "From the DOT code on the sidewall, which gives the week and year of manufacture. Rubber ages and cracks regardless of tread, so an old tyre with good tread is still flagged. The recorded age sits in the written report.",
  },
  {
    id: "how-long",
    question: "How long does the free check take?",
    answer:
      "A full six-point check on all four tyres takes a short visit. The written report is given on the spot, so the driver leaves the visit knowing exactly which tyres are safe and which need attention.",
  },
  {
    id: "caravan",
    question: "Can you check a caravan or motorhome?",
    answer:
      "Yes, including the age check that matters most on leisure vehicles, where tyres often crack before the tread runs out. See our caravan and motorhome tyre fitting service for the leisure-vehicle service and age inspection.",
    link: { phrase: "caravan and motorhome tyre fitting", href: "/services/caravan-tyre-fitting" },
  },
  {
    id: "be-there",
    question: "Do I need to be there for the check?",
    answer:
      "A keyholder reachable during the booked slot is enough, with the vehicle accessible on flat ground and access to all four wheels. The technician carries out the inspection and shares the written report with the keyholder on the spot.",
  },
];
