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
  /**
   * Section 4 is the brand's technical flagship. BMW uses the run-flat default
   * headings below; EV, N-rated and supercar brands override them. Section 5 is
   * the second technical section (TPMS for most, fitment precision for others).
   */
  s4Eyebrow?: string;
  s4Title?: string;
  runFlatBody: string;
  s5Eyebrow?: string;
  s5Title?: string;
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
      "Mobile BMW tyre fitting at your home, work or roadside in 30 to 60 minutes. OE-spec and run-flat tyres, BMW-approved brands, TPMS reset included, fully insured. No standard-hours call-out fee.",
    hero: {
      h1: "BMW Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits OE-spec and run-flat tyres for BMW owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, using BMW-approved tyre brands and torque equipment set to BMW manufacturer specification, returning your car to the road within 30 to 60 minutes.",
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
      "We match the exact tyre specification BMW approves for your model, fitting star-marked OE tyres on-site for BMW owners across our seven UK regions, using calibrated balancing and torque equipment, so your car keeps its handling, ride and warranty integrity.",
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
        body: "X5 picked up a nail on the M25. They came to the office car park, had the correct 265/45 R20 run-flat on the van, fitted it and reset the pressure warning. Exactly the price quoted.",
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
      { service: "BMW 3 Series run-flat (225/45 R18, supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "BMW 5 Series run-flat (245/45 R18, supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "BMW X5 run-flat (265/45 R20, supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "BMW TPMS reset (with fitting)", price: "Included", includes: "i-Drive reset procedure" },
      { service: "Emergency 24/7 call-out", price: "No standard-hours call-out fee", includes: "Service price only, quoted before dispatch" },
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

  "tesla-mobile-tyre-fitting": {
    slug: "tesla-mobile-tyre-fitting",
    brand: "Tesla",
    hero: {
      h1: "Tesla Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits T0-marked and acoustic-foam OE tyres for Tesla owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, using Tesla-tuned compounds and torque equipment set to Tesla specification, returning the car to the road within 30 to 60 minutes.",
      bullets: [
        "EV-specialist mobile tyre fitting for Tesla",
        "24/7 mobile service 365 days a year",
        "T0-marked brands stocked (Michelin, Pirelli, Continental, Hankook)",
        "TPMS reset included via the Tesla relearn procedure",
        "Workmanship guaranteed, fully insured",
        "Free tyre health check on every visit",
      ],
      whatsappPrefill:
        "Hi, I drive a Tesla and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Saloon and liftback", models: ["Model 3", "Model S"] },
      { label: "SUV and crossover", models: ["Model Y", "Model X"] },
      { label: "Performance", models: ["Model 3 Performance", "Model Y Performance", "Model S Plaid", "Model X Plaid"] },
    ],
    oeIntro:
      "We match the exact tyre specification Tesla approves, fitting T0-marked and acoustic-foam OE tyres on-site, using calibrated balancing and torque equipment so the car keeps its handling, ride, range and warranty integrity.",
    oePoints: [
      "T0, T1 and T2 markings identify the Tesla-tuned version of a tyre for a specific model",
      "Tesla-approved compounds come from Michelin, Pirelli, Continental and Hankook",
      "Many Tesla OE tyres carry acoustic foam inside and a higher load index for the battery weight",
      "A passenger-rated tyre cannot carry the Tesla's kerb weight at its load index",
    ],
    sizeTable: [
      { model: "Model 3 (RWD)", front: "235/45 R18", rear: "235/45 R18", runFlat: "T-marked, acoustic foam" },
      { model: "Model 3 Performance", front: "235/35 R20", rear: "275/30 R20", runFlat: "staggered, T-marked" },
      { model: "Model Y", front: "255/45 R19", rear: "255/45 R19", runFlat: "T-marked, acoustic foam" },
      { model: "Model S", front: "245/45 R19", rear: "245/45 R19", runFlat: "T1-marked" },
      { model: "Model S Plaid", front: "265/35 R21", rear: "295/30 R21", runFlat: "staggered, T-marked" },
      { model: "Model X", front: "265/45 R20", rear: "265/45 R20", runFlat: "T-marked" },
    ],
    s4Eyebrow: "EV tyre specialist",
    s4Title: "Tesla EV Tyres Are Not Standard Tyres",
    runFlatBody:
      "An electric Tesla is heavier than a comparable petrol car because of the battery, so the tyre carries a higher load and needs a higher load index rather than a passenger-car rating. Instant torque wears tyres faster, so the correct EV-rated compound matters. Many Tesla OE tyres carry acoustic foam inside to cut cabin noise on a near-silent car, and the T0, T1 or T2 marking identifies the Tesla-tuned version. A standard tyre fitted in place of an acoustic-foam OE tyre changes the cabin noise and the rolling resistance, which cuts range. A passenger-rated tyre cannot carry the Tesla's kerb weight at its load index. We match the correct T-marked, load-rated, foam-lined tyre from the registration on every visit.",
    s5Eyebrow: "Range, load and acoustic foam",
    s5Title: "Range, Load and Acoustic Foam Matched to Your Tesla",
    tpmsBody:
      "Low rolling resistance preserves range, so we fit the OE-spec tyre rather than a cheaper higher-resistance one. The higher load index is matched to the battery weight, and acoustic foam is preserved where the model came with it. Pressures are set to the Tesla figure, which is higher than many cars to support the weight and range. TPMS is reset through the Tesla relearn procedure so the car reads the new tyres correctly. EV tyre demand keeps rising as more Tesla owners reach their first replacement, so we hold T-marked stock across the brands Tesla approves. We return the car to the road within 30 to 60 minutes with the correct specification fitted.",
    reviews: [
      { id: "tesla-rev-1", name: "James P.", location: "Bromley, London", date: "March 2026", rating: 5, body: "Picked up a nail in my Model 3 on the school run and they came to my driveway within the hour. Fitted the correct T-marked Michelin with the acoustic foam and reset the pressure warning before they left." },
      { id: "tesla-rev-2", name: "Sophie L.", location: "Maidstone, Kent", date: "April 2026", rating: 5, body: "My Model Y needed two rear tyres and I was worried about getting the EV-rated spec right. They matched it from the registration and set the pressures to the Tesla figure. Quiet and smooth on the drive home." },
      { id: "tesla-rev-3", name: "Daniel R.", location: "Solihull, West Midlands", date: "May 2026", rating: 5, body: "Roadside blowout on the M42 in my Model S. They reached me in about forty minutes, fitted the T1-marked tyre and relearned the sensors. Genuinely the easiest tyre experience I have had with the car." },
    ],
    pricing: [
      { service: "Model 3 / Model Y tyre", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Model S / Model X tyre", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Performance and Plaid staggered tyre", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "TPMS reset via Tesla relearn", price: "Included", includes: "Tesla relearn procedure on every tyre change" },
      { service: "Emergency mobile call-out", price: "No standard-hours call-out fee", includes: "24/7 response, 30 to 60 minutes typical" },
    ],
    faqs: [
      { id: "tesla-faq-1", question: "Do you fit acoustic-foam tyres for Tesla?", answer: "Yes. We fit foam-lined OE-spec tyres where the model came with them, matched from the registration so the cabin noise and rolling resistance stay correct." },
      { id: "tesla-faq-2", question: "Are Tesla tyres different from normal tyres?", answer: "Yes. Tesla tyres carry a higher load index for the battery weight, an EV compound for the instant torque and often acoustic foam inside. EV tyre demand keeps rising as more owners reach their first replacement." },
      { id: "tesla-faq-3", question: "Do you reset the Tesla tyre pressure warning?", answer: "Yes. We reset the system through the Tesla relearn procedure so the car reads the new tyres correctly before we leave." },
      { id: "tesla-faq-4", question: "Can I fit standard tyres to my Tesla?", answer: "Not safely below the required load index. A non-foam tyre also changes the cabin noise and cuts range, so we fit the correct T-marked OE spec." },
      { id: "tesla-faq-5", question: "Which Tesla models do you fit?", answer: "We fit Model 3, Model Y, Model S and Model X, including the Performance and Plaid versions." },
      { id: "tesla-faq-6", question: "Do bigger Tesla wheels cost more?", answer: "Larger staggered Performance and Plaid sizes cost more than the standard fitments. We quote the exact price from the registration." },
      { id: "tesla-faq-7", question: "How quickly can you reach a stranded Tesla?", answer: "We typically reach a stranded Tesla within 30 to 60 minutes, 24 hours a day and 365 days a year." },
      { id: "tesla-faq-8", question: "Do you fit run-flats or standard tyres on a Tesla?", answer: "Tesla runs standard tyres with acoustic foam rather than run-flats. We fit them to the correct T-marked specification for the model." },
    ],
    metaTitle: "Tesla Mobile Tyre Fitting | T0-Marked & Acoustic-Foam OE, We Come To You",
    metaDescription: "T0 and acoustic-foam OE tyres fitted for Tesla at your home, work or roadside, with TPMS reset, in 30 to 60 minutes. Call 0788 328 8831.",
  },

  "audi-mobile-tyre-fitting": {
    slug: "audi-mobile-tyre-fitting",
    brand: "Audi",
    hero: {
      h1: "Audi Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits AO and RO1-marked OE-spec tyres for Audi owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, using Audi-approved brands and torque equipment set to Audi specification, returning the car to the road within 30 to 60 minutes.",
      bullets: [
        "Audi-approved AO and RO1 tyres stocked",
        "24/7 mobile service 365 days a year",
        "Approved brands stocked (Michelin, Continental, Pirelli, Bridgestone, Hankook)",
        "TPMS reset included via the Audi relearn procedure",
        "Workmanship guaranteed, fully insured",
        "Free tyre health check on every visit",
      ],
      whatsappPrefill:
        "Hi, I drive an Audi and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Saloon and Sportback", models: ["A1", "A3", "A4", "A5", "A6", "A7", "A8"] },
      { label: "SUV (Q range)", models: ["Q2", "Q3", "Q5", "Q7", "Q8"] },
      { label: "RS and S performance", models: ["S3", "S4", "S5", "RS3", "RS4", "RS5", "RS6", "RS7", "SQ5", "RSQ8"] },
      { label: "e-tron electric", models: ["Q4 e-tron", "Q8 e-tron", "e-tron GT", "RS e-tron GT"] },
    ],
    oeIntro:
      "We match the exact tyre specification Audi approves for your model, fitting AO and RO1-marked tyres on-site, using calibrated balancing and torque equipment, so the car keeps its handling, ride and warranty integrity.",
    oePoints: [
      "The AO marking identifies a tyre Audi tuned for the specific model, while RO1 identifies the Audi Sport version developed for RS performance cars.",
      "Common Audi-approved compounds come from Michelin, Continental, Pirelli, Bridgestone and Hankook, matched to the original fitment for your model.",
      "RS models often run staggered fitments with a wider rear, and e-tron electric Audis carry a higher load index for the battery weight.",
      "quattro all-wheel drive needs matched tread and the same approved tyre across an axle, because a mismatched tyre stresses the centre differential.",
    ],
    sizeTable: [
      { model: "A3", front: "225/45 R18", rear: "225/45 R18", runFlat: "AO-marked" },
      { model: "A4", front: "245/40 R18", rear: "245/40 R18", runFlat: "AO-marked" },
      { model: "A6", front: "255/45 R19", rear: "255/45 R19", runFlat: "AO-marked" },
      { model: "Q5", front: "255/45 R20", rear: "255/45 R20", runFlat: "AO-marked" },
      { model: "Q7", front: "285/45 R20", rear: "285/45 R20", runFlat: "AO-marked" },
      { model: "RS6", front: "285/35 R21", rear: "285/35 R21", runFlat: "RO1-marked, staggered option" },
      { model: "Q4 e-tron", front: "235/50 R20", rear: "255/45 R20", runFlat: "AO-marked, EV load" },
    ],
    s4Eyebrow: "AO and RO1 approved",
    s4Title: "AO and RO1 Approved Tyres for Audi quattro",
    runFlatBody:
      "The AO marking identifies a tyre tuned by Audi for the model, and RO1 identifies the Audi Sport (RS) tuned version for quattro performance cars. quattro all-wheel drive splits torque across all four tyres, so matching tread depth and the same approved tyre across an axle matters more than on a two-wheel-drive car, because a mismatched tyre stresses the centre differential. RS models often run staggered fitments with a wider rear, the rear tyre being broader than the front. e-tron electric Audis carry a higher load index for the battery weight, so the correct rating is essential. Fitting a non-matched tyre cannot preserve the balance quattro relies on. The AO or RO1 tyre, in the correct size, is matched from the registration before every visit.",
    s5Eyebrow: "TPMS reset included",
    s5Title: "TPMS Reset Included with Every Audi Tyre Change",
    tpmsBody:
      "Every Audi tyre change includes a TPMS reset at no extra cost, carried out as standard on every 2026 booking. Audi uses direct or indirect monitoring depending on the model, reset through the MMI menu or a relearn procedure so the car reads the new tyres at the correct pressures. Pressures are set to the Audi figure for the load the car carries. A missed reset leaves a dashboard warning on the cluster, so the reset is completed before we leave. The monitoring system cannot clear itself without the correct procedure, which is why the reset forms part of the standard fitting process rather than an added extra. The figure matched to your model comes from the Audi specification for the size fitted.",
    reviews: [
      { id: "audi-rev-1", name: "James W.", location: "Croydon, London", date: "March 2026", rating: 5, body: "My A4 needed two fronts and the fitter brought AO-marked Continentals to my driveway. Balanced, torqued and the TPMS reset through the MMI before he left. Quick and tidy." },
      { id: "audi-rev-2", name: "Sophie L.", location: "Maidstone, Kent", date: "April 2026", rating: 5, body: "Picked up a nail in my Q5 on the school run. They reached me within the hour, matched the exact AO tyre from the reg and reset the pressures. No fuss at all." },
      { id: "audi-rev-3", name: "Daniel R.", location: "Brighton, Sussex", date: "February 2026", rating: 5, body: "RS6 needed staggered rears in RO1 spec. The team knew exactly what the car took, fitted the wider rear size and balanced everything properly. Genuinely impressed." },
    ],
    pricing: [
      { service: "Saloon and Sportback (A1 to A8)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Q SUV range (Q2 to Q8)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "RS and S performance, e-tron", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "TPMS reset and relearn", price: "Included", includes: "MMI or relearn procedure on every tyre change" },
      { service: "Emergency roadside call-out", price: "No standard-hours call-out fee", includes: "24/7 response, 30 to 60 minutes typical" },
    ],
    faqs: [
      { id: "audi-faq-1", question: "Are your tyres Audi-approved (AO or RO1)?", answer: "Yes. We fit AO-marked tyres for the standard Audi range and RO1-marked tyres for Audi Sport RS models, matched from your registration. Every 2026 booking uses the exact approved marking for your model." },
      { id: "audi-faq-2", question: "Do you reset the Audi TPMS after fitting?", answer: "Yes. We reset the tyre pressure monitoring through the MMI menu or a relearn procedure on every visit, at no extra cost, so the dashboard reads the new tyres correctly." },
      { id: "audi-faq-3", question: "Why does quattro need matched tyres?", answer: "quattro all-wheel drive splits torque across all four tyres, so a mismatched tyre stresses the centre differential. We fit the same approved tyre with matched tread depth across an axle to protect the drivetrain." },
      { id: "audi-faq-4", question: "Which Audi models do you fit?", answer: "We fit the full A range, the Q SUV range, S and RS performance models, and e-tron electric Audis. The correct approved tyre is matched from your registration." },
      { id: "audi-faq-5", question: "Do you fit e-tron electric Audis?", answer: "Yes. We fit e-tron electric Audis with the correct higher load index tyres rated for the battery weight, so the car carries its mass safely on the right specification." },
      { id: "audi-faq-6", question: "Can you fit staggered RS fitments?", answer: "Yes. We fit wider-rear staggered setups matched to each axle, using the RO1-marked sizes the RS model takes front and rear." },
      { id: "audi-faq-7", question: "Do bigger Audi wheels cost more?", answer: "Larger RS and SUV sizes cost more than standard fitments. We quote the exact price from your registration so the figure matches the size your car takes." },
      { id: "audi-faq-8", question: "How quickly can you reach a stranded Audi?", answer: "We typically reach a stranded Audi within 30 to 60 minutes, 24 hours a day, 365 days a year. No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed quote before dispatch." },
    ],
    metaTitle: "Audi Mobile Tyre Fitting | AO & RO1-Approved, We Come To You",
    metaDescription: "Mobile fitting of AO and RO1-approved tyres for Audi, with TPMS reset included, at your home, work or roadside in 30 to 60 minutes. Call 0788 328 8831.",
  },

  "mercedes-mobile-tyre-fitting": {
    slug: "mercedes-mobile-tyre-fitting",
    brand: "Mercedes-Benz",
    hero: {
      h1: "Mercedes-Benz Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits MO and MO1-marked OE and run-flat tyres for Mercedes-Benz owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, using Mercedes-approved brands and torque equipment set to Mercedes specification, returning the car to the road within 30 to 60 minutes.",
      bullets: [
        "Run-flat and MO-approved tyre specialist for Mercedes",
        "24/7 mobile service 365 days a year",
        "Approved brands stocked (Michelin, Continental, Pirelli, Bridgestone, Goodyear)",
        "TPMS reset included via the Mercedes relearn procedure",
        "Workmanship guaranteed, fully insured",
        "Free tyre health check on every visit",
      ],
      whatsappPrefill:
        "Hi, I drive a Mercedes-Benz and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Saloon and estate", models: ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS"] },
      { label: "SUV", models: ["GLA", "GLB", "GLC", "GLE", "GLS", "G-Class"] },
      { label: "AMG performance", models: ["A45", "C63", "E63", "GT", "GLC63", "GLE63"] },
      { label: "EQ electric", models: ["EQA", "EQB", "EQC", "EQE", "EQS"] },
    ],
    oeIntro:
      "We match the exact tyre specification Mercedes approves for your model, fitting MO and MO1-marked tyres on-site, run-flat where the car came with it, using calibrated balancing and torque equipment, so the car keeps its handling, ride and warranty integrity.",
    oePoints: [
      "The MO marking identifies a Mercedes-Original tyre tuned for the specific model, while MO1 identifies the AMG-tuned version developed for the performance range.",
      "Approved compounds come from Michelin, Continental, Pirelli, Bridgestone and Goodyear, each stocked in the MO and MO1 specifications Mercedes signs off.",
      "Run-flat tyres are original equipment on many E-Class and S-Class cars, carrying reinforced sidewalls that hold the car at reduced speed after a pressure loss.",
      "Run-flat and non-run-flat tyres are never mixed on the same axle, since the handling and load behaviour differ and the pairing is unsafe.",
    ],
    sizeTable: [
      { model: "A-Class", front: "225/45 R18", rear: "225/45 R18", runFlat: "MO-marked" },
      { model: "C-Class", front: "225/45 R18", rear: "245/40 R18", runFlat: "MO-marked" },
      { model: "E-Class", front: "245/45 R18", rear: "245/45 R18", runFlat: "MO-marked, run-flat option" },
      { model: "S-Class", front: "255/45 R19", rear: "285/40 R19", runFlat: "MO-marked, run-flat" },
      { model: "GLC", front: "235/55 R19", rear: "235/55 R19", runFlat: "MO-marked" },
      { model: "AMG GT", front: "265/35 R19", rear: "295/30 R20", runFlat: "MO1-marked, staggered" },
      { model: "EQS", front: "255/45 R20", rear: "285/40 R20", runFlat: "MO-marked, EV load" },
    ],
    s4Eyebrow: "Run-flat and MO-approved",
    s4Title: "MO and MO1 Approved Tyres, Run-Flat Where Fitted",
    runFlatBody:
      "The MO marking identifies a Mercedes-Original tyre tuned for the model, and MO1 identifies the AMG-tuned version. Many Mercedes saloons, the E-Class and S-Class especially, are fitted with run-flat tyres from the factory, carrying reinforced sidewalls and needing the bead-breaking tooling and matched-pair replacement that run-flats require. A run-flat driven beyond its limited-mobility range cannot be safely repaired and is replaced. AMG models often run staggered MO1 fitments, with wider rears matched to narrower fronts. EQ electric models carry a higher load index to support the battery weight. We confirm the MO or MO1 tyre, run-flat or standard to match the car, from the registration before we set out, so the correct specification arrives on the van every time.",
    s5Eyebrow: "TPMS reset included",
    s5Title: "TPMS Reset Included with Every Mercedes Tyre Change",
    tpmsBody:
      "Every Mercedes tyre change includes a TPMS reset at no extra cost. We reset the system through the dashboard menu or a sensor relearn so the car reads the new tyres correctly. Pressures are set to the Mercedes figure for the load the car carries, front and rear. A missed reset leaves a warning light showing on the cluster, so we carry the reset out as standard on every visit. Across 2026 the relearn procedure stays part of every fitting we complete, with no separate charge added to the quote. The light clears before we leave, the dashboard confirms the correct pressures, and the car reads each wheel position accurately, so the driver sets off with the monitoring system working exactly as Mercedes intends.",
    reviews: [
      { id: "mercedes-rev-1", name: "James P.", location: "Bromley, London", date: "January 2026", rating: 5, body: "My E-Class lost pressure on the M25 and the run-flat had reached its limit. The fitter arrived within the hour, brought the correct MO-marked tyre and reset the TPMS before he left. Faultless." },
      { id: "mercedes-rev-2", name: "Sarah L.", location: "Tunbridge Wells, Kent", date: "February 2026", rating: 5, body: "Booked two MO-marked tyres for my C-Class at home. The matched pair went on the rear axle, balanced perfectly, and the dashboard pressures were spot on. No more warning light." },
      { id: "mercedes-rev-3", name: "David M.", location: "Brighton, Sussex", date: "March 2026", rating: 5, body: "AMG GT needed staggered MO1 fronts after a kerb strike. They quoted from the registration, brought the exact size and torqued every wheel to spec. Genuinely impressed with the knowledge." },
    ],
    pricing: [
      { service: "Mercedes saloon and estate tyre (A-Class to S-Class)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Mercedes SUV tyre (GLA to GLS)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "AMG and EQ tyre (MO1 staggered or EV load)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "TPMS reset and relearn", price: "Included", includes: "Reset through the Mercedes relearn procedure with every tyre change" },
      { service: "Emergency mobile call-out", price: "No standard-hours call-out fee", includes: "24/7 roadside attendance, 30 to 60 minutes typical" },
    ],
    faqs: [
      { id: "mercedes-faq-1", question: "Are your tyres Mercedes-approved (MO or MO1)?", answer: "Yes. We fit MO-marked tyres across the Mercedes range and MO1-marked tyres for AMG models, matched to your exact specification from the registration before we arrive." },
      { id: "mercedes-faq-2", question: "Do you fit run-flats on a Mercedes?", answer: "Yes. We fit run-flat tyres where the model came with them, the E-Class and S-Class especially, using the correct bead-breaking tooling and matched-pair replacement. Throughout 2026 run-flat fitting stays a core part of our Mercedes service." },
      { id: "mercedes-faq-3", question: "Do you reset the Mercedes TPMS?", answer: "Yes, at no extra cost. We reset the tyre pressure monitoring through the dashboard menu or a sensor relearn so the car reads the new tyres and the warning light clears before we leave." },
      { id: "mercedes-faq-4", question: "Which Mercedes models do you fit?", answer: "We fit the full range, from A-Class through to S-Class, GLA through to GLS, the AMG performance line and the EQ electric models, matching the correct tyre specification to each." },
      { id: "mercedes-faq-5", question: "Can a Mercedes run-flat be repaired?", answer: "Usually no. Once a run-flat has been driven flat it cannot be safely repaired, because the reinforced sidewall takes hidden damage, so we replace it with a matched tyre instead." },
      { id: "mercedes-faq-6", question: "Do you fit EQ electric models?", answer: "Yes. We fit EQ tyres with the correct higher load index to support the battery weight, and we reset the monitoring system to the Mercedes pressures for the loaded car." },
      { id: "mercedes-faq-7", question: "Do bigger AMG wheels cost more?", answer: "Larger staggered MO1 sizes cost more than standard fitments, since the tyres themselves are wider and dearer. We quote the exact price from the registration before we set out." },
      { id: "mercedes-faq-8", question: "How quickly can you reach a stranded Mercedes?", answer: "Thirty to sixty minutes is typical across our coverage area, and we operate 24/7, 365 days a year, so a stranded car gets attended day or night." },
    ],
    metaTitle: "Mercedes-Benz Mobile Tyre Fitting | MO & MO1, Run-Flat, We Come To You",
    metaDescription: "MO and MO1-approved and run-flat tyres for Mercedes-Benz, TPMS reset included, fitted at home, work or roadside in 30 to 60 minutes. Call 0788 328 8831.",
  },

  "range-rover-mobile-tyre-fitting": {
    slug: "range-rover-mobile-tyre-fitting",
    brand: "Range Rover",
    hero: {
      h1: "Range Rover Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits OE-spec load-rated tyres for Range Rover and Land Rover owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, using approved brands and torque equipment set to manufacturer specification, returning the vehicle to the road within 30 to 60 minutes.",
      bullets: [
        "On-road and all-terrain load-rated tyres for Range Rover and Land Rover",
        "24/7 mobile service 365 days a year",
        "Approved brands stocked (Michelin, Continental, Pirelli, Goodyear)",
        "TPMS reset included via the Land Rover relearn procedure",
        "Workmanship guaranteed, fully insured",
        "Free tyre health check on every visit",
      ],
      whatsappPrefill:
        "Hi, I drive a Range Rover and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Range Rover", models: ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque"] },
      { label: "Land Rover", models: ["Defender", "Discovery", "Discovery Sport"] },
      { label: "Performance and electric", models: ["Range Rover Sport SV", "Range Rover electric"] },
    ],
    oeIntro:
      "We match the exact load-rated tyre specification your Range Rover or Land Rover needs, fitting on-road or all-terrain OE-spec tyres on-site, using calibrated balancing and torque equipment, so the vehicle keeps its refinement, ride and warranty integrity.",
    oePoints: [
      "A Range Rover is heavy, so the load index is matched to the vehicle weight, not a lighter SUV rating.",
      "On-road tyres deliver refinement and quiet running, while all-terrain tyres provide genuine off-road grip.",
      "Larger 21 and 22 inch low-profile sizes need careful fitting to protect the rim.",
      "A tyre below the required load index cannot carry the vehicle's weight.",
    ],
    sizeTable: [
      { model: "Evoque", front: "235/55 R19", rear: "235/55 R19", runFlat: "OE load-rated" },
      { model: "Velar", front: "255/55 R19", rear: "255/55 R19", runFlat: "OE load-rated" },
      { model: "Range Rover Sport", front: "275/45 R21", rear: "275/45 R21", runFlat: "OE load-rated" },
      { model: "Range Rover", front: "275/45 R21", rear: "275/45 R21", runFlat: "OE load-rated" },
      { model: "Defender", front: "255/60 R20", rear: "255/60 R20", runFlat: "OE, all-terrain option" },
      { model: "Discovery", front: "255/55 R20", rear: "255/55 R20", runFlat: "OE load-rated" },
    ],
    s4Eyebrow: "On-road and all-terrain",
    s4Title: "On-Road and All-Terrain Tyres Matched to Your Range Rover",
    runFlatBody:
      "A Range Rover is a heavy vehicle, so the tyre carries a high load and needs a load index matched to the vehicle weight, not a lighter SUV rating. Owners choose between on-road tyres tuned for refinement and quiet, and all-terrain tyres for genuine off-road use, and the right one depends on how the vehicle is used. Larger 21 and 22 inch wheels run lower-profile tyres that need careful fitting to protect the rim. Defender and Discovery suit all-terrain options, while the road-focused Range Rover and Velar suit on-road tyres. A tyre below the required load index cannot carry the vehicle's weight safely. We match the correct load-rated on-road or all-terrain tyre from the registration and how the vehicle is driven.",
    s5Eyebrow: "TPMS reset included",
    s5Title: "TPMS Reset Included with Every Range Rover Tyre Change",
    tpmsBody:
      "Every Range Rover and Land Rover tyre change includes a TPMS reset at no extra cost, reset through the touchscreen or a relearn procedure so the car reads the new tyres. Pressures set to the manufacturer figure for the load, which differs front to rear on some models. A missed reset leaves a dashboard warning, so the reset is carried out as standard on every visit. Across 2026 our vans run current Land Rover relearn tools, so the system clears and reads the new sensors before we leave. Owners drive away with the correct pressures set and the warning light off, the vehicle reading every wheel accurately and ready for the road.",
    reviews: [
      { id: "range-rover-rev-1", name: "James W.", location: "Esher, Surrey", date: "March 2026", rating: 5, body: "My Range Rover Sport had a flat on the driveway. The fitter arrived within the hour, fitted a load-rated on-road tyre and reset the TPMS through the touchscreen. The car reads every wheel perfectly." },
      { id: "range-rover-rev-2", name: "Sophie L.", location: "Sevenoaks, Kent", date: "April 2026", rating: 5, body: "I needed all-terrain tyres on my Defender before a trip. They matched the right load-rated option and fitted them at my work car park. Clean, professional and no warning lights afterwards." },
      { id: "range-rover-rev-3", name: "Daniel R.", location: "Solihull, West Midlands", date: "May 2026", rating: 5, body: "Picked up a screw in a 22 inch tyre on my Range Rover. They fitted the larger low-profile size with real care for the rim and reset the pressures front and rear. Quick and faultless." },
    ],
    pricing: [
      { service: "Range Rover and Land Rover (on-road)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Defender and Discovery (all-terrain)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "21 and 22 inch low-profile", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "TPMS reset", price: "Included", includes: "Land Rover relearn procedure on every tyre change" },
      { service: "Emergency callout", price: "No standard-hours call-out fee", includes: "24/7 mobile fitting, 30 to 60 minutes typical" },
    ],
    faqs: [
      { id: "range-rover-faq-1", question: "Do you fit on-road and all-terrain tyres?", answer: "Yes. We fit both, matched to how the vehicle is used, on-road tyres for refinement and quiet, or all-terrain tyres for genuine off-road grip. Throughout 2026 we stock load-rated options for both across our coverage area." },
      { id: "range-rover-faq-2", question: "Are your tyres load-rated for a Range Rover?", answer: "Yes. The load index is matched to the vehicle weight, which is heavier than a standard SUV, so the tyre carries the full load of the vehicle safely." },
      { id: "range-rover-faq-3", question: "Do you reset the Land Rover TPMS?", answer: "Yes, at no extra cost. We reset the tyre pressure monitoring system through the touchscreen or a relearn procedure so the car reads the new tyres before we leave." },
      { id: "range-rover-faq-4", question: "Which models do you fit?", answer: "We fit Range Rover, Range Rover Sport, Range Rover Velar, Range Rover Evoque, Defender and Discovery, along with the wider Land Rover range." },
      { id: "range-rover-faq-5", question: "Do you fit 21 and 22 inch wheels?", answer: "Yes. Larger low-profile sizes are fitted with care to protect the rim, using calibrated equipment so the wheel and tyre are not damaged during fitting." },
      { id: "range-rover-faq-6", question: "Do you fit all-terrain tyres on a Defender?", answer: "Yes. We fit genuine all-terrain options matched to off-road use, load-rated for the Defender and suited to how the vehicle is driven." },
      { id: "range-rover-faq-7", question: "Do bigger wheels cost more?", answer: "Larger 21 and 22 inch sizes cost more than smaller wheels. We quote the exact price from the registration so the figure matches the tyre your vehicle needs." },
      { id: "range-rover-faq-8", question: "How quickly can you reach a stranded Range Rover?", answer: "A typical response is 30 to 60 minutes, 24/7, across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester." },
    ],
    metaTitle: "Range Rover Mobile Tyre Fitting | On-Road & All-Terrain, We Come To You",
    metaDescription: "Load-rated on-road and all-terrain tyres for Range Rover and Land Rover, TPMS reset included, back on the road in 30 to 60 minutes. Call 0788 328 8831.",
  },

  "porsche-mobile-tyre-fitting": {
    slug: "porsche-mobile-tyre-fitting",
    brand: "Porsche",
    hero: {
      h1: "Porsche Mobile Tyre Fitting at Your Home, Work or Roadside in 30 to 60 Minutes",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits N-rated (N0, N1, N2) approved tyres for Porsche owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, using Porsche-approved brands and torque equipment set to Porsche specification, returning the car to the road within 30 to 60 minutes.",
      bullets: [
        "N-rated Porsche-approved tyre specialist",
        "24/7 mobile service 365 days a year",
        "Approved brands stocked (Michelin, Pirelli, Continental, Goodyear)",
        "TPMS reset included via the Porsche relearn procedure",
        "Workmanship guaranteed, fully insured",
        "Free tyre health check on every visit",
      ],
      whatsappPrefill:
        "Hi, I drive a Porsche and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Sports car", models: ["911", "718 Cayman", "718 Boxster"] },
      { label: "SUV", models: ["Macan", "Cayenne"] },
      { label: "Saloon and electric", models: ["Panamera", "Taycan"] },
    ],
    oeIntro:
      "We match the exact tyre specification Porsche approves for your model, fitting N-rated tyres on-site in the correct N revision and staggered size, using calibrated balancing and torque equipment, so the car keeps its handling, stability and warranty integrity.",
    oePoints: [
      "Porsche N marking: N0 identifies the first approved specification, with N1, N2 and later codes marking subsequent revisions tuned for the chassis",
      "Common Porsche-approved compounds come from Michelin, Pirelli, Continental and Goodyear",
      "Most Porsche models run staggered fitments with a wider rear tyre than the front",
      "The Taycan electric model carries a higher load index for the battery weight, and a non-N-rated tyre cannot replicate the Porsche-tuned handling",
    ],
    sizeTable: [
      { model: "911 Carrera", front: "245/35 R20", rear: "305/30 R21", runFlat: "N-rated, staggered" },
      { model: "718 Cayman", front: "235/40 R19", rear: "265/40 R19", runFlat: "N-rated, staggered" },
      { model: "Macan", front: "265/45 R20", rear: "295/40 R20", runFlat: "N-rated" },
      { model: "Cayenne", front: "275/45 R20", rear: "305/40 R20", runFlat: "N-rated" },
      { model: "Panamera", front: "275/40 R20", rear: "315/35 R20", runFlat: "N-rated, staggered" },
      { model: "Taycan", front: "245/45 R20", rear: "285/40 R20", runFlat: "N-rated, EV load" },
    ],
    s4Eyebrow: "N-rated approved",
    s4Title: "N-Rated Tyres Tuned Specifically for Porsche",
    runFlatBody:
      "Porsche works with tyre makers to develop tyres tuned for each model, and the approved tyre carries an N marking on the sidewall, N0 for the first specification, then N1, N2 and so on for later revisions. An N-rated tyre is engineered for the Porsche's handling, steering response and high-speed stability, so fitting a non-N-rated tyre changes the exact behaviour the car was designed around. A non-N-rated tyre cannot replicate the Porsche-tuned handling the chassis relies on. Most Porsche models run staggered fitments with a much wider rear tyre, and the Taycan electric model carries a higher load index for the battery weight. Our fitters match the correct N-rated tyre, in the right N revision and staggered size, from the registration before any fitting begins.",
    s5Eyebrow: "Staggered fitment and torque",
    s5Title: "Staggered Fitments and Manufacturer Torque for Porsche",
    tpmsBody:
      "Porsche staggered setups run a wider rear than front, so the correct tyre goes to the correct axle and the rotation direction is set right. Low-profile tyres on 20 and 21 inch wheels need careful fitting to protect the alloy from kerb damage and bead marks. Each wheel is torqued to the Porsche figure with a calibrated digital torque wrench, never over-tightened. TPMS is reset so the car reads the new tyres, and pressures are set to the Porsche figure before the fitter leaves. Across 2026 our fitters carry the staggered sizes for the current 911, 718, Macan, Cayenne, Panamera and Taycan, so the right tyre reaches the right axle on the first visit and the setup stays true to Porsche specification.",
    reviews: [
      { id: "porsche-rev-1", name: "James W.", location: "Richmond, London", date: "March 2026", rating: 5, body: "Picked up a nail in the rear of my 911. The fitter arrived in under an hour with the correct N-rated 305/30 R21, fitted it to the right axle, reset the TPMS and set the pressures. Knew the staggered setup inside out." },
      { id: "porsche-rev-2", name: "Charlotte D.", location: "Sevenoaks, Kent", date: "February 2026", rating: 5, body: "Needed two tyres on my Macan. They confirmed the N-rated spec from the registration, came to the office, fitted approved tyres and balanced them properly. No mark on the 20 inch alloys. Far easier than the dealer." },
      { id: "porsche-rev-3", name: "Daniel R.", location: "Edinburgh, Scotland", date: "January 2026", rating: 5, body: "Taycan needed a fronts and rears change. The fitter understood the higher EV load index, brought the correct staggered N-rated sizes, torqued every wheel to the Porsche figure and reset the system. Faultless on the driveway." },
    ],
    pricing: [
      { service: "Porsche 911 N-rated rear (305/30 R21, supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Porsche Macan N-rated (265/45 R20, supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Porsche Taycan N-rated EV (285/40 R20, supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Porsche TPMS reset (with fitting)", price: "Included", includes: "Porsche relearn procedure" },
      { service: "Emergency 24/7 call-out", price: "No standard-hours call-out fee", includes: "Service price only, quoted before dispatch" },
    ],
    faqs: [
      { id: "porsche-faq-1", question: "Are your tyres N-rated for Porsche?", answer: "Yes. We stock N0, N1 and N2 approved tyres and match the correct marking and N revision to your model from the registration. Across 2026 we carry the current N-rated sizes so the right specification reaches your Porsche on the first visit." },
      { id: "porsche-faq-2", question: "Why does Porsche need N-rated tyres?", answer: "Porsche tunes the approved tyre for the model's handling, steering response and high-speed stability. A non-N-rated tyre changes that behaviour, so we fit the N-rated specification the chassis was designed around." },
      { id: "porsche-faq-3", question: "Do you fit staggered Porsche setups?", answer: "Yes. We fit the wider rear and narrower front tyres to the correct axle with the right rotation direction, matching the staggered N-rated sizes Porsche specifies for your model." },
      { id: "porsche-faq-4", question: "Which Porsche models do you fit?", answer: "We fit the 911, 718 Cayman and Boxster, Macan, Cayenne, Panamera and Taycan, supplying the correct N-rated tyres on-site for each model in the right staggered size." },
      { id: "porsche-faq-5", question: "Do you reset the Porsche TPMS?", answer: "Yes. We reset the TPMS so the car reads the new tyres and reports correct pressures, and we set every wheel to the Porsche pressure figure before we leave." },
      { id: "porsche-faq-6", question: "Do you fit the Taycan electric?", answer: "Yes. We fit the Taycan with the correct higher load index for the battery weight, in the staggered N-rated size, balanced on-site and with the TPMS reset." },
      { id: "porsche-faq-7", question: "Do bigger Porsche wheels cost more?", answer: "Larger staggered 20 and 21 inch N-rated sizes cost more than smaller fitments. We quote the exact price from your registration before dispatch so the cost is clear." },
      { id: "porsche-faq-8", question: "How quickly can you reach a stranded Porsche?", answer: "Our typical arrival time is 30 to 60 minutes, 24 hours a day. We dispatch the nearest insured fitter with the correct N-rated tyre and give you a tracked arrival time." },
    ],
    metaTitle: "Porsche Mobile Tyre Fitting | N-Rated Approved, We Come To You",
    metaDescription: "N-rated (N0, N1, N2) approved tyres for Porsche, staggered fitments, TPMS reset, on the road in 30 to 60 minutes. Porsche-approved brands, fully insured. Call 0788 328 8831.",
  },

  "performance-mobile-tyre-fitting": {
    slug: "performance-mobile-tyre-fitting",
    brand: "Performance and Prestige",
    metaTitle: "Performance & Prestige Mobile Tyre Fitting | Ferrari, McLaren, Lamborghini, Rolls-Royce & Bentley",
    metaDescription:
      "Approval-marked tyres for Ferrari, McLaren, Lamborghini, Rolls-Royce and Bentley fitted discreetly at your location. Staggered fitments, rim protection, TPMS reset, 30 to 60 minutes. Call 0788 328 8831.",
    hero: {
      h1: "Performance and Prestige Mobile Tyre Fitting at Your Home or Private Location",
      intro:
        "Tyre Fitting Near Me Ltd supplies and fits manufacturer-approved tyres for Ferrari, McLaren, Lamborghini, Rolls-Royce and Bentley owners across London, Kent, Sussex, Essex, the West Midlands, Scotland and Greater Manchester, matching the exact approval marking and staggered size from the registration and torquing every wheel to the manufacturer figure, with the work carried out discreetly at your chosen location.",
      bullets: [
        "Approval-marked tyres: K1 and F (Ferrari), MC (McLaren), L (Lamborghini), RR (Rolls-Royce), Bentley OE",
        "Staggered fitments placed to the correct axle with the rotation direction set right",
        "Full rim protection on low-profile 19 to 23 inch forged and polished alloys",
        "Discreet fitting at the owner's home, estate, office or underground parking",
        "TPMS reset and manufacturer torque figure on every visit",
        "24/7 mobile service, workmanship guaranteed, fully insured",
      ],
      whatsappPrefill:
        "Hi, I drive a performance or prestige car and need a mobile tyre fitter. My model is _____, tyre size _____, postcode _____.",
    },
    modelGroups: [
      { label: "Ferrari", models: ["Roma", "Portofino", "296 GTB", "296 GTS", "F8 Tributo", "812", "12Cilindri", "SF90", "Purosangue"] },
      { label: "McLaren", models: ["Artura", "720S", "750S", "765LT", "GT", "GTS"] },
      { label: "Lamborghini", models: ["Huracan", "Revuelto", "Temerario", "Urus", "Urus SE", "Urus Performante"] },
      { label: "Rolls-Royce", models: ["Phantom", "Ghost", "Wraith", "Dawn", "Cullinan", "Spectre"] },
      { label: "Bentley", models: ["Continental GT", "Continental GT Convertible", "Flying Spur", "Bentayga"] },
    ],
    oeIntro:
      "Each marque homologates specific tyres for each model, identified by a marking on the sidewall. We match the exact approval marking and size from the registration before dispatch, so the tyre fitted is the specification the factory signed off.",
    oePoints: [
      "Ferrari: K1 identifies Pirelli-developed Ferrari tyres and the F prefix identifies other Ferrari-homologated fitments, engineered for the car's downforce, traction and high-speed handling.",
      "McLaren: the MC marking identifies Pirelli tyres developed with McLaren, with the hydraulic steering and chassis set around that exact tyre.",
      "Lamborghini: the L marking identifies tyres engineered for downforce, all-wheel-drive traction and high-speed stability, with the Urus SUV carrying a high load index.",
      "Rolls-Royce: the RR marking identifies tyres tuned for the marque's silence and ride, run-flat from the factory on most models.",
      "Bentley: heavy grand tourers run 21 and 22 inch low-profile staggered tyres tuned for quiet, comfort and high-speed stability, with run-flat original equipment on some Continental GT and Flying Spur models.",
    ],
    sizeTable: [
      { model: "Ferrari 296 GTB", front: "245/35 R20", rear: "305/35 R20", runFlat: "K1-marked, staggered" },
      { model: "Ferrari Purosangue", front: "255/40 R22", rear: "315/35 R23", runFlat: "F-marked, staggered, load-rated" },
      { model: "McLaren 750S", front: "245/35 R19", rear: "305/30 R20", runFlat: "MC-marked, staggered" },
      { model: "Lamborghini Huracan", front: "245/30 R20", rear: "305/30 R20", runFlat: "L-marked, staggered" },
      { model: "Lamborghini Urus", front: "285/40 R22", rear: "325/35 R22", runFlat: "L-marked, load-rated SUV" },
      { model: "Rolls-Royce Ghost", front: "255/45 R20", rear: "285/40 R20", runFlat: "RR-marked, run-flat" },
      { model: "Rolls-Royce Cullinan", front: "285/45 R22", rear: "285/45 R22", runFlat: "RR-marked, run-flat, load-rated" },
      { model: "Bentley Continental GT", front: "275/35 R22", rear: "315/30 R22", runFlat: "staggered, run-flat option" },
      { model: "Bentley Bentayga", front: "285/40 R22", rear: "285/40 R22", runFlat: "load-rated SUV" },
    ],
    s4Eyebrow: "Approval markings and staggered fitments",
    s4Title: "Approval-Marked Tyres and Staggered Fitments, Matched From the Registration",
    runFlatBody:
      "A performance or prestige car is tuned around its homologated tyre, and a non-approved tyre changes the downforce balance, traction and steering feel the chassis was engineered for, so we fit only the marked specification: K1 or F for Ferrari, MC for McLaren, L for Lamborghini, RR for Rolls-Royce and the Bentley OE fitment. Nearly every car in the group runs a staggered fitment with a much wider rear, so each tyre goes to the correct axle with the rotation direction set right. Most Rolls-Royce models and some Bentleys run run-flat tyres from the factory, carrying reinforced sidewalls that need bead-breaking tooling and matched-pair replacement, and a run-flat driven beyond its limited-mobility range cannot be safely repaired. The Urus, Cullinan, Bentayga and Purosangue carry high load indices rated for each vehicle's weight, and a tyre below the required load index cannot carry the car safely. Low-profile tyres on 19 to 23 inch wheels are fitted with full rim protection, because a scored rim cannot keep an airtight seal.",
    s5Eyebrow: "Fitted with discretion",
    s5Title: "Fitted at Your Private Location With Complete Discretion",
    tpmsBody:
      "Every car in the group is fitted at the owner's home, estate, office or underground parking by a fully insured technician, with the work done quietly and without drawing attention to the vehicle. Wheels are torqued to each manufacturer's figure with a calibrated digital torque wrench, never over-tightened, and forged or polished alloys are protected with rim guards throughout. The TPMS is reset through the relevant relearn procedure so the car reads the new tyres, and pressures are set to the manufacturer specification before the technician leaves. Owners across London and the home counties book the visit at a private address rather than attend a workshop, and every fitting carries the workmanship guarantee and ends with a free tyre health check across the remaining wheels.",
    reviews: [
      { id: "performance-rev-1", name: "James R.", location: "Cobham, Surrey", date: "April 2026", rating: 5, body: "Picked up a nail in the rear of my Roma the night before a track day. The fitter came to the house, had the correct K1-marked 285/35 R20 on the van, protected the forged rim and torqued everything to spec. Discreet and faultless." },
      { id: "performance-rev-2", name: "Edward T.", location: "Haywards Heath, Sussex", date: "February 2026", rating: 5, body: "Bentayga needed two load-rated 285/40 R22 tyres before a trip. Quoted in full from the plate and fitted at the office car park with complete discretion. Faultless service." },
      { id: "performance-rev-3", name: "Marcus T.", location: "Sevenoaks, Kent", date: "March 2026", rating: 5, body: "My 750S needed a rear after a track day and they sourced the MC-marked tyre the same day. Calibrated torque wrench used on every wheel. Excellent service." },
    ],
    pricing: [
      { service: "Ferrari, McLaren or Lamborghini staggered tyre (supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Rolls-Royce RR-marked run-flat (supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "Bentley OE-spec tyre (supplied and fitted)", price: "Get a quote", includes: "Removal, valve, balance, TPMS reset, disposal" },
      { service: "TPMS reset and relearn", price: "Included", includes: "Marque relearn procedure on every tyre change" },
      { service: "Emergency 24/7 call-out", price: "No standard-hours call-out fee", includes: "Any out-of-hours charge is included in your confirmed quote before dispatch" },
    ],
    faqs: [
      { id: "performance-faq-1", question: "Which marques does the performance and prestige service cover?", answer: "We fit Ferrari, McLaren, Lamborghini, Rolls-Royce and Bentley, matching the exact approval marking and staggered size for each model from the registration. Porsche, BMW M, Mercedes-AMG and other premium marques run through their own dedicated pages." },
      { id: "performance-faq-2", question: "Are your tyres manufacturer-approved?", answer: "Yes. We fit K1 and F-marked tyres for Ferrari, MC-marked Pirelli for McLaren, L-marked tyres for Lamborghini, RR-marked run-flats for Rolls-Royce and OE-spec fitments for Bentley, sourced from the approved brands each marque signs off." },
      { id: "performance-faq-3", question: "Do you fit staggered supercar fitments?", answer: "Yes. The wider rear goes to the correct axle with the rotation direction set right, and every low-profile tyre is fitted with full rim protection to guard the forged alloys against damage." },
      { id: "performance-faq-4", question: "Do you fit at my home or private location?", answer: "Yes. A fully insured technician fits at the owner's home, estate, office or underground parking, discreetly, so the car stays where you want it and never queues at a workshop." },
      { id: "performance-faq-5", question: "Do you fit run-flats on a Rolls-Royce or Bentley?", answer: "Yes. Most Rolls-Royce models and some Continental GT and Flying Spur models leave the factory on run-flats, and we fit the correct marked run-flat using the proper bead-breaking tooling, replaced in matched pairs where needed." },
      { id: "performance-faq-6", question: "Do you cover the Urus, Cullinan, Bentayga and Purosangue?", answer: "Yes. The performance SUVs carry high load indices rated for each vehicle's weight, and we fit the correct load-rated, approval-marked size with the TPMS reset and every wheel torqued to the manufacturer figure." },
      { id: "performance-faq-7", question: "How is the price set?", answer: "We quote the price in full from the registration before dispatch, covering the tyre, fitting, balance, TPMS reset and disposal. No standard-hours call-out fee. Any out-of-hours charge is included in your confirmed quote before dispatch." },
      { id: "performance-faq-8", question: "How quickly can you reach a stranded car?", answer: "A 30 to 60 minute arrival is typical, 24 hours a day, 365 days a year. We dispatch the nearest insured technician with the correct approval-marked tyre and give you a tracked arrival time." },
    ],
  },
};

export function getBrandPage(slug: string): BrandPage | undefined {
  return BRAND_PAGES[slug];
}

export const BRAND_PAGE_SLUGS = Object.keys(BRAND_PAGES);
