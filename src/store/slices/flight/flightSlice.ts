import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Airport } from "@/app/[locale]/_types/Airport";
import { FlightJourney, FlightJourneyLeg } from "@/app/[locale]/_types/FlightOffer";
import { Bundle } from "@/app/[locale]/_types/SearchFlight";

export type FlightInformation = {
  id: string;
  haveBundles: boolean;
  airline: string;
  airlineLogo: string;
  price: number;
  currency: string;
  isRefundable: boolean;
  refundability: string;
  legs: FlightJourneyLeg[];
  journeys: FlightJourney[];
  baseAmount: number;
  taxesAmount: number;
  discountAmount: number;
  serviceChargeAmount: number;
  beforeDiscountAmount: number;
};

export type ChosenBundle = Bundle & {
  journeyId: string | null;
};

type FlightState = {
  // ── Booking state ──────────────────────────────
  flight: FlightInformation | null;
  confirmCode: string | null;
  chosenBundle: ChosenBundle | null;

  // ── Search state (per segment, by index) ───────
  origins: (Airport | null)[];
  destinations: (Airport | null)[];
  fromDates: (string | null)[];
};

const initialState: FlightState = {
  flight: null,
  confirmCode: null,
  chosenBundle: null,
  origins: [],
  destinations: [],
  fromDates: [],
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    // ── Booking actions ────────────────────────────
    setConfirmedFlight: (
      state,
      action: PayloadAction<{
        flight: FlightInformation;
        confirmCode: string;
        chosenBundle?: ChosenBundle | null;
      }>,
    ) => {
      state.flight = action.payload.flight;
      state.confirmCode = action.payload.confirmCode;
      state.chosenBundle = action.payload.chosenBundle ?? null;
    },
    clearFlight: (state) => {
      state.flight = null;
      state.confirmCode = null;
      state.chosenBundle = null;
    },

    // ── Search state actions ───────────────────────
    setOrigin: (
      state,
      action: PayloadAction<{ index: number; airport: Airport | null }>,
    ) => {
      const { index, airport } = action.payload;
      while (state.origins.length <= index) state.origins.push(null);
      state.origins[index] = airport;
    },
    setDestination: (
      state,
      action: PayloadAction<{ index: number; airport: Airport | null }>,
    ) => {
      const { index, airport } = action.payload;
      while (state.destinations.length <= index) state.destinations.push(null);
      state.destinations[index] = airport;
    },
    setFromDate: (
      state,
      action: PayloadAction<{ index: number; date: string | null }>,
    ) => {
      const { index, date } = action.payload;
      while (state.fromDates.length <= index) state.fromDates.push(null);
      state.fromDates[index] = date;
    },
    clearSearchState: (state) => {
      state.origins = [];
      state.destinations = [];
      state.fromDates = [];
    },
  },
});

export const {
  setConfirmedFlight,
  clearFlight,
  setOrigin,
  setDestination,
  setFromDate,
  clearSearchState,
} = flightSlice.actions;
export default flightSlice.reducer;
