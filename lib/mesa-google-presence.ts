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

/** GA4 property for mesaskyeview.com (Google tag G-DN9PK64ZYX). */
export const MESA_GA_MEASUREMENT_ID = "G-DN9PK64ZYX";

export function getDrJanGoogleSameAs(socialProfiles: readonly string[]): string[] {
  return [...new Set([...socialProfiles, DR_JAN_GOOGLE_PRESENCE.profileUrl])];
}
