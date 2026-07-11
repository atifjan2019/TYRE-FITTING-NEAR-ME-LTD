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
  },
  {
    slug: "didsbury", town: "Didsbury", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M20"],
    neighbours: ["Withington", "Chorlton", "Burnage", "West Didsbury"],
    roads: ["A34 Kingsway", "A5145 Barlow Moor Road", "Wilmslow Road", "Palatine Road"],
    landmarks: ["Didsbury Village", "Fletcher Moss Gardens", "East Didsbury station", "Parrs Wood"],
    localNote: "Didsbury Village clogs around Wilmslow Road and School Lane, where parking is tight and the Metrolink crossings slow the traffic, so a fitter coming to a driveway off Barlow Moor Road or Palatine Road beats circling the village for a garage space.",
    scenario: { road: "A5145 Barlow Moor Road", vehicle: "family car", situation: "a kerbed alloy and a slow leak picked up near Didsbury Village", outcome: "fitted on the driveway off Palatine Road with the school run unaffected" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Didsbury Village and East Didsbury?", a: "Yes, across M20 including Didsbury Village, West Didsbury and East Didsbury toward Parrs Wood, and out to Withington and Burnage." },
    variant: 0, status: "live"
  },
  {
    slug: "manchester-city-centre", town: "Manchester City Centre", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M1", "M2", "M4"],
    neighbours: ["Ancoats", "Northern Quarter", "Castlefield", "Salford"],
    roads: ["A57(M) Mancunian Way", "A665 Great Ancoats Street", "Deansgate", "Portland Street"],
    landmarks: ["Manchester Piccadilly station", "Manchester Arndale", "Piccadilly Gardens", "Castlefield"],
    localNote: "Parking in the core is scarce and red routes run along Deansgate and Portland Street, so office car park and multi-storey fitting while you work beats hunting for a garage slot in the city centre.",
    scenario: { road: "A57(M) Mancunian Way", vehicle: "car", situation: "a blowout on the inner ring road at rush hour", outcome: "fitted at a Northern Quarter car park under roadside protocol" },
    emphasis: "emergency",
    localFaq: { q: "Can you fit tyres in a city-centre car park?", a: "Yes, across M1, M2 and M4 we fit at office and multi-storey car parks around Piccadilly, Deansgate and the Northern Quarter while you carry on with your day." },
    variant: 1, status: "live"
  },
  {
    slug: "salford", town: "Salford", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M5", "M6"],
    neighbours: ["Eccles", "Pendleton", "Ordsall", "Broughton"],
    roads: ["A6 Chapel Street", "A56 Bury New Road", "M602", "A576 Great Cheetham Street"],
    landmarks: ["Salford Quays", "MediaCityUK", "Salford Crescent station", "University of Salford"],
    localNote: "Salford Quays and MediaCityUK draw heavy weekday and fleet traffic, and the A6 Chapel Street and M602 back up at peak, so depot and workplace fitting around the Quays keeps vans and cars moving without an orbital run.",
    scenario: { road: "M602", vehicle: "fleet van", situation: "a nail picked up on the Eccles approach mid-shift", outcome: "fitted at the MediaCity depot before the afternoon runs" },
    emphasis: "van",
    localFaq: { q: "Do you cover Salford Quays and MediaCityUK?", a: "Yes, across M5 and M6 including Salford Quays, MediaCityUK, the Crescent, and toward Eccles and Pendleton." },
    variant: 2, status: "live"
  },
  {
    slug: "stockport", town: "Stockport", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["SK1", "SK3"],
    neighbours: ["Cheadle", "Bramhall", "Heaton Moor", "Edgeley"],
    roads: ["M60", "A6 Wellington Road", "A560", "A5145 Didsbury Road"],
    landmarks: ["Stockport station", "Merseyway shopping centre", "Stockport Viaduct", "the Peel Centre"],
    localNote: "Stockport funnels onto the M60 at Junction 1 and the A6 Wellington Road sits under the viaduct through the centre, both slow at peak, so a fitter reaching a home in Heaton Moor or Edgeley beats the crawl into town for a garage.",
    scenario: { road: "M60", vehicle: "car", situation: "a debris blowout near Junction 1", outcome: "fitted at the roadside under National Highways protocol" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Stockport centre and the M60?", a: "Yes, across SK1 and SK3 including Merseyway, the viaduct, Edgeley, and toward Cheadle and Heaton Moor." },
    variant: 0, status: "live"
  },
  {
    slug: "bolton", town: "Bolton", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["BL1", "BL2"],
    neighbours: ["Farnworth", "Horwich", "Westhoughton", "Little Lever"],
    roads: ["A666 St Peter's Way", "M61", "A579", "Manchester Road"],
    landmarks: ["Bolton station", "Middlebrook retail park", "University of Bolton", "Bolton Market Place"],
    localNote: "Bolton's A666 St Peter's Way ring and the Manchester Road approach are busy through the day, and Middlebrook draws steady retail traffic, so home and workplace fitting across BL1 and BL2 is quicker than a town-centre garage trip.",
    scenario: { road: "A666 St Peter's Way", vehicle: "family car", situation: "a kerbed alloy and slow leak on the ring road", outcome: "fitted on the driveway before the school run" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Bolton town centre and Middlebrook?", a: "Yes, across BL1 and BL2 including the Market Place, Middlebrook, and toward Farnworth and Horwich." },
    variant: 1, status: "live"
  },
  {
    slug: "oldham", town: "Oldham", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["OL1", "OL8"],
    neighbours: ["Chadderton", "Royton", "Failsworth", "Shaw"],
    roads: ["A627(M)", "A62 Oldham Way", "A669", "Manchester Street"],
    landmarks: ["Oldham Mumps", "Spindles Town Square", "Oldham Central tram stop", "Alexandra Park"],
    localNote: "The A627(M) and the A62 Oldham Way ring take heavy commuter traffic toward the M60, so a fitter coming to a home in Chadderton or Royton beats nursing a damaged tyre down through the town-centre one-way system to a garage.",
    scenario: { road: "A627(M)", vehicle: "car", situation: "a slow puncture flagged on the school run", outcome: "fitted at the kerb off the Oldham Way ring" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Oldham centre and Chadderton?", a: "Yes, across OL1 and OL8 including Oldham Mumps, the Town Square, and toward Chadderton, Royton and Failsworth." },
    variant: 2, status: "live"
  },
  {
    slug: "rochdale", town: "Rochdale", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["OL11", "OL16"],
    neighbours: ["Heywood", "Littleborough", "Milnrow", "Castleton"],
    roads: ["M62", "A58 Manchester Road", "A627", "A664 Roch Valley Way"],
    landmarks: ["Rochdale town hall", "Rochdale Riverside", "Rochdale station", "Rochdale Exchange"],
    localNote: "Rochdale sits on the M62 at Junctions 20 and 21 with the A58 and A627 feeding the centre, so roadside cover on the motorway runs alongside home fitting across OL11 and OL16 where the town-centre gyratory is slow.",
    scenario: { road: "M62", vehicle: "car", situation: "a blowout on the Milnrow approach", outcome: "fitted at the roadside under National Highways protocol" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Rochdale centre and the M62?", a: "Yes, across OL11 and OL16 including Rochdale Riverside, the town hall, and toward Heywood, Castleton and Milnrow." },
    variant: 0, status: "live"
  },
  {
    slug: "bury", town: "Bury", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["BL8", "BL9"],
    neighbours: ["Radcliffe", "Whitefield", "Ramsbottom", "Tottington"],
    roads: ["M66", "A56 Manchester Road", "A58", "Angouleme Way"],
    landmarks: ["Bury Market", "The Rock shopping centre", "Bury Interchange", "Bury tram stop"],
    localNote: "The M66 feeds Bury at Junctions 2 and 3 and the A56 runs through the centre past the market, so home and workplace fitting across BL8 and BL9 beats the slow run round Angouleme Way to a garage.",
    scenario: { road: "A56 Manchester Road", vehicle: "car", situation: "a sidewall split caught near Bury Market", outcome: "fitted at home off Manchester Road with no detour" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Bury Market and the Interchange?", a: "Yes, across BL8 and BL9 including Bury Market, The Rock, the Interchange, and toward Radcliffe and Whitefield." },
    variant: 1, status: "live"
  },
  {
    slug: "wigan", town: "Wigan", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["WN1", "WN3"],
    neighbours: ["Ince", "Pemberton", "Standish", "Hindley"],
    roads: ["M6", "A49 Wigan Lane", "A577", "A573 Warrington Road"],
    landmarks: ["Wigan Wallgate station", "Wigan North Western station", "the Grand Arcade", "the DW Stadium"],
    localNote: "Wigan sits between the M6 Junctions 25, 26 and 27, with the A49 Wigan Lane running through the centre, so roadside cover on the motorway and home fitting across WN1 and WN3 both see steady demand.",
    scenario: { road: "M6", vehicle: "car", situation: "a debris blowout near Junction 26", outcome: "fitted at the roadside under National Highways protocol" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Wigan centre and the M6?", a: "Yes, across WN1 and WN3 including the Grand Arcade, both Wigan stations, the DW Stadium, and toward Pemberton and Standish." },
    variant: 2, status: "live"
  },
  {
    slug: "altrincham", town: "Altrincham", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["WA14", "WA15"],
    neighbours: ["Sale", "Hale", "Bowdon", "Timperley"],
    roads: ["A56 Manchester Road", "M56", "A560", "Stamford New Road"],
    landmarks: ["Altrincham Market", "Altrincham Interchange", "Stamford Quarter", "Dunham Massey"],
    localNote: "Altrincham's A56 through the centre and the M56 at Junction 7 are busy at peak, and the market quarter draws weekend crowds, so home and workplace fitting across WA14 and WA15 beats circling Stamford New Road for a space.",
    scenario: { road: "A56 Manchester Road", vehicle: "car", situation: "a kerbed wheel and slow leak near the market", outcome: "fitted on the driveway in Timperley" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Altrincham Market and Hale?", a: "Yes, across WA14 and WA15 including Altrincham Market, the Interchange, Stamford Quarter, and toward Hale, Bowdon and Timperley." },
    variant: 0, status: "live"
  },
  {
    slug: "sale", town: "Sale", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M33"],
    neighbours: ["Brooklands", "Sale Moor", "Timperley", "Altrincham"],
    roads: ["M60", "Washway Road (A56)", "A6144 Cross Street", "Marsland Road"],
    landmarks: ["Sale station", "Sale Metrolink", "Sale Water Park", "Stanley Square"],
    localNote: "Sale runs along the A56 Washway Road with the M60 at Junction 6, both slow at peak, so a fitter reaching a home off Marsland Road or in Brooklands beats the crawl up Washway Road to a garage.",
    scenario: { road: "Washway Road (A56)", vehicle: "family car", situation: "a slow puncture losing pressure by the day", outcome: "fitted on the driveway near Sale Moor" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Sale centre and Brooklands?", a: "Yes, across M33 including Sale station, Stanley Square, Sale Water Park, and toward Brooklands and Ashton upon Mersey." },
    variant: 1, status: "live"
  },
  {
    slug: "stretford", town: "Stretford", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M32"],
    neighbours: ["Old Trafford", "Urmston", "Firswood", "Chorlton"],
    roads: ["A56 Chester Road", "M60", "A5081 Talbot Road", "Barton Road"],
    landmarks: ["Stretford Mall", "Old Trafford stadium", "Emirates Old Trafford", "Stretford Metrolink"],
    localNote: "Stretford sits on the A56 Chester Road with Trafford Park and the stadiums alongside, so depot, matchday car park and workplace fitting across M32 keeps vans and cars moving without a run onto the M60.",
    scenario: { road: "A56 Chester Road", vehicle: "delivery van", situation: "a nail in the tread on the Trafford Park approach", outcome: "fitted at the depot before the next drops" },
    emphasis: "van",
    localFaq: { q: "Do you cover Stretford and Old Trafford?", a: "Yes, across M32 including Stretford Mall, the Old Trafford stadiums, the Metrolink, and toward Urmston and Gorse Hill." },
    variant: 2, status: "live"
  },
  {
    slug: "chorlton", town: "Chorlton", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M21"],
    neighbours: ["Whalley Range", "Chorltonville", "Firswood", "West Didsbury"],
    roads: ["A6010 Barlow Moor Road", "Wilbraham Road", "Manchester Road", "Upper Chorlton Road"],
    landmarks: ["Chorlton Metrolink", "Chorlton Water Park", "Beech Road", "Chorlton precinct"],
    localNote: "Chorlton's Barlow Moor Road and Wilbraham Road junctions are tight and the Beech Road area draws steady weekend traffic, so a fitter coming to a driveway off Manchester Road beats hunting for a space near the precinct.",
    scenario: { road: "A6010 Barlow Moor Road", vehicle: "car", situation: "a kerbed alloy near the Chorlton precinct", outcome: "fitted on a residential street off Wilbraham Road" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Chorlton and Beech Road?", a: "Yes, across M21 including the Chorlton precinct, Beech Road, the Metrolink, and toward Whalley Range and West Didsbury." },
    variant: 0, status: "live"
  },
  {
    slug: "withington", town: "Withington", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["M20"],
    neighbours: ["Didsbury", "Fallowfield", "West Didsbury", "Burnage"],
    roads: ["Wilmslow Road (B5093)", "A5145 Mauldeth Road", "Palatine Road", "Copson Street"],
    landmarks: ["Withington village", "the Christie Hospital", "Fog Lane Park", "Withington Baths"],
    localNote: "Withington's Wilmslow Road corridor is busy with hospital and student traffic past the Christie, so home and workplace fitting across M20 beats the slow crawl through the village to a garage.",
    scenario: { road: "Wilmslow Road (B5093)", vehicle: "car", situation: "a flat caught outside the Christie", outcome: "fitted in the hospital visitor car park while the appointment ran" },
    emphasis: "fitting",
    localFaq: { q: "Do you cover Withington village and the Christie?", a: "Yes, across M20 including Withington village, the Christie Hospital, Fog Lane Park, and toward Fallowfield and Didsbury." },
    variant: 1, status: "live"
  },
  {
    slug: "ashton-under-lyne", town: "Ashton-under-Lyne", region: "Greater Manchester", cluster: "manchester",
    postcodes: ["OL6", "OL7"],
    neighbours: ["Dukinfield", "Stalybridge", "Droylsden", "Audenshaw"],
    roads: ["M60", "A635 Manchester Road", "A627", "A6140 Wellington Road"],
    landmarks: ["Ashton Market", "Ashton Metrolink", "the Ashton Moss retail park", "Ashton-under-Lyne station"],
    localNote: "Ashton sits on the M60 at Junction 23 with the A635 running through the centre past the market, and Ashton Moss draws steady retail traffic, so home and depot fitting across OL6 and OL7 beats the town-centre crawl.",
    scenario: { road: "M60", vehicle: "car", situation: "a debris blowout near Junction 23", outcome: "fitted at the roadside under National Highways protocol" },
    emphasis: "emergency",
    localFaq: { q: "Do you cover Ashton Market and Ashton Moss?", a: "Yes, across OL6 and OL7 including Ashton Market, the Metrolink, the Ashton Moss retail park, and toward Dukinfield and Droylsden." },
    variant: 2, status: "live"
  }
];

// --- Derived helpers (consumed by the hub, the [town] route and the sitemap) --

/** Region display names keyed by cluster, in render order on the hub. */
export const CLUSTER_LABELS: Record<string, string> = {
  "se-london": "South East London",
  "manchester": "Greater Manchester",
};

/**
 * Parent /areas/[region] slug for each cluster. Towns nest under their region
 * (/areas/[region]/[town]) so the URL path encodes the geographic hierarchy.
 * Kept here (not in regions.ts) because regions.ts imports from this file.
 */
export const CLUSTER_REGION_SLUG: Record<string, string> = {
  "se-london": "london",
  "manchester": "manchester",
};

/** Parent region slug for a town. */
export function areaRegionSlug(a: Area): string {
  return CLUSTER_REGION_SLUG[a.cluster];
}

/** Canonical nested path for a town page: /areas/[region]/[town]. */
export function areaHref(a: Area): string {
  return `/areas/${areaRegionSlug(a)}/${a.slug}`;
}

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
