import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { businessInfo } from "@/lib/gbp-schema";
import {
  BHHS_BROKERAGE_NAP,
  getAgentSchemaPostalAddress,
  getBhhsBrokeragePostalAddress,
  getMesaCommunityDirectionsUrl,
} from "@/lib/nap-addresses";
import { DR_JAN_GOOGLE_PRESENCE } from "@/lib/mesa-google-presence";
import {
  agentId,
  brokerageId,
  communityPlaceId,
  googleReviewsRefId,
  mesaCommunityComplexId,
  websiteId,
} from "@/lib/schema-ids";
import { getMesaCommunityPostalAddress, mesaAtSkyeviewCommunity, MESA_HOME_BRAND, MESA_SITE_BRAND } from "@/lib/mesaskyeview-brand";
import { mesaHyperlocalPhotos } from "@/lib/mesaskyeview-photos";
import { drJanDuffyPhotos } from "@/lib/agent-photos";

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
    name: "Dr. Jan Duffy — Google reviews",
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
  };
}

export function generateMesaContactPageSchema(config: DomainConfig) {
  const siteUrl = getCanonicalSiteUrl(config);
  const email = getContactEmail(config);
  const place = generateMesaAtSkyeviewPlaceSchema(siteUrl);
  const community = generateMesaResidentialCommunitySchema(siteUrl);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact#webpage`,
        url: `${siteUrl}/contact`,
        name: `Contact Dr. Jan Duffy | ${MESA_SITE_BRAND}`,
        description: config.description,
        about: [{ "@id": place["@id"] }, { "@id": community["@id"] }],
        mainEntity: { "@id": agentId(siteUrl) },
      },
      place,
      community,
      {
        "@type": ["Person", "RealEstateAgent"],
        "@id": agentId(siteUrl),
        name: `Dr. Jan Duffy | ${MESA_SITE_BRAND}`,
        image: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
        telephone: businessInfo.phone.tel,
        email,
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          ...getAgentSchemaPostalAddress(),
        },
        workLocation: { "@id": communityPlaceId(siteUrl) },
        subjectOf: { "@id": googleReviewsRefId(siteUrl) },
        areaServed: { "@id": communityPlaceId(siteUrl) },
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@id": mesaCommunityComplexId(siteUrl) },
          offeredBy: { "@id": agentId(siteUrl) },
        },
      },
    ],
  };
}
