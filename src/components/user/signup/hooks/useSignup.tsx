import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { setIsLogged, setUserInfo } from "@/store/slices/auth/authSlice";
import { getSafeRedirect } from "@/utils/getSafeRedirect";

export const useSignup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const {
    mutateAsync: signupMutation,
    isPending: signupLoading,
    error: signupError,
  } = useMutation({
    mutationFn: (values) => axiosInstance.post("/auth/register", values),
    onSuccess: ({ data }) => {
      toast.success(data?.data?.message || "تم التسجيل بنجاح، يرجى تفعيل الحساب");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    },
  });

  const {
    mutateAsync: verifyOtpMutation,
    isPending: verifyLoading,
    error: verifyError,
  } = useMutation({
    mutationFn: (values: { mobile: string; phonecode: string; code: string; skipLogin?: boolean }) =>
      axiosInstance.post("/auth/verify-otp", { ...values, mobile: values.mobile.startsWith("0") ? values.mobile.slice(1) : values.mobile }),
    onSuccess: ({ data }, variables) => {
      const userData = data?.data || {};
      const { api_token } = userData;

      if (variables.skipLogin) return;

      if (api_token) {
        setCookie("UserToken", api_token, {
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60,
        });
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${api_token}`;
        dispatch(setIsLogged(true));
        dispatch(setUserInfo(userData));
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        toast.success(data?.message || "تم تفعيل الحساب وتسجيل الدخول بنجاح");
        const redirect = searchParams.get("redirect");
        router.push(getSafeRedirect(redirect));
      } else {
        toast.success(data?.message || "تم تفعيل الحساب بنجاح");
        const redirect = searchParams.get("redirect");
        router.push(redirect ? `/auth/login?redirect=${encodeURIComponent(redirect)}` : "/auth/login");
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message || "كود التفعيل غير صحيح");
    },
  });

  const { mutateAsync: resendOtpMutation, isPending: resendLoading } = useMutation({
    mutationFn: (values: { mobile: string; phonecode: string }) =>
      axiosInstance.post("/auth/resend-otp", values),
    onSuccess: ({ data }) => {
      toast.success(data?.data?.message || "تم إعادة إرسال كود التفعيل");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message || "حدث خطأ أثناء إعادة إرسال الكود");
    },
  });

  return {
    signupMutation,
    verifyOtpMutation,
    resendOtpMutation,
    signupLoading,
    verifyLoading,
    resendLoading,
    signupError,
    verifyError,
  };
};
