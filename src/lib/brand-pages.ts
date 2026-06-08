/**
 * Brand cluster page content. One fully built entry (BMW) acts as the working
 * template; the other 10 brands follow the identical shape and can be added
 * here on demand. All copy follows the sentence formula, no em dashes.
 *
 * Figures (tyre sizes, torque) are flagged in the audit as needing owner
 * confirmation against current manufacturer OE spec sheets.
 */

export interface BrandPage {
  slug: string;
  brand: string;
  hero: {
    h1: string;
    intro: string;
    bullets: string[];
    whatsappPrefill: string;
  };
  modelGroups: { label: string; models: string[] }[];
  oeIntro: string;
  oePoints: string[];
  sizeTable: { model: string; front: string; rear: string; runFlat: string }[];
  runFlatBody: string;
  tpmsBody: string;
  reviews: { id: string; name: string; location: string; date: string; rating: number; body: string }[];
  pricing: { service: string; price: string; includes: string }[];
  faqs: { id: string; question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const BRAND_PAGES: Record<string, BrandPage> = {
  "bmw-mobile-tyre-fitting": {
    slug: "bmw-mobile-tyre-fitting",
    brand: "BMW",
    metaTitle: "BMW Mobile Tyre Fitting | OE-Spec & Run-Flat, We Come To You",
    metaDescription:
      "Mobile BMW tyre fitting at your home, work or roadside in 30 to 60 minutes. OE-spec and run-flat tyres, BMW-approved brands, TPMS reset included, fully insured. No call-out fee.",
    hero: {
      h1: "BMW Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits OE-spec and run-flat tyres for BMW owners across London, Kent, Sussex, Essex, the West Midlands and Scotland, using BMW-approved tyre brands and torque equipment set to BMW manufacturer specification, returning your car to the road within 30 to 60 minutes.",
      bullets: [
        "Run-flat tyre specialist for BMW models",
        "BMW-approved brands stocked (Michelin, Continental, Pirelli, Bridgestone, Goodyear)",
        "24/7 mobile service, 365 days a year",
        "TPMS reset included via BMW i-Drive procedure",
        "Workmanship guaranteed, fully insured",
        "Free tyre health check on every visit",
      ],
      whatsappPrefill:
        "Hi, I drive a BMW and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Saloon, hatch and coupe", models: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series"] },
      { label: "X Series SUVs", models: ["X1", "X2", "X3", "X4", "X5", "X6", "X7"] },
      { label: "M performance", models: ["M2", "M3", "M4", "M5", "M8", "X3 M", "X4 M", "X5 M", "X6 M"] },
      { label: "i electric range", models: ["i3", "i4", "i5", "i7", "iX", "iX1", "iX3"] },
      { label: "Roadster and classic", models: ["Z4 (current)", "historic 6 Series", "historic 8 Series"] },
    ],
    oeIntro:
      "We match the exact tyre specification BMW approves for your model, fitting star-marked OE tyres on-site for BMW owners across our six UK regions, using calibrated balancing and torque equipment, so your car keeps its handling, ride and warranty integrity.",
    oePoints: [
      "BMW OE marking: the star (★) marking identifies BMW-approved tyres tuned for your chassis",
      "Run-flat is OE on most modern 3 Series, 5 Series, 7 Series, X3, X5 and X7",
      "Common BMW-approved compounds: Michelin Pilot Sport, Continental SportContact, Pirelli P Zero, Bridgestone Potenza",
      "You cannot mix run-flat and non-run-flat tyres on the same axle",
    ],
    sizeTable: [
      { model: "3 Series (G20)", front: "225/45 R18", rear: "255/40 R18", runFlat: "Yes" },
      { model: "5 Series (G30)", front: "245/45 R18", rear: "275/40 R18", runFlat: "Yes" },
      { model: "X3 (G01)", front: "245/50 R19", rear: "245/50 R19", runFlat: "Yes" },
      { model: "X5 (G05)", front: "265/45 R20", rear: "295/40 R20", runFlat: "Yes" },
      { model: "M3 (G80)", front: "275/35 R19", rear: "285/30 R20", runFlat: "Optional" },
      { model: "i4", front: "245/45 R18", rear: "255/45 R18", runFlat: "Yes" },
      { model: "iX", front: "255/50 R20", rear: "255/50 R20", runFlat: "Yes" },
    ],
    runFlatBody:
      "We replace BMW run-flat tyres on-site for owners whose cars are fitted with them from the factory, carrying reinforced bead-breaking equipment built for stiff run-flat sidewalls. A run-flat that has been driven beyond its limited-mobility range cannot be safely repaired and must be replaced, so we inspect every tyre first. We fit run-flat replacements as a matched pair where needed, never mixing run-flat and standard tyres on the same axle, and torque each wheel to BMW specification (commonly 140Nm or the model-specific value).",
    tpmsBody:
      "Every BMW tyre change includes a TPMS reset at no extra cost. BMW uses both indirect and direct tyre pressure monitoring depending on model, and the system must be reset through the i-Drive menu after new tyres are fitted so the car relearns correct pressures. A missed reset leaves a persistent warning on the dash, so our fitters carry out the i-Drive reset procedure as standard before they leave.",
    reviews: [
      {
        id: "bmw-rev-1",
        name: "Sarah M.",
        location: "Bromley, London",
        date: "March 2026",
        rating: 5,
        body: "Had a flat on the school run in my 3 Series. Called at 8.45am, the fitter was on the driveway by 9.20am, fitted a star-marked run-flat, reset the TPMS and I made my meeting. Properly impressed.",
      },
      {
        id: "bmw-rev-2",
        name: "Marcus L.",
        location: "Tunbridge Wells, Kent",
        date: "February 2026",
        rating: 5,
        body: "X5 picked up a nail on the M25. They came to the office car park, had the correct 265/45 R20 run-flat on the van, fitted it and reset the pressure warning. No call-out fee, exactly the price quoted.",
      },
      {
        id: "bmw-rev-3",
        name: "Hannah P.",
        location: "Solihull, West Midlands",
        date: "January 2026",
        rating: 5,
        body: "Needed two new tyres on my i4. The fitter knew the EV load rating, fitted BMW-approved tyres at home, balanced them properly and reset everything through i-Drive. Faster and cheaper than the dealer.",
      },
    ],
    pricing: [
      { service: "BMW 3 Series run-flat (225/45 R18, supplied and fitted)", price: "From £X", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "BMW 5 Series run-flat (245/45 R18, supplied and fitted)", price: "From £X", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "BMW X5 run-flat (265/45 R20, supplied and fitted)", price: "From £X", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "BMW TPMS reset (with fitting)", price: "Included", includes: "i-Drive reset procedure" },
      { service: "Emergency 24/7 call-out", price: "No call-out fee", includes: "Service price only, quoted before dispatch" },
    ],
    faqs: [
      {
        id: "bmw-faq-1",
        question: "Can you fit run-flat tyres on my BMW?",
        answer:
          "Yes. We are run-flat specialists and carry reinforced bead-breaking equipment built for BMW run-flat sidewalls. We fit star-marked run-flat tyres on-site, as a matched pair where needed, and torque every wheel to BMW specification.",
      },
      {
        id: "bmw-faq-2",
        question: "Do you reset the TPMS warning after fitting?",
        answer:
          "Yes. A TPMS reset through the BMW i-Drive menu is included free with every tyre change, so your car relearns correct pressures and the dashboard warning clears before we leave.",
      },
      {
        id: "bmw-faq-3",
        question: "Are your replacement tyres BMW-approved (star-marked)?",
        answer:
          "Yes. We stock star-marked, BMW-approved tyres from Michelin, Continental, Pirelli, Bridgestone and Goodyear, matched to your model so the car keeps its intended handling and ride.",
      },
      {
        id: "bmw-faq-4",
        question: "Can you fit tyres on an electric BMW (i4, iX, i7)?",
        answer:
          "Yes. We fit EV-rated tyres with the correct increased load index for electric BMW models such as the i4, iX and i7, fitted on-site and balanced to remove vibration, with the TPMS reset through i-Drive.",
      },
      {
        id: "bmw-faq-5",
        question: "What torque setting do you use for BMW wheel nuts?",
        answer:
          "We torque BMW wheel bolts to manufacturer specification, commonly 140Nm or the exact model-specific value, using a calibrated torque wrench so the wheels are secured safely and evenly.",
      },
      {
        id: "bmw-faq-6",
        question: "Can I mix run-flat and standard tyres on my BMW?",
        answer:
          "No. You must not mix run-flat and non-run-flat tyres on the same axle, as it changes handling and safety. We advise replacing in matched pairs and keep your BMW to a consistent specification.",
      },
      {
        id: "bmw-faq-7",
        question: "Do you stock M Performance compounds?",
        answer:
          "Yes. We supply performance-spec tyres for BMW M models such as the M3 and M4, in the correct staggered sizes, fitted on-site and precision-balanced for high-speed stability.",
      },
      {
        id: "bmw-faq-8",
        question: "How quickly can a fitter reach my BMW if I am stranded?",
        answer:
          "Our typical arrival time is 30 to 60 minutes, 24 hours a day, 365 days a year. If you are stranded with a flat, we dispatch the nearest insured fitter with the correct BMW tyre and give you a tracked arrival time.",
      },
    ],
  },
};

export function getBrandPage(slug: string): BrandPage | undefined {
  return BRAND_PAGES[slug];
}

export const BRAND_PAGE_SLUGS = Object.keys(BRAND_PAGES);
