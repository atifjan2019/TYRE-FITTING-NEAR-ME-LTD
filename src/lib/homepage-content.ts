/**
 * Homepage content for the semantic-SEO rebuild.
 * ---------------------------------------------------------------------------
 * Central entity: Mobile Tyre Fitting. Every entry below follows the sentence
 * formula (WHO does WHAT for WHOM with WHAT verification, OUTCOME) and carries
 * entity + attribute + value. No em dashes anywhere. Prices default to
 * "Get a quote" until the business owner supplies real "From £NN" figures.
 *
 * This is static UI copy (a fixed brand offering), so it lives in code rather
 * than the database. Dynamic content (reviews, counties, settings) still comes
 * from /admin via src/lib/data.ts.
 */

// ---------------------------------------------------------------------------
// Section 3 - Tyre brands supplied and fitted (15+ brand entities)
// ---------------------------------------------------------------------------
export const TYRE_BRAND_GROUPS: { tier: string; blurb: string; brands: string[] }[] = [
  {
    tier: "Premium tyres",
    blurb:
      "Longer wet grip and tread life for performance cars, SUVs and motorway drivers.",
    brands: ["Michelin", "Pirelli", "Continental", "Bridgestone", "Goodyear", "Dunlop"],
  },
  {
    tier: "Mid-range tyres",
    blurb:
      "Balanced grip, wear and value for everyday cars, hybrids and family vehicles.",
    brands: ["Yokohama", "Hankook", "Kumho", "Nexen", "BFGoodrich", "Avon", "Firestone"],
  },
  {
    tier: "Budget and value tyres",
    blurb:
      "Road-legal, fully fitted economy tyres for drivers replacing on a tight budget.",
    brands: ["Davanti", "Maxxis"],
  },
];

// ---------------------------------------------------------------------------
// Section 5 - Mobile tyre services cluster (Battery Replacement and Home Tyre Fitting removed)
// ---------------------------------------------------------------------------
export const MOBILE_SERVICES: {
  title: string;
  slug: string;
  hypernym: string;
  icon: string;
  description: string;
  eav: string[];
}[] = [
  {
    title: "Mobile Tyre Fitting",
    slug: "mobile-tyre-fitting",
    hypernym: "Automotive Service",
    icon: "wrench",
    description:
      "We supply and fit replacement car, van and SUV tyres at your home, workplace or roadside, using certified mobile technicians and calibrated equipment, with no garage visit required.",
    eav: [
      "Location: home driveway, workplace car park or roadside",
      "Arrival: 30 to 60 minutes typical",
      "Vehicles: cars, vans, SUVs, 4x4s, EVs and hybrids",
    ],
  },
  {
    title: "Mobile Tyre Repair (BS AU 159)",
    slug: "puncture-repair",
    hypernym: "Tyre Repair Service",
    icon: "wrench",
    description:
      "We repair punctured tyres for drivers wherever they are stranded, following British Standard AU 159, restoring the tyre to road-legal condition in under 30 minutes.",
    eav: [
      "Standard: British Standard AU 159 compliant",
      "Repairable: tread punctures up to 6mm in the central 75%",
      "Time: under 30 minutes from arrival",
    ],
  },
  {
    title: "Wheel Balancing",
    slug: "wheel-balancing",
    hypernym: "Wheel Service",
    icon: "activity",
    description:
      "We balance every wheel on-site with a calibrated digital balancer, removing steering vibration and uneven tread wear, with each wheel balanced to under 5g.",
    eav: [
      "Method: dynamic balancing with calibrated digital balancer",
      "Fixes: steering vibration, uneven wear, suspension fatigue",
      "Tolerance: under 5g imbalance per wheel",
    ],
  },
  {
    title: "24/7 Emergency Tyre Fitting",
    slug: "emergency-tyre-fitting",
    hypernym: "Roadside Assistance Service",
    icon: "siren",
    description:
      "We respond to flat tyres and blowouts for stranded drivers around the clock, every day of the year, dispatching the nearest insured fitter with no call-out fee.",
    eav: [
      "Hours: 00:00 to 23:59, 365 days a year",
      "Response: 30 to 60 minutes typical",
      "Call-out fee: none, ever",
    ],
  },
  {
    title: "Van and Fleet Tyre Fitting",
    slug: "van-tyre-fitting",
    hypernym: "Commercial Vehicle Service",
    icon: "bus",
    description:
      "We fit commercial van and fleet tyres at depots, yards and roadside for couriers and trade businesses, keeping vehicles earning with consolidated fleet invoicing.",
    eav: [
      "Vehicles: Transit, Sprinter, Vivaro, Custom, panel and tipper vans",
      "Tyres: commercial C-rated, reinforced and winter van tyres",
      "Billing: fleet accounts with consolidated invoicing",
    ],
  },
  {
    title: "Locking Wheel Nut Removal",
    slug: "locking-wheel-nut-removal",
    hypernym: "Wheel Security Service",
    icon: "lock",
    description:
      "We remove lost-key, broken, rounded or seized locking wheel nuts using controlled non-destructive extraction, then fit a standard replacement nut so the tyre can be changed.",
    eav: [
      "Scenarios: lost key, broken key, rounded or seized nut",
      "Method: non-destructive controlled extraction",
      "Wheel risk: zero damage to alloy or hub",
    ],
  },
  {
    title: "TPMS Service and Sensor Replacement",
    slug: "tpms-service",
    hypernym: "Tyre Safety System Service",
    icon: "gauge",
    description:
      "We diagnose, replace and reset tyre pressure monitoring sensors when warning lights appear, using an OBD-II scanner and a dedicated TPMS programmer for direct and indirect systems.",
    eav: [
      "Work: diagnosis, sensor replacement, reset, valve service",
      "Tools: OBD-II scanner and dedicated TPMS programmer",
      "Triggers: warning light, low pressure alert, sensor battery failure",
    ],
  },
  {
    title: "Run-Flat Tyre Replacement",
    slug: "run-flat-tyre",
    hypernym: "Tyre Maintenance Service",
    icon: "circle-dot",
    description:
      "We replace run-flat tyres on-site for cars fitted from the factory, carrying reinforced bead-breaking equipment and manufacturer-spec run-flat sizes for premium brands.",
    eav: [
      "Supply: manufacturer-spec run-flat sizes",
      "Brands: Michelin Pilot Sport, Pirelli P Zero, Continental",
      "Capability: reinforced bead-breaking equipment carried",
    ],
  },
];

// ---------------------------------------------------------------------------
// Section 5 (Group 2) - Additional mobile tyre and wheel services (the 6 new)
// ---------------------------------------------------------------------------
export const ADDITIONAL_SERVICES: {
  title: string;
  slug: string;
  hypernym: string;
  icon: string;
  description: string;
  eav: string[];
}[] = [
  {
    title: "Mobile Tyre Rotation",
    slug: "mobile-tyre-rotation",
    hypernym: "Tyre Maintenance Service",
    icon: "circle-dot",
    description:
      "We rotate your tyres on-site in 20 to 30 minutes using the correct front-to-rear and cross-rotation pattern for your vehicle and tyre direction, returning each wheel torqued to manufacturer specification, so your tread wears evenly and you get the full life out of every tyre.",
    eav: [
      "Pattern: forward cross, rearward cross or side-to-side by tyre direction",
      "Frequency: every 5,000 to 7,500 miles",
      "Outcome: extends tyre life by 20 to 25% with even wear",
    ],
  },
  {
    title: "Free Tyre Health Check",
    slug: "free-tyre-health-check",
    hypernym: "Tyre Safety Inspection",
    icon: "shield-check",
    description:
      "We carry out a free no-obligation tyre health check at your location for any UK driver in our coverage area, inspecting tread depth, sidewall condition, pressure, valve, age and wear pattern against UK legal and safety standards, so you know which tyres are safe and which need attention.",
    eav: [
      "Checks: tread depth, sidewall, pressure, valve, DOT age code, wear pattern",
      "Standard: UK legal minimum 1.6mm tread depth across central 75%",
      "Outcome: free written report, no obligation, on-site quote if needed",
    ],
  },
  {
    title: "Mobile Caravan and Motorhome Tyre Fitting",
    slug: "caravan-tyre-fitting",
    hypernym: "Leisure Vehicle Tyre Service",
    icon: "bus",
    description:
      "We supply and fit CP-rated camper tyres and reinforced load-rated leisure tyres on-site for touring caravans, static caravans, motorhomes and campervans at storage sites, caravan parks or your home, so leisure vehicles are road-ready before every trip.",
    eav: [
      "Vehicles: touring caravans, motorhomes, campervans, static caravans, horseboxes",
      "Tyres: CP-rated camper, reinforced load-rated, all-season leisure tyres",
      "Locations: storage compound, caravan park, driveway, dealership",
    ],
  },
];

// ---------------------------------------------------------------------------
// Section 6b - Premium and performance vehicle brand specialists.
// Each brand is a micro-hub feeding the central Mobile Tyre Fitting entity.
// ---------------------------------------------------------------------------
export const BRAND_SPECIALISTS: {
  brand: string;
  slug: string;
  badge: string;
  description: string;
}[] = [
  {
    brand: "Tesla",
    slug: "tesla-mobile-tyre-fitting",
    badge: "EV-spec tyres",
    description:
      "Low rolling resistance tyres fitted on-site for Tesla Model 3, Model Y, Model S and Model X with increased load index and acoustic foam where required.",
  },
  {
    brand: "BMW",
    slug: "bmw-mobile-tyre-fitting",
    badge: "Run-flat specialist",
    description:
      "Run-flat and standard OE-spec tyres fitted on-site for BMW 1, 3, 5, 7, X, M and i Series with manufacturer-spec torque and TPMS reset.",
  },
  {
    brand: "Audi",
    slug: "audi-mobile-tyre-fitting",
    badge: "OE-spec tyres",
    description:
      "OE-spec tyres for Audi A, Q, RS and e-tron ranges fitted on-site with manufacturer-approved load and speed ratings.",
  },
  {
    brand: "Mercedes-Benz",
    slug: "mercedes-mobile-tyre-fitting",
    badge: "MO-marked tyres",
    description:
      "MO-marked tyres fitted on-site for Mercedes-Benz A-Class through S-Class, GLA through GLS and AMG performance models.",
  },
  {
    brand: "Range Rover",
    slug: "range-rover-mobile-tyre-fitting",
    badge: "Load-rated SUV tyres",
    description:
      "All-terrain and on-road tyres fitted on-site for Range Rover, Range Rover Sport, Velar, Evoque and Defender with load ratings matched to vehicle weight.",
  },
  {
    brand: "Porsche",
    slug: "porsche-mobile-tyre-fitting",
    badge: "N-rated tyres",
    description:
      "N-rated Porsche-approved tyres fitted on-site for 911, Cayenne, Macan, Panamera and Taycan with performance-spec torque and balance.",
  },
  {
    brand: "Bentley",
    slug: "bentley-mobile-tyre-fitting",
    badge: "OE-spec luxury tyres",
    description:
      "OE-spec tyres for Continental GT, Flying Spur and Bentayga fitted on-site with luxury-grade workmanship.",
  },
  {
    brand: "Rolls-Royce",
    slug: "rolls-royce-mobile-tyre-fitting",
    badge: "RR-approved tyres",
    description:
      "RR-approved tyres for Phantom, Ghost, Wraith, Dawn and Cullinan fitted at your private location with full discretion.",
  },
  {
    brand: "Ferrari",
    slug: "ferrari-mobile-tyre-fitting",
    badge: "Performance tyres",
    description:
      "Performance-spec tyres for Ferrari road cars fitted on-site with Ferrari-approved compounds and ultra-precise balancing.",
  },
  {
    brand: "McLaren",
    slug: "mclaren-mobile-tyre-fitting",
    badge: "MC-marked Pirelli",
    description:
      "MC-marked Pirelli tyres for McLaren GT, 720S and Artura fitted on-site with manufacturer-approved torque and balance.",
  },
  {
    brand: "Lamborghini",
    slug: "lamborghini-mobile-tyre-fitting",
    badge: "L-marked tyres",
    description:
      "L-marked performance tyres for Huracán, Urus and Revuelto fitted on-site by performance-tyre-trained technicians.",
  },
];

// ---------------------------------------------------------------------------
// Section 6 - Vehicles covered
// ---------------------------------------------------------------------------
export const VEHICLE_TYPES: {
  title: string;
  icon: string;
  description: string;
  eav: string[];
}[] = [
  {
    title: "Cars",
    icon: "circle-dot",
    description:
      "We fit tyres to hatchbacks, saloons and estates at home, work or roadside for everyday drivers across all our regions.",
    eav: ["Tyre types: summer, winter, all-season", "Brands: premium, mid-range and budget"],
  },
  {
    title: "Vans and LCVs",
    icon: "bus",
    description:
      "We fit reinforced commercial tyres to Transit, Sprinter, Vivaro, Custom and panel vans for couriers and trade businesses.",
    eav: ["Tyres: commercial C-rated and reinforced", "Service: depot, yard or roadside"],
  },
  {
    title: "SUVs and 4x4s",
    icon: "truck",
    description:
      "We supply load-rated tyres in larger rim diameters for SUVs and 4x4s, balanced on-site to remove vibration.",
    eav: ["Sizes: larger rim diameters and load indices", "Use: road, all-terrain and towing"],
  },
  {
    title: "Electric Vehicles",
    icon: "circle-dot",
    description:
      "We fit low rolling resistance, reinforced load-index EV tyres for Tesla, Polestar, Kia EV6, Ioniq 5 and Nissan Leaf drivers.",
    eav: ["Tyres: low rolling resistance, noise-cancelling", "Handling: increased EV kerb weight"],
  },
  {
    title: "Hybrid Vehicles",
    icon: "circle-dot",
    description:
      "We supply efficiency-focused tyres for hybrid cars, matching the original load index and speed rating for safe, economical running.",
    eav: ["Focus: fuel efficiency and low noise", "Match: original load index and speed rating"],
  },
  {
    title: "Fleet and Commercial",
    icon: "bus",
    description:
      "We keep delivery fleets, taxi firms and trade businesses moving with priority response, fixed pricing and account billing.",
    eav: ["Billing: consolidated fleet accounts", "Response: priority same-day call-outs"],
  },
];

// ---------------------------------------------------------------------------
// Section 8 - Transparent pricing (placeholders flagged for owner input)
// ---------------------------------------------------------------------------
export const PRICING_ROWS: { service: string; price: string; includes: string }[] = [
  {
    service: "Mobile tyre fitting (supplied and fitted, per tyre)",
    price: "Get a quote",
    includes: "Removal, new valve, dynamic balancing and old tyre disposal",
  },
  {
    service: "Puncture repair on-site",
    price: "Get a quote",
    includes: "British Standard AU 159 plug-and-patch repair",
  },
  {
    service: "Wheel balancing (per wheel)",
    price: "Get a quote",
    includes: "Dynamic balance with calibrated digital balancer",
  },
  {
    service: "TPMS sensor replacement",
    price: "Get a quote",
    includes: "Replacement sensor, programming and reset",
  },
  {
    service: "Locking wheel nut removal",
    price: "Get a quote",
    includes: "Non-destructive removal and standard replacement nut",
  },
  {
    service: "Emergency 24/7 call-out",
    price: "No call-out fee",
    includes: "You pay the service price only, quoted before dispatch",
  },
];

// ---------------------------------------------------------------------------
// Section 9 - Customer reviews (PLACEHOLDER content - owner swaps for real
// Google reviews). Each carries a coverage-area location for entity reinforcement.
// ---------------------------------------------------------------------------
export const HOME_REVIEWS: {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  body: string;
}[] = [
  {
    id: "rev-sarah-m",
    name: "Sarah M.",
    location: "Bromley, London",
    date: "March 2026",
    rating: 5,
    body: "Had a flat on the school run. Called at 8.45am, the fitter was on the driveway by 9.20am. Replaced both front tyres with Michelin, balanced and torqued, and I made the 10.30 meeting. Properly impressed.",
  },
  {
    id: "rev-daniel-p",
    name: "Daniel P.",
    location: "Maidstone, Kent",
    date: "February 2026",
    rating: 5,
    body: "Blew a tyre on the M20 at 11pm on a Sunday. Mobile fitter was with me in 35 minutes, fitted a new Continental and got me moving. No call-out fee, exactly the price quoted. Saved my night.",
  },
  {
    id: "rev-anita-r",
    name: "Anita R.",
    location: "Brighton, Sussex",
    date: "February 2026",
    rating: 5,
    body: "Booked through WhatsApp, sent a photo of the tyre size, got an all-in quote in minutes. The fitter arrived within the hour, did the job on the driveway, and took the old tyre away. Cleaner and faster than any garage.",
  },
  {
    id: "rev-james-t",
    name: "James T.",
    location: "Chelmsford, Essex",
    date: "January 2026",
    rating: 5,
    body: "Run-flat on a BMW, most garages told me to come in next week. These guys had the right tyre, came out the same afternoon, fitted it on site and balanced it properly. No fuss, fair price.",
  },
  {
    id: "rev-priya-s",
    name: "Priya S.",
    location: "Solihull, West Midlands",
    date: "January 2026",
    rating: 5,
    body: "Locking wheel nut key was missing and I needed two new tyres. The fitter removed the nut without damaging the alloy, fitted standard replacements and changed the tyres. Honest pricing and zero damage.",
  },
  {
    id: "rev-craig-d",
    name: "Craig D.",
    location: "Glasgow, Scotland",
    date: "December 2025",
    rating: 5,
    body: "Fleet of five vans, one down with a puncture on a Saturday morning. The fitter was at our yard in 40 minutes, repaired the tyre to BS AU 159, and the van was back out on deliveries by lunch. We use them every week now.",
  },
];

// ---------------------------------------------------------------------------
// Section 14 - Founder identity (PLACEHOLDER - owner supplies real name, photo,
// bio, years and figures). Name below is the example from the brief.
// ---------------------------------------------------------------------------
export const FOUNDER = {
  name: "Paul",
  role: "Founder and lead mobile tyre fitter",
  yearsInTrade: "over 10 years in the tyre trade",
  photo: "/uploads/team/founder-photo.jpg",
  photoAlt:
    "Paul, founder and lead mobile tyre fitter at Tyre Fitting Near Me Ltd, photographed beside a fully equipped mobile fitting van",
  bio: "I started out fitting tyres in busy high-street garages, and after more than a decade in the trade I kept seeing the same problem: drivers stuck waiting, or stranded with no safe way to reach a garage. So I built Tyre Fitting Near Me as a fully mobile service that brings the workshop to you, at home, at work or at the roadside. Every fitting my team and I carry out is balanced on calibrated equipment, torqued to manufacturer specification and backed by our workmanship guarantee. If a job is not right, we put it right. That promise is personal.",
  quote:
    "We bring the workshop to you, and every fitting is backed by my personal workmanship guarantee.",
};

// Quantified track record (PLACEHOLDER values - owner confirms real figures).
// Explicit numeric `end` so the counter never parses from formatted text.
export const FOUNDER_STATS: {
  end: number;
  suffix?: string;
  useCommas?: boolean;
  label: string;
}[] = [
  { end: 10, suffix: "+", label: "years operating across the UK" },
  { end: 8, label: "certified mobile tyre technicians on the road" },
  { end: 12000, suffix: "+", useCommas: true, label: "mobile tyre fittings completed" },
  { end: 6, label: "vans on the road across our coverage area" },
];

// ---------------------------------------------------------------------------
// Section 10 - Recent mobile tyre fittings (image placeholders, EAV alt text)
// Real photos are owner input. Filenames map to alt text for easy swap-in.
// ---------------------------------------------------------------------------
export const RECENT_WORK: { file: string; alt: string; caption: string }[] = [
  {
    file: "/uploads/work/recent-work-01-michelin-pilot-sport-4-225-40-r18-bmw-3-series-bromley.jpg",
    alt: "Michelin Pilot Sport 4 225/40 R18 fitted to a BMW 3 Series in Bromley by Tyre Fitting Near Me mobile fitter",
    caption: "Michelin Pilot Sport 4 225/40 R18, BMW 3 Series, Bromley, fitted in 45 minutes",
  },
  {
    file: "/uploads/work/recent-work-02-continental-205-55-r16-ford-focus-maidstone.jpg",
    alt: "Continental PremiumContact 205/55 R16 fitted to a Ford Focus in Maidstone by Tyre Fitting Near Me mobile fitter",
    caption: "Continental 205/55 R16, Ford Focus, Maidstone, roadside call-out",
  },
  {
    file: "/uploads/work/recent-work-03-michelin-agilis-215-65-r16c-ford-transit-croydon.jpg",
    alt: "Michelin Agilis 215/65 R16C commercial van tyre fitted to a Ford Transit in Croydon by Tyre Fitting Near Me mobile fitter",
    caption: "Michelin Agilis 215/65 R16C, Ford Transit, Croydon, fleet call-out",
  },
  {
    file: "/uploads/work/recent-work-04-pirelli-p-zero-245-40-r19-tesla-model-3-brighton.jpg",
    alt: "Pirelli P Zero 245/40 R19 EV tyre fitted to a Tesla Model 3 in Brighton by Tyre Fitting Near Me mobile fitter",
    caption: "Pirelli P Zero 245/40 R19, Tesla Model 3, Brighton, home fitting",
  },
  {
    file: "/uploads/work/recent-work-05-bridgestone-turanza-195-65-r15-vw-golf-chelmsford.jpg",
    alt: "Bridgestone Turanza 195/65 R15 fitted to a Volkswagen Golf in Chelmsford by Tyre Fitting Near Me mobile fitter",
    caption: "Bridgestone Turanza 195/65 R15, VW Golf, Chelmsford, workplace fitting",
  },
  {
    file: "/uploads/work/recent-work-06-goodyear-efficientgrip-225-45-r17-audi-a4-solihull.jpg",
    alt: "Goodyear EfficientGrip 225/45 R17 fitted to an Audi A4 in Solihull by Tyre Fitting Near Me mobile fitter",
    caption: "Goodyear EfficientGrip 225/45 R17, Audi A4, Solihull, 30-minute arrival",
  },
  {
    file: "/uploads/work/recent-work-07-dunlop-sport-205-55-r16-vauxhall-astra-glasgow.jpg",
    alt: "Dunlop Sport BluResponse 205/55 R16 fitted to a Vauxhall Astra in Glasgow by Tyre Fitting Near Me mobile fitter",
    caption: "Dunlop Sport 205/55 R16, Vauxhall Astra, Glasgow, evening call-out",
  },
  {
    file: "/uploads/work/recent-work-08-hankook-ventus-235-55-r18-nissan-qashqai-coventry.jpg",
    alt: "Hankook Ventus 235/55 R18 SUV tyre fitted to a Nissan Qashqai in Coventry by Tyre Fitting Near Me mobile fitter",
    caption: "Hankook Ventus 235/55 R18, Nissan Qashqai, Coventry, home fitting",
  },
];

// ---------------------------------------------------------------------------
// Section 11 - Areas covered (region + town entities, 8 towns per region)
// Region slug links to the county hub page; towns are shown as visible copy.
// ---------------------------------------------------------------------------
export const SERVICE_REGIONS: { region: string; slug: string; towns: string[] }[] = [
  {
    region: "London",
    slug: "london",
    towns: ["Bromley", "Croydon", "Bexley", "Greenwich", "Lewisham", "Dartford", "Sidcup", "Sutton"],
  },
  {
    region: "Kent",
    slug: "kent",
    towns: ["Maidstone", "Tunbridge Wells", "Canterbury", "Ashford", "Sevenoaks", "Dartford", "Gillingham", "Tonbridge"],
  },
  {
    region: "Sussex",
    slug: "sussex",
    towns: ["Brighton", "Hove", "Worthing", "Crawley", "Eastbourne", "Hastings", "Horsham", "Lewes"],
  },
  {
    region: "Essex",
    slug: "essex",
    towns: ["Chelmsford", "Colchester", "Basildon", "Southend-on-Sea", "Brentwood", "Romford", "Harlow", "Braintree"],
  },
  {
    region: "Birmingham and West Midlands",
    slug: "west-midlands",
    towns: ["Solihull", "Birmingham", "Coventry", "Wolverhampton", "Walsall", "Dudley", "Sutton Coldfield", "West Bromwich"],
  },
  {
    region: "Scotland",
    slug: "scotland",
    towns: ["Glasgow", "Edinburgh", "Paisley", "East Kilbride", "Hamilton", "Motherwell", "Cumbernauld", "Livingston"],
  },
];

// ---------------------------------------------------------------------------
// Section 12 - Mobile tyre fitting vs garage visit
// ---------------------------------------------------------------------------
export const COMPARISON_ROWS: { factor: string; mobile: string; garage: string }[] = [
  { factor: "Where", mobile: "Your home, workplace or roadside", garage: "You drive to the garage" },
  { factor: "Time cost", mobile: "30 to 60 minutes on-site", garage: "1 to 3 hours including travel and waiting" },
  { factor: "Drivable vehicle needed", mobile: "No", garage: "Yes" },
  { factor: "Safety", mobile: "No risk of driving on a flat", garage: "Risk of sidewall damage and accidents" },
  { factor: "Availability", mobile: "24/7, weekends and nights", garage: "Mostly Monday to Saturday business hours" },
  { factor: "Booking", mobile: "Phone, WhatsApp or postcode tool", garage: "In person, phone or online slot" },
  { factor: "Pricing", mobile: "All-in fixed, no call-out fee", garage: "Varies, fitting and disposal fees common" },
];

export const COMPARISON_SCENARIOS: string[] = [
  "A flat tyre on the driveway when you need to leave for work",
  "A blowout on the motorway where driving further is dangerous",
  "A fleet van down at the depot that has to be back on the road today",
  "A weekend or evening replacement when local garages are closed",
];

// ---------------------------------------------------------------------------
// Section 14 - Our fitters and their standards (E-E-A-T, owner input flagged)
// ---------------------------------------------------------------------------
export const FITTER_STANDARDS: { title: string; icon: string; body: string }[] = [
  {
    title: "Certified mobile technicians",
    icon: "badge-check",
    body: "Every fitting is carried out by a trained, experienced and certified mobile tyre technician, not a subcontracted general handyman.",
  },
  {
    title: "Fully insured",
    icon: "shield-check",
    body: "We carry public liability insurance on every call-out, so your vehicle and property are protected while we work on-site.",
  },
  {
    title: "Calibrated equipment in every van",
    icon: "wrench",
    body: "Each van carries hydraulic jacks, a calibrated digital balancer, a TPMS programmer, torque wrenches to manufacturer spec, valve tools and run-flat-capable bead breakers.",
  },
  {
    title: "British Standard AU 159 repairs",
    icon: "circle-check-big",
    body: "Punctures are repaired to British Standard AU 159, and old tyres are removed and recycled under ISO disposal compliance.",
  },
];

// ---------------------------------------------------------------------------
// Section 16 - FAQs (18 entries, formula-driven 40 to 70 word answers)
// Rendered on-page AND fed to FAQPage JSON-LD. Stable ids for React keys.
// ---------------------------------------------------------------------------
export const HOMEPAGE_FAQS: { id: string; question: string; answer: string }[] = [
  {
    id: "faq-what-is",
    question: "What is mobile tyre fitting and how does it work?",
    answer:
      "Mobile tyre fitting is an automotive service where a certified technician brings tyres and equipment to your location instead of you visiting a garage. We supply, fit and balance new tyres at your home, workplace or roadside, returning you to the road within 30 to 60 minutes of booking.",
  },
  {
    id: "faq-come-to-me",
    question: "Do you really come to me wherever I am?",
    answer:
      "Yes. We fit tyres on home driveways, in workplace car parks and at the roadside across London, Kent, Sussex, Essex, the West Midlands and Scotland. As long as we can safely reach and work around your vehicle, our mobile fitter comes to you with the correct tyres in stock.",
  },
  {
    id: "faq-how-fast",
    question: "How fast can a mobile tyre fitter arrive?",
    answer:
      "Our typical arrival time is 30 to 60 minutes from booking, depending on your location and traffic. For 24/7 emergencies such as a roadside blowout, we dispatch the nearest insured fitter immediately and give you a tracked estimated arrival time when you book.",
  },
  {
    id: "faq-callout-fee",
    question: "Is there a call-out fee?",
    answer:
      "No. We never charge a call-out fee, day or night. You pay only the service price, which we quote in full before we dispatch a fitter. The price we quote is the price you pay, with no hidden fitting, balancing or disposal charges added afterwards.",
  },
  {
    id: "faq-areas",
    question: "What areas do you cover for mobile tyre fitting?",
    answer:
      "We cover London, Kent, Sussex, Essex, Birmingham and the West Midlands, and Scotland, including towns such as Bromley, Maidstone, Brighton, Chelmsford, Solihull and Glasgow. If you are unsure whether we reach you, enter your postcode in the checker above or send your location on WhatsApp.",
  },
  {
    id: "faq-home-work",
    question: "Can you fit tyres at my home or workplace?",
    answer:
      "Yes. Home tyre fitting on your driveway and workplace fitting in your car park are two of our most popular services. You carry on with your day while our fitter replaces and balances your tyres on-site, so there is no garage visit and no waiting room.",
  },
  {
    id: "faq-nights-weekends",
    question: "Can you fit tyres at night or at weekends?",
    answer:
      "Yes. Our 24/7 emergency tyre fitting service operates from 00:00 to 23:59, every day of the year, including Sundays and bank holidays. Whether you are stranded at 3am or need a weekend replacement, an insured mobile fitter is available with no call-out fee.",
  },
  {
    id: "faq-repair-or-replace",
    question: "Do you repair punctures on-site or only replace tyres?",
    answer:
      "We do both. Where a puncture is safely repairable, we carry out a British Standard AU 159 plug-and-patch repair on-site, usually in under 30 minutes. Where the damage is to the sidewall or shoulder, or the tyre is unsafe, we supply and fit a replacement instead.",
  },
  {
    id: "faq-run-flat",
    question: "Can you fit run-flat tyres on-site?",
    answer:
      "Yes. We carry reinforced bead-breaking equipment and manufacturer-spec run-flat sizes, so we replace run-flat tyres at your location for cars fitted with them from the factory, including premium fitments such as Michelin Pilot Sport, Pirelli P Zero and Continental.",
  },
  {
    id: "faq-ev",
    question: "Can you fit tyres on an electric vehicle (EV)?",
    answer:
      "Yes. We fit EV tyres with low rolling resistance and reinforced load indices to handle the increased weight of electric vehicles such as the Tesla Model 3 and Y, Polestar 2, Kia EV6, Hyundai Ioniq 5 and Nissan Leaf, matching the manufacturer specification.",
  },
  {
    id: "faq-balancing",
    question: "Do you balance the wheel after fitting the new tyre?",
    answer:
      "Yes. Every new tyre is balanced on-site with a calibrated digital balancer to under 5g, which removes steering vibration, prevents uneven tread wear and reduces suspension fatigue. Wheel balancing is included as standard in our mobile tyre fitting service.",
  },
  {
    id: "faq-tpms",
    question: "Can you replace a TPMS sensor when fitting new tyres?",
    answer:
      "Yes. We diagnose, replace and reset tyre pressure monitoring sensors using an OBD-II scanner and a dedicated TPMS programmer. If a warning light appears or a sensor battery has failed, we fit and program a new direct or programmable sensor while changing your tyres.",
  },
  {
    id: "faq-locking-nut",
    question: "Can you remove a locking wheel nut if I have lost the key?",
    answer:
      "Yes. We remove lost-key, broken, rounded and seized locking wheel nuts using controlled non-destructive extraction, with zero damage to the alloy or hub when handled correctly. We then fit a standard replacement nut so your tyre can be changed straight away.",
  },
  {
    id: "faq-payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, contactless payment and bank transfer, taken securely on-site once your fitting is complete. The full price is confirmed before we dispatch a fitter, so there are no surprises when it is time to pay.",
  },
  {
    id: "faq-cost",
    question: "How much does mobile tyre fitting cost?",
    answer:
      "Mobile tyre fitting is priced as a single all-in figure covering the tyre, fitting, a new valve, balancing and disposal, with no call-out fee. The exact price depends on your tyre size and brand choice, and we confirm it in full before dispatch so you can decide with no obligation.",
  },
  {
    id: "faq-insured",
    question: "Are your mobile fitters insured and certified?",
    answer:
      "Yes. Every mobile fitter is a trained, certified tyre technician working under public liability insurance. We use calibrated balancing equipment and torque wrenches set to manufacturer specification, and every fitting is backed by our workmanship guarantee.",
  },
  {
    id: "faq-old-tyres",
    question: "What happens to my old tyres after fitting?",
    answer:
      "We remove your old tyres and recycle them responsibly under ISO disposal compliance, so you are not left with waste to dispose of yourself. Old tyre disposal is included in your all-in price at no extra charge.",
  },
  {
    id: "faq-premium-brands",
    question: "Can you supply premium brands like Michelin and Continental?",
    answer:
      "Yes. We supply and fit premium tyre brands including Michelin, Pirelli, Continental, Bridgestone, Goodyear and Dunlop, alongside mid-range and budget options. We help you choose the right tyre for your vehicle, driving and budget, then fit it on-site the same day where stock allows.",
  },
];
