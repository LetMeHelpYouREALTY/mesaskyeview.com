"use client";

import Script from "next/script";
import FubPixelScript from "@/components/analytics/FubPixelScript";
import { REALSCOUT_WEB_COMPONENTS_SCRIPT } from "@/lib/realscout-config";

/**
 * mesaskyeview: FUB Pixel loads immediately (Home Activity / lead tracking).
 * RealScout + Calendly load once after the page is idle (id="calendly-widget-js").
 */
export default function MesaDeferredThirdPartyScripts() {
  return (
    <>
      <FubPixelScript />
      <Script
        id="realscout-web-components"
        src={REALSCOUT_WEB_COMPONENTS_SCRIPT}
        type="module"
        strategy="lazyOnload"
      />
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
