import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import axiosInstance from "@/lib/axios";
import { useRouter, usePathname } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { runSingleRefresh } from "@/lib/runSingleRefresh";

type TokenType = "user" | "admin";

export const useRefreshToken = (tokenType: TokenType = "user") => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const accessTokenName = tokenType === "admin" ? "AdminToken" : "UserToken";
  const refreshTokenName =
    tokenType === "admin" ? "AdminRefreshToken" : "RefreshToken";
  const refreshEndpoint =
    tokenType === "admin" ? "/admin/auth/refresh" : "/auth/refresh";
  const loginPath = tokenType === "admin" ? "admin/login" : "user/login";

  console.log("Refresh cookie:", refreshTokenName, getCookie(refreshTokenName));

  const mutation = useMutation({
    mutationFn: async () => {
      const currentRefreshToken = getCookie(refreshTokenName);
      if (!currentRefreshToken) throw new Error("No refresh token");

      console.log(`🔄 Refreshing ${tokenType} token...`);

      // Don't send Authorization header for refresh requests
      const response = await axiosInstance.post(
        refreshEndpoint,
        {
          refreshToken: currentRefreshToken,
        },
        {
          headers: {
            Authorization: undefined, // Remove Authorization header
          },
        }
      );

      return response.data;
    },

    onSuccess: (data) => {
      const { accessToken, refreshToken: newRefreshToken } = data?.data || {};

      if (!accessToken) throw new Error("No access token");

      setCookie(accessTokenName, accessToken, {
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60,
      });

      if (newRefreshToken) {
        setCookie(refreshTokenName, newRefreshToken, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60,
        });
      }

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      queryClient.invalidateQueries();
    },

    onError: (err) => {
      console.error(`❌ ${tokenType} refresh failed`, err);

      deleteCookie(accessTokenName);
      deleteCookie(refreshTokenName);
      delete axiosInstance.defaults.headers.common.Authorization;

      queryClient.removeQueries(); // ← NOT clear()

      const errorMessage =
        tokenType === "admin"
          ? "انتهت جلستك كمسؤول. يرجى تسجيل الدخول مرة أخرى"
          : "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى";

      toast.error(errorMessage);

      if (!pathname.includes(`/${loginPath}`)) {
        router.push(`/${loginPath}?redirect=${pathname}`);
      }
    },
  });

  const refreshToken = () => runSingleRefresh(() => mutation.mutateAsync());

  return {
    refreshToken,
    refreshTokenSync: mutation.mutate,
    isRefreshing: mutation.isPending,
    error: mutation.error,
  };
};
