import toast from "react-hot-toast";
import { ApiResponse } from "@/app/[locale]/_types/Api";

const isAxiosApiError = (
  error: unknown,
): error is { response: { data: ApiResponse<unknown> } } =>
  typeof error === "object" &&
  error !== null &&
  "response" in error &&
  typeof error.response === "object" &&
  error.response !== null &&
  "data" in error.response &&
  typeof error.response.data === "object" &&
  error.response.data !== null &&
  "message" in error.response.data &&
  typeof error.response.data.message === "string";

export const toastError = (error: unknown): void => {
  if (isAxiosApiError(error)) {
    toast.error(error.response.data.message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("حدث خطأ غير متوقع");
  }
};
