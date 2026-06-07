/**
 * FUB Pixel Global Injector — Cloudflare Worker
 * Injects Follow Up Boss Widget Tracker into HTML for any zone route.
 * Skips pages that already load fubTracker (e.g. Next.js FubPixelScript).
 */

import {
  getFubPixelId,
  injectFubPixelIntoHtml,
} from "../../lib/fub-pixel-snippet";

type Env = {
  FUB_PIXEL_ID?: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await fetch(request);

    const contentType = response.headers.get("Content-Type") ?? "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const pixelId = getFubPixelId(env);
    const html = injectFubPixelIntoHtml(await response.text(), pixelId);

    const headers = new Headers(response.headers);
    headers.delete("Content-Length");
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("X-FUB-Pixel-Injector", "1");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
