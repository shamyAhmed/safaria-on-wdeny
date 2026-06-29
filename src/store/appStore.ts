import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import flightReducer from "./slices/flight/flightSlice";
import busReducer from "./slices/bus/busSlice";
import privateTripReducer from "./slices/private/privateTripSlice";
import currencyReducer from "./slices/currency/currencySlice";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    flight: flightReducer,
    bus: busReducer,
    privateTrip: privateTripReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
