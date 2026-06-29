// hooks/auth/useTokenRefresh.ts
"use client";

import { useEffect, useRef } from "react";
import { getCookie } from "cookies-next";
import { useRefreshToken } from "./auth/useRefreshToken";

const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

type TokenType = "user" | "admin";

export const useTokenRefresh = (
  enabled: boolean,
  tokenType: TokenType = "user"
) => {
  const { refreshTokenSync, isRefreshing } = useRefreshToken(tokenType);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRunningRef = useRef(false);

  const accessTokenName = tokenType === "admin" ? "AdminToken" : "UserToken";
  const refreshTokenName =
    tokenType === "admin" ? "AdminRefreshToken" : "RefreshToken";

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();

    intervalRef.current = setInterval(() => {
      const refreshToken = getCookie(refreshTokenName);

      if (!refreshToken) {
        clearTimer();
        return;
      }

      // prevent overlapping refresh calls
      if (isRunningRef.current || isRefreshing) return;

      isRunningRef.current = true;

      console.log(`🔄 Proactive ${tokenType} token refresh...`);

      Promise.resolve(refreshTokenSync())
        .catch(() => {})
        .finally(() => {
          isRunningRef.current = false;
        });
    }, REFRESH_INTERVAL);
  };

  useEffect(() => {
    if (!enabled) {
      clearTimer();
      return;
    }

    const accessToken = getCookie(accessTokenName);
    const refreshToken = getCookie(refreshTokenName);

    if (!accessToken || !refreshToken) return;

    startTimer();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [enabled, tokenType]);
};
