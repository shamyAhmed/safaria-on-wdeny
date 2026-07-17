import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BusCity = {
  id: number;
  name: string;
  name_ar?: string;
  name_en?: string;
};

type BusState = {
  fromCity: BusCity | null;
  toCity:   BusCity | null;
  /** Return leg of a round trip, "YYYY-MM-DD". Null on a one-way search. */
  returnDate: string | null;
  /** The outbound order; sent as `parent_order_id` when booking the return. */
  parentOrderId: number | null;
};

const initialState: BusState = {
  fromCity: null,
  toCity:   null,
  returnDate: null,
  parentOrderId: null,
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setBusCities: (
      state,
      action: PayloadAction<{ fromCity: BusCity; toCity: BusCity }>,
    ) => {
      state.fromCity = action.payload.fromCity;
      state.toCity   = action.payload.toCity;
    },
    /** A new search starts a new cycle, so any half-finished one is dropped. */
    setBusReturnDate: (state, action: PayloadAction<string | null>) => {
      state.returnDate    = action.payload;
      state.parentOrderId = null;
    },
    setBusParentOrderId: (state, action: PayloadAction<number>) => {
      state.parentOrderId = action.payload;
    },
    // Clears the cycle along with the cities: leaving the bus pages abandons a
    // half-booked round trip, and a stale parent id must not outlive it.
    clearBusSearchState: (state) => {
      state.fromCity      = null;
      state.toCity        = null;
      state.returnDate    = null;
      state.parentOrderId = null;
    },
  },
});

export const {
  setBusCities,
  setBusReturnDate,
  setBusParentOrderId,
  clearBusSearchState,
} = busSlice.actions;
export default busSlice.reducer;
