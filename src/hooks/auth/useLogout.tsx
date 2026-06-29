// hooks/auth/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "@/i18n/navigation";
import { logoutAPI } from "@/apiCalls/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/store/slices/auth/authSlice";

export const useLogout = () => {
  const [, , removeCookie] = useCookies([
    "UserToken",
    "RefreshToken",
  ]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    mutate: logout,
    mutateAsync: logoutAsync,
    isPending: isLoggingOut,
  } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // Clear tokens
      removeCookie("UserToken", { path: "/" });
      removeCookie("RefreshToken", { path: "/" });

      // Clear all queries
      queryClient.clear();

      router.push("/auth/login");
      toast.success("تم تسجيل الخروج بنجاح");
    },
    onError: () => {
      // Even if API call fails, clear tokens locally
      removeCookie("UserToken", { path: "/" });
      removeCookie("RefreshToken", { path: "/" });
      queryClient.clear();

      router.push("/auth/login");
    },
    onMutate: () => {
      dispatch(logoutAction());
    }
  });

  return { logout, logoutAsync, isLoggingOut };
};
