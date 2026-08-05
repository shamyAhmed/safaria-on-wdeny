import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { ApiResponse } from "@/app/[locale]/_types/Api";

/**
 * The API already answers in the caller's language, so this copy is only for
 * the case where there is no message to show at all. It lives here rather than
 * in the message files because `toastError` is called from plain functions that
 * have no access to the next-intl context, so the locale comes off the same
 * cookie the axios instance reads.
 */
const FALLBACK_MESSAGE: Record<string, string> = {
  ar: "حدث خطأ غير متوقع",
  en: "Something went wrong. Please try again.",
};

const fallbackMessage = (): string =>
  FALLBACK_MESSAGE[Cookies.get("NEXT_LOCALE") ?? "ar"] ?? FALLBACK_MESSAGE.ar;

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
    toast.error(fallbackMessage());
  }
};
