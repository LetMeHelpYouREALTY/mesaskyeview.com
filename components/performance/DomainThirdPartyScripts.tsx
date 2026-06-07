import Script from "next/script";
import FubPixelScript from "@/components/analytics/FubPixelScript";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { REALSCOUT_WEB_COMPONENTS_SCRIPT } from "@/lib/realscout-config";
import MesaDeferredThirdPartyScripts from "@/components/performance/MesaDeferredThirdPartyScripts";

/** Domain-aware third-party script loading (mesaskyeview defers heavy bundles). */
export default async function DomainThirdPartyScripts() {
  const config = await getPageDomainConfig();

  if (isMesaskyeviewDomain(config)) {
    return <MesaDeferredThirdPartyScripts />;
  }

  return (
    <>
      <FubPixelScript />
      <Script
        src={REALSCOUT_WEB_COMPONENTS_SCRIPT}
        type="module"
        strategy="afterInteractive"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
