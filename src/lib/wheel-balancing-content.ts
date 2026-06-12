/**
 * Page content + data for the /services/wheel-balancing service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * Pricing: PRICE is the per-wheel figure for this page ("[£7.99]", replace the
 * brackets with the live price before deploy). PRICE_ALL is the all-four figure
 * and stays a deliberate "[£XX]" placeholder until a value is set.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components (Why
 * Choose Us heading, Why Choose Us lead line, Final CTA). The name is NOT used
 * in this data file.
 */

export const PRICE = "[£7.99]";
export const PRICE_ALL = "[£XX]";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "Wheel balancing is the even distribution of weight across the wheel and tyre assembly as a single rotating unit, measured on a calibrated digital balancer and corrected with small counterweights fixed to the rim, removing the steering vibration and uneven tyre wear that imbalance creates. A technician brings calibrated balancing equipment to your driveway, workplace or roadside, with no garage visit required. Every mobile van runs digital dual-plane balancers as standard in 2026.",
  ticks: [
    "24/7 availability",
    "Wheels up to 20 inches, alloy and steel",
    "Calibrated digital balancing from [£7.99] per wheel",
  ],
};

// --- Section 2: Signs your wheels need balancing (SIGNATURE icon card grid) ---

export const SIGNS_INTRO =
  "Imbalance announces itself through speed-specific vibration and distinct tyre wear patterns. Six signs point to a wheel that needs balancing rather than another fault.";

export const SIGNS: { name: string; body: string; icon: string }[] = [
  {
    name: "Vibration at 40 to 70 mph",
    body: "A steering wheel that shakes between 40 and 70 mph, then settles outside that band, is the classic sign of front wheel imbalance.",
    icon: "gauge",
  },
  {
    name: "Vibration through the seat",
    body: "A shake felt through the seat or floor rather than the steering wheel points to imbalance in the rear wheels.",
    icon: "activity",
  },
  {
    name: "Wobble that builds with speed",
    body: "A wobble that worsens as speed rises, then smooths again at higher motorway speed, tracks a single heavy spot on the wheel.",
    icon: "circle-dot",
  },
  {
    name: "Cupped or scalloped tread",
    body: "Cupped or scalloped patches worn around the tyre tread are a wear signature left by a wheel running out of balance.",
    icon: "circle-dot",
  },
  {
    name: "A wheel weight missing",
    body: "A counterweight visibly gone from the rim after a pothole or kerb strike removes the correction the wheel was carrying.",
    icon: "shield-check",
  },
  {
    name: "Vibration after new tyres",
    body: "Vibration that appeared immediately after new tyres were fitted elsewhere means the new assembly was never balanced correctly.",
    icon: "wrench",
  },
];

export const SIGNS_HONESTY =
  "Balancing corrects weight distribution and nothing else. Pulling to one side points to alignment. Constant vibration at every speed points to a buckled rim or a drivetrain fault. The technician identifies the true cause on site where balancing is not the fix, so money goes on the real problem rather than a symptom.";

// --- Section 3: Wheel balancing vs wheel alignment (SIGNATURE comparison) -----

export const VS_ALIGNMENT_INTRO =
  "Two different services fix two different faults, and drivers confuse them constantly. The table below splits them by symptom, wear pattern, cause and fix.";

export const VS_ALIGNMENT_ROWS: {
  label: string;
  balancing: string;
  alignment: string;
}[] = [
  {
    label: "What it corrects",
    balancing: "Uneven weight around the wheel and tyre assembly",
    alignment: "The angles wheels sit at relative to the road",
  },
  {
    label: "Main symptom",
    balancing: "Vibration at 40 to 70 mph",
    alignment: "Pulling to one side, crooked steering wheel",
  },
  {
    label: "Tyre wear pattern",
    balancing: "Cupping, patchy wear",
    alignment: "Feathering, wear on one edge",
  },
  {
    label: "Cause",
    balancing: "New tyres, lost weight, pothole",
    alignment: "Kerb strike, worn suspension, pothole",
  },
  {
    label: "Fix",
    balancing: "Counterweights on the rim",
    alignment: "Adjusting suspension geometry",
  },
];

export const VS_ALIGNMENT_CLOSE =
  "Vibration means balance first, pulling means alignment, and a pothole hit often means both.";

// --- Section 4: What you get (trust tile grid) -------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "24/7", body: "Cover, 365 days a year, including bank holidays.", icon: "clock" },
  { stat: "Dual-plane", body: "Calibrated digital dynamic balancing on every callout.", icon: "activity" },
  { stat: "[£7.99]", body: "Transparent price per wheel, quoted before any work begins.", icon: "badge-pound-sterling" },
  { stat: "Zero", body: "Every wheel re-spun and verified back to zero imbalance.", icon: "circle-check-big" },
  { stat: "20 inch", body: "Alloy and steel wheels balanced up to 20 inches.", icon: "circle-dot" },
  { stat: "12 months", body: "Workmanship guarantee on every wheel balanced.", icon: "badge-check" },
];

// --- Section 5: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book with postcode, registration and symptom",
    description:
      "Book through the form with your postcode and vehicle registration, or call or WhatsApp 0788 328 8831. Note the speed band where the vibration appears in the booking form. A precise symptom note tells the technician where to look first.",
    icon: "phone",
  },
  {
    title: "A technician arrives fully equipped",
    description:
      "A technician arrives at your chosen location. The 2026 vans carry calibrated digital wheel balancers, weight kits for both alloy and steel rims, and torque equipment rated for wheels up to 20 inches.",
    icon: "bus",
  },
  {
    title: "Wheel-off inspection first",
    description:
      "The rim is checked for buckling, the tyre is checked for defects and flat spots, and old weights and corrosion are cleaned from the rim seat. A damaged rim or a defective tyre makes balancing pointless, and inspection catches the problem before any money is spent.",
    icon: "wrench",
  },
  {
    title: "Digital spin measurement and correction",
    description:
      "The balancer identifies the heavy spot and the exact gram correction needed per plane. Adhesive weights go on alloys out of sight, clip-on weights go on steel rims, the wheel is re-spun, and the reading is verified to zero.",
    icon: "circle-dot",
  },
  {
    title: "Refit, torque and 12-month guarantee",
    description:
      "The wheel is refitted, torqued to manufacturer figures with a digital torque wrench, and pressures are set to specification. The 12-month workmanship guarantee activates. Where vibration persists because the cause is alignment, a buckled wheel or suspension wear, the technician says so and advises the next step.",
    icon: "circle-check-big",
  },
];

// --- Section 6: 24/7 availability --------------------------------------------

export const AVAILABILITY = {
  hours: [
    { label: "Standard balancing slots", value: "8am to 8pm, seven days a week" },
    { label: "Overnight emergency callouts", value: "24 hours a day, 365 days a year" },
    { label: "Emergency response target", value: "60 minutes across UK mainland, postcode-dependent" },
    { label: "Where the technician works", value: "Home driveway, workplace car park or fleet yard" },
  ],
  pricingHeading: "Transparent pricing, nothing added after",
  pricingBody:
    "The [£7.99] per-wheel price applies at any standard hour. Out-of-hours emergency callouts carry a separate charge, disclosed at booking before any work starts, with nothing added after the work.",
};

// --- Section 7: When wheels need balancing (trigger list) --------------------

export const TRIGGERS_INTRO =
  "Several events knock a wheel out of balance, and each one is a reason to book a check.";

export const TRIGGERS: string[] = [
  "After new tyres are fitted anywhere, because every new tyre changes the assembly's weight map",
  "After a pothole or kerb impact",
  "After a wheel weight falls off",
  "When vibration appears between 40 and 70 mph",
  "When the tread shows cupping",
  "After a puncture repair carried out elsewhere",
  "After seasonal wheel swaps or tyre rotation",
  "As routine care every 6,000 to 10,000 miles for high-mileage drivers",
];

export const TRIGGERS_EV =
  "Heavier EVs load their tyres harder, which makes balance checks more valuable on electric vehicles.";

// --- Section 10: Vehicles and drivers ----------------------------------------

export const VEHICLES: { label: string; icon: string }[] = [
  { label: "Cars, all makes and models", icon: "circle-check-big" },
  { label: "Vans up to 3.5 tonnes", icon: "bus" },
  { label: "4x4s and SUVs", icon: "truck" },
  { label: "EVs, with raised tyre-load sensitivity", icon: "circle-dot" },
  { label: "Fleet and lease vehicles", icon: "truck" },
];

export const CUSTOMERS: { label: string; icon: string }[] = [
  { label: "Private motorists", icon: "circle-check-big" },
  { label: "Fleet operators with account terms", icon: "circle-check-big" },
  { label: "Lease and company car drivers", icon: "circle-check-big" },
  { label: "Home and workplace callouts", icon: "circle-check-big" },
];

export const VEHICLES_NOTE =
  "Alloy and steel wheels up to 20 inches. Motorcycles are outside the service. Fleet operators get account terms with monthly invoicing across multiple vehicles.";

export const EV_NOTE =
  "EVs carry extra battery weight, which raises tyre-load sensitivity, so a small imbalance shows up sooner on an electric vehicle than on a lighter petrol car.";

// --- Section 8: Dynamic balancing explained (prose) --------------------------

export const DYNAMIC = {
  heading: "Dynamic Balancing Explained in Plain English",
  paras: [
    "Static balancing measures one plane. The reading covers up-and-down imbalance only, which was adequate for the narrow tyres of decades ago. Dynamic balancing, also called dual-plane balancing, measures vertical and side-to-side imbalance across the inner and outer wheel planes, which modern wide tyres demand.",
    "Every mobile callout uses dynamic digital balancing as standard. Adhesive weights hidden inside alloy rims preserve the wheel face, while clip-on weights suit the exposed edge of steel rims. Each wheel is corrected to the exact gram the balancer reports, then re-spun to confirm the reading sits at zero.",
  ],
};

// --- Section 9: Costs --------------------------------------------------------

export const COST_INCLUDED: string[] = [
  "Technician travel to your location",
  "Wheel-off inspection for buckling and tyre defects",
  "Digital dual-plane spin measurement",
  "Counterweights and precise placement",
  "Re-spin verification to zero",
  "Pressure reset to manufacturer specification",
  "Torque to specification with a digital torque wrench",
];

export const COST_SEPARATE: string[] = [
  "Rim repair, quoted only where inspection reveals damage",
  "Replacement tyre, quoted only where a defect is found",
];

export const COST_CALLOUT = {
  heading: "Mobile versus the garage queue",
  body:
    "Garage balancing means driving a vibrating vehicle to the garage and waiting in a queue. A mobile callout removes the journey and the queue at a comparable per-wheel price, and the figure is set before the technician arrives.",
  freshness: "Per-wheel pricing is held transparent through 2026 for every standard appointment.",
};

// --- Section 11: Why drivers choose us ---------------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "Mobile", label: "The balancing service that travels to you" },
  { stat: "Dual-plane", label: "Calibrated digital equipment on every van" },
  { stat: "[£7.99]", label: "Transparent per-wheel price" },
  { stat: "12 months", label: "Workmanship guarantee" },
  { stat: "24/7", label: "Cover, 365 days a year" },
  { stat: "UK-wide", label: "Postcode coverage, verified at booking" },
];

// --- Section 12: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Locking wheel nut key inside the vehicle",
    body: "The technician needs the key to remove each wheel safely.",
  },
  {
    title: "Flat hard surface with one metre side clearance",
    body: "A driveway or car park gives the jack a stable base on the side being worked.",
  },
  {
    title: "Note the speed and where you feel the vibration",
    body: "Record the speed at which the shake appears, and whether you feel it through the steering wheel or the seat.",
  },
  {
    title: "Stay reachable by phone",
    body: "The owner or an authorised person must be contactable during the booked window.",
  },
];

export const CHECKLIST_NOTE =
  "A clear symptom note and a metre of working clearance let the technician balance all four wheels inside an hour in most cases.";

// --- Section 13: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Mobile wheel balancing covers UK mainland, with availability postcode-verified at booking. Coverage spans the regions below plus the surrounding towns and counties.";

export const AREAS: { region: string; featured: string; cities: string[]; href: string }[] = [
  { region: "London", featured: "Bromley", cities: ["Croydon", "Romford", "Enfield", "Kingston"], href: "/london" },
  { region: "Kent", featured: "Maidstone", cities: ["Canterbury", "Dartford", "Ashford", "Medway"], href: "/kent" },
  { region: "Sussex", featured: "Brighton", cities: ["Crawley", "Worthing", "Eastbourne", "Hastings"], href: "/sussex" },
  { region: "Essex", featured: "Chelmsford", cities: ["Colchester", "Basildon", "Southend", "Harlow"], href: "/essex" },
  { region: "Birmingham & West Midlands", featured: "Solihull", cities: ["Coventry", "Wolverhampton", "Walsall", "Dudley"], href: "/west-midlands" },
  { region: "Scotland", featured: "Glasgow", cities: ["Edinburgh", "Aberdeen", "Dundee", "Stirling"], href: "/scotland" },
];

// --- Section 14: Case study --------------------------------------------------

export const CASE_STUDY = {
  label: "Illustrative scenario",
  body:
    "A sales rep in Solihull noticed steering vibration at 55 mph, two days after buying tyres from an online retailer with home fitting. The rep booked a morning slot, and the technician arrived at the office car park at 09:40. A wheel-off inspection found both front wheels under-weighted. The digital balancer read 35 and 40 grams of correction, the weights were placed, each wheel was re-spun to zero, and the job finished by 10:25. The vibration was gone on the test drive, and the rep kept every afternoon appointment.",
  stats: [
    { time: "09:40", label: "Technician on-site" },
    { time: "10:25", label: "Balanced and complete" },
    { time: "35-40g", label: "Correction added per wheel" },
  ],
  meta: "Solihull · Vibration at 55 mph after new tyres · Dynamic dual-plane balance, re-spun to zero",
};

// --- Section 15: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. The item flagged `link` contains the phrase
// "mobile tyre fitting", which the Faq component turns into a link to the sibling
// service page at render time. Visible text stays identical to the schema text.

export const FAQS: { id: string; question: string; answer: string; link?: boolean }[] = [
  {
    id: "how-know",
    question: "How do you know if your wheels need balancing?",
    answer:
      "Watch for steering wheel vibration between 40 and 70 mph that fades outside that band. Vibration felt through the seat or floor instead of the wheel points to the rear wheels. Cupped, scalloped patches on the tread are a further sign that the wheels need balancing.",
  },
  {
    id: "cost",
    question: "How much does mobile wheel balancing cost?",
    answer:
      "Mobile wheel balancing costs [£7.99] per wheel or [£XX] for all four. The price includes technician travel, wheel-off inspection, digital measurement, weights and placement, re-spin verification, pressure setting and torque to specification. Standard balancing carries no extra charges beyond the per-wheel figure quoted at booking.",
  },
  {
    id: "what-does",
    question: "What does wheel balancing actually do?",
    answer:
      "Balancing distributes weight evenly around the wheel and tyre assembly. The digital balancer finds the heavy spot, and counterweights of the exact gram value are fixed to the rim to offset it. The corrected assembly then spins true, which removes vibration and protects the tyre from patchy wear.",
  },
  {
    id: "vs-alignment",
    question: "Is wheel balancing the same as wheel alignment?",
    answer:
      "No. Balancing corrects uneven weight around the wheel and tyre. Alignment corrects the angles the wheels sit at relative to the road. Vibration at 40 to 70 mph is a balance symptom. Pulling to one side and a crooked steering wheel are alignment symptoms.",
  },
  {
    id: "safe",
    question: "Is it safe to drive with unbalanced wheels?",
    answer:
      "Not for long. Imbalance accelerates tyre wear, stresses wheel bearings and suspension components, and reduces grip through a vibrating contact patch. Short trips do little harm, but sustained motorway driving on unbalanced wheels shortens tyre life and strains the steering. Book balancing promptly once vibration appears.",
  },
  {
    id: "new-tyres",
    question: "Do new tyres need balancing?",
    answer:
      "Yes, every single time. Each new tyre changes the weight map of the assembly, so the wheel needs re-balancing after fitting. Balancing is included free when we fit your tyres through our mobile tyre fitting service, so the new tyre leaves balanced from the first mile.",
    link: true,
  },
  {
    id: "pothole",
    question: "Should wheels be balanced after a pothole?",
    answer:
      "Yes. A pothole or kerb impact dislodges existing weights and bends rims, both of which throw the assembly out of balance. Wheel-off inspection is included, so the technician checks the rim for buckling at the same time and reports any damage that balancing alone cannot resolve.",
  },
  {
    id: "how-long",
    question: "How long does mobile wheel balancing take?",
    answer:
      "Roughly 15 minutes per wheel on site, covering removal, inspection, digital measurement, weight placement, re-spin and refit. Four wheels are completed inside an hour in most cases. Severe corrosion on the rim seat or a locking nut problem adds a little time.",
  },
  {
    id: "all-speeds",
    question: "Can balancing fix a steering wheel that shakes at all speeds?",
    answer:
      "No. Balancing corrects a vibration that peaks in the 40 to 70 mph band. Constant vibration at every speed points to a buckled rim, a worn driveshaft or a drivetrain fault, and balancing cannot correct any of those. The 2026 mobile fleet diagnoses the true cause honestly and advises the next step.",
  },
  {
    id: "at-home",
    question: "Do you balance wheels at home?",
    answer:
      "Yes. We balance wheels at your home driveway, your workplace car park, a fleet yard or the roadside, 24/7 across UK mainland. The technician brings the calibrated digital balancer and weight kits to you, so there is no garage trip and no waiting room.",
  },
];
