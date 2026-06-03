import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";

/** ZIP 89166 — Skye Canyon / northwest Las Vegas (approximate map center). */
export const ZIP_89166 = mesaAtSkyeviewCommunity.zip;

/** WGS84 centroid used for map markers (Skye Canyon / Mesa at Skyeview area). */
export const zip89166Centroid = {
  latitude: mesaAtSkyeviewCommunity.latitude,
  longitude: mesaAtSkyeviewCommunity.longitude,
};

/** Google Maps embed — ZIP code area (no Maps JavaScript API key required). */
export function getZip89166MapsEmbedUrl(): string {
  const query = encodeURIComponent(`Las Vegas, NV ${ZIP_89166}`);
  return `https://maps.google.com/maps?q=${query}&z=12&ie=UTF8&iwloc=&output=embed`;
}

export function getZip89166DirectionsUrl(): string {
  const { latitude, longitude } = zip89166Centroid;
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}

export function getZip89166GoogleMapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Las Vegas NV ${ZIP_89166}`)}`;
}

/** JSON-LD Map entity for the ZIP 89166 map page. */
export function generateZip89166MapSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Map",
    "@id": `${siteUrl}/area/89166/map#map`,
    name: `ZIP ${ZIP_89166} map — Skye Canyon, Las Vegas`,
    description: `Interactive map of ZIP code ${ZIP_89166} including ${mesaAtSkyeviewCommunity.name} and Skye Canyon communities.`,
    mapType: "https://schema.org/VenueMap",
    url: `${siteUrl}/area/89166/map`,
    about: {
      "@type": "PostalAddress",
      postalCode: ZIP_89166,
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
  };
}
