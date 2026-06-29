"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

export interface BusFilters {
  companies: string[];
  fromStations: string[];
  toStations: string[];
  priceRange: { from: number | null; to: number | null };
}

const DEFAULT_FILTERS: BusFilters = {
  companies: [],
  fromStations: [],
  toStations: [],
  priceRange: { from: null, to: null },
};

const DEBOUNCE_MS = 600;

interface BusFiltersContextValue {
  filters: BusFilters;
  deferredFilters: BusFilters;
  onChange: <K extends keyof BusFilters>(key: K, value: BusFilters[K]) => void;
  reset: () => void;
}

const BusFiltersContext = createContext<BusFiltersContextValue | null>(null);

export const BusFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters]               = useState<BusFilters>(DEFAULT_FILTERS);
  const [deferredFilters, setDeferredFilters] = useState<BusFilters>(DEFAULT_FILTERS);
  const filtersRef = useRef<BusFilters>(DEFAULT_FILTERS);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = <K extends keyof BusFilters>(key: K, value: BusFilters[K]) => {
    const next = { ...filtersRef.current, [key]: value };
    filtersRef.current = next;
    setFilters(next);

    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDeferredFilters(filtersRef.current);
      timerRef.current = null;
    }, DEBOUNCE_MS);
  };

  const reset = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    filtersRef.current = DEFAULT_FILTERS;
    setFilters(DEFAULT_FILTERS);
    setDeferredFilters(DEFAULT_FILTERS);
  };

  return (
    <BusFiltersContext.Provider value={{ filters, deferredFilters, onChange, reset }}>
      {children}
    </BusFiltersContext.Provider>
  );
};

export const useBusFiltersContext = (): BusFiltersContextValue => {
  const ctx = useContext(BusFiltersContext);
  if (!ctx) throw new Error("useBusFiltersContext must be used inside BusFiltersProvider");
  return ctx;
};
