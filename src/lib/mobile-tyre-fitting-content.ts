/**
 * Page content + data for the /mobile-tyre-fitting service page.
 *
 * All visible copy lives here so the page components stay layout-only and the
 * writer's copy can be edited in one place. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 */

// --- Hero --------------------------------------------------------------------

export const HERO = {
  definition:
    "Mobile tyre fitting is a callout service where a qualified fitter arrives in a fully equipped mobile fitting van, removes the damaged tyre, and fits a replacement at your home, workplace, or roadside. Drivers across the UK in 2026 book this service to skip the garage queue entirely.",
  ticks: [
    "24/7 UK coverage",
    "60-minute emergency response",
    "£20 flat fitting fee, no call-out charge",
  ],
};

// --- Section 4: Why mobile replaces the garage visit -------------------------

export const WHY_GARAGE = [
  "A garage visit costs half a working day, a tank of fuel, and real risk on a damaged tyre. Driving on a flat, on low tyre pressure, or on tread worn below the 1.6mm legal tread depth exposes you to UK Construction and Use Regulations enforcement and motorway-speed danger. Every mile driven to reach a garage on a compromised tyre erodes road safety and vehicle mobility.",
  "Mobile fitting reverses the equation. Our fitters bring the workshop to your driveway, your office, or the hard shoulder, removing vehicle downtime from the process. The 2026 shift toward time-saving services rewards working UK drivers who refuse to lose a day to a tyre. Booking on-site keeps you legal, keeps you safe, and keeps your schedule intact.",
];

// --- Section 5: Problems solved on-site --------------------------------------

export const PROBLEMS: { label: string; body: string; icon: string }[] = [
  { label: "Flat tyre after a puncture", body: "A replacement tyre is fitted and balanced on-site within the appointment window.", icon: "circle-dot" },
  { label: "Slow puncture from a nail or screw", body: "We assess the damage and repair to standard, or replace where the tyre fails the criteria.", icon: "wrench" },
  { label: "Blowout at speed", body: "Emergency callout dispatches a fitter to your roadside or hard shoulder location.", icon: "siren" },
  { label: "Sidewall damage from a kerb impact", body: "A compromised sidewall is non-repairable, so we fit a new tyre the same visit.", icon: "circle-dot" },
  { label: "Tread worn below the 1.6mm UK legal limit", body: "We measure tread depth and replace before the tyre breaches the law.", icon: "gauge" },
  { label: "Tyres ageing past safe service life", body: "We replace perished or cracked tyres ahead of an MOT so the vehicle passes inspection.", icon: "clock" },
  { label: "Run-flat tyre replacement", body: "A matching run-flat tyre is fitted with a full TPMS reset.", icon: "circle-dot" },
  { label: "TPMS warning light", body: "We diagnose the fault and service or replace the TPMS sensor.", icon: "activity" },
  { label: "Seasonal tyre changeover", body: "Summer and winter sets are swapped at your home or workplace.", icon: "circle-check-big" },
  { label: "Multiple tyre replacement", body: "Two or four tyres are changed on the same vehicle in a single visit.", icon: "truck" },
];

// --- Section 6: What you get -------------------------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "24/7", body: "Availability across the UK, day or night, weekday or bank holiday.", icon: "clock" },
  { stat: "60 min", body: "Emergency response target inside the postcode coverage area.", icon: "gauge" },
  { stat: "£20", body: "Flat fitting fee per tyre, with no call-out charge added on top.", icon: "badge-pound-sterling" },
  { stat: "Included", body: "Wheel balancing on every tyre as standard, never billed as an extra.", icon: "circle-dot" },
  { stat: "12 months", body: "Workmanship guarantee backing every fitment we complete.", icon: "badge-check" },
  { stat: "On-site", body: "Home, workplace, hotel forecourt, supermarket bay, or motorway hard shoulder.", icon: "map-pin" },
];

// --- Section 7: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Enter your vehicle registration and postcode",
    description: "Type your VRN and postcode into the booking form. The postcode verifies coverage in your area, and the registration pulls your vehicle data and correct tyre sizes.",
    icon: "phone",
  },
  {
    title: "Select your tyres or request a quote",
    description: "Choose from three transparent tiers: premium, mid-range, and budget. Request advice from a fitter when you want a recommendation matched to your mileage and budget.",
    icon: "circle-dot",
  },
  {
    title: "Choose your appointment slot or request an emergency callout",
    description: "Book a morning, afternoon, or evening window at your convenience. For urgent faults, request the 60-minute emergency callout by phone or WhatsApp.",
    icon: "clock",
  },
  {
    title: "A mobile fitter arrives in a fully equipped van",
    description: "All 2026 fitting vans carry tyre changing and balancing technology compatible with wheels up to 20 inches, digital torque wrenches, and TPMS reset tools. The fitter performs a vehicle survey before any fitment begins.",
    icon: "bus",
  },
  {
    title: "Fitment, balancing, and workmanship confirmation",
    description: "Every fitment includes on-site wheel balancing, valve replacement, and old tyre disposal. The 12-month workmanship guarantee activates the moment the work is signed off.",
    icon: "circle-check-big",
  },
];

// --- Section 8: Availability --------------------------------------------------

export const AVAILABILITY = {
  hours: [
    { label: "Standard appointments", value: "8am to 8pm, seven days a week, bank holidays included" },
    { label: "Evening fitting", value: "Available on booking for drivers who finish work late" },
    { label: "Overnight emergency callouts", value: "24 hours a day, 365 days a year" },
    { label: "Weekend and bank holiday cover", value: "Included at no premium to the standard structure" },
  ],
  pricingHeading: "Transparent pricing, no surprises",
  pricingBody:
    "The £20 flat fitting fee applies to all standard appointments regardless of the hour booked. Out-of-hours emergency callouts sometimes carry a separate callout charge, always disclosed at booking before any work begins, with no hidden fees added after fitment.",
};

// --- Section 9: Specialist services ------------------------------------------

export const SPECIALIST_SERVICES: { name: string; body: string; icon: string; tag?: string }[] = [
  {
    name: "Puncture repair to BS AU 159 standard",
    body: "A puncture inside the central 75% tread area qualifies for a permanent repair. Damage to the sidewall, shoulder, or bead does not qualify, and we fit a replacement instead.",
    icon: "wrench",
  },
  {
    name: "Wheel balancing on every fitment",
    body: "Calibrated balancing equipment lives in every van, correcting weight distribution so the new tyre runs smooth at motorway speed. Balancing is part of the £20 flat fee.",
    icon: "circle-dot",
  },
  {
    name: "TPMS reset and sensor replacement",
    body: "Every van carries TPMS reset tools and replacement sensor stock for common UK vehicles. A failed sensor is swapped on-site and the system relearned before the fitter leaves, clearing the dashboard warning for good.",
    icon: "activity",
    tag: "Most-asked",
  },
  {
    name: "Run-flat tyre fitment",
    body: "Run-flat tyres are fitted on-site, with a TPMS reset performed wherever the vehicle requires one.",
    icon: "shield-check",
  },
  {
    name: "Valve, locking nut, rotation and disposal",
    body: "Valve replacement, locking wheel nut removal with the customer's key, tyre rotation, and tyre disposal all come included as standard parts of the service.",
    icon: "lock",
  },
];

// --- Section 10: Tyre brands -------------------------------------------------

export const BRAND_TIERS: { tier: string; blurb: string; brands: string[]; note?: string }[] = [
  {
    tier: "Premium",
    blurb: "Performance and longevity for drivers covering high miles.",
    brands: ["Michelin", "Continental", "Pirelli", "Bridgestone", "Goodyear"],
  },
  {
    tier: "Mid-range",
    blurb: "Everyday balanced value and durability.",
    brands: ["Hankook", "Yokohama", "Falken", "Avon", "Dunlop"],
  },
  {
    tier: "Budget",
    blurb: "Cost-led replacement without sacrificing legal compliance.",
    brands: ["Kumho", "Firestone"],
    note: "and quality value brands",
  },
];

export const BRAND_STANDARDS =
  "Every tyre is sourced from authorised UK distributors with the manufacturer warranty preserved in full. Fitters torque each wheel to manufacturer-specified figures using digital torque wrenches, and bead-seating is completed with calibrated equipment for a true, airtight fit.";

// --- Section 11: Vehicles and drivers ----------------------------------------

export const VEHICLES: { label: string; icon: string }[] = [
  { label: "Cars, all makes and models", icon: "circle-check-big" },
  { label: "Vans and light commercial up to 3.5 tonnes", icon: "bus" },
  { label: "4x4s and SUVs", icon: "truck" },
  { label: "Caravans", icon: "house" },
  { label: "Motorhomes", icon: "bus" },
  { label: "Fleet vehicles", icon: "truck" },
];

export const DRIVERS: { label: string; icon: string }[] = [
  { label: "Private motorists", icon: "circle-check-big" },
  { label: "Fleet managers", icon: "circle-check-big" },
  { label: "Lease vehicle holders", icon: "circle-check-big" },
  { label: "Company car drivers", icon: "circle-check-big" },
  { label: "Workplace fitting", icon: "circle-check-big" },
  { label: "Motorway breakdowns", icon: "circle-check-big" },
];

export const FLEET_NOTE =
  "Fleet account terms with monthly invoicing are available for businesses operating multiple vehicles. Contact our team to set up an account.";

// --- Section 13: Costs --------------------------------------------------------

export const COST_INCLUDED = [
  "Technician travel to your location",
  "Old tyre removal",
  "New tyre fitment",
  "On-site wheel balancing",
  "Valve replacement",
  "Old tyre disposal",
];

export const COST_SEPARATE = [
  "The tyre itself, priced when you select your brand and size",
  "Optional TPMS sensor parts, where a sensor needs replacing",
  "Optional wheel alignment",
];

export const COST_CALLOUT = {
  heading: "Emergency callout pricing",
  body:
    "Standard-hours appointments carry no call-out fee whatsoever. Out-of-hours emergency response sometimes carries a separate callout charge, always disclosed at booking confirmation before any work begins, with no figure added after the fact.",
  freshness: "Pricing held flat through 2026 for all standard mobile tyre fitting appointments.",
};

// --- Section 14: Why drivers choose us ---------------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "60 min", label: "Emergency response target" },
  { stat: "24/7", label: "Cover, 365 days a year" },
  { stat: "£20", label: "Flat fitting fee, no call-out" },
  { stat: "12 months", label: "Workmanship guarantee" },
  { stat: "UK-wide", label: "Postcode-based coverage" },
  { stat: "Nationwide", label: "Fitter network across UK mainland" },
];

// --- Section 15: Pre-appointment checklist -----------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  { title: "Vehicle registration confirmed at booking", body: "The VRN locks in the correct tyre size and fitment data." },
  { title: "Locking wheel nut key inside the vehicle", body: "Without the key, the wheel cannot be removed safely." },
  { title: "Vehicle parked on a flat, hard surface", body: "A driveway, car park, or hard kerbside gives the jack a stable base, so avoid soft grass or a steep slope." },
  { title: "One metre minimum side clearance", body: "The fitter needs working room on the side being changed." },
  { title: "Owner or authorised person reachable by phone", body: "Someone must be contactable during the booked window." },
];

export const CHECKLIST_MOTORWAY =
  "Motorway hard shoulder fitting follows National Highways safety protocol. The fitter instructs you on safe positioning and signage before any tyre work begins, prioritising your safety and the flow of live traffic.";

// --- Section 16: Areas covered -----------------------------------------------

export const AREAS_INTRO =
  "Mobile tyre fitting is available across UK mainland with postcode-verified availability confirmed at the booking stage. The postcode checker confirms slot availability for your exact area in real time, so you know before you book whether a van reaches you and when.";

export const AREAS: {
  region: string;
  featured: string;
  cities: string[];
  href: string;
}[] = [
  { region: "London", featured: "Bromley", cities: ["Croydon", "Romford", "Enfield", "Kingston"], href: "/london" },
  { region: "Kent", featured: "Maidstone", cities: ["Canterbury", "Dartford", "Ashford", "Medway"], href: "/kent" },
  { region: "Sussex", featured: "Brighton", cities: ["Crawley", "Worthing", "Eastbourne", "Hastings"], href: "/sussex" },
  { region: "Essex", featured: "Chelmsford", cities: ["Colchester", "Basildon", "Southend", "Harlow"], href: "/essex" },
  { region: "Birmingham & West Midlands", featured: "Solihull", cities: ["Coventry", "Wolverhampton", "Walsall", "Dudley"], href: "/west-midlands" },
  { region: "Scotland", featured: "Glasgow", cities: ["Edinburgh", "Aberdeen", "Dundee", "Stirling"], href: "/scotland" },
];

// --- Section 17: Case study ---------------------------------------------------

export const CASE_STUDY = {
  label: "Illustrative scenario",
  body:
    "A working professional in a Manchester office car park returned to a Volkswagen Golf at 14:00 to find two punctured tyres after a kerb strike on the morning commute. A call placed at 14:05 dispatched a mobile fitter, on-site by 15:00. Two Michelin Primacy 4 tyres were fitted, balanced, and the old tyres disposed of by 16:10. The driver returned to the road the same afternoon, with no half-day garage trip, no recovery truck, and no rearranged meetings.",
  stats: [
    { time: "14:05", label: "Call received" },
    { time: "15:00", label: "Fitter on-site" },
    { time: "16:10", label: "Driver back on the road" },
  ],
  meta: "Manchester · Volkswagen Golf · Michelin Primacy 4",
};

// --- Section 19: FAQs (also drives FAQPage schema) ---------------------------

export const FAQS: { id: string; question: string; answer: string }[] = [
  {
    id: "what-is",
    question: "What is mobile tyre fitting?",
    answer: "Mobile tyre fitting is a callout service where a qualified fitter travels to your home, workplace, or roadside, removes the worn or damaged tyre, and fits a replacement on the spot. The 2026 UK standard includes wheel balancing, valve replacement, and old tyre disposal in a single visit.",
  },
  {
    id: "how-quick",
    question: "How quickly can a mobile tyre fitter arrive in an emergency?",
    answer: "Our emergency callout runs to a 60-minute response target across the UK mainland coverage area, postcode-dependent. The exact arrival time reflects your distance from the nearest fitter and live traffic conditions. Confirm your postcode by phone or WhatsApp on 0788 328 8831 for an accurate window.",
  },
  {
    id: "cost",
    question: "How much does mobile tyre fitting cost?",
    answer: "Mobile tyre fitting costs a flat £20 per tyre. The fee covers technician travel, old tyre removal, new tyre fitment, wheel balancing, valve replacement, and disposal. The tyre itself is quoted separately at booking. Out-of-hours emergency callouts sometimes carry a separate charge, always disclosed before any work begins.",
  },
  {
    id: "24-hours",
    question: "Is mobile tyre fitting available 24 hours a day?",
    answer: "Yes. Cover runs 24/7 across 365 days a year, bank holidays included. Standard booked appointments run from 8am to 8pm, seven days a week, and overnight emergency callouts run through the night. Booked slots use a time window, while emergency callouts work to a 60-minute response target.",
  },
  {
    id: "puncture-repair",
    question: "Can a mobile fitter repair a puncture instead of replacing the tyre?",
    answer: "Yes, where the damage meets BS AU 159 repairable criteria. A puncture inside the central 75% tread area qualifies for a permanent repair. Sidewall damage, shoulder damage, and bead damage are non-repairable, so a replacement tyre is fitted instead, balanced, and signed off the same visit.",
  },
  {
    id: "balance",
    question: "Do mobile tyre fitters balance the wheels?",
    answer: "Yes. Every fitment includes on-site wheel balancing using calibrated balancing equipment carried in the mobile fitting van. Balancing corrects weight distribution around the wheel, removing vibration and uneven tread wear at motorway speed. The service forms part of the £20 flat fee, never an added extra.",
  },
  {
    id: "run-flat",
    question: "Can mobile fitters replace run-flat tyres?",
    answer: "Yes. Run-flat tyres are fitted on-site, with a TPMS reset performed wherever the vehicle requires one. The fitter matches the correct run-flat specification to your vehicle, torques each wheel to the manufacturer figure, and confirms the system reads correctly before leaving.",
  },
  {
    id: "tpms",
    question: "Do mobile fitters handle TPMS sensors?",
    answer: "Yes. TPMS reset is standard on every fitment in 2026, and sensor replacement is offered wherever a sensor has failed. Every van carries reset tools and replacement sensor stock for common UK vehicles, clearing the dashboard warning before the fitter leaves the site.",
  },
  {
    id: "surface",
    question: "What surface does the mobile fitting van need to work on?",
    answer: "A flat, hard surface with one metre of side clearance on the wheel being changed. Driveways, car parks, hard kerbsides, and the motorway hard shoulder under National Highways protocol all qualify. Soft grass, steep slopes, and tight spaces without working room do not.",
  },
  {
    id: "present",
    question: "Do I have to be present for the mobile tyre fitting appointment?",
    answer: "The vehicle owner or an authorised person reachable by phone is required during the booked window. The fitter needs access to the vehicle and the locking wheel nut key to complete the work. Full attendance throughout is not required once access and the key are arranged.",
  },
];
