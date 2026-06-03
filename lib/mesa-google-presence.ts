/**
 * Third-party Google presence for Dr. Jan Duffy.
 * Used in sameAs, review CTAs, and a linked WebPage node — never AggregateRating on #agent
 * (Google self-serving review markup policy).
 *
 * TODO(jan): replace with a mesaskyeview.com-specific GBP URL if that listing is separate.
 */
export const DR_JAN_GOOGLE_PRESENCE = {
  profileUrl: "https://g.page/r/heyberkshire",
  writeReviewUrl: "https://g.page/r/heyberkshire/review",
} as const;

export function getDrJanGoogleSameAs(socialProfiles: readonly string[]): string[] {
  return [...new Set([...socialProfiles, DR_JAN_GOOGLE_PRESENCE.profileUrl])];
}
