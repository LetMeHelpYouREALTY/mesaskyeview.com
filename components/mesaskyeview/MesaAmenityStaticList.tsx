import {
  getAmenityCategoryById,
  type AmenityCategoryId,
} from "@/lib/mesa-amenity-map-config";
import {
  MESA_VERIFIED_NEARBY_PLACES,
  verifiedPlacesForCategory,
} from "@/lib/mesa-nearby-amenities-data";
import { getMesaCommunityDirectionsUrl } from "@/lib/nap-addresses";

type MesaAmenityStaticListProps = {
  category?: AmenityCategoryId;
  /** Show all verified places grouped by category */
  showAllCategories?: boolean;
};

export default function MesaAmenityStaticList({
  category,
  showAllCategories = false,
}: MesaAmenityStaticListProps) {
  if (showAllCategories) {
    return (
      <div className="space-y-8">
        {(
          [
            "parks",
            "grocery",
            "fitness",
            "healthcare",
            "restaurants",
            "cafes",
            "shopping",
            "pharmacies",
            "golf",
            "schools",
          ] as AmenityCategoryId[]
        ).map((catId) => {
          const items = verifiedPlacesForCategory(catId);
          if (items.length === 0) return null;
          return (
            <section key={catId} aria-labelledby={`amenity-list-${catId}`}>
              <h3 id={`amenity-list-${catId}`} className="text-lg font-bold text-slate-900 mb-3">
                {getAmenityCategoryById(catId).label}
              </h3>
              <ul className="space-y-3">
                {items.map((place) => (
                  <li
                    key={`${catId}-${place.name}-${place.address ?? place.sourceUrl}`}
                    className="rounded-lg border border-slate-200 bg-white p-4 text-sm"
                  >
                    <p className="font-semibold text-slate-900">{place.name}</p>
                    {place.address && <p className="text-slate-600">{place.address}</p>}
                    {place.note && <p className="text-slate-500 mt-1">{place.note}</p>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }

  const cat = category ?? "parks";
  const items =
    verifiedPlacesForCategory(cat).length > 0
      ? verifiedPlacesForCategory(cat)
      : MESA_VERIFIED_NEARBY_PLACES.slice(0, 6);

  return (
    <section aria-labelledby="mesa-amenity-static-list">
      <h3 id="mesa-amenity-static-list" className="text-lg font-bold text-slate-900 mb-3">
        Featured places — {getAmenityCategoryById(cat).label}
      </h3>
      <ul className="space-y-3">
        {items.map((place) => (
          <li
            key={`${place.name}-${place.address ?? place.sourceUrl}`}
            className="rounded-lg border border-slate-200 bg-white p-4 text-sm"
          >
            <p className="font-semibold text-slate-900">{place.name}</p>
            {place.address && <p className="text-slate-600">{place.address}</p>}
            {place.note && <p className="text-slate-500 mt-1">{place.note}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-slate-600">
        Community center:{" "}
        <a
          href={getMesaCommunityDirectionsUrl()}
          className="font-semibold text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Directions to Mesa at Skyeview
        </a>
      </p>
    </section>
  );
}
