import { getCanonicalSiteUrl, type DomainConfig } from "@/lib/domain-config";
import { mesaFaqsToSchema } from "@/lib/mesa-page-faqs";
import { MESA_AMENITY_MAP_CENTER } from "@/lib/mesa-amenity-map-config";
import {
  MESA_NEARBY_AMENITIES_FAQS,
  MESA_VERIFIED_NEARBY_PLACES,
} from "@/lib/mesa-nearby-amenities-data";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import { communityPlaceId } from "@/lib/schema-ids";

export function generateNearbyAmenitiesFaqSchema() {
  return mesaFaqsToSchema(MESA_NEARBY_AMENITIES_FAQS);
}

export function generateNearbyAmenitiesItemListSchema(_siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Nearby amenities near ${mesaAtSkyeviewCommunity.name}`,
    description: `Verified grocery, parks, healthcare, dining, and schools near ${mesaAtSkyeviewCommunity.name}, Las Vegas NV ${mesaAtSkyeviewCommunity.zip}.`,
    numberOfItems: MESA_VERIFIED_NEARBY_PLACES.length,
    itemListElement: MESA_VERIFIED_NEARBY_PLACES.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.schemaType,
        name: place.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: place.address.split(",")[0]?.trim() ?? place.address,
          addressLocality: mesaAtSkyeviewCommunity.city,
          addressRegion: mesaAtSkyeviewCommunity.state,
          postalCode: place.address.match(/\b(\d{5})\b/)?.[1] ?? mesaAtSkyeviewCommunity.zip,
          addressCountry: "US",
        },
      },
    })),
  };
}

export function generateNearbyAmenitiesCommunityGeoPlaceSchema(siteUrl: string) {
  const c = mesaAtSkyeviewCommunity;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${siteUrl}/nearby-amenities#community-geo`,
    name: c.name,
    url: `${siteUrl}/neighborhoods/mesa-at-skyeview`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: MESA_AMENITY_MAP_CENTER.lat,
      longitude: MESA_AMENITY_MAP_CENTER.lng,
    },
    containedInPlace: { "@id": communityPlaceId(siteUrl) },
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: "US",
    },
  };
}

export function generateNearbyAmenitiesPageSchemas(config: DomainConfig) {
  const siteUrl = getCanonicalSiteUrl(config);
  return [
    generateNearbyAmenitiesFaqSchema(),
    generateNearbyAmenitiesItemListSchema(siteUrl),
    generateNearbyAmenitiesCommunityGeoPlaceSchema(siteUrl),
  ];
}
