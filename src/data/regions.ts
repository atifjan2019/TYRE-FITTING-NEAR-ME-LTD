/**
 * Region data for the regional tier of the /areas hierarchy.
 *
 * The topical tree is: /areas (hub) > /areas/[region] (this file) > /areas/[town]
 * (the file-driven town pages in `areas.ts`). A region is a CONNECTOR tier: it
 * frames coverage across a county/region, links DOWN to the live town pages and
 * the money pages, and UP to the pillar and the /areas hub. It deliberately
 * carries no town-level street detail and no full service copy, so it never
 * duplicates the town or service pages.
 *
 * Live towns (a built /areas/[town] page) are derived from LIVE_AREAS so the two
 * stay in sync automatically. Towns without a built page render as plain,
 * non-linked chips (never a 404). All geography here is real (postcode areas,
 * motorways and A-roads, town names); nothing is invented.
 */

import { LIVE_AREAS, type Area } from "@/data/areas";

export interface RegionTown {
  name: string;
  /** Present only when a live /areas/[slug] town page exists. */
  slug?: string;
  postcodes: string[];
}

export interface Region {
  slug: string;
  /** Display name used in copy and the H1, e.g. "London". */
  name: string;
  /** Postcode AREAS spanned (leading letters), e.g. "SE", "BR". */
  postcodeAreas: string[];
  /** Motorways and major A-roads served across the region. */
  roads: string[];
  /** One genuine regional context note (the motorway-spine / character angle). */
  contextNote: string;
  /**
   * A second genuine regional paragraph: the postcode-area and town spread.
   * Distinct angle from `contextNote` (which carries the motorway spine), this
   * gives sparse regions a real-geography second paragraph so the overview holds
   * unique weight even where no town pages are built yet.
   */
  overviewExtra: string;
  /** Two largest/most-recognised towns, named in the regional FAQ. */
  headlineTowns: [string, string];
  /**
   * Skeleton-variant selector, unique per region (0 to 5). Drives the per-region
   * phrasing of the shared overview, why-choose and FAQ sentences so no two
   * regions share an identical sentence skeleton once the data is filled. Mixed
   * modulo lengths (a length-3 and a length-2 selector) guarantee every region's
   * combination of variants is distinct.
   */
  variant: number;
  /** Towns covered: live ones link to /areas/[slug], the rest are plain text. */
  towns: RegionTown[];
}

/** Live town pages that sit within the London region (the SE London cluster). */
const LONDON_LIVE_TOWNS: RegionTown[] = LIVE_AREAS.filter(
  (a: Area) => a.region === "South East London"
).map((a) => ({ name: a.town, slug: a.slug, postcodes: a.postcodes }));

/**
 * The six regions, in render order. London is the only region with built town
 * pages today (the SE London cluster); the other five list their real towns as
 * not-built chips until town pages are published.
 */
export const REGIONS: Region[] = [
  {
    slug: "london",
    name: "London",
    postcodeAreas: ["SE", "BR", "DA", "CR", "SM"],
    roads: ["A2", "A20", "A21", "South Circular (A205)", "A102 Blackwall Tunnel approach"],
    contextNote:
      "South East London traffic funnels through a handful of slow gyratories and the South Circular, so a fitter reaching a home or workplace beats a cross-borough run to a tyre garage on most days.",
    overviewExtra:
      "The dedicated town pages cluster across the SE postcodes in South East London, with BR, DA, CR and SM wrapping the Kent and Surrey fringe, so coverage runs dense across the south east rather than thinly across the whole capital.",
    headlineTowns: ["Bromley", "Greenwich"],
    variant: 0,
    towns: [
      ...LONDON_LIVE_TOWNS,
      { name: "Croydon", postcodes: ["CR0"] },
      { name: "Sutton", postcodes: ["SM1"] },
      { name: "Woolwich", postcodes: ["SE18"] },
    ],
  },
  {
    slug: "kent",
    name: "Kent",
    postcodeAreas: ["CT", "ME", "TN", "DA"],
    roads: ["M20", "M2", "M26", "A2", "A20", "A229"],
    contextNote:
      "Kent carries heavy freight on the M20 and M2 toward Dover and the Eurotunnel terminal, so roadside and depot cover along those corridors runs alongside home fitting in the county towns.",
    overviewExtra:
      "The county splits between the Medway towns in ME, Canterbury and the coast in CT, west Kent around Tonbridge and Tunbridge Wells in TN, and the Dartford edge in DA, a wide spread that a mobile fitter covers without a county driver facing a long garage detour.",
    headlineTowns: ["Maidstone", "Canterbury"],
    variant: 1,
    towns: [
      { name: "Maidstone", postcodes: ["ME14", "ME15", "ME16"] },
      { name: "Canterbury", postcodes: ["CT1"] },
      { name: "Ashford", postcodes: ["TN23", "TN24"] },
      { name: "Dartford", postcodes: ["DA1"] },
      { name: "Sevenoaks", postcodes: ["TN13"] },
      { name: "Tunbridge Wells", postcodes: ["TN1", "TN2"] },
      { name: "Gillingham", postcodes: ["ME7"] },
      { name: "Tonbridge", postcodes: ["TN9"] },
    ],
  },
  {
    slug: "sussex",
    name: "Sussex",
    postcodeAreas: ["BN", "RH", "TN"],
    roads: ["A23", "M23", "A27", "A259", "A24"],
    contextNote:
      "The A27 links the Sussex coast from Brighton to Worthing and Eastbourne, while the A23 and M23 run north to Gatwick and Crawley, so coverage spans both the seafront towns and the commuter belt.",
    overviewExtra:
      "Coverage stretches along the BN coast from Brighton and Hove to Eastbourne, north through the RH commuter belt around Crawley and Horsham toward Gatwick, and east into TN around Hastings, so seafront and commuter-belt drivers are reached alike.",
    headlineTowns: ["Brighton", "Crawley"],
    variant: 2,
    towns: [
      { name: "Brighton", postcodes: ["BN1", "BN2"] },
      { name: "Hove", postcodes: ["BN3"] },
      { name: "Worthing", postcodes: ["BN11"] },
      { name: "Crawley", postcodes: ["RH10", "RH11"] },
      { name: "Eastbourne", postcodes: ["BN21"] },
      { name: "Hastings", postcodes: ["TN34"] },
      { name: "Horsham", postcodes: ["RH12"] },
      { name: "Lewes", postcodes: ["BN7"] },
    ],
  },
  {
    slug: "essex",
    name: "Essex",
    postcodeAreas: ["CM", "CO", "SS", "RM"],
    roads: ["M25", "A12", "A13", "A127", "A130"],
    contextNote:
      "Essex commuter traffic loads the A12 and A127 toward London and the M25, while the A13 and the Southend corridor carry the coastal towns, so home, workplace and roadside fitting all see steady demand.",
    overviewExtra:
      "The county runs from Chelmsford and Harlow in CM, through Colchester in CO, down to Basildon and Southend in SS and the Romford edge in RM, a broad spread where home, workplace and roadside jobs all keep a fitter busy.",
    headlineTowns: ["Chelmsford", "Southend-on-Sea"],
    variant: 3,
    towns: [
      { name: "Chelmsford", postcodes: ["CM1", "CM2"] },
      { name: "Colchester", postcodes: ["CO1"] },
      { name: "Basildon", postcodes: ["SS14"] },
      { name: "Southend-on-Sea", postcodes: ["SS1", "SS2"] },
      { name: "Brentwood", postcodes: ["CM14"] },
      { name: "Romford", postcodes: ["RM1"] },
      { name: "Harlow", postcodes: ["CM17", "CM20"] },
      { name: "Braintree", postcodes: ["CM7"] },
    ],
  },
  {
    slug: "west-midlands",
    name: "Birmingham and the West Midlands",
    postcodeAreas: ["B", "CV", "DY", "WS", "WV"],
    roads: ["M6", "M5", "M42", "M6 Toll", "A38", "A45"],
    contextNote:
      "The West Midlands sits inside the M6, M5 and M42 box around Spaghetti Junction, one of the busiest interchanges in the country, so motorway roadside cover runs alongside home and fleet fitting across the conurbation.",
    overviewExtra:
      "The conurbation gathers Birmingham across the B postcodes, Coventry in CV, and the Black Country towns of Dudley, Walsall and Wolverhampton in DY, WS and WV, with Sutton Coldfield to the north, a dense urban spread served from bases inside the motorway box.",
    headlineTowns: ["Birmingham", "Coventry"],
    variant: 4,
    towns: [
      { name: "Birmingham", postcodes: ["B1", "B2"] },
      { name: "Solihull", postcodes: ["B91"] },
      { name: "Coventry", postcodes: ["CV1"] },
      { name: "Wolverhampton", postcodes: ["WV1"] },
      { name: "Walsall", postcodes: ["WS1"] },
      { name: "Dudley", postcodes: ["DY1"] },
      { name: "Sutton Coldfield", postcodes: ["B72", "B73"] },
      { name: "West Bromwich", postcodes: ["B70"] },
    ],
  },
  {
    slug: "scotland",
    name: "Scotland",
    postcodeAreas: ["G", "EH", "ML", "PA", "KA", "FK"],
    roads: ["M8", "M74", "M77", "M73", "A9", "A90"],
    contextNote:
      "The M8 ties Glasgow to Edinburgh through the central belt where most of the population sits, with the M74 and M77 feeding the southern approaches, so coverage concentrates on the belt and its commuter towns.",
    overviewExtra:
      "Coverage concentrates on the central belt, with Glasgow across G, Edinburgh in EH, the Lanarkshire towns of Hamilton, Motherwell and East Kilbride in ML and G, Paisley in PA and Livingston on the EH fringe, where the bulk of the population and the daily commute sits.",
    headlineTowns: ["Glasgow", "Edinburgh"],
    variant: 5,
    towns: [
      { name: "Glasgow", postcodes: ["G1", "G2"] },
      { name: "Edinburgh", postcodes: ["EH1"] },
      { name: "Paisley", postcodes: ["PA1"] },
      { name: "East Kilbride", postcodes: ["G74"] },
      { name: "Hamilton", postcodes: ["ML3"] },
      { name: "Motherwell", postcodes: ["ML1"] },
      { name: "Cumbernauld", postcodes: ["G67"] },
      { name: "Livingston", postcodes: ["EH54"] },
    ],
  },
];

/** Look up a region by slug. Returns undefined for unknown slugs. */
export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

/** All region slugs, for routing and link guards. */
export const REGION_SLUGS: string[] = REGIONS.map((r) => r.slug);

/** Set of region slugs for O(1) membership checks. */
export const REGION_SLUG_SET = new Set(REGION_SLUGS);
