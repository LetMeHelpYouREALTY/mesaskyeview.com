import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { generateLocalBusinessSchemaForSite } from "@/lib/local-business-schema";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import {
  generateMesaAtSkyeviewPlaceSchema,
  generateMesaResidentialCommunitySchema,
} from "@/lib/mesa-at-skyeview-schema";

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
    name: isMesaskyeviewDomain(config)
      ? MESA_SITE_BRAND
      : `Dr. Jan Duffy — ${config.neighborhood} Real Estate`,
    description: config.description,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/listings?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  if (!isMesaskyeviewDomain(config)) {
    return [organization, website];
  }

  const place = generateMesaAtSkyeviewPlaceSchema(siteUrl);
  const community = generateMesaResidentialCommunitySchema(siteUrl);
  const mesaPlaceId = `${siteUrl}/#mesa-at-skyeview`;
  const agent = {
    ...organization,
    areaServed: [
      { "@id": mesaPlaceId },
      { "@type": "City", name: config.neighborhood },
      ...((organization.areaServed as object[]) ?? []).slice(1),
    ],
  };

  return [agent, website, place, community];
}
