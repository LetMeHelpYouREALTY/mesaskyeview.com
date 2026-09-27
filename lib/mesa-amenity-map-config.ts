/**
 * Hyperlocal amenity map — Mesa at Skyeview / Skye Canyon (89166).
 * Center: community sales office NAP (lib/mesaskyeview-brand.ts, WGS84).
 */

import { MESA_COMMUNITY_NAP } from "@/lib/nap-addresses";

export const MESA_AMENITY_MAP_CENTER = {
  lat: MESA_COMMUNITY_NAP.latitude,
  lng: MESA_COMMUNITY_NAP.longitude,
  label: MESA_COMMUNITY_NAP.name,
  address: MESA_COMMUNITY_NAP.full,
} as const;

/** Default search radius for Places nearby (meters). */
export const MESA_AMENITY_SEARCH_RADIUS_M = 8000;

export type AmenityCategoryId =
  | "parks"
  | "grocery"
  | "fitness"
  | "healthcare"
  | "restaurants"
  | "cafes"
  | "shopping"
  | "pharmacies"
  | "golf"
  | "parking"
  | "schools";

export type AmenityCategoryConfig = {
  id: AmenityCategoryId;
  label: string;
  /** Places API (New) primary types — first match drives searchNearby. */
  primaryTypes: string[];
  /** Legacy PlacesService type fallback (first entry used). */
  legacyPlaceType?: string;
};

/** Family master-planned community — parks, daily errands, and healthcare before schools. */
export const MESA_AMENITY_CATEGORIES: AmenityCategoryConfig[] = [
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park", "national_park"],
    legacyPlaceType: "park",
  },
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
    legacyPlaceType: "grocery_or_supermarket",
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym", "fitness_center"],
    legacyPlaceType: "gym",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital", "doctor", "medical_clinic"],
    legacyPlaceType: "hospital",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
    legacyPlaceType: "restaurant",
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe", "coffee_shop"],
    legacyPlaceType: "cafe",
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall", "department_store", "store"],
    legacyPlaceType: "shopping_mall",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy", "drugstore"],
    legacyPlaceType: "pharmacy",
  },
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
    legacyPlaceType: "golf_course",
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking", "parking_garage"],
    legacyPlaceType: "parking",
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school", "primary_school", "secondary_school"],
    legacyPlaceType: "school",
  },
];

export const MESA_AMENITY_MAP_DEFAULT_CATEGORY: AmenityCategoryId = "parks";

export function getAmenityCategoryById(id: AmenityCategoryId): AmenityCategoryConfig {
  const found = MESA_AMENITY_CATEGORIES.find((c) => c.id === id);
  if (!found) {
    return MESA_AMENITY_CATEGORIES[0];
  }
  return found;
}
