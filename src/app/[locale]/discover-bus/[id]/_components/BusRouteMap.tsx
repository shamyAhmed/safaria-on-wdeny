"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

// Roughly centers on Egypt until the route is resolved.
const DEFAULT_CENTER = { lat: 26.8206, lng: 30.8025 };

type BusRouteMapProps = {
  /** "{city} {station}" used to geocode the departure point. */
  origin: string;
  /** "{city} {station}" used to geocode the arrival point. */
  destination: string;
};

// ─── Route layer ──────────────────────────────────────────────────────────────
// Geocodes both endpoints (in parallel), then draws the driving route between
// them with the Directions renderer (which auto-fits the map viewport).

const RouteLayer = ({ origin, destination }: BusRouteMapProps) => {
  const t = useTranslations("discoverBus.booking");
  const map = useMap();
  const geocodingLib = useMapsLibrary("geocoding");
  const routesLib = useMapsLibrary("routes");

  const [renderer, setRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [error, setError] = useState(false);

  // Create the renderer once the routes library and map are ready.
  useEffect(() => {
    if (!routesLib || !map) return;
    const r = new routesLib.DirectionsRenderer({ map });
    setRenderer(r);
    return () => r.setMap(null);
  }, [routesLib, map]);

  useEffect(() => {
    if (!geocodingLib || !routesLib || !map || !renderer) return;
    if (!origin.trim() || !destination.trim()) return;

    let cancelled = false;
    setError(false);

    const geocoder = new geocodingLib.Geocoder();
    const directionsService = new routesLib.DirectionsService();

    const geocode = (address: string) =>
      geocoder
        .geocode({ address })
        .then((res) => res.results[0]?.geometry.location ?? null)
        .catch(() => null);

    (async () => {
      // Parallel geocode of both endpoints, then await both.
      const [from, to] = await Promise.all([
        geocode(origin),
        geocode(destination),
      ]);
      if (cancelled) return;
      if (!from || !to) {
        setError(true);
        return;
      }

      const result = await directionsService.route({
        origin: from,
        destination: to,
        travelMode: "DRIVING" as google.maps.TravelMode,
      });
      if (cancelled) return;
      renderer.setDirections(result);
    })().catch(() => {
      if (!cancelled) setError(true);
    });

    return () => {
      cancelled = true;
    };
  }, [geocodingLib, routesLib, map, renderer, origin, destination]);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs text-gray-400">
        {t("routeError")}
      </div>
    );
  }

  return null;
};

// ─── Public component ─────────────────────────────────────────────────────────

export const BusRouteMap = ({ origin, destination }: BusRouteMapProps) => {
  return (
    <div className="relative w-full h-[180px]">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={6}
          gestureHandling="greedy"
          disableDefaultUI
          style={{ width: "100%", height: "100%" }}>
          <RouteLayer origin={origin} destination={destination} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default BusRouteMap;
