import type { DomainConfig } from "@/lib/domain-config";
import { getCanonicalSiteUrl, getContactEmail } from "@/lib/domain-config";
import { businessInfo } from "@/lib/gbp-schema";
import {
  getMesaCommunityPostalAddress,
  mesaAtSkyeviewCommunity,
  MESA_HOME_BRAND,
  MESA_SITE_BRAND,
} from "@/lib/mesaskyeview-brand";
import { mesaHyperlocalPhotos } from "@/lib/mesaskyeview-photos";
import { drJanDuffyPhotos } from "@/lib/agent-photos";

function mesaGeoQuery(): string {
  const { latitude, longitude } = mesaAtSkyeviewCommunity;
  return `${latitude},${longitude}`;
}

const MESA_MAPS_EMBED = `https://maps.google.com/maps?q=${mesaGeoQuery()}&z=16&ie=UTF8&iwloc=&output=embed`;

const MESA_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${mesaGeoQuery()}`;

export function getMesaCommunityMapsEmbedUrl(): string {
  return MESA_MAPS_EMBED;
}

export function getMesaCommunityDirectionsUrl(): string {
  return MESA_DIRECTIONS_URL;
}

/** Place JSON-LD for Mesa at Skyeview community NAP (8544 Vanhoy Creek Street). */
export function generateMesaAtSkyeviewPlaceSchema(siteUrl: string) {
  const c = mesaAtSkyeviewCommunity;

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${siteUrl}/#mesa-at-skyeview`,
    name: c.name,
    alternateName: MESA_HOME_BRAND,
    description: `New construction and resale homes at ${c.name} in ${c.masterPlan}, ${c.city}, ${c.state} ${c.zip}. Realtor services by Dr. Jan Duffy.`,
    url: `${siteUrl}/neighborhoods/mesa-at-skyeview`,
    image: mesaHyperlocalPhotos.map((p) => `${siteUrl}${p.src}`),
    hasMap: MESA_DIRECTIONS_URL,
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
      address: {
        "@type": "PostalAddress",
        addressLocality: c.city,
        addressRegion: c.state,
        postalCode: c.zip,
        addressCountry: "US",
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
    "@id": `${siteUrl}/#mesa-at-skyeview-community`,
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
    parentOrganization: { "@id": `${siteUrl}/#organization` },
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
        mainEntity: { "@id": `${siteUrl}/#organization` },
      },
      place,
      community,
      {
        "@type": "RealEstateAgent",
        "@id": `${siteUrl}/#organization`,
        name: `Dr. Jan Duffy | ${MESA_SITE_BRAND}`,
        image: `${siteUrl}${drJanDuffyPhotos.headshot.src}`,
        telephone: businessInfo.phone.tel,
        email,
        url: siteUrl,
        address: {
          "@type": "PostalAddress",
          ...getMesaCommunityPostalAddress(),
        },
        areaServed: { "@id": place["@id"] },
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@id": community["@id"] },
          offeredBy: { "@id": `${siteUrl}/#organization` },
        },
      },
    ],
  };
}
