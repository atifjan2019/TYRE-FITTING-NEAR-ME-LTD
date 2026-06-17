/**
 * Area data for the /areas location system.
 *
 * The per-town unique value comes from these REAL data fields (postcodes,
 * neighbours, roads), woven into a shared template. We deliberately do NOT
 * free-write distinct local-description prose per town, because mass-generated
 * local copy reads as a doorway page and triggers scaled-content-abuse
 * penalties. The variation lives in the data, not in 50 hand-written essays.
 *
 * Only `status: "live"` areas are built, linked and added to the sitemap.
 *
 * More clusters (SW London, Kent, Sussex, Essex, West Midlands, Scotland) are
 * added to this array in later batches with `status: "pending"` until their
 * pages have been verified and published, at which point they flip to "live".
 */

export interface Area {
  slug: string; // url segment, e.g. "catford"
  town: string; // display name, e.g. "Catford"
  region: string; // e.g. "South East London"
  cluster: string; // grouping key, e.g. "se-london"
  postcodes: string[]; // e.g. ["SE6"]
  neighbours: string[]; // real neighbouring areas
  roads: string[]; // real local roads / landmarks
  status: "live" | "pending"; // only "live" pages are built, linked and in the sitemap
}

export const AREAS: Area[] = [
  // --- Batch 1: South East London (all live) --------------------------------
  {
    slug: "bromley",
    town: "Bromley",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["BR1", "BR2"],
    neighbours: ["Bickley", "Shortlands", "Sundridge", "Hayes"],
    roads: ["A21", "A222", "Bromley High Street"],
    status: "live",
  },
  {
    slug: "lewisham",
    town: "Lewisham",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE13"],
    neighbours: ["Ladywell", "Hither Green", "Blackheath", "Catford"],
    roads: ["A20", "South Circular (A205)", "Lewisham High Street"],
    status: "live",
  },
  {
    slug: "catford",
    town: "Catford",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE6"],
    neighbours: ["Bellingham", "Hither Green", "Rushey Green", "Forest Hill"],
    roads: ["South Circular (A205)", "A21", "Bromley Road"],
    status: "live",
  },
  {
    slug: "greenwich",
    town: "Greenwich",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE10"],
    neighbours: ["Blackheath", "Deptford", "Charlton", "Maze Hill"],
    roads: ["A2", "A206", "Blackwall Tunnel approach"],
    status: "live",
  },
  {
    slug: "charlton",
    town: "Charlton",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE7"],
    neighbours: ["Woolwich", "Blackheath", "Greenwich", "Kidbrooke"],
    roads: ["A206", "A102", "Woolwich Road"],
    status: "live",
  },
  {
    slug: "sydenham",
    town: "Sydenham",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE26"],
    neighbours: ["Forest Hill", "Crystal Palace", "Penge", "Bell Green"],
    roads: ["A212", "South Circular (A205)", "Sydenham Road"],
    status: "live",
  },
  {
    slug: "crystal-palace",
    town: "Crystal Palace",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE19"],
    neighbours: ["Gipsy Hill", "Anerley", "Upper Norwood", "Penge"],
    roads: ["A212", "A214", "Crystal Palace Parade"],
    status: "live",
  },
  {
    slug: "forest-hill",
    town: "Forest Hill",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE23"],
    neighbours: ["Sydenham", "Honor Oak", "Catford", "Dulwich"],
    roads: ["South Circular (A205)", "Stanstead Road"],
    status: "live",
  },
  {
    slug: "penge",
    town: "Penge",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE20"],
    neighbours: ["Anerley", "Beckenham", "Sydenham", "Crystal Palace"],
    roads: ["A234", "A213", "Penge High Street"],
    status: "live",
  },
  {
    slug: "beckenham",
    town: "Beckenham",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["BR3"],
    neighbours: ["Penge", "West Wickham", "Elmers End", "Shortlands"],
    roads: ["A222", "A214", "Beckenham High Street"],
    status: "live",
  },
  {
    slug: "orpington",
    town: "Orpington",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["BR6"],
    neighbours: ["Petts Wood", "Chelsfield", "Farnborough", "St Mary Cray"],
    roads: ["A21", "A224", "A232"],
    status: "live",
  },
  {
    slug: "bexley",
    town: "Bexley",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["DA5"],
    neighbours: ["Bexleyheath", "Sidcup", "Crayford", "Welling"],
    roads: ["A2", "A223", "Bexley High Street"],
    status: "live",
  },
  {
    slug: "sidcup",
    town: "Sidcup",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["DA14", "DA15"],
    neighbours: ["Bexley", "Eltham", "Foots Cray", "Blackfen"],
    roads: ["A20", "A222", "Sidcup High Street"],
    status: "live",
  },
  {
    slug: "eltham",
    town: "Eltham",
    region: "South East London",
    cluster: "se-london",
    postcodes: ["SE9"],
    neighbours: ["Mottingham", "Kidbrooke", "Falconwood", "New Eltham"],
    roads: ["A20", "South Circular (A205)", "Eltham High Street"],
    status: "live",
  },
];

/** Region display names keyed by cluster, in render order on the hub. */
export const CLUSTER_LABELS: Record<string, string> = {
  "se-london": "South East London",
};

/** Live areas only (built, linked, in the sitemap). */
export const LIVE_AREAS: Area[] = AREAS.filter((a) => a.status === "live");

/** Look up a live area by slug. Returns undefined for pending/unknown slugs. */
export function getLiveArea(slug: string): Area | undefined {
  return LIVE_AREAS.find((a) => a.slug === slug);
}

/** Map of live town display name (lower-case) to slug, for neighbour linking. */
export const LIVE_TOWN_SLUG_BY_NAME: Record<string, string> = Object.fromEntries(
  LIVE_AREAS.map((a) => [a.town.toLowerCase(), a.slug])
);
