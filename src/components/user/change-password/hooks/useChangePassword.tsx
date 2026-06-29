import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  const {
    mutateAsync: changePasswordMutation,
    isPending: changePasswordLoading,
    error,
  } = useMutation({
    mutationFn: (values) => axiosInstance.post("/profile/update-password", values),
    onSuccess: ({ data }) => {
      toast.success(data?.message || "تم تغيير كلمة المرور بنجاح");
    },
    onError: (error: { response: { data: { message?: string, error?: string } } }) => {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.error || "حدث خطأ. حاول مرة أخرى."
      );
    },
  });

  return {
    changePasswordMutation,
    changePasswordLoading,
    error,
  };
};
