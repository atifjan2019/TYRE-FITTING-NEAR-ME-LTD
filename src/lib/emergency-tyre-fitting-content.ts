/**
 * Page content + data for the /services/emergency-tyre-fitting service page.
 *
 * Cloned from the mobile-tyre-repair content model: all visible copy lives here
 * so the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * PHONE-FIRST page. The displayed number is 0788 328 8831. Every tel: link
 * resolves to +447883288831 and every WhatsApp link to https://wa.me/447883288831
 * (hardcoded, matching the displayed phone; the legacy sitewide 447722127759
 * links are a known bug this page does not inherit).
 *
 * Pricing: VARIANT A is in force on this page. No call-out fee at any hour, day
 * or night, 365 days a year. The £20 flat fitting fee per tyre and the tyre
 * price are the only charges, quoted in full before the van is dispatched.
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
    "Emergency tyre fitting is the immediate dispatch of a mobile technician to a stranded vehicle at the roadside, home or work, fitting or repairing the tyre on-site, 24 hours a day. A van reaches most UK mainland drivers within 30 to 60 minutes through 2026.",
  responseLine: "30 to 60 minute typical response, UK mainland.",
  pricingLine:
    "No call-out fee, ever. The £20 flat fitting fee per tyre and the tyre price are the only charges, quoted in full before the van is dispatched.",
  ticks: [
    "24/7, 365 days a year",
    "30 to 60 minute typical response",
    "No call-out fee, ever",
  ],
};

// --- Section 2: Stranded? Do these five things first (E-E-A-T flagship) -------

export const SAFETY_INTRO =
  "Calm steps first. Safe positioning protects you before any van arrives.";

export const SAFETY_STEPS: { title: string; body: string; icon: string }[] = [
  {
    title: "Get out of live traffic",
    body: "Move the vehicle off the carriageway where possible: a hard shoulder, a smart motorway emergency area, a lay-by or the left verge.",
    icon: "map-pin",
  },
  {
    title: "Hazard lights on",
    body: "Switch the hazard lights on at once. Add the sidelights too at night.",
    icon: "siren",
  },
  {
    title: "Exit left, wait behind the barrier",
    body: "On a motorway, leave through the left-hand doors and wait behind the barrier, uphill of the vehicle. Never stand between the vehicle and traffic. National Highways guidance is clear on this point.",
    icon: "shield-check",
  },
  {
    title: "Do not change the wheel in a live lane",
    body: "A wheel change in a running lane or on a narrow hard shoulder is unsafe, and you cannot work safely with traffic passing at speed.",
    icon: "lock",
  },
  {
    title: "Call 0788 328 8831 with your location",
    body: "Give the road, junction or postcode. The technician is dispatched with your tyre size already pulled from the VRN, and handles the rest under National Highways protocol.",
    icon: "phone",
  },
];

// --- Section 3: Tyre emergencies we handle (icon card grid) ------------------

export const EMERGENCIES: { name: string; body: string; icon: string }[] = [
  {
    name: "Blowout at speed",
    body: "A tyre destroyed at motorway speed is replaced on-site, balanced and torqued to specification.",
    icon: "siren",
  },
  {
    name: "Flat with no spare wheel",
    body: "Most new cars carry no spare. A matching replacement is carried or sourced on the same callout.",
    icon: "circle-dot",
  },
  {
    name: "Run-flat driven flat",
    body: "A run-flat driven beyond its limit is replaced under manufacturer structural guidance, with a TPMS reset.",
    icon: "gauge",
  },
  {
    name: "Sidewall torn by a kerb",
    body: "A sidewall torn by a pothole or kerb cannot be repaired, so a replacement is fitted there and then.",
    icon: "shield-check",
  },
  {
    name: "Slow puncture gone flat",
    body: "A slow puncture that drained fully overnight is assessed and repaired or replaced on the spot.",
    icon: "wrench",
  },
  {
    name: "Locking wheel nut seized",
    body: "A seized nut or a lost key is cleared by controlled non-destructive removal carried on every van.",
    icon: "wrench",
  },
  {
    name: "Two or more tyres damaged",
    body: "Multiple tyres damaged in one incident are handled on a single callout, sized from the VRN.",
    icon: "truck",
  },
  {
    name: "Night and bank holiday failures",
    body: "Failures at night, on weekends and on bank holidays reach the same answered line and the same dispatch.",
    icon: "clock",
  },
];

// --- Section 4: What you get (trust tile grid) -------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "24/7", body: "Answered line, 365 days a year, bank holidays included.", icon: "clock" },
  { stat: "30-60 min", body: "Typical response across UK mainland, postcode-dependent.", icon: "gauge" },
  { stat: "£20", body: "Flat fitting fee per tyre. No call-out fee, ever.", icon: "badge-pound-sterling" },
  { stat: "VRN", body: "Correct tyre size confirmed from your registration before dispatch.", icon: "circle-check-big" },
  { stat: "Premium to budget", body: "Stock carried or sourced same-callout to suit your budget.", icon: "circle-dot" },
  { stat: "12 months", body: "Workmanship guarantee on every fitment and repair.", icon: "badge-check" },
];

export const BENEFITS_NOTE_PREFIX =
  "Where the tyre passes a BS AU 159 assessment, a roadside repair costs less than replacement through our ";
export const BENEFITS_NOTE_SUFFIX =
  " service, with balancing, a new valve, a TPMS reset and National Highways-compliant working included on every callout.";

// --- Section 5: How the emergency callout works (drives HowTo schema) --------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Call or WhatsApp 0788 328 8831",
    description:
      "Give your location and registration. The VRN confirms the tyre size, so there is no crawling around the wheel arch in the dark.",
    icon: "phone",
  },
  {
    title: "Price quoted in full on the call",
    description:
      "Tyre and the £20 flat fitting fee, with no call-out fee. The figure quoted on the phone is the figure charged, and nothing is added later.",
    icon: "badge-pound-sterling",
  },
  {
    title: "The nearest fitter is dispatched",
    description:
      "Typical arrival is inside 30 to 60 minutes, postcode-dependent. Live updates follow by phone or WhatsApp until the van reaches you.",
    icon: "truck",
  },
  {
    title: "Scene secured, tyre assessed and fitted",
    description:
      "On arrival, the technician secures the scene and assesses the tyre against BS AU 159, repairing where safe or fitting the replacement. The 2026 vans carry balancing equipment for wheels up to 20 inches, digital torque wrenches, TPMS tools and lighting for night work.",
    icon: "wrench",
  },
  {
    title: "Torqued, reset and on your way",
    description:
      "The wheel is torqued to specification, pressures are set, the TPMS is reset and the old tyre is taken for disposal. You drive on, covered by the 12-month workmanship guarantee.",
    icon: "circle-check-big",
  },
];

// --- Section 6: Response times -----------------------------------------------

export const RESPONSE = {
  heading: "Emergency Response Times Across the UK",
  paras: [
    "A 30 to 60 minute response is typical in and around the covered regions: London, Kent, Sussex, Essex, Birmingham and the West Midlands, and Scotland's Central Belt. Remote postcodes take longer.",
    "The dispatcher states the realistic ETA on the call before you commit. An honest ETA beats a fictional one when you are stood on a verge.",
  ],
};

// --- Section 7: Repair or replace at the roadside ----------------------------

export const REPAIR = {
  heading: "Roadside Repair or Replacement: The Technician Decides With You",
  intro:
    "Where the puncture sits in the central 75% of the tread, measures 6mm or under, and the tyre passes the BS AU 159 checks, a permanent plug-patch repair at the roadside costs less than a new tyre.",
  // The phrase "mobile tyre repair" below is turned into a link to the sibling
  // page by the Faq/section renderers.
  linkLine:
    "A roadside mobile tyre repair restores the tyre to road-legal condition on the same callout.",
  outro:
    "Where the sidewall is torn, the tyre ran flat, or the damage fails assessment, a replacement is fitted on the same callout. A blowout at speed is never repairable, and the technician says so rather than selling a false hope.",
};

// --- Section 8: Emergency pricing --------------------------------------------

export const PRICING = {
  heading: "Emergency Tyre Fitting Cost, Quoted Before Dispatch",
  lead:
    "No call-out fee at any hour, day or night, 365 days a year. The £20 flat fitting fee per tyre and the tyre price are the only charges. Night, weekend and bank-holiday callouts cost the same as daytime.",
  included: [
    "Technician travel to your location",
    "Tyre removal",
    "Fitment of the replacement tyre",
    "Wheel balancing",
    "New valve",
    "Old tyre disposal",
  ],
  closing:
    "The tyre is priced by size and brand tier on the call. The figure quoted on the phone is the figure charged, with nothing added at the roadside. Call 0788 328 8831 for the exact price now. Emergency pricing is held transparent through 2026.",
};

// --- Section 9: Vehicles covered ---------------------------------------------

export const VEHICLES: { label: string; icon: string }[] = [
  { label: "Cars, all makes and models", icon: "circle-check-big" },
  { label: "Vans up to 3.5 tonnes", icon: "bus" },
  { label: "4x4s and SUVs", icon: "truck" },
  { label: "Caravans and motorhomes", icon: "truck" },
  { label: "Fleet and lease vehicles", icon: "truck" },
];

export const VEHICLES_NOTE =
  "Fleet and lease vehicles get account terms. Wheels up to 20 inches. Motorcycles are outside the service.";

// --- Section 10: Nights, weekends and bank holidays --------------------------

export const NIGHTS = {
  heading: "Night, Weekend and Bank Holiday Tyre Fitting",
  body:
    "A 2am blowout and a Boxing Day flat get the same answered line and the same dispatch process. No answering service. No callback queue. A dispatcher takes the location and sends the van.",
  pricing:
    "No call-out fee applies at any hour. Night, weekend and bank-holiday callouts cost the same as daytime, with the £20 flat fitting fee per tyre and the tyre price quoted in full before dispatch.",
};

// --- Section 11: Why drivers choose us ---------------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "UK-wide", label: "Coverage where competitors stop at county lines" },
  { stat: "30-60 min", label: "Typical emergency response" },
  { stat: "£0", label: "Call-out fee, ever" },
  { stat: "BS AU 159", label: "Repair offered before a forced replacement" },
  { stat: "24/7", label: "Answered line, 365 days a year" },
  { stat: "12 months", label: "Workmanship guarantee" },
];

// --- Section 12: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Emergency tyre fitting covers UK mainland, postcode-verified at dispatch. Coverage spans the regions below plus the surrounding towns and counties.";

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
    "A driver hit debris on the M25 at 22:40, a blowout, with no spare. The driver pulled into a smart motorway emergency area, switched the hazards on, and waited behind the barrier per the safety steps. A call at 22:46 confirmed the tyre size from the VRN and quoted the full price. The fitter reached the scene at 23:25 under National Highways protocol, fitted the replacement, balanced it, torqued it and reset the TPMS, and the driver was rolling again by 23:55.",
  stats: [
    { time: "22:46", label: "Call placed" },
    { time: "23:25", label: "Fitter on scene" },
    { time: "23:55", label: "Driving again" },
  ],
  meta: "M25 smart motorway · Blowout, no spare · Replacement fitted under National Highways protocol",
};

// --- Section 15: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. The item flagged `link` contains the phrase
// "mobile tyre repair", which the Faq component turns into a link to the sibling
// service page at render time. Visible text stays identical to the schema text.

export const FAQS: { id: string; question: string; answer: string; link?: boolean }[] = [
  {
    id: "how-quick",
    question: "How quickly does an emergency tyre fitter arrive?",
    answer:
      "A 30 to 60 minute arrival is typical across UK mainland, with the exact time dependent on your postcode and the nearest available fitter. The dispatcher states an honest ETA on the call before you commit. Phone or WhatsApp 0788 328 8831 for the fastest dispatch.",
  },
  {
    id: "cost",
    question: "How much does emergency tyre fitting cost?",
    answer:
      "No call-out fee applies at any hour. The £20 flat fitting fee per tyre and the tyre price are the only charges, quoted in full before the van is dispatched. The fitting fee covers travel, removal, fitment, balancing, a new valve and disposal.",
  },
  {
    id: "24-hours",
    question: "Is emergency tyre fitting available 24 hours?",
    answer:
      "Yes. The line is answered 24 hours a day, 365 days a year, bank holidays included. No answering service and no callback queue. A dispatcher takes your location and sends the nearest fitter straight away.",
  },
  {
    id: "no-spare",
    question: "I have no spare wheel. What happens?",
    answer:
      "Most modern cars carry no spare. A matching replacement tyre is carried or sourced on the same callout, with the correct size confirmed from your registration before dispatch. One visit gets you rolling again.",
  },
  {
    id: "motorway",
    question: "What do I do after a blowout on the motorway?",
    answer:
      "Move to a hard shoulder or a smart motorway emergency area, switch the hazards on, and leave through the left-hand doors. Wait behind the barrier, uphill of the vehicle, never between it and traffic. National Highways guidance is clear. Then call 0788 328 8831.",
  },
  {
    id: "repair-instead",
    question: "Can a tyre be repaired at the roadside instead of replaced?",
    answer:
      "Yes, where the puncture passes the BS AU 159 checks, a roadside mobile tyre repair costs less than a replacement. A blowout at speed and sidewall damage cannot be repaired, so a replacement is fitted on the same callout instead.",
    link: true,
  },
  {
    id: "area",
    question: "Do you cover my area?",
    answer:
      "Coverage spans UK mainland, postcode-verified at dispatch. Active regions include London, Kent, Sussex, Essex, Birmingham and the West Midlands, and Scotland, plus the surrounding areas. A nationwide fitter network reaches beyond the headline regions.",
  },
  {
    id: "vehicles",
    question: "What vehicles do you attend?",
    answer:
      "Cars of all makes, vans up to 3.5 tonnes, 4x4s and SUVs, caravans and motorhomes, and fleet and lease vehicles with account terms. Wheels up to 20 inches. Motorcycles are outside the service.",
  },
  {
    id: "night-cost",
    question: "Do night or bank holiday callouts cost more?",
    answer:
      "No. Night, weekend and bank-holiday callouts cost the same as daytime. No call-out fee applies at any hour, and the £20 flat fitting fee per tyre is unchanged overnight. The 2026 pricing is the same figure at 2am as at 2pm.",
  },
  {
    id: "locking-nut",
    question: "What if my locking wheel nut key is missing?",
    answer:
      "Controlled non-destructive removal is carried on every van, so a seized nut or a lost key does not stop the job. The wheel is removed safely and a replacement nut is fitted, then the tyre work continues as normal.",
  },
];
