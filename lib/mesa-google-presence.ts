import { getBhhsBrokerageDirectionsUrl } from "@/lib/nap-addresses";

/**
 * Third-party Google presence for Dr. Jan Duffy (shared agent GBP).
 * Used in sameAs, review CTAs, and #google-reviews JSON-LD — never AggregateRating on #agent.
 *
 * No mesaskyeview.com GBP; reviews go to Affordable Homes Las Vegas (8850 W Sunset Rd), Dr. Jan's BHHS office listing.
 */
export const DR_JAN_GOOGLE_PRESENCE = {
  profileUrl: "https://search.google.com/local/writereview?placeid=ChIJ7XLw8ta5yIARjTZPjgHJWVQ",
  writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ7XLw8ta5yIARjTZPjgHJWVQ",
  /** Google Maps directions to licensed BHHS office (agent schema NAP). */
  mapsUrl: getBhhsBrokerageDirectionsUrl(),
} as const;

export function getDrJanGoogleSameAs(socialProfiles: readonly string[]): string[] {
  return [...new Set([...socialProfiles, DR_JAN_GOOGLE_PRESENCE.profileUrl])];
}
