import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { setIsLogged } from "@/store/slices/auth/authSlice";

type TokenType = "user" | "admin";

export const useAuth = (tokenType: TokenType = "user") => {
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogged);
  const dispatch = useDispatch();

  const accessTokenName = tokenType === "admin" ? "AdminToken" : "UserToken";
  const refreshTokenName =
    tokenType === "admin" ? "AdminRefreshToken" : "RefreshToken";

  useEffect(() => {
    const accessToken = getCookie(accessTokenName);
    const refreshToken = getCookie(refreshTokenName);
    if (accessToken || refreshToken) {
      dispatch(setIsLogged(true));
    }
    setIsLoading(false);
  }, []);

  return { isAuthenticated: isLoggedIn, isLoading };
};
