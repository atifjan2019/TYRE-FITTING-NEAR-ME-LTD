/**
 * Per-visit correlation key for lead de-duplication.
 *
 * The hero availability search and the booking form the same visitor submits
 * afterwards should be ONE lead, not two. We mint a key once per browser tab
 * (sessionStorage), pass it from the search through the URL into the booking
 * form, and the API upserts on it - so the booking upgrades the search row.
 */
const STORAGE_KEY = "tfnm_lead_key";

/** Read the current tab's lead key, creating one on first use. Client only. */
export function getOrCreateLeadKey(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.sessionStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const key =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `k_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    window.sessionStorage.setItem(STORAGE_KEY, key);
    return key;
  } catch {
    // sessionStorage blocked (private mode etc.) - dedup just won't apply.
    return "";
  }
}
