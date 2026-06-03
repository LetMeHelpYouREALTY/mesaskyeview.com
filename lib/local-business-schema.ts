import { businessInfo } from "@/lib/gbp-schema";
import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { isMesaskyeviewDomain, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
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
      ...businessInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    areaServed: [
      { "@type": "City", name: neighborhood },
      ...businessInfo.serviceAreas.map((area) => ({
        "@type": "City",
        name: area,
      })),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
    },
    sameAs: businessInfo.socialProfiles,
  };
}
