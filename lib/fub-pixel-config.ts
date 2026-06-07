/**
 * Follow Up Boss Pixel (Widget Tracker) — powers Home Activity + website tracking in FUB.
 * Pixel ID from Admin → Integrations → Follow Up Boss Pixel (format: WT-XXXXXXX).
 */

const DEFAULT_FUB_PIXEL_ID = "WT-XQHVYQWW";

export function getFubPixelId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_FUB_PIXEL_ID?.trim();
  if (id) return id;
  return DEFAULT_FUB_PIXEL_ID;
}

export function isFubPixelEnabled(): boolean {
  return Boolean(getFubPixelId());
}

export function getFubPixelScriptUrl(pixelId: string): string {
  return `https://widget.followupboss.com/${pixelId}.js`;
}
