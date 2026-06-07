"use client";

import FubPixelScript from "@/components/analytics/FubPixelScript";

/**
 * mesaskyeview: FUB Pixel loads immediately (Home Activity / lead tracking).
 * RealScout loads on demand; Calendly loads via CalendlyWidget/Button (lazyOnload).
 */
export default function MesaDeferredThirdPartyScripts() {
  return <FubPixelScript />;
}
