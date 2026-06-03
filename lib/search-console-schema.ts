import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { generateLocalBusinessSchemaForSite } from "@/lib/local-business-schema";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import { DR_JAN_REALSCOUT_SEARCH_URL } from "@/lib/realscout-config";
import {
  generateBhhsBrokerageOrganizationSchema,
  generateGoogleReviewsReferenceSchema,
  generateMesaAtSkyeviewPlaceSchema,
  generateMesaResidentialCommunitySchema,
} from "@/lib/mesa-at-skyeview-schema";
import { agentId, communityPlaceId, websiteId } from "@/lib/schema-ids";

/** JSON-LD graphs for GSC / Rich Results: RealEstateAgent + WebSite publisher link. */
export function generateSearchConsoleJsonLd(config: DomainConfig) {
  const siteUrl = getCanonicalSiteUrl(config);
  const organization = generateLocalBusinessSchemaForSite(config, {
    email: getContactEmail(config),
  });

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(siteUrl),
    url: siteUrl,
    name: isMesaskyeviewDomain(config)
      ? MESA_SITE_BRAND
      : `Dr. Jan Duffy — ${config.neighborhood} Real Estate`,
    description: config.description,
    publisher: { "@id": isMesaskyeviewDomain(config) ? agentId(siteUrl) : `${siteUrl}/#organization` },
    inLanguage: "en-US",
    potentialAction: isMesaskyeviewDomain(config)
      ? {
          "@type": "SearchAction",
          target: DR_JAN_REALSCOUT_SEARCH_URL,
          name: "Search homes with Dr. Jan Duffy on RealScout",
        }
      : {
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

  const brokerage = generateBhhsBrokerageOrganizationSchema(siteUrl);
  const place = generateMesaAtSkyeviewPlaceSchema(siteUrl);
  const community = generateMesaResidentialCommunitySchema(siteUrl);
  const agent = {
    ...organization,
    areaServed: [
      { "@id": communityPlaceId(siteUrl) },
      { "@type": "Place", name: config.neighborhood },
      ...((organization.areaServed as object[]) ?? []).slice(1),
    ],
  };

  return [brokerage, agent, website, place, community, generateGoogleReviewsReferenceSchema(siteUrl)];
}
