"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * WidgetBe tracker only — deferred until scroll or idle on mesaskyeview.
 * RealScout loads on demand; Calendly loads via CalendlyWidget/Button (lazyOnload).
 */
export default function MesaDeferredThirdPartyScripts() {
  const [loadTracker, setLoadTracker] = useState(false);

  useEffect(() => {
    function activate() {
      setLoadTracker(true);
    }

    window.addEventListener("scroll", activate, { once: true, passive: true });

    const idleId =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(activate, { timeout: 5000 })
        : window.setTimeout(activate, 5000);

    return () => {
      window.removeEventListener("scroll", activate);
      if (typeof window.cancelIdleCallback === "function" && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, []);

  if (!loadTracker) return null;

  return (
    <Script id="widget-tracker" strategy="lazyOnload">{`
      (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
      {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
      (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
      e.parentNode.insertBefore(t,e);})
      (window,"https://widgetbe.com/agent",document,"widgetTracker");
      window.widgetTracker("create","WT-XQHVYQWW");
      window.widgetTracker("send","pageview");
    `}</Script>
  );
}
