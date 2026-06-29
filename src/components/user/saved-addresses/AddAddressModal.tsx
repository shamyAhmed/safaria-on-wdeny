"use client";

import { useState, useCallback, useRef } from "react";
import { Modal, Button, Input } from "antd";
const { TextArea } = Input;
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { IoSearchOutline, IoLocationSharp } from "react-icons/io5";
import useAddAddress, { type AddAddressPayload } from "@/app/[locale]/_hooks/useAddAddress";
import type { UserAddress } from "@/app/[locale]/_hooks/useGetUserAddresses";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 }; // Cairo

// ─── Geocoder helper ──────────────────────────────────────────────────────────

interface GeoResult {
  city: string;
  fullAddress: string;
}

function parseGeoResult(results: google.maps.GeocoderResult[]): GeoResult {
  const first = results[0];
  const fullAddress = first?.formatted_address ?? "";
  const cityComponent = first?.address_components?.find((c) =>
    c.types.includes("locality")
  );
  const city = cityComponent?.long_name ?? "";
  return { city, fullAddress };
}

// ─── Search box (uses Places Autocomplete) ───────────────────────────────────

interface SearchBoxProps {
  onPlaceSelected: (lat: number, lng: number) => void;
}

const SearchBox = ({ onPlaceSelected }: SearchBoxProps) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Attach autocomplete once the places library + input are ready
  const attachAutocomplete = useCallback(
    (el: HTMLInputElement | null) => {
      if (!el || !placesLib || autocompleteRef.current) return;
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = el;

      const ac = new placesLib.Autocomplete(el, { fields: ["geometry"] });
      autocompleteRef.current = ac;

      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        const loc = place.geometry?.location;
        if (!loc) return;
        const lat = loc.lat();
        const lng = loc.lng();
        map?.panTo({ lat, lng });
        map?.setZoom(15);
        onPlaceSelected(lat, lng);
      });
    },
    [placesLib, map, onPlaceSelected]
  );

  return (
    <div className="absolute top-3 inset-x-3 z-10">
      <div className="relative">
        <input
          ref={attachAutocomplete}
          type="text"
          placeholder="ابحث عن موقعك..."
          aria-label="ابحث عن موقعك"
          className="w-full h-11 rounded-xl border border-gray-200 bg-white shadow-sm px-4 pe-10 text-sm text-right outline-none focus:border-primary"
        />
        <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 text-lg pointer-events-none" />
      </div>
    </div>
  );
};

const MIN_GEOCODE_ZOOM = 13;

// ─── Map picker ───────────────────────────────────────────────────────────────

interface MapPickerProps {
  position: { lat: number; lng: number } | null;
  onMove: (lat: number, lng: number, zoom: number) => void;
}

const MapPicker = ({ position, onMove }: MapPickerProps) => {
  const map = useMap();

  const handleMove = (lat: number, lng: number) => {
    const zoom = map?.getZoom() ?? 0;
    onMove(lat, lng, zoom);
  };

  return (
    <Map
      defaultCenter={DEFAULT_CENTER}
      defaultZoom={14}
      mapId="address-picker"
      gestureHandling="greedy"
      disableDefaultUI
      style={{ width: "100%", height: "100%" }}
      onClick={(e) => {
        const lat = e.detail.latLng?.lat;
        const lng = e.detail.latLng?.lng;
        if (lat != null && lng != null) handleMove(lat, lng);
      }}
    >
      {position && (
        <AdvancedMarker
          position={position}
          draggable
          onDragEnd={(e) => {
            const lat = e.latLng?.lat() ?? position.lat;
            const lng = e.latLng?.lng() ?? position.lng;
            handleMove(lat, lng);
          }}
        />
      )}
    </Map>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────

interface AddAddressModalProps {
  open: boolean;
  onClose: () => void;
  address?: UserAddress;
  mutate?: (payload: AddAddressPayload) => void;
  isPending?: boolean;
}

interface ModalInnerProps {
  mutate: (payload: AddAddressPayload) => void;
  isPending: boolean;
  address?: UserAddress;
}

const ModalInner = ({ mutate, isPending, address }: ModalInnerProps) => {
  const initialPos = address
    ? { lat: parseFloat(address.map_location.lat), lng: parseFloat(address.map_location.lng) }
    : null;

  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(initialPos);
  const [geoResult, setGeoResult] = useState<GeoResult | null>(null);
  const [addressName, setAddressName] = useState(address?.name ?? "");
  const [notes, setNotes] = useState(address?.notes ?? "");

  const geocodingLib = useMapsLibrary("geocoding");

  const reverseGeocode = useCallback(
    (lat: number, lng: number) => {
      if (!geocodingLib) return;
      const geocoder = new geocodingLib.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results) {
          setGeoResult(parseGeoResult(results));
        }
      });
    },
    [geocodingLib]
  );

  const handleMove = (lat: number, lng: number, zoom: number) => {
    setMarkerPos({ lat, lng });
    if (zoom >= MIN_GEOCODE_ZOOM) reverseGeocode(lat, lng);
  };

  const handleSearchSelect = (lat: number, lng: number) => {
    setMarkerPos({ lat, lng });
    reverseGeocode(lat, lng);
  };

  return (
    <>
      {/* Map area */}
      <div className="relative h-[320px] rounded-2xl overflow-hidden mb-4">
        <SearchBox onPlaceSelected={handleSearchSelect} />
        <MapPicker position={markerPos} onMove={handleMove} />
      </div>

      {/* Address name input */}
      <div className="mb-4">
        <Input
          placeholder="اسم العنوان (مثال: المنزل، العمل...)"
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
          prefix={<IoLocationSharp className="text-primary" />}
          className="!rounded-xl"
          dir="rtl"
          disabled={!markerPos}
        />
        {!markerPos && (
          <p className="text-xs text-gray-400 mt-1 text-center">اضغط على الخريطة لتحديد موقعك أولاً</p>
        )}
      </div>

      {/* Notes textarea */}
      <div className="mb-4">
        <TextArea
          placeholder="ملاحظات إضافية (اختياري)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="!rounded-xl"
          dir="rtl"
          disabled={!markerPos}
        />
      </div>

      {/* Confirm button */}
      <Button
        type="primary"
        block
        loading={isPending}
        // disabled={!geoResult || !addressName.trim()}
        onClick={() => {
          if (!markerPos) return;
          const payload: AddAddressPayload = {
            name: addressName,
            notes,
            map_location: {
              lat: String(markerPos.lat),
              lng: String(markerPos.lng),
              address_name: addressName,
            },
          };
          mutate(payload);
        }}
      >
        تأكيد العنوان
      </Button>
    </>
  );
};

export const AddAddressModal = ({
  open,
  onClose,
  address,
  mutate: externalMutate,
  isPending: externalPending,
}: AddAddressModalProps) => {
  const { mutate: internalMutate, isPending: internalPending } = useAddAddress(onClose);

  const mutate = externalMutate ?? internalMutate;
  const isPending = externalPending ?? internalPending;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="add-address-modal"
      title={<p className="text-black text-start font-bold">اختيار موقع على الخريطة</p>}
    >
      <APIProvider apiKey={API_KEY}>
        <ModalInner mutate={mutate} isPending={isPending} address={address} />
      </APIProvider>
    </Modal>
  );
};
