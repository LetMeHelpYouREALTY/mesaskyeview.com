/** Shared FUB Widget Tracker snippet for Cloudflare HTML injection. */

export const DEFAULT_FUB_PIXEL_ID = "WT-XQHVYQWW";

export function getFubPixelId(env?: { FUB_PIXEL_ID?: string }): string {
  const fromEnv = env?.FUB_PIXEL_ID?.trim();
  return fromEnv || DEFAULT_FUB_PIXEL_ID;
}

export function getFubPixelScriptTag(pixelId: string): string {
  const scriptUrl = `https://widget.followupboss.com/${pixelId}.js`;
  return `<script id="fub-pixel-cf">(function(w,t,f){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
var s=t.createElement('script');s.src='${scriptUrl}';
s.async=1;t.head.appendChild(s);})(window,document,'fubTracker');</script>`;
}

export function htmlAlreadyHasFubPixel(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes("fubtracker") ||
    lower.includes("widget.followupboss.com") ||
    lower.includes("widgetbe.com/agent") ||
    lower.includes('id="fub-pixel"')
  );
}

export function injectFubPixelIntoHtml(html: string, pixelId: string): string {
  if (htmlAlreadyHasFubPixel(html)) return html;

  const snippet = getFubPixelScriptTag(pixelId);
  const headClose = "</head>";
  const idx = html.toLowerCase().indexOf(headClose);
  if (idx === -1) return html;

  return html.slice(0, idx) + snippet + html.slice(idx);
}
