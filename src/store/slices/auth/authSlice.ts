import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "student" | null;

type AuthState = {
  user: { img: string; username: string } | null;
  isLogged: boolean;
  role: UserRole;
};

const initialState: AuthState = {
  user: null,
  isLogged: false,
  role: null, // Default: No role assigned
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{ img: string; username: string } | null>
    ) => {
      state.user = action.payload;
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogged = false;
      state.role = null;
    },
  },
});

export const { setUserInfo, setIsLogged, setUserRole, logout } =
  authSlice.actions;
export default authSlice.reducer;
