"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import {
  formatDateLong,
  formatDateMedium,
  formatDateNumeric,
  formatDateTime,
  formatTime,
} from "@/utils/formatDate";

/**
 * Locale-bound date helpers. Every date the user reads should go through one of
 * these so Arabic keeps the year on the left and the day on the right.
 */
export const useFormatDate = () => {
  const locale = useLocale();

  return useMemo(
    () => ({
      numeric: (value: string | number | Date | null | undefined) =>
        formatDateNumeric(value, locale),
      medium: (
        value: string | number | Date | null | undefined,
        options?: { withYear?: boolean },
      ) => formatDateMedium(value, locale, options),
      long: (value: string | number | Date | null | undefined) =>
        formatDateLong(value, locale),
      time: formatTime,
      dateTime: (
        value: string | number | Date | null | undefined,
        options?: { style?: "numeric" | "medium" | "long" },
      ) => formatDateTime(value, locale, options),
    }),
    [locale],
  );
};

export default useFormatDate;
