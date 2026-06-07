/**
 * Best-effort mapping of UK postcode AREAS (the leading letters of a postcode,
 * e.g. "ME" in "ME16 8AB") to one of our county/region hub slugs.
 *
 * This is a STARTER map covering the main areas of each region - your developer
 * can refine it as coverage grows. Unknown postcodes fall back to /areas.
 *
 * Region slugs must match the County slugs in the CMS:
 *   london | kent | sussex | essex | west-midlands | scotland
 */
const POSTCODE_AREA_TO_REGION: Record<string, string> = {
  // London (Greater London postcode areas + key outer boroughs)
  E: "london", EC: "london", N: "london", NW: "london", SE: "london",
  SW: "london", W: "london", WC: "london", BR: "london", CR: "london",
  EN: "london", HA: "london", IG: "london", KT: "london", SM: "london",
  TW: "london", UB: "london", WD: "london",

  // Kent
  CT: "kent", ME: "kent", TN: "kent", DA: "kent",

  // Sussex
  BN: "sussex", RH: "sussex",

  // Essex
  CM: "essex", CO: "essex", SS: "essex", RM: "essex",

  // Birmingham & West Midlands
  B: "west-midlands", CV: "west-midlands", DY: "west-midlands",
  WS: "west-midlands", WV: "west-midlands",

  // Scotland
  AB: "scotland", DD: "scotland", DG: "scotland", EH: "scotland",
  FK: "scotland", G: "scotland", HS: "scotland", IV: "scotland",
  KA: "scotland", KW: "scotland", KY: "scotland", ML: "scotland",
  PA: "scotland", PH: "scotland", TD: "scotland", ZE: "scotland",
};

/** Extract the postcode area (1-2 leading letters) and map it to a region slug. */
export function regionSlugForPostcode(input: string): string | null {
  const cleaned = input.trim().toUpperCase().replace(/\s+/g, "");
  const match = cleaned.match(/^[A-Z]{1,2}/);
  if (!match) return null;
  // Prefer the 2-letter area, then fall back to the 1-letter area.
  return (
    POSTCODE_AREA_TO_REGION[match[0]] ??
    POSTCODE_AREA_TO_REGION[match[0][0]] ??
    null
  );
}
