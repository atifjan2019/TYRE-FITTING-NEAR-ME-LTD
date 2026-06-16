/**
 * Page content + data for the /services/locking-wheel-nut-removal service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * Pricing: competitively benchmarked against UK mobile locking-nut specialists
 * (single nut from £40, full set £55 to £80 across regional and national
 * operators). PRICE is the per-nut figure used by the Offer schema and CTA.
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of
 * four times in body copy. Three are used, all in the section components (Why
 * Choose Us heading, Why Choose Us lead line, Final CTA). The name is NOT used
 * in this data file.
 */

export const PRICE = "£45";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "Locking wheel nut removal is a mobile service where a technician extracts a locking wheel nut that will not undo, because the key is lost, the nut is rounded, seized, or guarded by a spinning collar, using specialist tooling that protects the alloy wheel. Performed mobile at the home, workplace, or roadside, around the clock through 2026.",
  ticks: [
    "No damage to your alloys",
    "£45 per nut removed",
    "24/7 UK mainland cover",
  ],
};

// --- Section 2: Problem states (icon card grid) ------------------------------

export const PROBLEMS_INTRO =
  "A locking wheel nut secures the wheel against theft with a unique pattern that only its matching key removes, and four situations defeat that key.";

export const PROBLEMS: { name: string; body: string; icon: string }[] = [
  {
    name: "Lost or broken locking wheel nut key",
    body: "The single most common reason a wheel stays locked on. Without the key, no standard socket grips the security pattern, and the wheel cannot be removed for a tyre change, a puncture repair, or an MOT.",
    icon: "lock",
  },
  {
    name: "Rounded or stripped locking nut",
    body: "A worn or damaged security pattern. A previous removal attempt or a cheap DIY socket rounds the nut so even the correct key no longer bites.",
    icon: "circle-dot",
  },
  {
    name: "Over-tightened or seized nut",
    body: "Commonly air-gunned at a previous garage past the manufacturer torque figure. The nut welds itself to the stud and shears keys rather than turning.",
    icon: "gauge",
  },
  {
    name: "Spinning anti-theft collar",
    body: "A rotating outer sleeve fitted to McGard-style sets. The collar spins freely against any normal socket, defeating grip by design.",
    icon: "wrench",
  },
];

// --- Section 3: No Damage vs DIY Damage (signature two-column visual) ---------

export const NO_DAMAGE_LEAD =
  "The fear behind every locking nut search is a wrecked alloy, and specialist extraction removes that risk entirely. Specialist reverse-thread and biting extraction sockets grip the nut itself and wind it off the stud, never touching the alloy face or the rim. The alloy, the rim, and the hub are protected throughout, backed by a no-damage guarantee.";

export const NO_DAMAGE_YES: string[] = [
  "Alloy protected",
  "Rim protected",
  "Hub protected",
  "Replacement nut fitted",
];

export const NO_DAMAGE_NO: string[] = [
  "Rounded nut",
  "Scratched alloy",
  "Drilled rim",
  "Hammered socket",
];

export const NO_DAMAGE_PROSE =
  "DIY kits fail for a predictable reason. A hammered-on socket or a cheap reverse-thread kit rounds the nut further or scratches the rim, which is what brings most drivers to a specialist in the first place. Modern alloy designs in 2026 carry intricate spoke faces and delicate lacquered finishes that demand protected extraction, not force.";

// --- Section 4: What happens to the nut after removal ------------------------

export const AFTER_REMOVAL_PROSE =
  "A safe extraction grips and sacrifices the locking nut itself, so the removed nut is usually not reusable, and that single fact is how the extraction works without harming the wheel. A standard manufacturer-pattern replacement nut is fitted in its place. Replacement nuts are carried on every van, or the customer provides manufacturer-approved nuts in advance for an exact match. The wheel is refitted and torqued to the manufacturer figure with a digital torque wrench, never over-tightened, so the next removal stays easy. Where a severely seized nut needs extended work, any additional charge is agreed before the work starts.";

// --- Section 5: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book with the registration, postcode, and the problem",
    description:
      "Call or book with the registration, postcode, and the problem, whether a lost key, a rounded nut, a seized nut, or a spinning collar. A photo of the nut by WhatsApp speeds the assessment.",
    icon: "phone",
  },
  {
    title: "Price confirmed before booking",
    description:
      "£45 per nut or £80 for a set is confirmed before booking, with any seized-nut surcharge stated upfront. Nothing is added later.",
    icon: "badge-pound-sterling",
  },
  {
    title: "The technician arrives fully equipped",
    description:
      "The technician arrives at the home, workplace, or roadside. 2026 vans carry a master set of extraction sockets sized for every common locking pattern, plus standard replacement nuts and digital torque tooling.",
    icon: "bus",
  },
  {
    title: "The nut is extracted with no damage",
    description:
      "The nut is assessed and extracted with the correct specialist socket, protecting the alloy, the rim, and the hub throughout. A replacement nut is fitted and torqued to spec.",
    icon: "wrench",
  },
  {
    title: "Wheel back on, guarantees applied",
    description:
      "The wheel is back on, covered by the no-damage and 12-month workmanship guarantees. Where a tyre change, a puncture repair, or a balance is also needed, the same visit continues straight into it.",
    icon: "circle-check-big",
  },
];

// --- Section 7: Vehicles and locking nut types covered -----------------------

export const VEHICLES_COVERED_PROSE =
  "Cars, vans up to 3.5 tonnes, 4x4s, and SUVs. Factory locking sets on BMW, Audi, Mercedes, VW, Ford, and Vauxhall are covered, plus aftermarket McGard-style and spinning-collar sets. Locking wheel bolts as well as locking nuts are handled, on both alloy and steel wheels. Even premium and snapped Jaguar or Range Rover bolts come off with the right extraction socket.";

// --- Section 8: Cost ---------------------------------------------------------

export const PRICING_SUMMARY = "£45 per locking nut, £80 for a full set of four";

export const COST_PROSE =
  "Two honest factors set the price: the number of nuts, and the condition, because a clean lost-key removal is faster than a severely seized or pre-damaged nut. Replacement standard nuts are included, or customer-supplied where an exact match matters. No call-out fee applies within standard hours, and out-of-hours emergency callouts are disclosed before dispatch. Compared honestly, a main-dealer replacement key takes weeks and costs more, and DIY kits that round the nut force a second removal, so a one-visit specialist extraction is the faster and often cheaper route in 2026.";

// --- Section 9: 24/7 and emergency -------------------------------------------

export const EMERGENCY_PROSE =
  "A locked-out wheel after a roadside flat is an emergency, so removal runs 24/7/365 with a 30 to 60 minute typical response, postcode-dependent, alongside emergency tyre fitting. Standard daytime slots cover planned removals before an MOT or a booked tyre change. Roadside removal follows National Highways protocol where the vehicle sits on a live road.";

// --- Section 10: Why drivers choose us (proof points) ------------------------
// Brand mention 1 in H2, brand mention 2 in the lead line (set in the component).

export const PROOF_POINTS: string[] = [
  "Specialist extraction with a no-damage guarantee on the alloy where DIY kits round the nut",
  "National mobile coverage where rival specialists stop at one region",
  "Transparent flat pricing instead of photo-quote guesswork",
  "Every common factory and aftermarket locking set handled",
  "The tyre work continued on the same visit",
  "24/7 cover every day of the year",
  "12-month workmanship guarantee on the refitted wheel",
];

// --- Section 11: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string }[] = [
  { title: "Send a photo of the locking nut at booking, because it identifies the security pattern and speeds the job" },
  { title: "Have the vehicle registration ready" },
  { title: "Park on flat hard standing with one metre of side clearance" },
  { title: "Source manufacturer-approved replacement nuts in advance if an exact match matters to you" },
  { title: "Keep a keyholder reachable during the booked slot" },
];

// --- Section 12: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Coverage spans UK mainland, postcode-verified at booking. Active regions include London, Kent, Sussex, Essex, Birmingham and the West Midlands, and Scotland. City pages list local response times and slots for each area.";

export const AREAS: { region: string; featured: string; cities: string[]; href: string }[] = [
  { region: "London", featured: "Bromley", cities: ["Croydon", "Romford", "Enfield", "Kingston"], href: "/london" },
  { region: "Kent", featured: "Maidstone", cities: ["Canterbury", "Dartford", "Ashford", "Medway"], href: "/kent" },
  { region: "Sussex", featured: "Brighton", cities: ["Crawley", "Worthing", "Eastbourne", "Hastings"], href: "/sussex" },
  { region: "Essex", featured: "Chelmsford", cities: ["Colchester", "Basildon", "Southend", "Harlow"], href: "/essex" },
  { region: "Birmingham & West Midlands", featured: "Solihull", cities: ["Coventry", "Wolverhampton", "Walsall", "Dudley"], href: "/west-midlands" },
  { region: "Scotland", featured: "Glasgow", cities: ["Edinburgh", "Aberdeen", "Dundee", "Stirling"], href: "/scotland" },
];

// --- Section 13: Case study --------------------------------------------------

export const CASE_STUDY = {
  label: "Illustrative scenario",
  body:
    "A driver in Sussex books an MOT, then finds the locking wheel nut key missing from the glovebox the night before. A morning removal is booked, the technician arrives at 08:50 and identifies a rounded nut on the rear alloy. The nut is extracted with the correct specialist socket, leaving the alloy unmarked, and a replacement nut is fitted and torqued. The job is done by 09:20. The MOT goes ahead the same day, no main-dealer key wait, no scratched wheel. Representative of standard lost-key and rounded-nut removals.",
  stats: [
    { time: "08:50", label: "Technician on-site" },
    { time: "09:20", label: "Removal complete" },
  ],
  meta: "Sussex · Rounded rear nut · Specialist socket extraction · Alloy unmarked",
};

// --- Section 16: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. Items may carry `links`, where each phrase's
// first occurrence is turned into a contextual <Link> at render time. Visible text
// stays byte-identical to the schema text.

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links?: { phrase: string; href: string }[];
};

export const FAQS: FaqItem[] = [
  {
    id: "no-key",
    question: "Can you remove a locking wheel nut without the key?",
    answer:
      "Yes. Specialist reverse-thread and biting extraction sockets remove the nut without the key and without damaging the alloy. The removed nut is sacrificed in the process, and a standard replacement nut is fitted in its place.",
  },
  {
    id: "cost",
    question: "How much does locking wheel nut removal cost?",
    answer:
      "Pricing starts at £45 per nut and £80 for a full set of four. Condition affects the price, because a seized or pre-damaged nut needs extended work. Every figure is quoted before any work begins, with no charge added afterwards.",
  },
  {
    id: "damage",
    question: "Will removing it damage my alloy wheels?",
    answer:
      "No. A no-damage guarantee covers the alloy, the rim, and the hub. Specialist extraction grips the nut alone, with no drilling, no welding, no cutting, and no chiselling, so the wheel face stays unmarked throughout.",
  },
  {
    id: "rounded-seized",
    question: "What happens if my locking nut is rounded or seized?",
    answer:
      "Extraction sockets grip a rounded or seized nut at the point where the original key fails to bite. A severely seized nut occasionally needs extended work, and any additional charge is agreed upfront before the job starts.",
  },
  {
    id: "new-nut",
    question: "Do I get a new nut after removal?",
    answer:
      "Yes. The old locking nut is sacrificed during safe extraction, which is how the wheel stays undamaged. A standard manufacturer-pattern replacement nut is fitted, either supplied from the van or provided by the customer in advance.",
  },
  {
    id: "spinning-collar",
    question: "Can you remove a spinning collar locking nut?",
    answer:
      "Yes. Anti-theft spinning collars on McGard-style sets defeat normal sockets by design. The correct specialist extraction tool grips through the spinning collar and winds the nut off the stud cleanly.",
  },
  {
    id: "near-me",
    question: "Is mobile locking wheel nut removal available near me?",
    answer:
      "Coverage spans UK mainland, with a postcode check at booking. The technician attends the home, the workplace, or the roadside, so no garage visit is needed for the removal.",
  },
  {
    id: "change-tyre",
    question: "Can you change my tyre once the nut is off?",
    answer:
      "Yes. The same visit continues straight into tyre fitting, a puncture repair, or a balance. One callout covers the removal and the tyre work together, with no second appointment.",
    links: [
      { phrase: "tyre fitting", href: "/services/mobile-tyre-fitting" },
      { phrase: "puncture repair", href: "/services/mobile-tyre-repair" },
    ],
  },
  {
    id: "diy",
    question: "Should I drill or hammer it off myself?",
    answer:
      "No. DIY drilling, welding, or hammering a socket onto the wheel damages the alloy and rounds the nut further. Specialist extraction stays safe and fast, and in 2026 it remains the route that protects intricate modern alloy finishes.",
  },
  {
    id: "bolts",
    question: "Do you remove locking wheel bolts as well as nuts?",
    answer:
      "Yes. Locking wheel bolts on Audi, VW, and similar makes come off with the correct extraction socket, including snapped premium bolts. Both alloy and steel wheels are covered by the same no-damage method.",
  },
];
