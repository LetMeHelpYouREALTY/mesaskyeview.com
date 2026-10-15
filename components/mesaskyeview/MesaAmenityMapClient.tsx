"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  getAmenityCategoryById,
  MESA_AMENITY_CATEGORIES,
  MESA_AMENITY_MAP_CENTER,
  MESA_AMENITY_MAP_DEFAULT_CATEGORY,
  type AmenityCategoryId,
} from "@/lib/mesa-amenity-map-config";
import { getGoogleMapsApiKey, getGoogleMapsMapId } from "@/lib/env";
import { getMesaCommunityDirectionsUrl, getMesaCommunityKeylessMapsEmbedUrl } from "@/lib/nap-addresses";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";
import {
  getDefaultAmenitySearchCenter,
  searchAmenityCategory,
} from "@/lib/mesa-amenity-places-search";
import { mesaAtSkyeviewCommunity } from "@/lib/mesaskyeview-brand";
import MesaAmenityStaticList from "@/components/mesaskyeview/MesaAmenityStaticList";

type MapPlace = {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  directionsUrl: string;
};

function placeDirectionsUrl(lat: number, lng: number, placeId?: string): string {
  if (placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination_place_id=${encodeURIComponent(placeId)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

function displayNameFromPlace(place: google.maps.places.Place): string {
  const dn = place.displayName;
  if (!dn) return "Place";
  if (typeof dn === "string") return dn;
  const text = (dn as { text?: string }).text;
  return text ?? "Place";
}

function mapPlaceFromGooglePlace(place: google.maps.places.Place, fallbackId: string): MapPlace | null {
  const loc = place.location;
  if (!loc) return null;
  const json = loc.toJSON?.() ?? { lat: loc.lat(), lng: loc.lng() };
  const lat = json.lat;
  const lng = json.lng;
  if (lat === undefined || lng === undefined) return null;
  return {
    id: place.id ?? fallbackId,
    name: displayNameFromPlace(place),
    address: place.formattedAddress ?? undefined,
    lat,
    lng,
    directionsUrl: place.googleMapsURI ?? placeDirectionsUrl(lat, lng, place.id),
  };
}

function setInfoWindowContent(infoWindow: google.maps.InfoWindow, place: MapPlace): void {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";
  wrap.style.padding = "4px 0";

  const title = document.createElement("strong");
  title.textContent = place.name;
  wrap.appendChild(title);

  if (place.address) {
    const addr = document.createElement("p");
    addr.style.margin = "4px 0";
    addr.style.fontSize = "13px";
    addr.textContent = place.address;
    wrap.appendChild(addr);
  }

  const link = document.createElement("a");
  link.href = place.directionsUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.fontSize = "13px";
  link.textContent = "Directions";
  wrap.appendChild(link);

  infoWindow.setContent(wrap);
}

type MesaAmenityMapProps = {
  hideStaticList?: boolean;
  initialCategory?: AmenityCategoryId;
};

function MapFallbackPanel({
  activeCategory,
  hideStaticList,
}: {
  activeCategory: AmenityCategoryId;
  hideStaticList: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
        <div className="aspect-video w-full min-h-[320px]">
          <iframe
            title={`Map near ${MESA_AMENITY_MAP_CENTER.label}`}
            src={getMesaCommunityKeylessMapsEmbedUrl()}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="px-4 py-3 text-sm text-slate-600">
          Featured places near {mesaAtSkyeviewCommunity.name} — use the list for addresses and
          directions.
        </p>
      </div>
      {!hideStaticList && <MesaAmenityStaticList category={activeCategory} />}
    </div>
  );
}

export default function MesaAmenityMapClient({
  hideStaticList = false,
  initialCategory = MESA_AMENITY_MAP_DEFAULT_CATEGORY,
}: MesaAmenityMapProps) {
  const apiKey = getGoogleMapsApiKey();
  const mapId = getGoogleMapsMapId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<(google.maps.Marker | google.maps.marker.AdvancedMarkerElement)[]>([]);
  const communityMarkerRef = useRef<
    google.maps.Marker | google.maps.marker.AdvancedMarkerElement | null
  >(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(initialCategory);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "fallback">(() =>
    !apiKey || mapsAuthFailed ? "fallback" : "idle"
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const tablistId = useId();

  const enterFallback = useCallback(() => {
    mapRef.current = null;
    if (mapContainerRef.current) {
      mapContainerRef.current.replaceChildren();
    }
    markersRef.current = [];
    communityMarkerRef.current = null;
    setLoadState("fallback");
  }, []);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

  useEffect(() => {
    if (loadState === "fallback" || !apiKey) return;
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [apiKey, loadState]);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      if ("map" in marker) marker.map = null;
    });
    markersRef.current = [];
    if (communityMarkerRef.current && "map" in communityMarkerRef.current) {
      communityMarkerRef.current.map = null;
    }
    communityMarkerRef.current = null;
  }, []);

  const renderPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const map = mapRef.current;
      if (!map) return;

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

      let places: MapPlace[] = [];
      let placesSearchFailed = false;
      try {
        const googlePlaces = await searchAmenityCategory(getDefaultAmenitySearchCenter(), categoryId);
        places = googlePlaces.flatMap((p, index) => {
          const mapped = mapPlaceFromGooglePlace(p, `place-${categoryId}-${index}`);
          return mapped ? [mapped] : [];
        });
      } catch {
        places = [];
        placesSearchFailed = true;
      }

      const infoWindow = infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      const markerLib = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
      const AdvancedMarker = markerLib.AdvancedMarkerElement;
      const useAdvanced = Boolean(mapId && AdvancedMarker);

      const addMarker = (place: MapPlace, isCommunity: boolean) => {
        const position = { lat: place.lat, lng: place.lng };
        let marker: google.maps.Marker | google.maps.marker.AdvancedMarkerElement;

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
          });
        }

        marker.addListener("click", () => {
          setInfoWindowContent(infoWindow, place);
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
      bounds.extend({ lat: center.lat, lng: center.lng });
      places.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
      if (places.length > 0) {
        map.fitBounds(bounds);
      } else {
        map.setCenter({ lat: center.lat, lng: center.lng });
      }

      if (places.length > 0) {
        setStatusMessage(
          `Showing ${places.length} ${getAmenityCategoryById(categoryId).label.toLowerCase()} near ${center.label}.`
        );
      } else if (placesSearchFailed) {
        setStatusMessage(
          `Showing featured ${getAmenityCategoryById(categoryId).label.toLowerCase()} near ${center.label} — live search unavailable.`
        );
      } else {
        setStatusMessage(
          `No ${getAmenityCategoryById(categoryId).label.toLowerCase()} markers returned — see the featured list below.`
        );
      }
    },
    [clearMarkers, mapId]
  );

  useEffect(() => {
    if (!apiKey || loadState === "fallback" || !sectionVisible) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }

    const mapsKey = apiKey;
    let cancelled = false;

    async function init() {
      setLoadState("loading");
      try {
        await loadGoogleMaps(mapsKey);
        if (cancelled || mapsAuthFailed) {
          if (!cancelled) enterFallback();
          return;
        }
        if (!mapContainerRef.current) return;

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
        if (!cancelled) enterFallback();
      }
    }

    void init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once when section visible
  }, [apiKey, sectionVisible]);

  useEffect(() => {
    if (loadState !== "ready") return;
    void renderPlaces(activeCategory);
  }, [activeCategory, loadState, renderPlaces]);

  if (loadState === "fallback" || !apiKey) {
    return (
      <MapFallbackPanel activeCategory={activeCategory} hideStaticList={hideStaticList} />
    );
  }

  return (
    <div ref={sectionRef} className="space-y-4">
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
