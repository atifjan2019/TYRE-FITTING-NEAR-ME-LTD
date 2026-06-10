/**
 * Page content + data for the /services/mobile-tyre-repair service page.
 *
 * Cloned from the mobile-tyre-fitting content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * Pricing: PRICE is a deliberate placeholder. Replace "[£XX]" with the real
 * figure (and the Offer schema price in page.tsx) before deploy.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components (Why
 * Choose Us heading, Why Choose Us lead line, Final CTA). The name is NOT used
 * in this data file.
 */

export const PRICE = "[£XX]";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "Mobile puncture repair is a callout service where a qualified technician travels to your vehicle, assesses the tyre against BS AU 159, and completes a permanent plug-patch repair on-site at your home, workplace or roadside. Drivers across the UK book this service in 2026 to keep a repairable tyre and skip the garage queue.",
  ticks: [
    "24/7 availability",
    "60-minute emergency response",
    "Permanent BS AU 159 repairs from [£XX]",
  ],
};

// --- Section 3: Eligibility (signature YES/NO visual) ------------------------

export const ELIGIBLE_YES: string[] = [
  "The puncture sits within the central 75% of the tread",
  "The hole measures 6mm or smaller",
  "The tread sits above the 1.6mm UK legal minimum",
  "No previous repair occupies the same quadrant of the tyre",
  "The rubber is free of age cracking and perishing",
];

export const ELIGIBLE_NO: string[] = [
  "Sidewall, shoulder or bead damage, which is structural and never repairable",
  "Inner liner damage caused by driving the tyre flat",
  "Run-flat tyres, replaced instead under manufacturer structural guidance",
  "Tyres filled with certain emergency sealants that block a vulcanised seal",
];

// --- Section 4: What you get (trust tile grid) -------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "24/7", body: "Cover, 365 days a year, including bank holidays.", icon: "clock" },
  { stat: "60 min", body: "Emergency response target across UK mainland postcodes.", icon: "gauge" },
  { stat: "[£XX]", body: "Transparent repair price per puncture, quoted before any work begins.", icon: "badge-pound-sterling" },
  { stat: "Free", body: "BS AU 159 repairability assessment on every callout.", icon: "circle-check-big" },
  { stat: "Plug-patch", body: "Permanent repair sealing the channel and inner liner, not a temporary plug.", icon: "wrench" },
  { stat: "12 months", body: "Workmanship guarantee on every permanent repair.", icon: "badge-check" },
];

// --- Section 5: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book with your postcode and registration",
    description:
      "Book your repair with your postcode and vehicle registration through the form, or call or WhatsApp 0788 328 8831 for emergency dispatch. The postcode verifies coverage and response time. The registration confirms the tyre size and specification.",
    icon: "phone",
  },
  {
    title: "A technician arrives fully equipped",
    description:
      "A technician arrives at your location in a fully equipped van. The 2026 fleet carries plug-patch repair systems, bead breakers, balancing equipment for wheels up to 20 inches, TPMS tools and digital torque wrenches. Everything needed for a permanent repair travels to you.",
    icon: "bus",
  },
  {
    title: "Full BS AU 159 assessment off the wheel",
    description:
      "The technician removes the tyre from the wheel and inspects the inner liner directly. The puncture is measured against the BS AU 159 criteria for position, size and condition. External-only plug repairs skip this internal inspection and never qualify as permanent.",
    icon: "wrench",
  },
  {
    title: "Permanent plug-patch repair",
    description:
      "The puncture channel is filled and the inner liner is patched in one vulcanised plug-patch unit. The tyre is refitted, rebalanced, set to the correct pressure and torqued to manufacturer specification.",
    icon: "circle-dot",
  },
  {
    title: "Sign-off and 12-month guarantee",
    description:
      "The technician signs off the work and activates the 12-month workmanship guarantee. Where the tyre fails assessment, a replacement is quoted and fitted on the same visit, and the repair fee is waived.",
    icon: "circle-check-big",
  },
];

// --- Section 6: 24/7 availability --------------------------------------------

export const AVAILABILITY = {
  hours: [
    { label: "Standard repair slots", value: "8am to 8pm, seven days a week, bank holidays included" },
    { label: "Overnight emergency callouts", value: "24 hours a day, 365 days a year" },
    { label: "Emergency response target", value: "60 minutes across UK mainland, postcode-dependent" },
    { label: "Roadside and motorway work", value: "National Highways safety protocol, safe positioning first" },
  ],
  pricingHeading: "Transparent pricing, nothing added after",
  pricingBody:
    "The [£XX] repair fee applies at any standard hour. Out-of-hours emergency callouts sometimes carry a separate [£XX] charge, disclosed at booking before any work starts, with nothing added after the repair.",
};

// --- Section 7: Slow punctures and pressure loss (card grid) -----------------

export const CAUSES_INTRO =
  "A TPMS warning light, or a tyre that needs air every week, signals a slow puncture until proven otherwise. The technician traces the leak with a water test and a close inspection, then repairs under BS AU 159 or identifies the true cause.";

export const CAUSES: { name: string; body: string; icon: string }[] = [
  {
    name: "Nail or screw in the tread",
    body: "The most common puncture our technicians repair, sealed under BS AU 159 where the tread position and hole size allow.",
    icon: "wrench",
  },
  {
    name: "Valve stem leaks",
    body: "A leaking valve is traced and replaced on-site as part of the repair where the valve is the fault.",
    icon: "circle-dot",
  },
  {
    name: "Corroded wheel rim seats",
    body: "A corroded rim seat is cleaned and resealed so the bead holds pressure again.",
    icon: "gauge",
  },
  {
    name: "Previous poor repairs",
    body: "An earlier string plug or off-centre patch is inspected and replaced with a permanent plug-patch repair.",
    icon: "shield-check",
  },
];

// --- Section 10: Vehicles and customers --------------------------------------

export const VEHICLES: { label: string; icon: string }[] = [
  { label: "Cars, all makes and models", icon: "circle-check-big" },
  { label: "Vans up to 3.5 tonnes", icon: "bus" },
  { label: "4x4s and SUVs", icon: "truck" },
  { label: "Fleet and lease vehicles", icon: "truck" },
];

export const CUSTOMERS: { label: string; icon: string }[] = [
  { label: "Private motorists", icon: "circle-check-big" },
  { label: "Fleet operators with account terms", icon: "circle-check-big" },
  { label: "Lease and company car drivers", icon: "circle-check-big" },
  { label: "Home and workplace callouts", icon: "circle-check-big" },
];

export const VEHICLES_NOTE =
  "Car and light commercial tyres only, on wheels up to 20 inches. Motorcycles and bicycles are outside the service. Fleet operators get account terms with monthly invoicing across multiple vehicles.";

export const RUNFLAT_NOTE =
  "Run-flat tyres are assessed on every callout, then replaced rather than repaired under manufacturer structural guidance, with a TPMS reset and a matching run-flat fitted on the same visit.";

// --- Section 9: Costs --------------------------------------------------------

export const COST_INCLUDED: string[] = [
  "Technician travel to your location",
  "BS AU 159 repairability assessment",
  "Internal liner inspection",
  "Plug-patch repair",
  "Valve check and replacement where needed",
  "Full wheel rebalance",
  "Pressure reset to manufacturer specification",
];

export const COST_SEPARATE: string[] = [
  "Replacement tyre where the puncture fails assessment",
  "Optional TPMS sensor parts where a sensor has failed",
];

export const COST_CALLOUT = {
  heading: "The fee-waiver policy",
  body:
    "Where the tyre fails assessment, the repair fee is waived against the replacement. A mobile repair removes the recovery-truck cost, the garage queue and the risk miles of driving on a damaged tyre, which is where the real cost of a puncture sits.",
  freshness: "Repair pricing is held flat through 2026 for every standard appointment.",
};

// --- Section 11: Why drivers choose us ---------------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "60 min", label: "Emergency response target" },
  { stat: "24/7", label: "Cover, 365 days a year" },
  { stat: "[£XX]", label: "Repair price, no call-out fee in standard hours" },
  { stat: "Free", label: "BS AU 159 assessment, fee waived if it fails" },
  { stat: "12 months", label: "Workmanship guarantee" },
  { stat: "UK-wide", label: "Postcode coverage, verified at booking" },
];

// --- Section 12: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Locking wheel nut key inside the vehicle",
    body: "The technician needs the key to remove the wheel safely.",
  },
  {
    title: "Flat hard surface with one metre side clearance",
    body: "A driveway or car park gives the jack a stable base on the side being repaired.",
  },
  {
    title: "Do not drive on the flat tyre",
    body: "Even a short distance destroys the inner liner and voids repairability.",
  },
  {
    title: "Declare any emergency sealant at booking",
    body: "Tell us if sealant was used, so the technician arrives prepared.",
  },
  {
    title: "Stay reachable by phone",
    body: "The owner or an authorised person must be contactable during the booked window.",
  },
];

export const CHECKLIST_MOTORWAY =
  "On a motorway hard shoulder, follow the technician's instructions and National Highways safety protocol before any work begins.";

// --- Section 13: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Mobile puncture repair covers UK mainland, with availability postcode-verified at booking. Coverage spans the regions below plus the surrounding towns and counties.";

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
    "A commuter in a Chelmsford office car park found a screw in the rear tyre and a TPMS warning at 12:30. A call at 12:35 dispatched a technician, on-site by 13:20. An internal inspection confirmed the puncture sat in the central tread, measured 4mm, and met BS AU 159. A plug-patch repair, a rebalance and a pressure reset finished the job by 13:55. The driver kept the tyre, skipped the replacement cost and made the school run.",
  stats: [
    { time: "12:35", label: "Call placed" },
    { time: "13:20", label: "Technician on-site" },
    { time: "13:55", label: "Repair complete" },
  ],
  meta: "Chelmsford · Screw in tread · 4mm, central tread · BS AU 159 plug-patch repair",
};

// --- Section 16: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. The item flagged `link` contains the phrase
// "mobile tyre fitting", which the Faq component turns into a link to the sibling
// service page at render time. Visible text stays identical to the schema text.

export const FAQS: { id: string; question: string; answer: string; link?: boolean }[] = [
  {
    id: "cost",
    question: "How much does mobile puncture repair cost?",
    answer:
      "Mobile puncture repair costs [£XX] per puncture. The price includes travel, the BS AU 159 assessment, internal inspection, the plug-patch repair, a valve check, a rebalance and a pressure reset. Where the tyre fails assessment, the repair fee is waived against a replacement fitted on the same visit, so a failed assessment never costs you a wasted callout.",
  },
  {
    id: "every-tyre",
    question: "Can every punctured tyre be repaired?",
    answer:
      "No. BS AU 159 sets the limits. A puncture in the central 75% of the tread, 6mm or smaller, on a tyre above the 1.6mm tread limit, can be repaired. Sidewall, shoulder and bead damage cannot be repaired, because the damage is structural. A run-flat is replaced rather than repaired.",
  },
  {
    id: "how-quick",
    question: "How quickly does a technician reach me in an emergency?",
    answer:
      "The emergency response target is 60 minutes across UK mainland, with actual arrival dependent on your postcode and technician availability. Standard repair slots run 8am to 8pm, and overnight emergency callouts run 24 hours a day. Phone or WhatsApp 0788 328 8831 for the fastest dispatch.",
  },
  {
    id: "24-hours",
    question: "Is mobile puncture repair available 24 hours a day?",
    answer:
      "Yes. Cover runs 24 hours a day, 365 days a year, including bank holidays. Standard slots run 8am to 8pm, and emergency callouts run overnight. Out-of-hours callouts sometimes carry a separate [£XX] charge, disclosed at booking before any work begins, with nothing added afterwards.",
  },
  {
    id: "permanent",
    question: "Is a mobile puncture repair permanent?",
    answer:
      "Yes. A plug-patch repair to BS AU 159 seals the puncture channel and the inner liner in one vulcanised unit, and lasts the legal life of the tyre. A 12-month workmanship guarantee backs every permanent repair. String plugs and sealants are temporary get-home measures, not permanent repairs.",
  },
  {
    id: "drive-slow",
    question: "Is it safe to drive on a slow puncture?",
    answer:
      "No. A slow puncture lets inner liner and sidewall damage build up mile by mile. The damage converts a repairable tyre into a replacement, and a tyre below 1.6mm or run flat breaches UK Construction and Use Regulations. Book a BS AU 159 assessment as soon as the warning light shows.",
  },
  {
    id: "run-flat",
    question: "Can a run-flat tyre be repaired?",
    answer:
      "No. Run-flat tyres are not repaired, in line with manufacturer structural guidance and the risk of hidden damage from running flat. A matching replacement run-flat is fitted on-site, with a TPMS reset, on the same visit. One callout resolves the fault.",
  },
  {
    id: "sealant",
    question: "I used a sealant kit. Is my tyre still repairable?",
    answer:
      "Sealant-treated tyres are assessed case by case. The technician cleans the sealant residue where possible, but certain products coat the inner liner and block the vulcanised bond a patch needs, which forces a replacement. Declare the sealant at booking so the 2026 technician arrives prepared.",
  },
  {
    id: "vs-garage",
    question: "Is mobile repair more expensive than a garage?",
    answer:
      "A garage quotes a lower headline price, but the comparison ignores the recovery-truck cost, the queue and the risk miles of driving on a damaged tyre. A mobile repair brings the technician to your driveway or roadside, with no towing and no wait. The [£XX] repair price covers the travel and the full BS AU 159 repair.",
  },
  {
    id: "fails-assessment",
    question: "What happens if my tyre fails the assessment?",
    answer:
      "The repair fee is waived against a replacement tyre fitted on the same visit. One callout covers both the assessment and the replacement, with no second fee. A matching tyre is fitted, balanced and set to pressure on-site. See our mobile tyre fitting service for replacement on the same callout.",
    link: true,
  },
];
