/**
 * Two physical locations — never mix maps/directions across them.
 *
 * - MESA_COMMUNITY: Mesa at Skyeview model / community address (GBP may differ)
 * - BHHS_BROKERAGE: Berkshire Hathaway HomeServices Nevada Properties office
 *
 * TODO(jan): confirm canonical GBP office address — Vanhoy Creek (community) vs Lake Mead (brokerage).
 * Visible primary NAP on mesaskyeview.com is community (8544) per your choice; JSON-LD uses community
 * on RealEstateAgent until revised. Recommend: brokerage address on #agent, community on #community Place.
 */

import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

export const BHHS_BROKERAGE_NAP = {
  name: "Berkshire Hathaway HomeServices Nevada Properties",
  street: "9406 W Lake Mead Blvd, Suite 100",
  city: "Las Vegas",
  state: "NV",
  zip: "89134",
  full: "9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134",
  latitude: 36.1893,
  longitude: -115.2821,
  mapsQuery: "9406+W+Lake+Mead+Blvd+Suite+100+Las+Vegas+NV+89134",
} as const;

export const MESA_COMMUNITY_NAP = {
  name: mesaAtSkyeviewCommunity.name,
  street: mesaAtSkyeviewCommunity.street,
  city: mesaAtSkyeviewCommunity.city,
  state: mesaAtSkyeviewCommunity.state,
  zip: mesaAtSkyeviewCommunity.zip,
  full: mesaAtSkyeviewCommunity.salesOfficeAddress,
  latitude: mesaAtSkyeviewCommunity.latitude,
  longitude: mesaAtSkyeviewCommunity.longitude,
  mapsQuery: mesaAtSkyeviewCommunity.mapsQuery,
} as const;

function mapsEmbedUrl(queryOrCoords: string): string {
  return `https://maps.google.com/maps?q=${queryOrCoords}&z=16&ie=UTF8&iwloc=&output=embed`;
}

function directionsUrl(destination: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function getBhhsBrokerageMapsEmbedUrl(): string {
  return mapsEmbedUrl(encodeURIComponent(BHHS_BROKERAGE_NAP.full));
}

export function getBhhsBrokerageDirectionsUrl(): string {
  return directionsUrl(encodeURIComponent(BHHS_BROKERAGE_NAP.full));
}

export function getMesaCommunityMapsEmbedUrl(): string {
  const { latitude, longitude } = MESA_COMMUNITY_NAP;
  return mapsEmbedUrl(`${latitude},${longitude}`);
}

export function getMesaCommunityDirectionsUrl(): string {
  const { latitude, longitude } = MESA_COMMUNITY_NAP;
  return directionsUrl(`${latitude},${longitude}`);
}

export function getBhhsBrokeragePostalAddress() {
  return {
    streetAddress: BHHS_BROKERAGE_NAP.street,
    addressLocality: BHHS_BROKERAGE_NAP.city,
    addressRegion: BHHS_BROKERAGE_NAP.state,
    postalCode: BHHS_BROKERAGE_NAP.zip,
    addressCountry: "US",
  };
}
