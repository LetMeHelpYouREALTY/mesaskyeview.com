import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import { getGaMeasurementId, getMesaGaMeasurementId } from "@/lib/env";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

/** Domain-aware GA loading — mesaskyeview defers gtag until after onload. */
export default async function DomainGoogleAnalytics() {
  const config = await getPageDomainConfig();
  const isMesa = isMesaskyeviewDomain(config);
  const strategy = isMesa ? "lazyOnload" : "afterInteractive";
  const gaId = isMesa ? getMesaGaMeasurementId() : getGaMeasurementId();

  if (!gaId) return null;

  return <GoogleAnalytics strategy={strategy} gaId={gaId} />;
}
