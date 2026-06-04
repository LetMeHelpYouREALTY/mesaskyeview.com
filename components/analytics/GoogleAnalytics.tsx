import Script from "next/script";
import { getGaMeasurementId } from "@/lib/env";

type GoogleAnalyticsProps = {
  /** Mesa uses lazyOnload to keep gtag off the LCP/TBT critical path. */
  strategy?: "afterInteractive" | "lazyOnload";
};

export default function GoogleAnalytics({
  strategy = "afterInteractive",
}: GoogleAnalyticsProps) {
  const gaId = getGaMeasurementId();
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy={strategy}
      />
      <Script id="google-analytics" strategy={strategy}>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `}</Script>
    </>
  );
}
