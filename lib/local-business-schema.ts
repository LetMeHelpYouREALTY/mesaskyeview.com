import { businessInfo } from "@/lib/gbp-schema";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import {
  isMesaskyeviewDomain,
  MESA_SITE_BRAND,
  getMesaCommunityPostalAddress,
  mesaAtSkyeviewCommunity,
} from "@/lib/mesaskyeview-brand";
import { drJanDuffyPhotos } from "@/lib/agent-photos";

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
        { "@type": "Place", name: mesaAtSkyeviewCommunity.name },
        { "@type": "Place", name: mesaAtSkyeviewCommunity.masterPlan },
        { "@type": "City", name: "Las Vegas" },
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
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}/#organization`,
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
      ...(mesa ? getMesaCommunityPostalAddress() : businessInfo.address),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: mesa ? mesaAtSkyeviewCommunity.latitude : businessInfo.geo.latitude,
      longitude: mesa ? mesaAtSkyeviewCommunity.longitude : businessInfo.geo.longitude,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    employee: { "@id": `${siteUrl}/about#dr-jan-duffy` },
    areaServed: serviceArea,
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Buyer representation",
          description: "MLS search, showings, and contract advocacy for home buyers.",
          areaServed: serviceArea,
          provider: { "@id": `${siteUrl}/#organization` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Seller representation",
          description: "Pricing, marketing, and negotiation for Las Vegas home sellers.",
          areaServed: serviceArea,
          provider: { "@id": `${siteUrl}/#organization` },
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
          provider: { "@id": `${siteUrl}/#organization` },
        },
      },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      identifier: "S.0197614.LLC",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    sameAs: businessInfo.socialProfiles,
    parentOrganization: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices Nevada Properties",
      url: "https://www.bfrre.com",
    },
  };
}
