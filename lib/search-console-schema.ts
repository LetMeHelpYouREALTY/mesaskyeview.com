import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { generateLocalBusinessSchemaForSite } from "@/lib/local-business-schema";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import { DR_JAN_REALSCOUT_SEARCH_URL } from "@/lib/realscout-config";
import {
  generateBhhsBrokerageOrganizationSchema,
  generateDrJanPersonSchema,
  generateGoogleReviewsReferenceSchema,
  generateMesaAtSkyeviewPlaceSchema,
  generateMesaResidentialCommunitySchema,
  generateSiteBrandOrganizationSchema,
} from "@/lib/mesa-at-skyeview-schema";
import { communityPlaceId, organizationId, websiteId } from "@/lib/schema-ids";

/** JSON-LD graphs for GSC / Rich Results: RealEstateAgent + WebSite publisher link. */
export function generateSearchConsoleJsonLd(config: DomainConfig) {
  const siteUrl = getCanonicalSiteUrl(config);
  const email = getContactEmail(config);
  const organization = generateLocalBusinessSchemaForSite(config, { email });

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(siteUrl),
    url: siteUrl,
    name: isMesaskyeviewDomain(config)
      ? MESA_SITE_BRAND
      : `Dr. Jan Duffy — ${config.neighborhood} Real Estate`,
    description: config.description,
    publisher: {
      "@id": isMesaskyeviewDomain(config) ? organizationId(siteUrl) : `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
    potentialAction: isMesaskyeviewDomain(config)
      ? {
          "@type": "ViewAction",
          name: "Search Mesa at Skyeview and Skye Canyon homes",
          target: DR_JAN_REALSCOUT_SEARCH_URL,
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
  const person = generateDrJanPersonSchema(siteUrl, email);
  const siteOrg = generateSiteBrandOrganizationSchema(siteUrl);
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

  return [
    brokerage,
    siteOrg,
    person,
    agent,
    website,
    place,
    community,
    generateGoogleReviewsReferenceSchema(siteUrl),
  ];
}
