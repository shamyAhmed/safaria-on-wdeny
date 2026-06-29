import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface VerifyAltPhonePayload {
  mobile: number;
  phonecode: number;
  code: number;
}

export const useVerifyAltPhone = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: verifyAltPhoneMutation, isPending: verifyAltPhoneLoading } =
    useMutation({
      mutationFn: (payload: VerifyAltPhonePayload) =>
        axiosInstance.post("/profile/verify-alt-phone", payload),
      onSuccess: ({ data }) => {
        toast.success(data?.message || "تم تأكيد رقم الهاتف بنجاح");
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "كود التحقق غير صحيح",
        );
      },
    });

  return { verifyAltPhoneMutation, verifyAltPhoneLoading };
};
