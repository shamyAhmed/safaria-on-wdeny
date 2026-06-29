import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "@/app/[locale]/_hooks/useGetCurrencies";

interface CurrencyState {
  selected: Currency | null;
}

const initialState: CurrencyState = {
  selected: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency(state, action: PayloadAction<Currency>) {
      state.selected = action.payload;
    },
  },
});

export const { setSelectedCurrency } = currencySlice.actions;
export default currencySlice.reducer;
