import Script from "next/script";
import FubPixelScript from "@/components/analytics/FubPixelScript";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { REALSCOUT_WEB_COMPONENTS_SCRIPT } from "@/lib/realscout-config";
import MesaDeferredThirdPartyScripts from "@/components/performance/MesaDeferredThirdPartyScripts";

/** Domain-aware third-party script loading (mesaskyeview defers heavy bundles). */
export default async function DomainThirdPartyScripts() {
  const config = await getPageDomainConfig();
  // FUB Pixel only on the production deploy, so Vercel previews don't register with FUB.
  const fubPixel = process.env.VERCEL_ENV === "production";

  if (isMesaskyeviewDomain(config)) {
    return <MesaDeferredThirdPartyScripts fubPixel={fubPixel} />;
  }

  return (
    <>
      {fubPixel && <FubPixelScript />}
      <Script
        id="realscout-web-components"
        src={REALSCOUT_WEB_COMPONENTS_SCRIPT}
        type="module"
        strategy="afterInteractive"
      />
      <Script
        id="calendly-widget-js"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
