/**
 * Page content + data for the /services/puncture-repair service page.
 *
 * Structured data (lists, steps, tiles, tables, FAQs) lives here so the section
 * components stay layout-only. Prose paragraphs that carry inline internal links
 * are kept in the section components themselves. British English throughout, no
 * em dashes (brand rule). Icon names map to src/components/icon.tsx.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears EXACTLY three
 * times in body copy, all three inside the section components (Hero subline, Why
 * Choose Us H2, Final CTA). The name is NOT used in this data file.
 */

export const PRICE = "£39";
export const PRICE_NUMBER = "39";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  ticks: [
    "Slow puncture diagnosis",
    "Nail and screw removal with permanent repair",
    "Valve replacement",
  ],
};

// --- Section 3: Puncture types we repair -------------------------------------

export const PUNCTURE_TYPES: { label: string; body: string; icon: string }[] = [
  {
    label: "Nail or Screw in the Tread",
    body: "Road debris and screws near building sites drive metal into the tread every day, the most common puncture our fitters see. A nail or screw inside the central tread area seals permanently under BS AU 159. The fitter removes the object, inspects the channel off the wheel, and seals the hole from the inside with a combination repair.",
    icon: "wrench",
  },
  {
    label: "Slow Puncture",
    body: "A slow puncture shows as a TPMS warning light and gradual pressure loss over days or weeks. Potholes, kerb strikes and a slightly bent rim often open the leak. The fitter traces the source with a water bath, confirms the cause, then repairs the tyre where the damage meets the standard. Diagnosis is included in every callout.",
    icon: "gauge",
  },
  {
    label: "Valve and Valve Stem Leaks",
    body: "A perished or cracked valve leaks air while the tyre itself holds no damage. Age, heat and grit at the valve base cause the slow seep. The fitter tests the valve under pressure, then replaces it on-site in minutes as part of the repair.",
    icon: "circle-dot",
  },
  {
    label: "Embedded Objects Not Yet Penetrating",
    body: "A stone, bolt or screw sometimes lodges in the tread short of the inner liner. Left in place, the object works deeper with every mile until the casing fails. The fitter assesses the depth off the wheel and removes the object safely before a slow leak turns into a blowout.",
    icon: "shield-check",
  },
  {
    label: "Multiple Punctures",
    body: "Two or more holes in a single tyre each get assessed individually against BS AU 159. The quadrant rule limits how many repairs one tyre carries, so the spacing between holes matters. The fitter measures each puncture, and the tyre passes or fails on the combined result.",
    icon: "circle-dot",
  },
];

// --- Section 4: Repairability under BS AU 159 --------------------------------

export const NON_REPAIRABLE: string[] = [
  "Tread worn below the 1.6mm legal limit",
  "Exposed or damaged cords",
  "Bead damage",
  "Rubber deterioration and cracking",
  "Faulty previous repairs",
  "Oil or chemical contamination",
];

// --- Section 5: Repair or replace framework ----------------------------------

export const DECISION_TABLE: { factor: string; repair: string; replace: string }[] = [
  { factor: "Damage location", repair: "Central tread", replace: "Sidewall or shoulder" },
  { factor: "Hole size", repair: "Under 6mm", replace: "Over 6mm" },
  { factor: "Tyre condition", repair: "Good tread, no prior damage", replace: "Worn or degraded" },
  { factor: "Tyre type", repair: "Standard, where eligible", replace: "Run-flat" },
];

// --- Section 6: Process steps ------------------------------------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Call or WhatsApp with your postcode",
    description:
      "Phone or WhatsApp our team with your postcode, or book online. Send a photo of the puncture when the damage is visible. The postcode confirms coverage and a response time, and the photo speeds the assessment before the van arrives.",
    icon: "phone",
  },
  {
    title: "Fitter dispatched to your location",
    description:
      "A fitter heads straight to you on a 60-minute emergency target, or at your booked slot. Every van carries a full mobile workshop: bead breaker, combination repair kit, wheel balancer and digital torque wrench. The repair happens on your driveway, in the work car park or at the roadside.",
    icon: "bus",
  },
  {
    title: "Tyre removed and inspected internally",
    description:
      "The fitter removes the tyre from the wheel and inspects the inner liner directly. The puncture is measured against the BS AU 159 limits for position, size and tread depth. Sealant kits and plug-only roadside fixes skip this internal inspection and miss hidden casing damage, so a quick external plug is never treated as permanent.",
    icon: "wrench",
  },
  {
    title: "Permanent combination repair fitted",
    description:
      "The fitter applies a permanent patch-plug combination repair from the inside, sealing the puncture channel and the inner liner in one unit. A new valve goes on where the old one is worn. The wheel gets rebalanced on calibrated equipment so the tyre runs true at motorway speed.",
    icon: "circle-dot",
  },
  {
    title: "Wheel refitted and torqued to spec",
    description:
      "The fitter refits the wheel and torques it to manufacturer specification with a digital torque wrench. TPMS gets checked and reset where needed. The 12-month workmanship guarantee activates on sign-off, and you keep a repaired tyre instead of buying a new one.",
    icon: "circle-check-big",
  },
];

// --- Section 7: Pricing ------------------------------------------------------

export const PRICE_INCLUDED: string[] = [
  "Technician travel to your location",
  "Off-wheel BS AU 159 inspection",
  "Permanent combination repair",
  "New valve",
  "Wheel balancing",
  "No call-out fee in standard hours",
];

export const PRICE_EXCLUDED: string[] = [
  "Out-of-hours emergency callout charge, always disclosed at booking before any work begins",
  "Replacement tyre, only if the puncture fails assessment",
];

// --- Section 8: Special cases ------------------------------------------------

export const SPECIAL_CASES: { name: string; body: string; icon: string }[] = [
  {
    name: "Run-Flat Tyres",
    body: "Reinforced sidewalls let a run-flat carry the car after a deflation, but the same stiff construction masks the internal damage that deflated running causes. For that reason run-flat punctures are not repaired, in line with manufacturer guidance. The resolution is a matching replacement run-flat, fitted on-site the same visit with a full TPMS reset.",
    icon: "shield-check",
  },
  {
    name: "EV Tyre Punctures",
    body: "Heavier EV kerb weights and foam-lined acoustic tyres change the repair assessment and the rebalancing. Every van is equipped for Tesla and mainstream EV models, with the tools to handle sealant-foam liners. A repairable EV puncture is sealed and rebalanced on the same callout.",
    icon: "battery-charging",
  },
  {
    name: "Sealant Kits and DIY Repairs",
    body: "Sealant cans and string-plug kits are temporary get-you-home measures only, not permanent repairs. A tyre treated with sealant still needs professional inspection off the wheel, because the latex hides the true extent of the damage. Our fitters clean the liner and repair sealant-treated tyres where the standard allows.",
    icon: "wrench",
  },
];

// --- Section 9: Emergency availability mini-grid -----------------------------

export const EMERGENCY_HOURS: { label: string; value: string }[] = [
  { label: "Standard appointments", value: "8am to 8pm, seven days a week" },
  { label: "Evening fitting", value: "Booked slots for drivers who finish work late" },
  { label: "Overnight emergency", value: "24 hours a day, 365 days a year" },
  { label: "Weekends and bank holidays", value: "Covered at no premium" },
];

// --- Section 10: Vehicles and drivers ----------------------------------------

export const VEHICLES: { label: string; icon: string }[] = [
  { label: "Cars, all makes and models", icon: "circle-check-big" },
  { label: "Vans and light commercial up to 3.5 tonnes", icon: "bus" },
  { label: "4x4s and SUVs", icon: "truck" },
  { label: "Electric vehicles", icon: "battery-charging" },
  { label: "Caravans and motorhomes", icon: "house" },
  { label: "Fleet vehicles", icon: "truck" },
];

export const DRIVERS: { label: string; icon: string }[] = [
  { label: "Private motorists", icon: "circle-check-big" },
  { label: "Company car and lease holders", icon: "circle-check-big" },
  { label: "Fleet managers", icon: "circle-check-big" },
  { label: "Workplace bookings", icon: "circle-check-big" },
];

// --- Section 11: Why choose us -----------------------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "60 min", label: "Emergency response target" },
  { stat: "24/7", label: "Cover, 365 days a year" },
  { stat: PRICE, label: "Repair, no call-out fee" },
  { stat: "12 months", label: "Workmanship guarantee" },
  { stat: "BS AU 159", label: "Compliant on every repair" },
  { stat: "UK mainland", label: "Postcode coverage" },
];

// --- Section 12: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Vehicle registration confirmed at booking",
    body: "The registration locks in the correct tyre size and fitment data.",
  },
  {
    title: "Locking wheel nut key inside the vehicle",
    body: "The fitter needs the key to remove the wheel safely.",
  },
  {
    title: "Flat hard surface where possible",
    body: "A driveway or car park gives the jack a stable base. The fitter manages positioning at the roadside.",
  },
  {
    title: "One metre side clearance",
    body: "The fitter needs working room on the side being repaired.",
  },
  {
    title: "Reachable phone contact during the window",
    body: "Someone must answer the phone during the booked slot.",
  },
];

// --- Section 13: Service areas -----------------------------------------------

export const AREAS_INTRO =
  "Mobile puncture repair across UK mainland, postcode-verified availability confirmed at booking.";

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
    "A commuter in Maidstone spotted a TPMS warning before the school run and found a screw lodged in the tread. A WhatsApp message with a photo reached our team at 07:40. A fitter arrived on the driveway at 08:30. Off-wheel inspection confirmed the damage sat inside the central 75% of the tread. The fitter completed a combination repair, fitted a new valve and rebalanced the wheel. The car was back on the driveway at 09:10 for £39, with no replacement tyre needed.",
  stats: [
    { time: "07:40", label: "Message received" },
    { time: "08:30", label: "Fitter on-site" },
    { time: "09:10", label: "Back on the road" },
  ],
  meta: "Maidstone · Screw in tread · BS AU 159 repair",
};

// --- Section 16: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. Items flagged `link` contain the phrase
// "mobile tyre fitting", which the Faq component turns into a link to the sibling
// service page at render time. Visible text stays identical to the schema text.

export const FAQS: { id: string; question: string; answer: string; link?: boolean }[] = [
  {
    id: "cost",
    question: "How much does a mobile puncture repair cost?",
    answer:
      "A mobile puncture repair costs £39 in standard hours with no call-out fee. The price covers technician travel, off-wheel BS AU 159 inspection, a permanent combination repair, a new valve and wheel balancing. Out-of-hours emergency callouts carry a separate charge, always disclosed at booking before any work begins.",
  },
  {
    id: "nail",
    question: "Can a tyre with a nail in it be repaired?",
    answer:
      "Yes, when the nail sits in the central 75% of the tread and the hole measures under 6mm. The fitter removes the nail and completes a permanent BS AU 159 repair after an internal inspection off the wheel. Damage outside that zone fails the standard.",
  },
  {
    id: "worth-it",
    question: "Is it worth repairing a puncture instead of replacing the tyre?",
    answer:
      "Yes, when the tyre passes the BS AU 159 assessment. A £39 repair costs a fraction of a £60 to £200 replacement tyre. The repair restores a sound tyre to full service. Replacement makes sense only when the damage falls outside the repairable zone or the tyre is worn.",
  },
  {
    id: "sidewall",
    question: "Can a sidewall puncture be repaired?",
    answer:
      "No, a sidewall puncture is never repairable. BS AU 159 prohibits repairs to the sidewall, shoulder and bead because the flexing zone carries the structural load. The fitter fits a replacement tyre in the same visit, so you avoid a second callout.",
  },
  {
    id: "how-long",
    question: "How long does a mobile puncture repair take?",
    answer:
      "A mobile puncture repair takes 30 to 45 minutes on-site from arrival to sign-off. The fitter removes the tyre, inspects it off the wheel, completes the combination repair, fits a new valve, rebalances the wheel and refits it to torque. Emergency dispatch runs separately on a 60-minute target.",
  },
  {
    id: "safe-legal",
    question: "Is a repaired tyre safe and legal?",
    answer:
      "Yes, a BS AU 159 combination repair is permanent, safe and road legal. The repair meets the British Standard in force as of 2026 for car and light commercial tyres. A correctly repaired tyre carries the same load and speed rating it held before the puncture.",
  },
  {
    id: "run-flat",
    question: "Can run-flat tyres be repaired?",
    answer:
      "No, run-flat tyres are not repaired. Reinforced sidewalls mask internal damage after the tyre runs deflated, so the standard rules the repair out. A matching run-flat is fitted on-site with a TPMS reset, part of our mobile tyre fitting service.",
    link: true,
  },
  {
    id: "night-weekends",
    question: "Do you repair punctures at night and on weekends?",
    answer:
      "Yes, our fitters repair punctures 24/7, 365 days a year including weekends and bank holidays. Overnight and out-of-hours callouts carry separate terms, always disclosed at booking before any work begins. A flat tyre at 11pm reaches a fitter who is still answering the phone.",
  },
  {
    id: "sealant",
    question: "I used a sealant kit, can the tyre still be repaired?",
    answer:
      "Often yes, sealant is a temporary fix only. The fitter removes the tyre, cleans the inner liner and inspects the casing off the wheel. A sealant-treated tyre qualifies for a permanent repair where the puncture sits inside the repairable zone and the standard allows.",
  },
  {
    id: "fails-assessment",
    question: "What happens if my tyre fails the repair assessment?",
    answer:
      "The fitter offers replacement options from van stock and fits the new tyre in the same visit. No second callout is needed. A failed assessment means the damage sits in the sidewall or shoulder, or the tyre is worn. Replacement runs through our mobile tyre fitting service.",
    link: true,
  },
];
