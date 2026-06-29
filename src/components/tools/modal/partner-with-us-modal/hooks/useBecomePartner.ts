import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

export const useBecomePartner = () => {
  const {
    mutateAsync: becomePartnerMutation,
    isPending: becomePartnerLoading,
    error,
  } = useMutation({
    mutationFn: (values) => axiosInstance.post(`/partners`, values),
    onSuccess: ({ data }) => {
      toast.success(
        "We’ve received your partnership request and will be in touch shortly to explore how we can create impact together.",
        { duration: 7000 },
      );
    },
    // onError: (error: { response: { data: { error: string } } }) => {
    //   toast.error(
    //     error?.response?.data?.error || "An error occurred. Please try again.",
    //   );
    // },
  });

  return {
    becomePartnerMutation,
    becomePartnerLoading,
    error,
  };
};
