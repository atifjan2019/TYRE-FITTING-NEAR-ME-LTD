/**
 * Area data for the /areas location system.
 *
 * The per-town unique value comes from REAL data fields (postcodes, neighbours,
 * roads, landmarks) plus a town-specific localNote, scenario and localFaq. These
 * provide genuine information gain per page. We do NOT mass-generate freehand
 * local essays, which read as doorway pages and trigger scaled-content penalties;
 * `variant` selects sentence phrasing so the shared skeleton does not fingerprint.
 *
 * Only `status: "live"` areas are built, linked and added to the sitemap. More
 * clusters (SW London, Kent, Sussex, Essex, West Midlands, Scotland) are added in
 * later batches with `status: "pending"` until their pages are verified and
 * published, at which point they flip to "live".
 */

export interface Area {
  slug: string;
  town: string;
  region: string;
  cluster: string;
  postcodes: string[];
  neighbours: string[];        // real adjacent areas (coverage + sideways links)
  roads: string[];             // real arterial roads / corridors
  landmarks: string[];         // real local anchors (stations, parks, retail)
  localNote: string;           // unique-information-gain field, town-specific
  scenario: { road: string; vehicle: string; situation: string; outcome: string };
  emphasis: "emergency" | "fitting" | "van";  // foregrounded service, by real local character
  localFaq: { q: string; a: string };         // one town-specific FAQ
  variant: 0 | 1 | 2;          // selects sentence phrasing, breaks skeleton fingerprint
  status: "live" | "pending";
}

export const areas: Area[] = [
  {
    slug: "bromley", town: "Bromley", region: "South East London", cluster: "se-london",
    postcodes: ["BR1", "BR2"],
    neighbours: ["Bickley", "Shortlands", "Sundridge", "Hayes"],
    roads: ["A21", "A222", "Kentish Way", "Bromley High Street"],
    landmarks: ["The Glades", "Bromley South station", "Bromley North station", "Church House Gardens"],
    localNote: "Bromley town centre's one-way system around Kentish Way and the High Street clogs at peak, so a fitter coming to a home or an office car park near The Glades avoids the slow crawl into town for a garage slot.",
    scenario: { road: "A21", vehicle: "commuter car", situation: "a sidewall split picked up near Bromley South during the morning rush", outcome: "fitted at the office car park off the High Street and rolling again by lunch" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Bromley South and the town centre?", a: "Yes, across BR1 around The Glades and Bromley South station, and BR2 toward Hayes and Bickley." },
    variant: 0, status: "live"
  },
  {
    slug: "lewisham", town: "Lewisham", region: "South East London", cluster: "se-london",
    postcodes: ["SE13"],
    neighbours: ["Ladywell", "Hither Green", "Blackheath", "Catford"],
    roads: ["A20", "South Circular (A205)", "Loampit Vale", "Lewisham High Street"],
    landmarks: ["Lewisham Shopping Centre", "Lewisham station", "Lewisham Hospital", "Ladywell Fields"],
    localNote: "The Lewisham gyratory around the High Street and Loampit Vale is one of SE London's busiest junctions, so on-street or workplace fitting beats queuing through the town centre to reach a tyre garage.",
    scenario: { road: "A20", vehicle: "delivery van", situation: "a slow puncture that had gone flat overnight", outcome: "fitted on the driveway before the first drop of the day" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Lewisham Hospital and the station area?", a: "Yes, across SE13 including the hospital, Lewisham station, Loampit Vale, and toward Ladywell and Hither Green." },
    variant: 1, status: "live"
  },
  {
    slug: "catford", town: "Catford", region: "South East London", cluster: "se-london",
    postcodes: ["SE6"],
    neighbours: ["Bellingham", "Hither Green", "Rushey Green", "Forest Hill"],
    roads: ["South Circular (A205)", "A21", "Bromley Road", "Rushey Green"],
    landmarks: ["Catford Bridge station", "Catford station", "the Catford Cat", "Mountsfield Park"],
    localNote: "The South Circular through Catford and the Rushey Green junction back up heavily through the day, so a driver with a flat is better served by a fitter reaching them than crawling the A205 to a tyre shop.",
    scenario: { road: "South Circular (A205)", vehicle: "family car", situation: "a kerbed alloy and a slow leak after the Rushey Green junction", outcome: "fitted outside the home off Bromley Road with no detour" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Catford and Rushey Green?", a: "Yes, across SE6 including Catford Bridge, Rushey Green, and toward Bellingham and Hither Green." },
    variant: 2, status: "live"
  },
  {
    slug: "greenwich", town: "Greenwich", region: "South East London", cluster: "se-london",
    postcodes: ["SE10"],
    neighbours: ["Blackheath", "Deptford", "Charlton", "Maze Hill"],
    roads: ["A2", "A206 Trafalgar Road", "A102 Blackwall Tunnel approach", "Romney Road"],
    landmarks: ["Cutty Sark", "Greenwich Park", "National Maritime Museum", "Greenwich station"],
    localNote: "Greenwich's narrow one-way streets around the town centre and the park make garage parking awkward, so kerbside fitting at a home or workplace is the practical route across SE10.",
    scenario: { road: "A206 Trafalgar Road", vehicle: "car", situation: "a flat caught on the school run near Maze Hill", outcome: "fitted at the kerb outside the house with the morning saved" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Greenwich town centre and Maze Hill?", a: "Yes, across SE10 including the town centre, Maze Hill, and toward Blackheath and Charlton." },
    variant: 0, status: "live"
  },
  {
    slug: "charlton", town: "Charlton", region: "South East London", cluster: "se-london",
    postcodes: ["SE7"],
    neighbours: ["Woolwich", "Blackheath", "Greenwich", "Kidbrooke"],
    roads: ["A206 Woolwich Road", "A102 Blackwall Tunnel approach", "Bugsby's Way", "Charlton Church Lane"],
    landmarks: ["The Valley", "Charlton station", "Charlton House", "Bugsby's Way retail parks"],
    localNote: "The Bugsby's Way retail parks and the A206 Woolwich Road through Charlton carry heavy van and delivery traffic, so depot and workplace fitting before a shift is the common pattern in SE7.",
    scenario: { road: "A206 Woolwich Road", vehicle: "delivery van", situation: "a nail picked up in the tread mid-round", outcome: "fitted at the Bugsby's Way retail yard before the next drops" },
    emphasis: "van",
    localFaq: { q: "Do you cover the Charlton retail parks and The Valley?", a: "Yes, across SE7 including the Bugsby's Way retail parks, Charlton station, and the Woolwich Road corridor." },
    variant: 1, status: "live"
  },
  {
    slug: "sydenham", town: "Sydenham", region: "South East London", cluster: "se-london",
    postcodes: ["SE26"],
    neighbours: ["Forest Hill", "Crystal Palace", "Penge", "Bell Green"],
    roads: ["A212 Sydenham Road", "Kirkdale", "Cobb's Corner", "South Circular (A205)"],
    landmarks: ["Sydenham station", "Mayow Park", "Bell Green retail park", "Cobb's Corner"],
    localNote: "Sydenham Road and Cobb's Corner are tight and slow, and the Bell Green retail park draws steady traffic, so a fitter reaching a home off Kirkdale saves a frustrating run to a garage.",
    scenario: { road: "A212 Sydenham Road", vehicle: "hatchback", situation: "a pothole-damaged sidewall near Cobb's Corner", outcome: "fitted on a residential street off Kirkdale" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Sydenham and Bell Green?", a: "Yes, across SE26 including Sydenham Road, the Bell Green retail park, and toward Forest Hill and Penge." },
    variant: 2, status: "live"
  },
  {
    slug: "crystal-palace", town: "Crystal Palace", region: "South East London", cluster: "se-london",
    postcodes: ["SE19"],
    neighbours: ["Gipsy Hill", "Anerley", "Upper Norwood", "Penge"],
    roads: ["A212 Crystal Palace Parade", "A214 Anerley Hill", "Westow Hill", "Church Road"],
    landmarks: ["Crystal Palace Park", "the Crystal Palace dinosaurs", "National Sports Centre", "the Triangle"],
    localNote: "The steep hills around the Crystal Palace Triangle, Anerley Hill and Westow Hill, are hard on tyres and awkward to park on, so on-site fitting at a level home location beats nursing a damaged tyre up the hill to a garage.",
    scenario: { road: "A214 Anerley Hill", vehicle: "car", situation: "a sidewall bulge after a kerb strike on the hill", outcome: "fitted on level ground near the Triangle" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover the Crystal Palace Triangle and Upper Norwood?", a: "Yes, across SE19 including the Triangle, Westow Hill, and toward Gipsy Hill and Anerley." },
    variant: 0, status: "live"
  },
  {
    slug: "forest-hill", town: "Forest Hill", region: "South East London", cluster: "se-london",
    postcodes: ["SE23"],
    neighbours: ["Sydenham", "Honor Oak", "Catford", "Dulwich"],
    roads: ["South Circular (A205) London Road", "Dartmouth Road", "Stanstead Road", "Honor Oak Park"],
    landmarks: ["Horniman Museum and Gardens", "Forest Hill station", "Dartmouth Road shops", "Mayow Park"],
    localNote: "The South Circular squeezes through Forest Hill on London Road and backs up past the Horniman, so a fitter coming to a home off Dartmouth Road avoids the worst of the A205 crawl.",
    scenario: { road: "South Circular (A205) London Road", vehicle: "estate car", situation: "a flat outside the school near Dartmouth Road", outcome: "fitted at the kerb without joining the A205 queue" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Forest Hill and Honor Oak?", a: "Yes, across SE23 including Dartmouth Road, the Horniman area, and toward Honor Oak and Sydenham." },
    variant: 1, status: "live"
  },
  {
    slug: "penge", town: "Penge", region: "South East London", cluster: "se-london",
    postcodes: ["SE20"],
    neighbours: ["Anerley", "Beckenham", "Sydenham", "Crystal Palace"],
    roads: ["A234 Croydon Road", "A213 Penge High Street", "Maple Road", "Anerley Road"],
    landmarks: ["Penge East station", "Penge West station", "Crystal Palace Park", "Royston Field"],
    localNote: "Penge High Street and the Croydon Road junction are narrow with tight parking, so a mobile fitter reaching a home on a residential road off Maple Road saves circling for a garage space.",
    scenario: { road: "A213 Penge High Street", vehicle: "small car", situation: "a slow puncture losing pressure by the day", outcome: "fitted on a side road off Maple Road" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Penge High Street and Anerley?", a: "Yes, across SE20 including Penge High Street, the station areas, and toward Beckenham and Anerley." },
    variant: 2, status: "live"
  },
  {
    slug: "beckenham", town: "Beckenham", region: "South East London", cluster: "se-london",
    postcodes: ["BR3"],
    neighbours: ["Penge", "West Wickham", "Elmers End", "Shortlands"],
    roads: ["A222 Beckenham High Street", "A214", "Wickham Road", "Beckenham Road"],
    landmarks: ["Beckenham Junction station", "Beckenham Place Park", "the Clock Tower", "Beckenham High Street"],
    localNote: "Beckenham High Street and the junction by the Clock Tower are busy at peak, and Beckenham Place Park draws weekend traffic, so home and workplace fitting across BR3 is far quicker than a town-centre garage run.",
    scenario: { road: "A222 Beckenham High Street", vehicle: "car", situation: "a kerbed wheel and a slow leak", outcome: "fitted at home near Wickham Road" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Beckenham Junction and the High Street?", a: "Yes, across BR3 including Beckenham Junction, the High Street, and toward Elmers End and Shortlands." },
    variant: 0, status: "live"
  },
  {
    slug: "orpington", town: "Orpington", region: "South East London", cluster: "se-london",
    postcodes: ["BR6"],
    neighbours: ["Petts Wood", "Chelsfield", "Farnborough", "St Mary Cray"],
    roads: ["A21", "A224 Sevenoaks Road", "A232", "Cray Avenue"],
    landmarks: ["Orpington station", "The Walnuts shopping centre", "Priory Gardens", "Cray Avenue estate"],
    localNote: "Orpington's Cray Avenue industrial estate and the A224 High Street carry heavy trade and commuter traffic, so van and depot fitting on Cray Avenue and home fitting across BR6 are both in steady demand.",
    scenario: { road: "A224 Cray Avenue", vehicle: "trade van", situation: "two worn tyres flagged before an MOT", outcome: "fitted at the depot before the working day started" },
    emphasis: "van",
    localFaq: { q: "Do you cover Orpington and Cray Avenue?", a: "Yes, across BR6 including The Walnuts, Cray Avenue, Orpington station, and toward Petts Wood and Chelsfield." },
    variant: 1, status: "live"
  },
  {
    slug: "bexley", town: "Bexley", region: "South East London", cluster: "se-london",
    postcodes: ["DA5"],
    neighbours: ["Bexleyheath", "Sidcup", "Crayford", "Welling"],
    roads: ["A2 Rochester Way", "A223 Parkhill Road", "Bexley High Street", "Old Bexley Lane"],
    landmarks: ["Old Bexley village", "Hall Place and Gardens", "Bexley station", "the River Cray"],
    localNote: "Old Bexley's village High Street is narrow with limited parking and the A2 runs fast alongside, so a fitter coming to a home in DA5 avoids both the village squeeze and a trip onto the A2 to reach a garage.",
    scenario: { road: "A2 Rochester Way", vehicle: "car", situation: "a blowout at speed that ran flat to the slip road", outcome: "fitted safely off the A2 near Hall Place under roadside protocol" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Old Bexley and the A2 corridor?", a: "Yes, across DA5 including Bexley village, Hall Place, and the A2 Rochester Way, toward Bexleyheath and Sidcup." },
    variant: 2, status: "live"
  },
  {
    slug: "sidcup", town: "Sidcup", region: "South East London", cluster: "se-london",
    postcodes: ["DA14", "DA15"],
    neighbours: ["Bexley", "Eltham", "Foots Cray", "Blackfen"],
    roads: ["A20 Sidcup bypass", "A222 Main Road", "Sidcup High Street", "Foots Cray High Street"],
    landmarks: ["Sidcup station", "Sidcup High Street", "Lamorbey Park", "Queen Mary's Hospital"],
    localNote: "The A20 Sidcup bypass is a fast dual carriageway prone to debris and blowouts, while the High Street is slow at peak, so roadside cover on the A20 and home fitting across DA14 and DA15 are both in steady demand here.",
    scenario: { road: "A20 Sidcup bypass", vehicle: "car", situation: "a debris blowout on the dual carriageway", outcome: "fitted at the roadside under National Highways protocol" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Sidcup High Street and the A20?", a: "Yes, across DA14 and DA15 including the High Street, Queen Mary's Hospital, and the A20 bypass, toward Foots Cray and Blackfen." },
    variant: 0, status: "live"
  },
  {
    slug: "eltham", town: "Eltham", region: "South East London", cluster: "se-london",
    postcodes: ["SE9"],
    neighbours: ["Mottingham", "Kidbrooke", "Falconwood", "New Eltham"],
    roads: ["A20 Sidcup Road", "A208 Well Hall Road", "Court Road", "South Circular (A205)"],
    landmarks: ["Eltham Palace", "Eltham High Street", "Well Hall Pleasaunce", "Eltham station"],
    localNote: "Eltham High Street and the Well Hall roundabout take heavy through-traffic between the A20 and the South Circular, so a fitter reaching a home off Court Road or Well Hall Road is faster than fighting through the roundabout to a garage.",
    scenario: { road: "A208 Well Hall Road", vehicle: "car", situation: "a flat caught near the Well Hall roundabout", outcome: "fitted on a quiet road off Court Road" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Eltham High Street and Well Hall?", a: "Yes, across SE9 including the High Street, Well Hall Road, Eltham Palace, and toward Mottingham and New Eltham." },
    variant: 1, status: "live"
  }
];

// --- Derived helpers (consumed by the hub, the [town] route and the sitemap) --

/** Region display names keyed by cluster, in render order on the hub. */
export const CLUSTER_LABELS: Record<string, string> = {
  "se-london": "South East London",
};

/** Live areas only (built, linked, in the sitemap). */
export const LIVE_AREAS: Area[] = areas.filter((a) => a.status === "live");

/** Look up a live area by slug. Returns undefined for pending/unknown slugs. */
export function getLiveArea(slug: string): Area | undefined {
  return LIVE_AREAS.find((a) => a.slug === slug);
}

/** Map of live town display name (lower-case) to slug, for neighbour linking. */
export const LIVE_TOWN_SLUG_BY_NAME: Record<string, string> = Object.fromEntries(
  LIVE_AREAS.map((a) => [a.town.toLowerCase(), a.slug])
);
