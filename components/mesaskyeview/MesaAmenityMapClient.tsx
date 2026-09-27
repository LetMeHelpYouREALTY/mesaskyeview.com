"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  getAmenityCategoryById,
  MESA_AMENITY_CATEGORIES,
  MESA_AMENITY_MAP_CENTER,
  MESA_AMENITY_MAP_DEFAULT_CATEGORY,
  MESA_AMENITY_SEARCH_RADIUS_M,
  type AmenityCategoryId,
} from "@/lib/mesa-amenity-map-config";
import { getGoogleMapsApiKey, getGoogleMapsMapId } from "@/lib/env";
import { getMesaCommunityDirectionsUrl, getMesaCommunityMapsEmbedUrl } from "@/lib/nap-addresses";
import MesaAmenityStaticList from "@/components/mesaskyeview/MesaAmenityStaticList";

type MapPlace = {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  lat: number;
  lng: number;
  directionsUrl: string;
};

type GoogleMapsNamespace = {
  maps: {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => GoogleMapInstance;
    LatLng: new (lat: number, lng: number) => unknown;
    LatLngBounds: new () => {
      extend: (latLng: unknown) => void;
    };
    importLibrary: (name: string) => Promise<unknown>;
    places?: {
      PlacesService: new (map: GoogleMapInstance) => PlacesServiceInstance;
      PlacesServiceStatus: { OK: string };
    };
    marker?: {
      AdvancedMarkerElement: new (opts: Record<string, unknown>) => GoogleMarker;
    };
    Marker: new (opts: Record<string, unknown>) => GoogleMarker;
    InfoWindow: new (opts?: Record<string, unknown>) => GoogleInfoWindow;
  };
};

type GoogleMapInstance = {
  setCenter: (center: { lat: number; lng: number }) => void;
  fitBounds: (bounds: unknown) => void;
};

type GoogleMarker = {
  map: GoogleMapInstance | null;
  position?: { lat: number; lng: number };
  addListener: (event: string, handler: () => void) => void;
};

type GoogleInfoWindow = {
  open: (opts: { map: GoogleMapInstance; anchor?: GoogleMarker }) => void;
  setContent: (html: string) => void;
};

type PlacesServiceInstance = {
  nearbySearch: (
    request: Record<string, unknown>,
    callback: (results: LegacyPlaceResult[] | null, status: string) => void
  ) => void;
};

type LegacyPlaceResult = {
  place_id?: string;
  name?: string;
  vicinity?: string;
  formatted_address?: string;
  rating?: number;
  geometry?: { location: { lat: () => number; lng: () => number } };
};

type NewPlaceResult = {
  id?: string;
  displayName?: string;
  formattedAddress?: string;
  rating?: number;
  location?: { lat: () => number; lng: () => number };
  googleMapsURI?: string;
};

function getGoogle(): GoogleMapsNamespace | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { google?: GoogleMapsNamespace }).google;
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  const existing = getGoogle();
  if (existing?.maps) return Promise.resolve();

  const scriptId = "mesa-google-maps-js";
  if (document.getElementById(scriptId)) {
    return new Promise((resolve, reject) => {
      const started = Date.now();
      const tick = () => {
        if (getGoogle()?.maps) {
          resolve();
          return;
        }
        if (Date.now() - started > 15000) {
          reject(new Error("Google Maps script timeout"));
          return;
        }
        window.setTimeout(tick, 100);
      };
      tick();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places,marker&loading=async`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps script failed to load"));
    document.head.appendChild(script);
  });
}

function placeDirectionsUrl(lat: number, lng: number, placeId?: string): string {
  if (placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination_place_id=${encodeURIComponent(placeId)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function infoWindowHtml(place: MapPlace): string {
  const ratingLine =
    place.rating !== undefined
      ? `<p style="margin:4px 0;font-size:13px;">Rating: ${place.rating.toFixed(1)}</p>`
      : "";
  const addressLine = place.address
    ? `<p style="margin:4px 0;font-size:13px;">${escapeHtml(place.address)}</p>`
    : "";
  return `<div style="max-width:240px;padding:4px 0;">
    <strong>${escapeHtml(place.name)}</strong>
    ${ratingLine}
    ${addressLine}
    <a href="${place.directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-size:13px;">Directions</a>
  </div>`;
}

async function fetchNearbyPlaces(categoryId: AmenityCategoryId): Promise<MapPlace[]> {
  const google = getGoogle();
  if (!google?.maps) return [];

  const category = getAmenityCategoryById(categoryId);
  const center = MESA_AMENITY_MAP_CENTER;

  try {
    const placesLib = (await google.maps.importLibrary("places")) as {
      Place?: {
        searchNearby: (req: Record<string, unknown>) => Promise<{ places: NewPlaceResult[] }>;
      };
    };
    if (placesLib.Place?.searchNearby) {
      const { places } = await placesLib.Place.searchNearby({
        fields: ["displayName", "location", "formattedAddress", "rating", "googleMapsURI", "id"],
        locationRestriction: {
          center: { lat: center.lat, lng: center.lng },
          radius: MESA_AMENITY_SEARCH_RADIUS_M,
        },
        includedPrimaryTypes: category.primaryTypes,
        maxResultCount: 12,
      });

      return (places ?? []).flatMap((p, index) => {
          const lat = p.location?.lat();
          const lng = p.location?.lng();
          if (lat === undefined || lng === undefined) return [];
          const name =
            typeof p.displayName === "string"
              ? p.displayName
              : ((p.displayName as { text?: string } | undefined)?.text ?? "Place");
          const item: MapPlace = {
            id: p.id ?? `new-${categoryId}-${index}`,
            name,
            address: p.formattedAddress,
            rating: p.rating,
            lat,
            lng,
            directionsUrl: p.googleMapsURI ?? placeDirectionsUrl(lat, lng, p.id),
          };
          return [item];
        });
    }
  } catch {
    // Fall through to legacy PlacesService
  }

  return new Promise((resolve) => {
    const mapEl = document.createElement("div");
    const map = new google.maps.Map(mapEl, {
      center: { lat: center.lat, lng: center.lng },
      zoom: 13,
    });
    const service = google.maps.places?.PlacesService;
    if (!service) {
      resolve([]);
      return;
    }
    const placesService = new service(map);
    placesService.nearbySearch(
      {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: MESA_AMENITY_SEARCH_RADIUS_M,
        type: category.legacyPlaceType,
      },
      (results, status) => {
        if (status !== google.maps.places?.PlacesServiceStatus.OK || !results?.length) {
          resolve([]);
          return;
        }
        resolve(
          results.map((r, index) => {
            const lat = r.geometry?.location.lat() ?? center.lat;
            const lng = r.geometry?.location.lng() ?? center.lng;
            return {
              id: r.place_id ?? `legacy-${categoryId}-${index}`,
              name: r.name ?? "Place",
              address: r.vicinity ?? r.formatted_address,
              rating: r.rating,
              lat,
              lng,
              directionsUrl: placeDirectionsUrl(lat, lng, r.place_id),
            };
          })
        );
      }
    );
  });
}

type MesaAmenityMapProps = {
  /** When true, hide the static list below the map (full page renders its own). */
  hideStaticList?: boolean;
  /** Initial category when the map loads */
  initialCategory?: AmenityCategoryId;
};

export default function MesaAmenityMapClient({
  hideStaticList = false,
  initialCategory = MESA_AMENITY_MAP_DEFAULT_CATEGORY,
}: MesaAmenityMapProps) {
  const apiKey = getGoogleMapsApiKey();
  const mapId = getGoogleMapsMapId();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<GoogleMapInstance | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);
  const communityMarkerRef = useRef<GoogleMarker | null>(null);
  const infoWindowRef = useRef<GoogleInfoWindow | null>(null);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(initialCategory);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "fallback">(
    apiKey ? "idle" : "fallback"
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const tablistId = useId();

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];
  }, []);

  const renderPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const google = getGoogle();
      const map = mapRef.current;
      if (!google?.maps || !map) return;

      setStatusMessage("Loading nearby places…");
      clearMarkers();

      const center = MESA_AMENITY_MAP_CENTER;
      const communityPlace: MapPlace = {
        id: "mesa-community",
        name: center.label,
        address: center.address,
        lat: center.lat,
        lng: center.lng,
        directionsUrl: getMesaCommunityDirectionsUrl(),
      };

      const places = await fetchNearbyPlaces(categoryId);
      const infoWindow = infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      const AdvancedMarker = google.maps.marker?.AdvancedMarkerElement;
      const useAdvanced = Boolean(mapId && AdvancedMarker);

      const addMarker = (place: MapPlace, isCommunity: boolean) => {
        const position = { lat: place.lat, lng: place.lng };
        let marker: GoogleMarker;

        if (useAdvanced && AdvancedMarker) {
          const pin = document.createElement("div");
          pin.setAttribute("role", "img");
          pin.setAttribute(
            "aria-label",
            isCommunity ? `${place.name} community center` : place.name
          );
          pin.className = isCommunity
            ? "flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white shadow-md ring-2 ring-white"
            : "h-3 w-3 rounded-full bg-amber-500 shadow ring-2 ring-white";
          if (isCommunity) pin.textContent = "M";

          marker = new AdvancedMarker({
            map,
            position,
            title: place.name,
            content: pin,
          });
        } else {
          marker = new google.maps.Marker({
            map,
            position,
            title: place.name,
          }) as unknown as GoogleMarker;
        }

        marker.addListener("click", () => {
          infoWindow.setContent(infoWindowHtml(place));
          infoWindow.open({ map, anchor: marker });
        });

        if (isCommunity) {
          communityMarkerRef.current = marker;
        } else {
          markersRef.current.push(marker);
        }
      };

      addMarker(communityPlace, true);
      places.forEach((place) => addMarker(place, false));

      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(center.lat, center.lng));
      places.forEach((p) => bounds.extend(new google.maps.LatLng(p.lat, p.lng)));
      if (places.length > 0) {
        map.fitBounds(bounds);
      } else {
        map.setCenter({ lat: center.lat, lng: center.lng });
      }

      setStatusMessage(
        places.length > 0
          ? `Showing ${places.length} ${getAmenityCategoryById(categoryId).label.toLowerCase()} near ${center.label}.`
          : `No ${getAmenityCategoryById(categoryId).label.toLowerCase()} markers returned — see the curated list below.`
      );
    },
    [clearMarkers, mapId]
  );

  useEffect(() => {
    if (!apiKey || loadState === "fallback") return;

    const mapsKey = apiKey;
    let cancelled = false;

    async function init() {
      setLoadState("loading");
      try {
        await loadGoogleMapsScript(mapsKey);
        if (cancelled || !mapContainerRef.current) return;

        const google = getGoogle();
        if (!google?.maps) {
          setLoadState("fallback");
          return;
        }

        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat: MESA_AMENITY_MAP_CENTER.lat, lng: MESA_AMENITY_MAP_CENTER.lng },
          zoom: 14,
          mapId: mapId || undefined,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapRef.current = map;
        setLoadState("ready");
        await renderPlaces(activeCategory);
      } catch {
        if (!cancelled) setLoadState("fallback");
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once when api key present
  }, [apiKey]);

  useEffect(() => {
    if (loadState !== "ready") return;
    void renderPlaces(activeCategory);
  }, [activeCategory, loadState, renderPlaces]);

  if (loadState === "fallback" || !apiKey) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          <div className="aspect-video w-full min-h-[320px]">
            <iframe
              title={`Map near ${MESA_AMENITY_MAP_CENTER.label}`}
              src={getMesaCommunityMapsEmbedUrl()}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="px-4 py-3 text-sm text-slate-600">
            Interactive amenity search requires{" "}
            <code className="text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in Vercel. Showing
            community map embed plus verified nearby places.
          </p>
        </div>
        {!hideStaticList && <MesaAmenityStaticList category={activeCategory} />}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        role="tablist"
        id={tablistId}
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2"
      >
        {MESA_AMENITY_CATEGORIES.map((cat) => {
          const selected = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              id={`${tablistId}-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${tablistId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-labelledby={`${tablistId}-${activeCategory}`}
        className="relative min-h-[420px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
      >
        {loadState === "loading" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100/90 text-slate-600">
            Loading map…
          </div>
        )}
        <div ref={mapContainerRef} className="h-[min(480px,70vh)] w-full min-h-[420px]" />
      </div>

      {statusMessage && (
        <p className="text-sm text-slate-600" aria-live="polite">
          {statusMessage}
        </p>
      )}

      {!hideStaticList && <MesaAmenityStaticList category={activeCategory} />}
    </div>
  );
}
