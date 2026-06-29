import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useRouter } from "@/i18n/navigation";
import {
  setUserInfo,
  setIsLogged,
  setUserRole,
  UserRole,
} from "@/store/slices/auth/authSlice";
import { RootState } from "@/store/appStore";

export const useGetUserData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(["MToken"]);

  // Get tokens from cookies
  const adminToken = cookies.MToken;
  const token = adminToken;

  // Determine user role
  const userRole: UserRole = "admin";
  const url = "/admin/currentuser";

  // Set authentication state immediately from cookies
  if (token) {
    dispatch(setIsLogged(true));
    dispatch(setUserRole(userRole));
  }

  // Handle 401 error
  const handleUnauthorized = () => {
    console.log("Unauthorized! Logging out and redirecting...");
    dispatch(setIsLogged(false));
    dispatch(setUserRole(null));
    dispatch(setUserInfo(null));

    removeCookie("MToken", { path: "/" });

    router.push("/auth/login");
    router.refresh();
  };

  // Fetch user data only if authenticated
  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(url);

        return response.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          handleUnauthorized();
        }
        throw err;
      }
    },

    enabled: !!token,

    retry: false,
  } as UseQueryOptions);

  return { data, isLoading, error };
};

export const useAuthStatus = () => {
  const { isLogged, role } = useSelector((state: RootState) => state.auth);

  return {
    isAdmin: isLogged && role === "admin",
  };
};
