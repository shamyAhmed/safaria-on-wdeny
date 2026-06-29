"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { MdOutlineLocationOn } from "react-icons/md";
import type { PrivateTripLocation } from "@/store/slices/private/privateTripSlice";

type PrivatePlacesInputProps = {
  label: string;
  placeholder: string;
  value: PrivateTripLocation | null;
  onSelect: (location: PrivateTripLocation) => void;
  readonly?: boolean;
};

export const PrivatePlacesInput = ({
  label,
  placeholder,
  value,
  onSelect,
  readonly = false,
}: PrivatePlacesInputProps) => {
  const placesLib = useMapsLibrary("places");
  const inputId = useId();

  const [inputValue, setInputValue] = useState(value?.text ?? "");
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [open, setOpen] = useState(false);

  const serviceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value?.text ?? "");
  }, [value?.text]);

  useEffect(() => {
    if (!placesLib) return;
    serviceRef.current = new placesLib.AutocompleteService();
    sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
  }, [placesLib]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // cleaning up the timeout after an unmount.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (text: string) => {
    setInputValue(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text.trim() || !serviceRef.current) {
      setPredictions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      serviceRef.current?.getPlacePredictions(
        {
          input: text,
          sessionToken: sessionTokenRef.current ?? undefined,
          componentRestrictions: { country: "eg" },
        },
        (results) => {
          console.log("places predictions:", results);
          setPredictions(results ?? []);
          setOpen(!!results?.length);
        },
      );
    }, 400);
  };

  const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
    if (!placesLib) return;
    const label = prediction.description;
    setInputValue(label);
    setOpen(false);
    setPredictions([]);

    const service = new placesLib.PlacesService(document.createElement("div"));
    service.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["geometry"],
        sessionToken: sessionTokenRef.current ?? undefined,
      },
      (place, status) => {
        if (status === "OK" && place?.geometry?.location) {
          const loc = place.geometry.location;
          onSelect({ text: label, lat: loc.lat(), lng: loc.lng() });
        }
      },
    );

    sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
  };

  return (
    <div className="inputS1">
      <label htmlFor={inputId} className="block mb-2">{label}</label>
      <div ref={containerRef} className="relative">
        <div className="relative flex items-center">
          <input
            id={inputId}
            type="text"
            className="w-full !ps-3 !pe-10"
            placeholder={placeholder}
            value={readonly ? value?.text ?? "" : inputValue}
            disabled={readonly}
            readOnly={readonly}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              if (predictions.length) setOpen(true);
            }}
            autoComplete="off"
          />
          <MdOutlineLocationOn className="absolute end-3 text-2xl text-[#819DAF] pointer-events-none" />
        </div>

        {open && predictions.length > 0 && (
          <ul className="absolute z-30 top-full mt-1 inset-x-0 max-h-[200px] overflow-auto rounded-2xl bg-white border border-gray-100 shadow-lg py-1">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(prediction);
                }}
              >
                {prediction.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
