import {
  getAmenityCategoryById,
  MESA_AMENITY_MAP_CENTER,
  MESA_AMENITY_SEARCH_RADIUS_M,
  type AmenityCategoryId,
} from "@/lib/mesa-amenity-map-config";

const cache = new Map<string, Promise<google.maps.places.Place[]>>();

export function searchAmenityCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId
): Promise<google.maps.places.Place[]> {
  const category = getAmenityCategoryById(categoryId);
  let p = cache.get(categoryId);
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
      const { places } = await Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "googleMapsURI", "id"],
        locationRestriction: {
          center,
          radius: MESA_AMENITY_SEARCH_RADIUS_M,
        },
        includedPrimaryTypes: category.primaryTypes,
        maxResultCount: 10,
        rankPreference: "POPULARITY" as any,
      });
      return places ?? [];
    })();
    p.catch(() => cache.delete(categoryId));
    cache.set(categoryId, p);
  }
  return p;
}

export function getDefaultAmenitySearchCenter(): google.maps.LatLngLiteral {
  return { lat: MESA_AMENITY_MAP_CENTER.lat, lng: MESA_AMENITY_MAP_CENTER.lng };
}
