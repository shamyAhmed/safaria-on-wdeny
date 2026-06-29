import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import toast from "react-hot-toast";
import { ApiResponse, ContactPayload } from "@/app/[locale]/_types/Api";

const contactAPI = (payload: ContactPayload): Promise<ApiResponse<null>> =>
  axiosInstance.post<ApiResponse<null>>(apiRoutes.contact, payload).then((r) => r.data);

export const useContactUs = () => {
  const { mutateAsync: submitContact, isPending: isSubmitting } = useMutation({
    mutationFn: contactAPI,
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  return { submitContact, isSubmitting };
};
