import { businessInfo } from "@/lib/gbp-schema";
import {
  BHHS_BROKERAGE_NAP,
  getBhhsBrokeragePostalAddress,
  getMesaCommunityDirectionsUrl,
} from "@/lib/nap-addresses";
import { DR_JAN_GOOGLE_PRESENCE, getDrJanGoogleSameAs } from "@/lib/mesa-google-presence";
import { drJanDuffyPhotos } from "@/lib/agent-photos";
import {
  agentId,
  brokerageId,
  communityPlaceId,
  googleReviewsRefId,
  mesaCommunityComplexId,
  organizationId,
  personId,
  websiteId,
} from "@/lib/schema-ids";
import { DR_JAN_GBP_BRAND_NAME } from "@/lib/site-config";
import {
  mesaAtSkyeviewCommunity,
  MESA_HOME_BRAND,
  MESA_SITE_BRAND,
} from "@/lib/mesaskyeview-brand";
import { mesaHyperlocalPhotos } from "@/lib/mesaskyeview-photos";

export {
  getMesaCommunityDirectionsUrl,
  getMesaCommunityMapsEmbedUrl,
} from "@/lib/nap-addresses";

/** Linked WebPage for third-party Google reviews (no on-site AggregateRating). */
export function generateGoogleReviewsReferenceSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": googleReviewsRefId(siteUrl),
    name: `${DR_JAN_GBP_BRAND_NAME} — Google reviews`,
    description:
      "Read verified Google reviews for Dr. Jan Duffy. On-site testimonials are not marked up as Review schema per Google guidelines.",
    url: DR_JAN_GOOGLE_PRESENCE.profileUrl,
    isPartOf: { "@id": websiteId(siteUrl) },
    about: { "@id": agentId(siteUrl) },
    significantLink: DR_JAN_GOOGLE_PRESENCE.writeReviewUrl,
  };
}

/** BHHS Nevada Properties — brokerage office (licensed agent NAP in JSON-LD). */
export function generateBhhsBrokerageOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": brokerageId(siteUrl),
    name: BHHS_BROKERAGE_NAP.name,
    url: "https://www.bfrre.com",
    address: {
      "@type": "PostalAddress",
      ...getBhhsBrokeragePostalAddress(),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BHHS_BROKERAGE_NAP.latitude,
      longitude: BHHS_BROKERAGE_NAP.longitude,
    },
  };
}

/** Place JSON-LD for Mesa at Skyeview community NAP (8544 Vanhoy Creek Street). */
export function generateMesaAtSkyeviewPlaceSchema(siteUrl: string) {
  const c = mesaAtSkyeviewCommunity;

  return {
    "@context": "https://schema.org",
    "@type": ["Place", "Residence"],
    "@id": communityPlaceId(siteUrl),
    name: c.name,
    alternateName: MESA_HOME_BRAND,
    description: `New construction and resale homes at ${c.name} in ${c.masterPlan}, ${c.city}, ${c.state} ${c.zip}. Realtor services by Dr. Jan Duffy.`,
    url: `${siteUrl}/neighborhoods/mesa-at-skyeview`,
    image: mesaHyperlocalPhotos.map((p) => `${siteUrl}${p.src}`),
    hasMap: getMesaCommunityDirectionsUrl(),
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.latitude,
      longitude: c.longitude,
    },
    containedInPlace: {
      "@type": "Place",
      name: c.masterPlan,
      containedInPlace: {
        "@type": "City",
        name: c.city,
        containedInPlace: { "@type": "State", name: c.state },
      },
    },
    amenityFeature: c.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
    })),
  };
}

/** Residential community + agent linkage for rich results on mesaskyeview.com. */
export function generateMesaResidentialCommunitySchema(siteUrl: string) {
  const c = mesaAtSkyeviewCommunity;

  return {
    "@context": "https://schema.org",
    "@type": "ResidentialComplex",
    "@id": mesaCommunityComplexId(siteUrl),
    name: c.name,
    description: `${MESA_SITE_BRAND} — ${c.homeType} homes in ${c.masterPlan}.`,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.latitude,
      longitude: c.longitude,
    },
    containedInPlace: { "@id": communityPlaceId(siteUrl) },
    amenityFeature: c.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
    })),
  };
}

/** Person node for GEO (#person) — distinct from RealEstateAgent #agent. */
export function generateDrJanPersonSchema(siteUrl: string, email: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(siteUrl),
    name: "Dr. Jan Duffy",
    jobTitle: "REALTOR®",
    image: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
    url: `${siteUrl}/about`,
    telephone: businessInfo.phone.tel,
    email,
    worksFor: { "@id": brokerageId(siteUrl) },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      identifier: "S.0197614.LLC",
    },
    sameAs: getDrJanGoogleSameAs(businessInfo.socialProfiles),
    knowsAbout: [
      "Mesa at Skyeview",
      "Skye Canyon",
      "Las Vegas new construction",
      "89166 real estate",
    ],
  };
}

/** Website publisher Organization (#org) — site brand, not the brokerage. */
export function generateSiteBrandOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(siteUrl),
    name: MESA_SITE_BRAND,
    url: siteUrl,
    telephone: businessInfo.phone.tel,
    logo: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
    employee: { "@id": personId(siteUrl) },
    parentOrganization: { "@id": brokerageId(siteUrl) },
  };
}
