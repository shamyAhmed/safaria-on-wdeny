import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PrivateTripLocation = {
  text: string; // the human-readable label returned by Places Autocomplete
  lat: number;
  lng: number;
};

type PrivateTripState = {
  pickupLocation: PrivateTripLocation | null;
  destinationLocation: PrivateTripLocation | null;
};

const initialState: PrivateTripState = {
  pickupLocation: null,
  destinationLocation: null,
};

const privateTripSlice = createSlice({
  name: "privateTrip",
  initialState,
  reducers: {
    setPickupLocation: (state, action: PayloadAction<PrivateTripLocation>) => {
      state.pickupLocation = action.payload;
    },
    setDestinationLocation: (state, action: PayloadAction<PrivateTripLocation>) => {
      state.destinationLocation = action.payload;
    },
    clearLocations: (state) => {
      state.pickupLocation = null;
      state.destinationLocation = null;
    },
  },
});

export const { setPickupLocation, setDestinationLocation, clearLocations } =
  privateTripSlice.actions;
export default privateTripSlice.reducer;
