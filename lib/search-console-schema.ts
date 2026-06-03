import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { generateLocalBusinessSchemaForSite } from "@/lib/local-business-schema";

/** JSON-LD graphs for GSC / Rich Results: RealEstateAgent + WebSite publisher link. */
export function generateSearchConsoleJsonLd(config: DomainConfig) {
  const siteUrl = getCanonicalSiteUrl(config);
  const organization = generateLocalBusinessSchemaForSite(config, {
    email: getContactEmail(config),
  });

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `Dr. Jan Duffy — ${config.neighborhood} Real Estate`,
    description: config.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
  };

  return [organization, website];
}
