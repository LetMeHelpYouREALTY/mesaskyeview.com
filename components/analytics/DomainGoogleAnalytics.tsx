import { getPageDomainConfig } from "@/lib/get-domain-config";
import { isMesaskyeviewDomain } from "@/lib/mesaskyeview-brand";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

/** Domain-aware GA loading — mesaskyeview defers gtag until after onload. */
export default async function DomainGoogleAnalytics() {
  const config = await getPageDomainConfig();
  const strategy = isMesaskyeviewDomain(config) ? "lazyOnload" : "afterInteractive";

  return <GoogleAnalytics strategy={strategy} />;
}
