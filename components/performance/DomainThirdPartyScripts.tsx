import Script from "next/script";
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
      <Script
        src={REALSCOUT_WEB_COMPONENTS_SCRIPT}
        type="module"
        strategy="afterInteractive"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <Script id="widget-tracker" strategy="afterInteractive">{`
        (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
        {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
        (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
        e.parentNode.insertBefore(t,e);})
        (window,"https://widgetbe.com/agent",document,"widgetTracker");
        window.widgetTracker("create","WT-XQHVYQWW");
        window.widgetTracker("send","pageview");
      `}</Script>
    </>
  );
}
