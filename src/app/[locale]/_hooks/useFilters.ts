import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CabinClass, SortingCriteria } from "../_types/SearchFlight";

export interface FlightFilters {
  priceRange: { from: number | null; to: number | null };
  cabinClass: CabinClass | null;
  sort: SortingCriteria;
  directFlightsOnly: boolean;
  refundableOnly: boolean;
  selectedCarriers: string[];
}

const CABIN_CLASS_VALUES: CabinClass[] = [
  "CABIN_CLASS_ECONOMY",
  "CABIN_CLASS_PREMIUM_ECONOMY",
  "CABIN_CLASS_BUSINESS",
  "CABIN_CLASS_FIRST",
  "CABIN_CLASS_UNSPECIFIED",
];

const SORTING_CRITERIA_VALUES: SortingCriteria[] = [
  "CheapestFirst",
  "MostExpensiveFirst",
  "FastestFirst",
  "SlowestFirst",
  "EarliestDepartureFirst",
  "LatestDepartureFirst",
];

const DEBOUNCE_MS = 1000;

const useFilters = () => {
  const searchParams = useSearchParams();

  const initialCabinClass = (() => {
    const raw = searchParams.get("class");
    return CABIN_CLASS_VALUES.includes(raw as CabinClass) ? (raw as CabinClass) : null;
  })();

  const initialSort = (() => {
    const raw = searchParams.get("sort");
    return SORTING_CRITERIA_VALUES.includes(raw as SortingCriteria)
      ? (raw as SortingCriteria)
      : "CheapestFirst";
  })();

  const DEFAULT_FILTERS: FlightFilters = {
    priceRange: { from: null, to: null },
    cabinClass: initialCabinClass,
    sort: initialSort,
    directFlightsOnly: false,
    refundableOnly: false,
    selectedCarriers: [],
  };

  const [filters, setFilters] = useState<FlightFilters>(DEFAULT_FILTERS);
  const [deferredFilters, setDeferredFilters] = useState<FlightFilters>(DEFAULT_FILTERS);

  const filtersRef = useRef<FlightFilters>(DEFAULT_FILTERS);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = <K extends keyof FlightFilters>(key: K, value: FlightFilters[K]) => {
    const next = { ...filtersRef.current, [key]: value };

    filtersRef.current = next;
    setFilters(next);

    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDeferredFilters(filtersRef.current);
      debounceTimerRef.current = null;
    }, DEBOUNCE_MS);
  };

  const reset = () => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    filtersRef.current = DEFAULT_FILTERS;
    setFilters(DEFAULT_FILTERS);
    setDeferredFilters(DEFAULT_FILTERS);
  };

  return { filters, deferredFilters, onChange, reset };
};

export default useFilters;
