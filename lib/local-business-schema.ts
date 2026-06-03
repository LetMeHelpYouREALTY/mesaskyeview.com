import { businessInfo } from "@/lib/gbp-schema";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { isMesaskyeviewDomain, MESA_SITE_BRAND, mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { getAgentSchemaGeo, getAgentSchemaPostalAddress } from "@/lib/nap-addresses";
import { getDrJanGoogleSameAs } from "@/lib/mesa-google-presence";
import { drJanDuffyPhotos } from "@/lib/agent-photos";
import { agentId, brokerageId, communityPlaceId, googleReviewsRefId } from "@/lib/schema-ids";

export type LocalBusinessSchemaOptions = {
  siteUrl?: string;
  email?: string;
  neighborhood?: string;
};

export function generateLocalBusinessSchemaForSite(
  config: DomainConfig,
  overrides: LocalBusinessSchemaOptions = {}
) {
  const siteUrl = overrides.siteUrl ?? getCanonicalSiteUrl(config);
  const email = overrides.email ?? getContactEmail(config);
  const neighborhood = overrides.neighborhood ?? config.neighborhood;
  const mesa = isMesaskyeviewDomain(config);
  const serviceArea = mesa
    ? [
        { "@id": communityPlaceId(siteUrl) },
        { "@type": "Place", name: mesaAtSkyeviewCommunity.masterPlan },
        {
          "@type": "PostalCode",
          name: mesaAtSkyeviewCommunity.zip,
          addressCountry: "US",
        },
      ]
    : [
        { "@type": "City", name: neighborhood },
        ...businessInfo.serviceAreas.map((area) => ({
          "@type": "City",
          name: area,
        })),
      ];

  return {
    "@context": "https://schema.org",
    "@type": ["Person", "RealEstateAgent"],
    "@id": agentId(siteUrl),
    name: isMesaskyeviewDomain(config)
      ? `Dr. Jan Duffy | ${MESA_SITE_BRAND}`
      : `Dr. Jan Duffy - ${neighborhood} | Berkshire Hathaway HomeServices Nevada Properties`,
    image: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
    url: siteUrl,
    telephone: businessInfo.phone.tel,
    email,
    priceRange: businessInfo.priceRange,
    address: {
      "@type": "PostalAddress",
      ...(mesa ? getAgentSchemaPostalAddress() : businessInfo.address),
    },
    geo: {
      "@type": "GeoCoordinates",
      ...(mesa ? getAgentSchemaGeo() : businessInfo.geo),
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    ...(mesa
      ? {
          workLocation: { "@id": communityPlaceId(siteUrl) },
          subjectOf: { "@id": googleReviewsRefId(siteUrl) },
        }
      : {}),
    areaServed: serviceArea,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Buyer representation",
          description: "MLS search, showings, and contract advocacy for home buyers.",
          areaServed: serviceArea,
          provider: { "@id": agentId(siteUrl) },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Seller representation",
          description: "Pricing, marketing, and negotiation for Las Vegas home sellers.",
          areaServed: serviceArea,
          provider: { "@id": agentId(siteUrl) },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "New construction representation",
          description: mesa
            ? `Free buyer representation at ${mesaAtSkyeviewCommunity.name} and Skye Canyon builders.`
            : "Free buyer representation on qualifying new construction purchases.",
          areaServed: serviceArea,
          provider: { "@id": agentId(siteUrl) },
        },
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      identifier: "S.0197614.LLC",
    },
    sameAs: mesa ? getDrJanGoogleSameAs(businessInfo.socialProfiles) : businessInfo.socialProfiles,
    worksFor: { "@id": brokerageId(siteUrl) },
    memberOf: { "@id": brokerageId(siteUrl) },
    ...(mesa
      ? {
          knowsAbout: [
            "Mesa at Skyeview new construction",
            "Skye Canyon homes",
            "Las Vegas buyer representation",
            "89166 real estate",
          ],
        }
      : {}),
  };
}
