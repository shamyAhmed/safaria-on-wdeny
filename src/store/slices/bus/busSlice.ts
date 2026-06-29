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
};

const initialState: BusState = {
  fromCity: null,
  toCity:   null,
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
    clearBusSearchState: (state) => {
      state.fromCity = null;
      state.toCity   = null;
    },
  },
});

export const { setBusCities, clearBusSearchState } = busSlice.actions;
export default busSlice.reducer;
