/**
 * Page content + data for the /services/van-tyre-fitting service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * PHONE/WHATSAPP: the displayed number is 0788 328 8831. Every tel: link
 * resolves to +447883288831 and every WhatsApp link to https://wa.me/447883288831
 * (hardcoded, matching the displayed phone; the legacy sitewide 447722127759
 * links are a known bug this page does not inherit).
 *
 * Pricing: the £20 flat fitting fee per tyre is fixed. The tyre itself is priced
 * by size, tier and load rating, quoted before booking. Offer schema price "20".
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components (Why
 * Choose heading, Why Choose lead line, Final CTA). The name is NOT used here.
 */

export const PHONE_DISPLAY = "0788 328 8831";
export const TEL_HREF = "tel:+447883288831";
export const WA_HREF = "https://wa.me/447883288831";
export const FITTING_FEE = "£20";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "Van tyre fitting is the supply and fitment of C-rated and reinforced commercial tyres to light commercial vehicles up to 3.5 tonnes, carried out by a mobile technician at the depot, job site or home driveway, with the correct load rating matched to the vehicle. Commercial operators in 2026 expect the fitter to come to the van.",
  pricingLine:
    "The £20 flat fitting fee per tyre, the correct load index matched from the VRN, and fleet accounts with monthly invoicing keep the fleet legal and moving.",
  ticks: [
    "C-rated and reinforced van tyres",
    "£20 flat fitting fee per tyre",
    "Fleet accounts, one monthly invoice",
  ],
};

// --- Section 2: Why van downtime costs more than the tyres (prose) -----------

export const DOWNTIME = {
  heading: "Why Van Downtime Costs More Than the Tyres",
  paras: [
    "A van off the road costs far more than the rubber that stopped it. A trade van off the road cancels jobs and turns away customers. A courier van off the road misses every delivery window on the manifest. A fleet van off the road still draws finance payments and insurance premiums while earning nothing.",
    "A garage visit means half a working day lost, plus the drive there on a compromised tyre. Mobile van tyre fitting at the depot before the first job, at the site between jobs, or on the driveway after hours removes the downtime entirely. Commercial operators in 2026 schedule tyre work around the round, not around garage opening times. The technical side decides which tyre keeps the van legal and loaded.",
  ],
};

// --- Section 3: Van tyres are not car tyres (SIGNATURE comparison) -----------

export const LOAD_RATING_INTRO =
  "Van tyres are built to a different standard from car tyres, and fitting the wrong one is a legal failure, not a preference. The columns below set the correct commercial tyre against a standard car tyre forced onto a van.";

export const LOAD_RATING_YES: string[] = [
  "Reinforced carcass and strengthened sidewalls built for sustained payload",
  "Higher load index than the standard passenger tyre of the same size",
  "Load index meets or exceeds the axle requirement for the gross vehicle weight",
  "Speed rating rated for laden motorway cruising, not just top speed",
  "Passes MOT and keeps insurance valid under a full load",
];

export const LOAD_RATING_NO: string[] = [
  "Load index falls below the van's axle requirement",
  "MOT failure point on a commercial vehicle",
  "Invalidates insurance when fitted below the required rating",
  "Sidewall failure risk under a full load at motorway speed",
  "Cannot legally carry the van's payload",
];

export const LOAD_RATING_CLOSE =
  "Every fitment starts with the VRN, so the correct C-rating, load index and speed rating are confirmed before the van is even visited. Tread below 1.6mm on a van tyre is the same legal failure it is on a car, and high-mileage vans reach that limit faster.";

// --- Section 4: What you get (trust tile grid) -------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "£20", body: "Flat fitting fee per tyre: travel, removal, fitment, balancing, valve and disposal.", icon: "badge-pound-sterling" },
  { stat: "C-rated", body: "Reinforced stock across premium, mid-range and budget tiers.", icon: "shield-check" },
  { stat: "VRN", body: "Load index matched to the vehicle on every wheel.", icon: "circle-check-big" },
  { stat: "Depot", body: "Depot visits and multi-van scheduling in one booking.", icon: "truck" },
  { stat: "30-60 min", body: "Typical emergency response for van breakdowns on the road.", icon: "gauge" },
  { stat: "12 months", body: "Workmanship guarantee, wheels torqued to manufacturer figures.", icon: "badge-check" },
];

// --- Section 5: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Enter the registration and postcode, or send the fleet list",
    description:
      "Book through the form, or call 0788 328 8831 with the fleet list. The VRN confirms tyre size, load index and speed rating, so there is no guesswork at the wheel arch.",
    icon: "phone",
  },
  {
    title: "Choose the tier",
    description:
      "Premium for maximum mileage, mid-range for balanced cost-per-mile, budget for compliance on a tight margin. Honest guidance is given on cost-per-mile rather than sticker price.",
    icon: "circle-dot",
  },
  {
    title: "Pick the slot",
    description:
      "Before-shift depot visits, between-job site visits, evening driveway fitting, or a multi-van block booking on one visit. The schedule bends around the round, not the other way.",
    icon: "clock",
  },
  {
    title: "The technician arrives fully equipped",
    description:
      "The 2026 fitting vans carry changing and balancing equipment for wheels up to 20 inches and torque tooling rated for commercial wheel figures. Everything needed for the fitment travels to the depot.",
    icon: "bus",
  },
  {
    title: "Fitment, torque and 12-month guarantee",
    description:
      "Fitment, balancing and valve replacement follow, pressures are set for the stated load, wheels are torqued to manufacturer spec with a digital torque wrench, and old tyres are taken for disposal. The 12-month workmanship guarantee activates at sign-off.",
    icon: "circle-check-big",
  },
];

// --- Section 6: Fleet tyre fitting (B2B navy card) ---------------------------

export const FLEET = {
  heading: "Fleet Tyre Fitting with One Invoice",
  intro:
    "Fleet tyre fitting turns a recurring headache into a single scheduled visit, run at the depot before shift start or after close.",
  points: [
    "Multi-van scheduling checks and fits a whole fleet in one visit",
    "Consolidated monthly invoicing replaces a glovebox of receipts with one statement",
    "Priority emergency dispatch reaches account vans first when they fail on the road",
    "Optional condition reporting logs tread and pressure across every vehicle, flagging tyres near the legal limit",
    "Terms run from two vans to full courier and trade fleets",
  ],
  ctaLabel: "Open a fleet account",
  ctaHref: "/contact",
  phoneLine: "Contact the team on 0788 328 8831 or by email to open a fleet account.",
};

// --- Section 7: Vans and models covered (tag grid) ---------------------------

export const MODELS: string[] = [
  "Ford Transit",
  "Transit Custom",
  "Mercedes Sprinter",
  "Vauxhall Vivaro",
  "VW Transporter",
  "Renault Trafic",
  "Citroën Relay",
  "Peugeot Boxer",
];

export const MODELS_NOTE =
  "Pickup trucks, crew vans and every other light commercial up to 3.5 tonnes are covered alongside the named models, in long-wheelbase and short-wheelbase, panel and dropside bodies. Electric vans run heavier than their diesel equivalents, so load index checks matter even more on an electric fleet.";

// --- Section 8: Van tyre options (three tiers) -------------------------------

export const TYRE_TIERS: { tier: string; brands: string; body: string }[] = [
  {
    tier: "Premium",
    brands: "Michelin, Continental, Goodyear",
    body: "Maximum mileage per pound for high-mileage couriers, with the lowest cost-per-mile over the life of the tyre.",
  },
  {
    tier: "Mid-range",
    brands: "Hankook, Falken, Avon",
    body: "Balanced cost and durability for mixed trade use, the common choice across working fleets.",
  },
  {
    tier: "Budget",
    brands: "Quality budget brands",
    body: "Legal compliance at minimum outlay, fitted to the correct load index like every other tier.",
  },
];

export const TYRE_OPTIONS_NOTE =
  "Winter and all-season van tyres are available for year-round trade work in wet and cold conditions. All tyres are sourced from authorised UK distributors with the manufacturer warranty preserved, and every option is presented with its load index confirmed against the vehicle's gross weight.";

// --- Section 9: Pricing ------------------------------------------------------

export const COST_INCLUDED: string[] = [
  "Technician travel to the depot, site or driveway",
  "Tyre removal",
  "Fitment of the commercial tyre",
  "Wheel balancing",
  "New valve",
  "Old tyre disposal",
];

export const COST_CALLOUT = {
  heading: "Priced before booking, nothing added after",
  body:
    "The tyre is priced by size, tier and load rating, quoted in full before booking. Commercial sizes cost more than car equivalents because the reinforced carcass costs more to build, stated honestly rather than buried. Multi-tyre and multi-van bookings on one visit avoid repeat travel and lower the cost across the fleet.",
  freshness: "Fleet account pricing is on application, and van tyre pricing is held transparent through 2026.",
};

// --- Section 11: Why operators choose us -------------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "Van-only", label: "Dedicated specialism, not a car page with vans bolted on" },
  { stat: "VRN", label: "Correct load index guaranteed before dispatch" },
  { stat: "£20", label: "Transparent fitting fee per tyre" },
  { stat: "One invoice", label: "Consolidated fleet billing each month" },
  { stat: "24/7", label: "Emergency cover, priority for account holders" },
  { stat: "UK-wide", label: "Mainland coverage, postcode-verified" },
];

// --- Section 12: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Registration confirmed at booking",
    body: "The correct tyre, load index and speed rating travel with the fitter.",
  },
  {
    title: "Locking wheel nut key in the cab",
    body: "The fitter needs the key to remove each wheel safely.",
  },
  {
    title: "Park on flat hard standing with one metre side clearance",
    body: "A stable base on the working side keeps the jack safe under a heavy van.",
  },
  {
    title: "Clear the load over the axle being worked on where practical",
    body: "A fully laden van on a jack is slower and less safe to lift.",
  },
  {
    title: "A keyholder reachable during the slot",
    body: "An authorised person must be contactable by phone while the work runs.",
  },
];

export const CHECKLIST_NOTE =
  "A confirmed registration and a clear working side let the fitter shoe a multi-van depot booking in a single visit.";

// --- Section 13: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Van tyre fitting covers UK mainland, with the postcode verified at booking. Coverage spans the regions below plus the surrounding towns and counties, with depot visits scheduled anywhere inside the area.";

export const AREAS: { region: string; featured: string; cities: string[]; href: string }[] = [
  { region: "London", featured: "Bromley", cities: ["Croydon", "Romford", "Enfield", "Kingston"], href: "/areas/london" },
  { region: "Kent", featured: "Maidstone", cities: ["Canterbury", "Dartford", "Ashford", "Medway"], href: "/areas/kent" },
  { region: "Sussex", featured: "Brighton", cities: ["Crawley", "Worthing", "Eastbourne", "Hastings"], href: "/areas/sussex" },
  { region: "Essex", featured: "Chelmsford", cities: ["Colchester", "Basildon", "Southend", "Harlow"], href: "/areas/essex" },
  { region: "Birmingham & West Midlands", featured: "Solihull", cities: ["Coventry", "Wolverhampton", "Walsall", "Dudley"], href: "/areas/west-midlands" },
  { region: "Scotland", featured: "Glasgow", cities: ["Edinburgh", "Aberdeen", "Dundee", "Stirling"], href: "/areas/scotland" },
];

// --- Section 14: Case study --------------------------------------------------

export const CASE_STUDY = {
  label: "Illustrative scenario",
  body:
    "A Birmingham courier operator running six Transit Customs booked a depot visit after a fleet check flagged four tyres near the legal limit across three vans. The fitter arrived at 06:30 before shift start. Four C-rated mid-range tyres were fitted, balanced and torqued across the three vans by 08:10. Every van left on its round on time, and one consolidated invoice followed at month end.",
  stats: [
    { time: "06:30", label: "Fitter on-site, pre-shift" },
    { time: "08:10", label: "Three vans shod and out" },
    { time: "1 invoice", label: "Consolidated at month end" },
  ],
  meta: "Birmingham · Six Transit Customs · Four C-rated mid-range tyres, multi-van depot booking",
};

// --- Section 15: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. Items flagged `link` contain one of the
// link phrases ("emergency tyre fitting", "mobile tyre repair"), which the Faq
// component turns into a contextual link to the sibling page at render time.
// Visible text stays identical to the schema text.

export const FAQS: { id: string; question: string; answer: string; link?: boolean }[] = [
  {
    id: "cost",
    question: "How much does van tyre fitting cost?",
    answer:
      "The £20 flat fitting fee per tyre covers travel, removal, fitment, balancing, a new valve and disposal. The tyre is priced by size, tier and load rating, quoted in full before booking. Commercial sizes cost more than car equivalents because the reinforced carcass costs more to build.",
  },
  {
    id: "car-tyres",
    question: "Can I put car tyres on my van?",
    answer:
      "No, not where the load index falls below the axle requirement. A tyre below the required load index cannot legally carry the van's payload. Fitting one is an MOT failure point, invalidates insurance, and risks a blowout under a full load at motorway speed.",
  },
  {
    id: "c-marking",
    question: "What does the C marking on van tyres mean?",
    answer:
      "The C marking denotes a commercial tyre, built with a reinforced carcass and strengthened sidewalls for sustained payload. A C-rated tyre carries a higher load index than the standard passenger version of the same size, which is what a loaded van needs across every axle.",
  },
  {
    id: "depot",
    question: "Do you fit tyres at our depot?",
    answer:
      "Yes. Depot fitting covers single vans through to full fleets, with before-shift and after-hours slots to suit the round. Multi-van bookings are fitted on one visit, so a whole yard is checked and shod without a single vehicle leaving the site.",
  },
  {
    id: "fleet-accounts",
    question: "Do you offer fleet accounts?",
    answer:
      "Yes. Fleet accounts run on consolidated monthly invoicing, with priority emergency dispatch for account vans that fail on the road. Optional fleet condition reporting logs tread and pressure across every vehicle, flagging tyres near the legal limit before they strand a driver.",
  },
  {
    id: "broken-down",
    question: "How quickly can you reach a broken-down van?",
    answer:
      "A 30 to 60 minute response is typical, 24 hours a day, with the exact time dependent on the postcode. Fleet account vans are prioritised ahead of the general queue. See our emergency tyre fitting page for the full roadside callout process.",
    link: true,
  },
  {
    id: "repair",
    question: "Can a van puncture be repaired instead of replaced?",
    answer:
      "Yes, where the puncture passes the BS AU 159 checks, a mobile tyre repair costs less than a replacement. Sidewall damage on a laden van cannot be repaired and is replaced on the same callout. The technician assesses the tyre off the wheel before deciding.",
    link: true,
  },
  {
    id: "electric",
    question: "Do electric vans need different tyres?",
    answer:
      "Electric vans carry a heavier kerb weight than diesel equivalents, which raises the load requirement on every axle. The load index is checked against the EV's gross weight, and a reinforced or higher-rated tyre is fitted where the figures demand it. The 2026 electric fleets make that check routine.",
  },
  {
    id: "sizes",
    question: "What van sizes do you cover?",
    answer:
      "All light commercial vehicles up to 3.5 tonnes are covered, including the Ford Transit, Mercedes Sprinter, Vauxhall Vivaro, VW Transporter, Renault Trafic and Peugeot Boxer. Long-wheelbase and short-wheelbase, panel and dropside bodies are all fitted on-site.",
  },
  {
    id: "winter",
    question: "Do you fit winter or all-season van tyres?",
    answer:
      "Yes, both, in commercial C-rated and reinforced ratings. Winter van tyres suit cold and wet trade routes, and all-season van tyres cover year-round courier work on one fitment. Each option is matched to the van's load index before fitting.",
  },
];
