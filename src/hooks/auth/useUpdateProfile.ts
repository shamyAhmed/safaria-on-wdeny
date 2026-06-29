import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface UpdateProfilePayload {
    name: string;
    email: string;
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: updateProfileMutation,
        isPending: updateProfileLoading,
        error,
    } = useMutation({
        mutationFn: (values: UpdateProfilePayload) => axiosInstance.post("/profile", values),
        onSuccess: ({ data }) => {
            toast.success(data?.message || "تم تحديث الملف الشخصي بنجاح");
            // Refetch the profile data so the UI updates
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "حدث خطأ أثناء تحديث الملف الشخصي"
            );
        },
    });

    return {
        updateProfileMutation,
        updateProfileLoading,
        error,
    };
};
