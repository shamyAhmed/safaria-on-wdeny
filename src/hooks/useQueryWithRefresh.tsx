import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRefreshToken } from "@/hooks/auth/useRefreshToken";
import { getCookie } from "cookies-next";
import { useEffect, useRef } from "react";
import axiosInstance from "@/lib/axios";

type TokenType = "user" | "admin";

// Helper function to validate token with /users/me
const validateToken = async (tokenType: TokenType = "user") => {
  const endpoint = tokenType === "admin" ? "/admin/users/me" : "/users/me";
  const response = await axiosInstance.get(endpoint);
  return response.data;
};

export function useQueryWithRefresh<TData = unknown, TError = unknown>(
  options: UseQueryOptions<TData, TError> & {
    queryKey: any[];
    queryFn: () => Promise<TData>;
    tokenType?: TokenType;
  }
) {
  const { tokenType = "user", ...queryOptions } = options;
  const { refreshToken, isRefreshing } = useRefreshToken(tokenType);
  const hasTried = useRef(false);

  const query = useQuery<TData, TError>(queryOptions);

  useEffect(() => {
    const err: any = query.error;
    const refreshTokenCookie =
      tokenType === "admin"
        ? getCookie("AdminRefreshToken")
        : getCookie("RefreshToken");
    const hasRefreshToken = !!refreshTokenCookie;

    if (
      query.isError &&
      err?.response?.status === 401 &&
      hasRefreshToken &&
      !hasTried.current &&
      !isRefreshing
    ) {
      hasTried.current = true;

      console.log(
        `🔍 Got 401, validating ${tokenType} token with /users/me...`
      );

      // First, validate the token with /users/me
      validateToken(tokenType)
        .then(() => {
          // Token is valid, just refetch the original query
          console.log("✅ Token valid, refetching query");
          query.refetch();
          hasTried.current = false;
        })
        .catch(async (validationError) => {
          // Token validation failed (401 from /users/me)
          if (validationError?.response?.status === 401) {
            console.log(`🔄 ${tokenType} token invalid, refreshing...`);

            try {
              await refreshToken();
              console.log("✅ Token refreshed successfully");
              // Don't need to refetch here - the refresh hook's invalidateQueries will handle it
            } catch (refreshError) {
              console.error("❌ Refresh failed");
            } finally {
              hasTried.current = false;
            }
          } else {
            // Some other error from /users/me (network, server error, etc.)
            console.error("❌ Token validation failed with non-401 error");
            hasTried.current = false;
          }
        });
    }
  }, [query.isError, query.error, refreshToken, isRefreshing, tokenType]);

  useEffect(() => {
    if (query.isSuccess) {
      hasTried.current = false;
    }
  }, [query.isSuccess]);

  return query;
}
