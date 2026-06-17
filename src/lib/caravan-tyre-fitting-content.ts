/**
 * Page content + data for the /services/caravan-tyre-fitting service page
 * (Mobile Caravan and Motorhome Tyre Fitting).
 *
 * Cloned from the van-tyre-fitting content model: all visible copy lives here so
 * the section components stay layout-only. British English throughout, no em
 * dashes (brand rule). Icon names map to src/components/icon.tsx (Font Awesome).
 *
 * PHONE/WHATSAPP: the displayed number is 0788 328 8831. Every tel: link
 * resolves to +447883288831 and every WhatsApp link to https://wa.me/447883288831
 * (hardcoded, matching the displayed phone; the legacy sitewide links are a known
 * bug this page does not inherit).
 *
 * Pricing: the £20 flat fitting fee per tyre is fixed. The caravan or motorhome
 * tyre itself is priced by size and type, quoted before booking. Offer price "20".
 *
 * Brand rule: the legal name "Tyre Fitting Near Me Ltd" appears a maximum of four
 * times in body copy. Three are used, all in the section components (Why Choose
 * heading, Why Choose lead line, Final CTA). The name is NOT used here.
 */

export const PHONE_DISPLAY = "0788 328 8831";
export const TEL_HREF = "tel:+447883288831";
export const WA_HREF = "https://wa.me/447883288831";
export const FITTING_FEE = "£20";

// --- Section 1: Hero ---------------------------------------------------------

export const HERO = {
  definition:
    "Mobile caravan and motorhome tyre fitting is the supply and on-site fitment of CP-rated and load-rated leisure tyres to touring caravans, static caravans, motorhomes and campervans, performed wherever the vehicle is kept, the storage compound, the caravan park, a seasonal pitch or home. Leisure owners in 2026 expect the fitter to come to the vehicle.",
  pricingLine:
    "One flat £20 fitting fee per tyre, CP-rated and load-rated stock, and a full age and safety check on every visit keep the caravan road-ready before a trip.",
  ticks: [
    "CP-rated and load-rated leisure tyres",
    "£20 flat fitting fee per tyre",
    "Full DOT age and sidewall safety check",
  ],
};

// --- Section 2: Your caravan is not on your driveway (prose) -----------------

export const DRIVEWAY = {
  heading: "Tyre Fitting Where Your Caravan Actually Is",
  paras: [
    "A car lives on the driveway. A caravan lives in a storage compound behind a locked gate. A motorhome sits on a seasonal pitch for the summer. A tourer waits at a holiday park mid-trip with the family booked in. Towing a caravan to a garage on a tyre that already needs replacing is the exact risk worth avoiding, because the failure happens under load on the road.",
    "Mobile fitting removes that journey. The technician comes to the storage yard, the campsite, the pitch, the dealership or the driveway, and fits the correct tyre where the vehicle stands. Leisure owners in 2026 expect the fitting to come to the vehicle, not the vehicle to crawl to the fitting. The safety reason that makes on-site work the right call comes down to how a caravan tyre fails.",
  ],
};

// --- Section 2b: Where we fit (location card row) ----------------------------

export const WHERE_WE_FIT: { label: string; icon: string }[] = [
  { label: "Storage compound", icon: "warehouse" },
  { label: "Caravan park", icon: "tree" },
  { label: "Campsite", icon: "tent" },
  { label: "Seasonal pitch", icon: "map-pin" },
  { label: "Dealership", icon: "building" },
  { label: "Driveway", icon: "house" },
  { label: "Roadside", icon: "triangle-alert" },
];

export const WHERE_WE_FIT_NOTE =
  "No need to tow the caravan or drive the motorhome anywhere. The fitting van comes to the vehicle wherever it stands, with access codes and pitch numbers confirmed at booking.";

// --- Section 3: Caravan tyres age before they wear (SIGNATURE comparison) -----

export const AGE_INTRO =
  "A car tyre wears out from mileage. A caravan tyre fails from age, because the vehicle stands still for months and the rubber deteriorates while parked under static load. The columns below set the correct age-based approach against the mistake of reading tread alone.";

export const AGE_YES: string[] = [
  "DOT code read for the week and year of manufacture on every tyre",
  "Replaced at 5 to 7 years regardless of tread depth, per industry guidance",
  "Sidewall cracking and structural deterioration caught before the next tow",
  "Stationary deterioration accounted for, not just the tread reading",
  "Pressures set for the laden weight so the caravan leaves road-ready",
];

export const AGE_NO: string[] = [
  "Deep tread hides a date code over 7 years old",
  "Sidewall cracks form while the caravan stands parked between trips",
  "Blowout risk on the next tow under the weight of a loaded caravan",
  "Tread depth alone misses age-related failure entirely",
  "A legal 1.6mm reading still passes a dangerous aged tyre",
];

export const AGE_CLOSE =
  "Every fitting starts with an age and safety check, the DOT code, sidewall condition, tread and pressure set for the laden weight. Tread below 1.6mm is the legal limit, but age fails a caravan tyre first.";

// --- Section 4: CP-rated and load-rated tyres (three tiles) ------------------

export const CP_INTRO =
  "A caravan or motorhome carries sustained heavy load and stands on its tyres for long periods, so the tyre rating matters more than on a car. The correct tyre is matched to the vehicle and its laden weight before the visit.";

export const CP_TILES: { title: string; tag: string; body: string }[] = [
  {
    title: "CP-rated motorhome tyre",
    tag: "Camping-pneumatic",
    body: "Built for a motorhome that sits heavy and stationary, with reinforced construction for sustained load and the correct load index and speed rating.",
  },
  {
    title: "Load-rated caravan tyre",
    tag: "Matched per axle",
    body: "Load index matched to the laden weight per axle, single-axle and twin-axle caravans handled by their layout, never a passenger-car rating.",
  },
  {
    title: "Reinforced tourer tyre",
    tag: "Extra-load",
    body: "Reinforced and extra-load leisure tyres for heavier tourers and horseboxes, with the speed rating set for towing fully laden.",
  },
];

export const CP_CLOSE =
  "Common caravan sizes such as 185R14C are stocked, matched from the vehicle plate or the existing tyre before the technician leaves.";

// --- Section 5: What you get (trust tile grid) -------------------------------

export const BENEFITS: { stat: string; body: string; icon: string }[] = [
  { stat: "£20", body: "Flat fitting fee per tyre: travel, removal, fitment, balancing, valve and disposal.", icon: "badge-pound-sterling" },
  { stat: "CP-rated", body: "CP-rated and load-rated leisure tyres matched to the vehicle and its laden weight.", icon: "shield-check" },
  { stat: "DOT check", body: "Full age and sidewall safety check on every tyre, every visit.", icon: "circle-check-big" },
  { stat: "On-site", body: "Fitting at the storage compound, campsite, pitch, dealership or home.", icon: "warehouse" },
  { stat: "30-60 min", body: "Typical emergency response for a roadside blowout while towing.", icon: "gauge" },
  { stat: "12 months", body: "Workmanship guarantee, wheels torqued to manufacturer figures.", icon: "badge-check" },
];

// --- Section 6: Process steps (also drives HowTo schema) ---------------------

export const PROCESS_STEPS: { title: string; description: string; icon: string }[] = [
  {
    title: "Book with the tyre size or registration",
    description:
      "Book through the form, or call 0788 328 8831 with the tyre size or registration, the postcode and the location type, storage yard, campsite, pitch or home. The size and load requirement are confirmed before the visit.",
    icon: "phone",
  },
  {
    title: "Choose the tyre",
    description:
      "CP-rated for a motorhome, load-rated reinforced for a tourer, matched to the laden weight. The price is quoted in full before booking, with no figure added afterward.",
    icon: "circle-dot",
  },
  {
    title: "The technician arrives at the vehicle",
    description:
      "The fitter comes to the caravan wherever it stands. The 2026 vans carry caravan and motorhome changing and balancing equipment for wheels up to 20 inches, with digital torque tooling.",
    icon: "bus",
  },
  {
    title: "Fitment, age check and pressures set",
    description:
      "The old tyre is removed, the correct replacement fitted and balanced, the valve replaced, pressures set for the laden weight and the wheel torqued to spec. The DOT age and sidewall of the remaining tyres are checked.",
    icon: "wrench",
  },
  {
    title: "Twin-axle fitting and 12-month guarantee",
    description:
      "Twin-axle caravans are fitted axle by axle, and the 12-month workmanship guarantee activates at sign-off. The vehicle leaves road-ready for the trip ahead.",
    icon: "circle-check-big",
  },
];

// --- Section 7: Tyron safety bands (differentiator) --------------------------
//
// TYRON CONFIRMATION: the business brief confirms fitters remove and refit Tyron
// safety bands where the wheel has them. If that capability is ever withdrawn,
// remove the Tyron section render in the page and FAQ id "tyron" below.

export const TYRON = {
  heading: "Tyron Safety Bands Removed and Refitted",
  paras: [
    "Many caravans and motorhomes run Tyron safety bands, a band fitted inside the wheel that keeps the tyre on the rim after a deflation, and not every fitter handles them. Tyron bands need correct removal before the tyre comes off and correct refitting afterward, done with the right tooling so the safety function is preserved.",
    "The technician removes and refits Tyron bands as part of the fitting where the wheel has them, so a Tyron-equipped caravan is fitted on-site like any other.",
  ],
  note: "Tell the team at booking if the caravan runs Tyron bands, so the correct tooling is on the van for the visit.",
};

// --- Section 8: Vehicles covered (tag grid) ----------------------------------

export const VEHICLES: string[] = [
  "Touring caravan",
  "Static caravan",
  "Twin-axle caravan",
  "Motorhome",
  "Campervan",
  "Horsebox",
  "Trailer",
];

// --- Section 9: Pricing ------------------------------------------------------

export const COST_INCLUDED: string[] = [
  "Technician travel to the storage site, campsite, pitch or home",
  "Tyre removal",
  "Fitment of the CP-rated or load-rated leisure tyre",
  "Wheel balancing",
  "New valve",
  "Old tyre disposal",
];

export const COST_CALLOUT = {
  heading: "Priced before booking, nothing added after",
  body:
    "The caravan or motorhome tyre is priced by size and type, quoted in full before booking. CP-rated and reinforced tyres cost more than standard car tyres because of the heavier construction, stated honestly rather than buried. Common sizes such as 185R14C are quoted from the size or plate, with no call-out fee within standard hours.",
  freshness:
    "Towing a caravan to a garage risks the tyre that already needs replacing and adds the cost of the tow, while mobile fitting at the storage site removes both. Pricing is held transparent through 2026.",
};

// --- Section 11: Why leisure owners choose us --------------------------------

export const WHY_TILES: { stat: string; label: string }[] = [
  { stat: "On-site", label: "Storage compound, campsite or pitch, where chains make you drive in" },
  { stat: "CP-rated", label: "Load-rated stock matched to the laden weight" },
  { stat: "DOT check", label: "Full age and sidewall safety check every visit" },
  { stat: "Tyron", label: "Bands removed and refitted where rivals turn it away" },
  { stat: "£20", label: "Transparent fitting fee per tyre, no hidden call-out charge" },
  { stat: "24/7", label: "Emergency cover for a tow blowout, UK mainland" },
];

// --- Section 12: Pre-arrival checklist ---------------------------------------

export const CHECKLIST: { title: string; body: string }[] = [
  {
    title: "Tyre size or registration confirmed at booking",
    body: "The correct tyre, load index and speed rating travel with the fitter.",
  },
  {
    title: "Note whether the caravan runs Tyron bands",
    body: "The right Tyron tooling is loaded onto the van before the visit.",
  },
  {
    title: "Give the exact location and any storage-site or campsite access code",
    body: "A gate code, pitch number or barrier arrangement gets the fitter to the vehicle without delay.",
  },
  {
    title: "Park on flat hard standing with room to work around the axle",
    body: "A stable base on the working side keeps the jack safe under a loaded caravan.",
  },
  {
    title: "Locking wheel nut key in the vehicle if one is fitted",
    body: "The fitter needs the key to remove each wheel safely.",
  },
  {
    title: "A keyholder reachable during the slot",
    body: "An authorised person must be contactable by phone while the work runs.",
  },
];

export const CHECKLIST_NOTE =
  "A confirmed tyre size and a clear working side let the fitter complete a pre-trip storage-site booking in a single visit.";

// --- Section 13: Coverage ----------------------------------------------------

export const AREAS_INTRO =
  "Caravan and motorhome tyre fitting covers UK mainland, with the postcode verified at booking, including storage sites, caravan parks and campsites inside the area. Coverage spans the regions below plus the surrounding towns and counties.";

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
    "A motorhome owner in Kent booked a pre-season tyre check at the storage compound before a summer tour. The technician arrived at 09:40 and found both rear tyres with deep tread but a DOT code over 7 years old and visible sidewall cracking. Two new CP-rated tyres were fitted to the laden weight, pressures were set, and the front pair was checked, done by 10:50. The motorhome left for its tour on safe tyres, with no garage trip and no towing risk.",
  stats: [
    { time: "09:40", label: "Technician on-site at the compound" },
    { time: "10:50", label: "Two CP-rated tyres fitted, fronts checked" },
    { time: "0 tows", label: "No garage trip, no towing risk" },
  ],
  meta: "Kent · Pre-season motorhome check · Two CP-rated tyres replaced on age, storage-site fitting",
};

// --- Section 15: FAQs (also drives FAQPage schema) ---------------------------
//
// `answer` is the canonical plain-text string used both for the visible <details>
// accordion and the FAQPage JSON-LD. Items flagged `link` contain one of the link
// phrases ("emergency tyre fitting", "mobile tyre repair"), which the Faq
// component turns into a contextual link to the sibling page at render time.
// Visible text stays identical to the schema text.

export const FAQS: { id: string; question: string; answer: string; link?: boolean }[] = [
  {
    id: "rule",
    question: "What is the rule for caravan tyres?",
    answer:
      "Replace caravan tyres at 5 to 7 years regardless of tread, because the rubber ages and cracks while the vehicle stands parked. The age is read from the DOT code on the sidewall, which gives the week and year of manufacture. The 1.6mm legal tread minimum still applies, but age fails the tyre first.",
  },
  {
    id: "cost",
    question: "How much does mobile caravan tyre fitting cost?",
    answer:
      "A £20 flat fitting fee applies per tyre, covering travel, removal, fitment, balancing, a new valve and disposal. The caravan or motorhome tyre itself is priced by size and type. Every price is quoted in full before booking, so there is no surprise on the day.",
  },
  {
    id: "storage-site",
    question: "Can you fit tyres at a caravan storage site?",
    answer:
      "Yes. Fitting happens at the storage compound, campsite, pitch, dealership or home, wherever the caravan is kept. Give the access arrangement at booking, the gate code, the pitch number or the keyholder contact, so the technician reaches the vehicle without delay.",
  },
  {
    id: "cp-rated",
    question: "Do motorhomes need CP-rated tyres?",
    answer:
      "Yes. CP-rated tyres are camping-pneumatic, built for the sustained heavy stationary load of a motorhome, with reinforced construction. A motorhome cannot run a passenger-rated tyre below its load requirement safely. The correct CP-rated tyre is the standard fit through 2026 and beyond.",
  },
  {
    id: "how-often",
    question: "How often should caravan tyres be replaced?",
    answer:
      "Every 5 to 7 years by age, regardless of tread depth, because a stationary caravan tyre cracks and deteriorates from age rather than mileage. Deep tread on a tyre over 7 years old is still a blowout risk on the next tow. The DOT code confirms the age.",
  },
  {
    id: "twin-axle",
    question: "Can you fit tyres to a twin-axle caravan?",
    answer:
      "Yes. Twin-axle caravans are fitted axle by axle, and single-axle caravans are covered as well. The correct tyre is matched to the load carried per axle, with the load index and speed rating set for the laden weight.",
  },
  {
    id: "repair",
    question: "Can a caravan tyre be repaired instead of replaced?",
    answer:
      "Where a repairable puncture passes assessment, the tyre is repaired through mobile tyre repair. A torn or aged sidewall is replaced rather than patched, because a sidewall fault cannot be repaired safely on a load-bearing leisure tyre.",
    link: true,
  },
  {
    id: "tyron",
    question: "Do you remove and refit Tyron bands?",
    answer:
      "Yes. Tyron bands are removed and refitted with the correct tooling where the wheel has them, so the safety function is preserved. Tell the team at booking that the caravan runs Tyron bands, so the right tooling is on the van for the visit.",
  },
  {
    id: "size",
    question: "What tyre size does my caravan need?",
    answer:
      "The size is matched from the plate or the existing tyre on the wheel. Common sizes such as 185R14C are stocked, and the load index is set for the laden weight per axle. Send the size or registration at booking and the fit is confirmed before the visit.",
  },
  {
    id: "broken-down",
    question: "Can you reach a broken-down caravan on the road?",
    answer:
      "Yes, 24 hours a day, with a 30 to 60 minute typical response for a tow blowout, dependent on the postcode. A torn or aged sidewall is replaced at the roadside. See our emergency tyre fitting page for the full callout process.",
    link: true,
  },
];
