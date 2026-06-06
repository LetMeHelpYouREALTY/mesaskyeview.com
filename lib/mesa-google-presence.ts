import { getBhhsBrokerageDirectionsUrl } from "@/lib/nap-addresses";

/**
 * Third-party Google presence for Dr. Jan Duffy (shared agent GBP).
 * Used in sameAs, review CTAs, and #google-reviews JSON-LD — never AggregateRating on #agent.
 *
 * Confirmed in repo: g.page/r/heyberkshire (no separate mesaskyeview.com GBP URL found).
 */
export const DR_JAN_GOOGLE_PRESENCE = {
  profileUrl: "https://g.page/r/heyberkshire",
  writeReviewUrl: "https://g.page/r/heyberkshire/review",
  /** Google Maps directions to licensed BHHS office (agent schema NAP). */
  mapsUrl: getBhhsBrokerageDirectionsUrl(),
} as const;

export function getDrJanGoogleSameAs(socialProfiles: readonly string[]): string[] {
  return [...new Set([...socialProfiles, DR_JAN_GOOGLE_PRESENCE.profileUrl])];
}
