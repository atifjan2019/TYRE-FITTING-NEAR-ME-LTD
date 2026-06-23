/**
 * Page content + data for the /services/tpms-service service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx.
 *
 * Pricing: competitively benchmarked against UK mobile TPMS services (valve
 * service £5.99 to £25 per wheel, sensor replacement £30 to £60 per sensor).
 * PRICE is the per-wheel valve-service figure used by the Offer schema, CTA and
 * meta description.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components
 * (Section 10 H2, Section 10 opening line, Final CTA subtitle). The name is NOT
 * used in this data file.
 */

export const PRICE = "£15";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "TPMS service is the maintenance of a vehicle's tyre pressure monitoring system, covering replacement of the perishable valve service pack, replacement of a failed sensor with a dead sealed battery, and a diagnostic reset of the dashboard warning light. Performed mobile at the home or workplace, every day of the year through 2026.",
  ticks: [
    "Valve service from £15 per wheel",
    "Sensor replacement from £45",
    "MOT-ready, UK mainland",
  ],
  subLine: "Book with a postcode and registration, or call 0788 328 8831.",
};

// --- Three TPMS jobs icon row ------------------------------------------------

export const THREE_JOBS: { title: string; body: string; icon: string }[] = [
  {
    title: "Valve service",
    body: "Replaces the perishable grommet, valve core, cap, and retaining nut.",
    icon: "circle-dot",
  },
  {
    title: "Sensor replacement",
    body: "Swaps a sensor whose sealed battery has died after 5 to 10 years.",
    icon: "gauge",
  },
  {
    title: "Diagnostic reset",
    body: "Clears the warning light and relearns the sensor IDs to the ECU.",
    icon: "wrench",
  },
];

// --- Section 3: Valve service vs sensor replacement (SIGNATURE VISUAL) --------

export const VALVE_FACTS: string[] = [
  "Perishable parts: rubber grommet, valve core, cap, and retaining nut",
  "Low-cost service pack replaced as standard whenever a tyre is removed",
  "A perished grommet is a common cause of a slow air leak",
  "Done with every tyre change while the tyre is off the rim",
];

export const SENSOR_FACTS: string[] = [
  "Replaces the whole sealed sensor, not an individual part",
  "Sealed battery cannot be replaced on its own and dies after 5 to 10 years",
  "Fitted when the battery dies or the sensor fails",
  "Relearned to the ECU so it reports pressure correctly",
];

// --- Section 5: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book with the registration and postcode",
    description:
      "Book with the registration and postcode, or call with the warning light symptom. The registration confirms whether the vehicle runs direct or indirect TPMS and which sensors it takes.",
    icon: "phone",
  },
  {
    title: "The technician arrives fully equipped",
    description:
      "The technician arrives at the home, workplace, or roadside. 2026 vans carry valve service packs, replacement direct sensors, a TPMS diagnostic and relearn tool, and an OBD2 scanner.",
    icon: "bus",
  },
  {
    title: "A diagnostic read finds the cause",
    description:
      "A diagnostic read identifies the fault: a perished valve, a dead sensor battery, low pressure, or a relearn failure. The cause is confirmed before any part is fitted, so nothing is replaced unnecessarily.",
    icon: "gauge",
  },
  {
    title: "The fix is carried out",
    description:
      "A valve service pack goes on a leaking valve, a new sensor goes in where the battery has died, pressures are set to the manufacturer figure, and the warning light is reset.",
    icon: "wrench",
  },
  {
    title: "Relearn and sign-off",
    description:
      "The sensor IDs are relearned to the ECU and the dashboard light is confirmed off before sign-off. The 12-month workmanship guarantee applies.",
    icon: "circle-check-big",
  },
];

// --- Section 7: Direct and indirect TPMS (two-row info block) ----------------

export const SYSTEMS: { name: string; body: string; icon: string }[] = [
  {
    name: "Direct TPMS",
    body: "Places a physical pressure sensor inside each wheel, reporting real pressure to the ECU. A direct system has sensors to service and replace.",
    icon: "gauge",
  },
  {
    name: "Indirect TPMS",
    body: "Uses the ABS wheel-speed sensors to estimate pressure from how fast each wheel turns. An indirect system has no tyre sensor to replace and is serviced by a recalibration after a pressure change or tyre swap.",
    icon: "activity",
  },
];

export const SYSTEMS_CLOSE =
  "The registration confirms which system the vehicle uses before the visit, so the right service is brought.";

// --- Section 8: Costs --------------------------------------------------------

export const PRICING_LINES: string[] = [
  "£15 per wheel for a valve service",
  "£45 per sensor for a replacement",
  "£25 for a diagnostic and warning light reset",
];

// --- Section 11: Pre-arrival checklist ---------------------------------------
//
// The item flagged `link` carries the phrase "locking wheel nut key", which the
// Checklist component turns into a link to the locking-wheel-nut-removal service.

export const CHECKLIST: { title: string; body: string; link?: boolean }[] = [
  {
    title: "Have the registration ready so the TPMS system type is confirmed",
    body: "The registration tells the technician whether the vehicle runs direct or indirect TPMS and which sensors it takes.",
  },
  {
    title: "Note when the warning light came on and whether it is steady or flashing",
    body: "A steady light and a flashing light point to different faults, so the detail speeds up the diagnostic.",
  },
  {
    title: "Park on flat hard standing with side clearance",
    body: "A driveway or car park gives the jack a stable base on the side being worked.",
  },
  {
    title: "Keep the locking wheel nut key in the vehicle so the wheels come off",
    body: "The technician needs the locking wheel nut key to remove the wheel safely.",
    link: true,
  },
  {
    title: "Keep a keyholder reachable during the slot",
    body: "The owner or an authorised person must be contactable during the booked window.",
  },
];

// --- Section 12: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Coverage spans UK mainland, postcode-verified at booking. Active regions include London, Kent, Sussex, Essex, Birmingham and the West Midlands, and Scotland. City pages carry local response times and slots.";

export const AREAS: { region: string; featured: string; cities: string[]; href: string }[] = [
  { region: "London", featured: "Bromley", cities: ["Croydon", "Romford", "Enfield", "Kingston"], href: "/areas/london" },
  { region: "Kent", featured: "Maidstone", cities: ["Canterbury", "Dartford", "Ashford", "Medway"], href: "/areas/kent" },
  { region: "Sussex", featured: "Brighton", cities: ["Crawley", "Worthing", "Eastbourne", "Hastings"], href: "/areas/sussex" },
  { region: "Essex", featured: "Chelmsford", cities: ["Colchester", "Basildon", "Southend", "Harlow"], href: "/areas/essex" },
  { region: "Birmingham & West Midlands", featured: "Solihull", cities: ["Coventry", "Wolverhampton", "Walsall", "Dudley"], href: "/areas/west-midlands" },
  { region: "Scotland", featured: "Glasgow", cities: ["Edinburgh", "Aberdeen", "Dundee", "Stirling"], href: "/areas/scotland" },
];

// --- Section 13: Case study --------------------------------------------------

export const CASE_STUDY = {
  label: "Illustrative scenario",
  body:
    "A driver in Essex with an MOT in three days has a TPMS warning light that will not clear. A mobile diagnostic is booked, the technician arrives at 10:15, and the read shows one dead sensor battery on a five-year-old front sensor and a perished rear valve. The dead sensor is replaced and relearned, the rear valve serviced, all four pressures set, the light reset and confirmed off by 11:05. The MOT passes on the TPMS check. Representative of standard warning-light callouts before an MOT.",
  stats: [
    { time: "10:15", label: "Technician on-site" },
    { time: "11:05", label: "Light reset, signed off" },
  ],
  meta: "Essex · Dead front sensor · Perished rear valve · MOT-ready",
};

// --- Section 16: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. Items may carry `links`, where the Faq
// component replaces the first occurrence of each phrase with a contextual link.
// Visible text stays byte-identical to the schema text.

export const FAQS: {
  id: string;
  question: string;
  answer: string;
  links?: { phrase: string; href: string }[];
}[] = [
  {
    id: "what-is",
    question: "What is a TPMS service?",
    answer:
      "A TPMS service is the maintenance of the tyre pressure monitoring system. The work covers a valve service that replaces the perishable valve pack, a sensor replacement when a sealed battery has died, and a diagnostic reset that clears the warning light and relearns the sensor IDs to the ECU.",
  },
  {
    id: "cost",
    question: "How much does TPMS service cost?",
    answer:
      "A valve service is £15 per wheel, a sensor replacement is £45 per sensor, and a diagnostic with a warning light reset is £25. The diagnostic confirms which job is needed first, and every figure is quoted before booking with nothing added later.",
  },
  {
    id: "with-tyre-change",
    question: "Do I need a TPMS service when I change my tyres?",
    answer:
      "Yes. The valve service pack perishes once the tyre is off the rim, so the valve is serviced as standard during a tyre fitting. A new tyre on an old perished valve is a common cause of a slow leak straight after fitting.",
    links: [{ phrase: "tyre fitting", href: "/services/mobile-tyre-fitting" }],
  },
  {
    id: "light-on",
    question: "Why is my TPMS warning light on?",
    answer:
      "A TPMS warning light signals low pressure, a dead sensor battery, a perished valve, or a failed relearn. A diagnostic read confirms which fault is present before any part is fitted, so nothing is replaced unnecessarily.",
  },
  {
    id: "drive-with-light",
    question: "Can I drive with the TPMS light on?",
    answer:
      "No. The light signals a real fault and is a direct MOT failure. Driving on it risks underinflation, longer braking distances, uneven tyre wear, and a blowout, so the cause is best diagnosed and fixed quickly.",
  },
  {
    id: "mot",
    question: "Is TPMS checked in the MOT?",
    answer:
      "Yes. TPMS has been tested in the MOT for cars first registered from 1 January 2012. A warning light illuminated on the dashboard is a direct failure of the test.",
  },
  {
    id: "battery",
    question: "Can a TPMS sensor battery be replaced on its own?",
    answer:
      "No. The battery is sealed inside the sensor and lasts 5 to 10 years. A dead battery means a complete new sensor, which is then relearned to the ECU so it reports correctly.",
  },
  {
    id: "valve-vs-sensor",
    question: "What is the difference between a TPMS valve service and a sensor replacement?",
    answer:
      "A valve service replaces the perishable parts, the grommet, valve core, cap, and retaining nut. A sensor replacement swaps the whole sealed sensor when its battery dies. A 2026 diagnostic confirms which one the vehicle needs before any money is spent.",
  },
  {
    id: "direct-indirect",
    question: "Do you service direct and indirect TPMS?",
    answer:
      "Yes. Direct systems have a sensor in each wheel to service and replace, and indirect systems are recalibrated through the ABS. The registration confirms which system the vehicle uses before the visit.",
  },
  {
    id: "at-home",
    question: "Can you service my TPMS at home?",
    answer:
      "Yes. The service is mobile at the home, workplace, or roadside, and is the only mobile TPMS service in the area. No garage visit is needed for the valve service, sensor replacement, or reset.",
  },
];
