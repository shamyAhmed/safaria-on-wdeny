import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import toast from "react-hot-toast";

const deleteNotificationsAPI = async (): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.delete<ApiResponse<null>>(apiRoutes.notifications);
  return response.data;
};

export const useDeleteNotifications = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteNotifications, isPending: isDeleting } = useMutation({
    mutationFn: deleteNotificationsAPI,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { deleteNotifications, isDeleting };
};
