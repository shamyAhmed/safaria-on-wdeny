import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const useForgetPassword = () => {
    const router = useRouter();

    const {
        mutateAsync: forgetPasswordMutation,
        isPending: forgetPasswordLoading,
    } = useMutation({
        mutationFn: (values: { mobile: number; phonecode: number }) =>
            axiosInstance.post("/auth/forget-password", values),
        onSuccess: ({ data }, variables) => {
            toast.success(data?.message || "تم إرسال كود التحقق بنجاح");
            const { mobile, phonecode } = variables;
            router.push(`/auth/verify-otp?purpose=reset&mobile=${mobile}&phonecode=${phonecode}`);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ. حاول مرة أخرى.");
        },
    });

    const {
        mutateAsync: resetPasswordMutation,
        isPending: resetPasswordLoading,
    } = useMutation({
        mutationFn: (values: any) => axiosInstance.post("/auth/reset-password", values),
        onSuccess: ({ data }) => {
            toast.success(data?.message || "تم تغيير كلمة المرور بنجاح");
            router.push(`/auth/login`);
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ. حاول مرة أخرى.");
        },
    });

    return {
        forgetPasswordMutation,
        forgetPasswordLoading,
        resetPasswordMutation,
        resetPasswordLoading,
    };
};
