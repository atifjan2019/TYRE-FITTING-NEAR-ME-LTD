/**
 * Page content + data for the /services/run-flat-tyre service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx.
 *
 * Pricing: PRICE is the £20 flat fitting fee per tyre (charged on top of the
 * tyre). The Section 8 tyre-only "from £90" anchor is benchmarked against UK
 * budget run-flats and is priced live from the VRN at quote time.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components
 * (Section 11 H2, Section 11 opening line, Final CTA). The name is NOT used in
 * this data file. Tyre maker names (Michelin, Continental, Pirelli, Bridgestone,
 * Goodyear) are not brand mentions.
 */

export const PRICE = "£20";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "Run-flat tyre replacement is the supply and mobile fitment of a correct manufacturer-approved run-flat tyre to replace one that has been punctured or worn, performed at the driver's home, workplace, or roadside, with the correct run-flat marking and load index matched from the VRN. Booked by drivers across the UK through 2026.",
  ticks: [
    "£20 flat fitting fee per tyre",
    "Run-flat priced from the VRN",
    "24/7 UK mainland cover",
  ],
  subLine: "Book with a postcode and registration, or call 0788 328 8831.",
};

// --- Section 2: Run-Flat vs Conventional Tyre (decision aid) -----------------

export const COMPARE_RUNFLAT: string[] = [
  "Reinforced self-supporting sidewall",
  "Drive on after a puncture",
  "No spare needed",
  "TPMS required",
  "Replacement-only",
  "Higher cost",
];

export const COMPARE_CONVENTIONAL: string[] = [
  "Standard sidewall",
  "Goes flat on a puncture",
  "Needs a spare or repair",
  "Often repairable",
  "Lower cost",
];

// --- Section 3: The run-flat rules (icon card grid, authority centrepiece) ---

export const RUNFLAT_RULES: { title: string; body: string; icon: string }[] = [
  {
    title: "A working TPMS is mandatory",
    body:
      "A run-flat does not go visibly flat when punctured, so without a working tyre pressure monitoring system the driver never knows. A run-flat fitted to a vehicle with a faulty TPMS is unsafe, and the TPMS is checked and serviced as part of the work.",
    icon: "gauge",
  },
  {
    title: "The 50 miles, 50mph run-on limit",
    body:
      "A punctured run-flat carries the car for a limited distance only, commonly up to 50 miles at up to 50mph. Running beyond the rated distance destroys the tyre and risks the rim.",
    icon: "clock",
  },
  {
    title: "Never mix run-flats and conventional tyres",
    body:
      "Run-flat and conventional tyres behave differently under load, so mixing them on one vehicle unbalances the handling. Replacement is done in matched axle pairs or full sets.",
    icon: "circle-dot",
  },
  {
    title: "The suspension is tuned for run-flats",
    body:
      "A vehicle supplied with run-flats has its suspension set for the stiffer sidewall. Switching to conventional tyres changes the ride and is a decision, not a default.",
    icon: "activity",
  },
  {
    title: "Correct marking and load index",
    body:
      "Run-flats carry maker-specific markings such as RF, RFT, ROF, RSC, SSR, or ZP, matched to the vehicle from the VRN. A wrong marking or load index is the wrong tyre.",
    icon: "shield-check",
  },
];

// --- Section 4: What you get (trust tile list) -------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "Correct spec", body: "The correct manufacturer-approved run-flat matched from the VRN.", icon: "shield-check" },
  { stat: "£20", body: "Flat fitting fee per tyre covering travel, removal, fitment, balancing, valve, and disposal.", icon: "badge-pound-sterling" },
  { stat: "Run-flat tools", body: "Run-flat-specific fitting tooling for the stiff reinforced sidewall.", icon: "wrench" },
  { stat: "TPMS", body: "Checked and reset as part of the work.", icon: "gauge" },
  { stat: "Matched pairs", body: "Replacement in matched axle pairs on request.", icon: "circle-dot" },
  { stat: "Torqued", body: "Wheels torqued to manufacturer figures with digital torque wrenches.", icon: "settings" },
  { stat: "30 to 60 min", body: "A typical emergency response for run-flat warnings.", icon: "siren" },
  { stat: "12 months", body: "Workmanship guarantee on every replacement.", icon: "badge-check" },
  { stat: "Mobile", body: "Fitted at the home, work, or roadside.", icon: "house" },
];

// --- Section 5: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book with the registration and postcode",
    description:
      "Book with the registration and postcode, or call with the run-flat warning. The VRN confirms the run-flat marking, size, load index, and speed rating, so the correct tyre arrives.",
    icon: "phone",
  },
  {
    title: "The run-flat is priced before booking",
    description:
      "The run-flat is priced by size, brand, and load rating and quoted in full before booking. No catalogue browsing and no surprise at the kerb.",
    icon: "badge-pound-sterling",
  },
  {
    title: "The technician arrives fully equipped",
    description:
      "The technician arrives at the home, workplace, or roadside. 2026 fitting vans carry run-flat changing and balancing equipment for the stiff reinforced sidewall, for wheels up to 20 inches.",
    icon: "bus",
  },
  {
    title: "The replacement is fitted and balanced",
    description:
      "The old run-flat is removed, the correct replacement fitted and balanced, the valve replaced, pressures set, and the wheel torqued to the manufacturer figure. Run-flats are fitted in matched pairs where the axle requires it.",
    icon: "circle-dot",
  },
  {
    title: "TPMS reset and sign-off",
    description:
      "The TPMS is checked and reset so the new tyre reports correctly, and the 12-month workmanship guarantee activates at sign-off.",
    icon: "circle-check-big",
  },
];

// --- Section 7: Vehicles and run-flat types covered --------------------------

export const RUNFLAT_MARKINGS: string[] = ["RF", "RFT", "ROF", "RSC", "SSR", "ZP", "EMT", "DSST"];

// --- Section 12: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Confirm the registration at booking so the run-flat marking is matched",
    body: "The VRN confirms the marking, size, load index, and speed rating, so the correct run-flat arrives.",
  },
  {
    title: "Note the run-flat warning and how far the car has been driven since",
    body: "This tells the technician how much of the run-on limit remains before the wheel is at risk.",
  },
  {
    title: "Park on flat hard standing with one metre of side clearance",
    body: "A driveway or car park gives the jack a stable base on the side being worked on.",
  },
  {
    title: "Keep the locking wheel nut key in the vehicle so the wheels come off",
    body: "The technician needs the locking wheel nut key to remove the wheel safely.",
  },
  {
    title: "Keep a keyholder reachable during the slot",
    body: "The owner or an authorised person must be contactable during the booked window.",
  },
];

// --- Section 13: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Coverage spans UK mainland, postcode-verified at booking. Active regions include London, Kent, Sussex, Essex, Birmingham and the West Midlands, and Scotland. City pages carry local response times and slots.";

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
    "A BMW driver in London gets a run-flat warning on the motorway, pulls off within the 50-mile limit, and books a mobile replacement rather than risk the full run-on distance to a garage. The technician arrives at 14:20 with the correct RSC-marked run-flat matched to the registration, fits and balances it, replaces the valve, torques to spec, checks and resets the TPMS, and is done by 15:05. The car is back on the road with the correct tyre and no garage detour. Representative of standard run-flat warning callouts.",
  stats: [
    { time: "14:20", label: "Technician on-site" },
    { time: "15:05", label: "Replacement complete" },
  ],
  meta: "London · BMW · RSC-marked run-flat · TPMS reset",
};

// --- Section 16: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible
// <details> accordion and the FAQPage JSON-LD. Items carrying `links` have each
// phrase (first occurrence) turned into a contextual link by the Faq component
// at render time. Visible text stays identical to the schema text.

export const FAQS: {
  id: string;
  question: string;
  answer: string;
  links?: { phrase: string; href: string }[];
}[] = [
  {
    id: "repair",
    question: "Can a punctured run-flat be repaired?",
    answer:
      "Usually no. The sidewall has carried the car deflated and the internal structure may be compromised, so manufacturer guidance is replacement rather than repair. A conventional puncture is different and is often repairable through puncture repair.",
    links: [{ phrase: "puncture repair", href: "/services/mobile-tyre-repair" }],
  },
  {
    id: "cost",
    question: "How much does run-flat tyre replacement cost?",
    answer:
      "The fitting fee is £20 per tyre, covering travel, removal, fitment, balancing, valve, and disposal. The run-flat tyre itself is priced by size, brand, and load rating, quoted in full from the VRN before booking.",
  },
  {
    id: "how-far",
    question: "How far can I drive on a punctured run-flat?",
    answer:
      "Commonly up to 50 miles at up to 50mph, though the exact figure varies by manufacturer. Driving beyond the rated distance destroys the tyre and risks damaging the rim, so the replacement is best brought to you before the limit.",
  },
  {
    id: "tpms",
    question: "Do run-flats need a TPMS?",
    answer:
      "Yes. A run-flat does not go visibly flat when punctured, so a working TPMS is mandatory to warn the driver. The TPMS is checked and reset as part of the replacement.",
    links: [{ phrase: "TPMS", href: "/services/tpms-service" }],
  },
  {
    id: "swap-normal",
    question: "Can I replace run-flats with normal tyres?",
    answer:
      "Physically yes, and it is often cheaper per tyre, but it loses the run-flat safety margin, changes the ride the suspension was tuned for, and needs a full matched set rather than one tyre. The service fits either with honest guidance.",
  },
  {
    id: "mix",
    question: "Can I mix run-flats and conventional tyres?",
    answer:
      "No. Run-flat and conventional tyres behave differently under load and unbalance the handling when mixed on one vehicle. Replacement is carried out in matched axle pairs or full sets to keep the car safe.",
  },
  {
    id: "at-home",
    question: "Do you fit run-flats at home?",
    answer:
      "Yes. The service is mobile at the home, workplace, or roadside, and is the only mobile run-flat specialist in the area in 2026. The correct run-flat is matched from the VRN and brought to you.",
  },
  {
    id: "markings",
    question: "Which run-flat markings do you fit?",
    answer:
      "RF, RFT, ROF, RSC, SSR, ZP, EMT, and DSST, the maker abbreviations for run-flat and self-supporting construction. The correct marking is matched to the vehicle from the registration, never guessed at the wheel.",
  },
  {
    id: "expensive",
    question: "Why are run-flats more expensive than normal tyres?",
    answer:
      "The reinforced self-supporting sidewall that lets a run-flat carry the car after a puncture costs more to build. The tyre is priced honestly from the VRN, with the £20 fitting fee stated separately.",
  },
  {
    id: "emergency",
    question: "Can you replace a run-flat in an emergency?",
    answer:
      "Yes. Replacement runs 24/7 with a 30 to 60 minute typical response, and the correct run-flat is brought before the 50-mile run-on limit is reached. Book the emergency callout by phone for the fastest dispatch.",
    links: [{ phrase: "emergency", href: "/services/emergency-tyre-fitting" }],
  },
];
