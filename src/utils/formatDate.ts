import dayjs from "dayjs";

export type AppLocale = "ar" | "en";

const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const AR_MONTHS_SHORT = [
  "ينا",
  "فبر",
  "مار",
  "أبر",
  "مايو",
  "يون",
  "يول",
  "أغس",
  "سبت",
  "أكت",
  "نوف",
  "ديس",
];

const isArabic = (locale: string) => locale.startsWith("ar");

const parse = (value: string | number | Date | null | undefined) => {
  if (!value) return null;
  const d = dayjs(value);
  return d.isValid() ? d : null;
};

/**
 * Digits and separators are one left-to-right run no matter which way the page
 * reads, so `20/08/2026` keeps the day on the left even inside an RTL layout.
 * Arabic therefore gets the parts in the reverse order — `2026/08/20` — which
 * is what actually renders as year-left, day-right alongside the Arabic text.
 */
export const formatDateNumeric = (
  value: string | number | Date | null | undefined,
  locale: string,
): string => {
  const d = parse(value);
  if (!d) return "";
  return d.format(isArabic(locale) ? "YYYY/MM/DD" : "DD/MM/YYYY");
};

/**
 * Day, short month name, year — e.g. `20 Aug 2026` / `20 أغس 2026`. The month
 * name breaks the digits into separate runs, so RTL puts the day on the right
 * and the year on the left on its own.
 */
export const formatDateMedium = (
  value: string | number | Date | null | undefined,
  locale: string,
  { withYear = true }: { withYear?: boolean } = {},
): string => {
  const d = parse(value);
  if (!d) return "";
  const month = isArabic(locale)
    ? AR_MONTHS_SHORT[d.month()]
    : d.format("MMM");
  return withYear
    ? `${d.date()} ${month} ${d.year()}`
    : `${d.date()} ${month}`;
};

/** Day, full month name, year — e.g. `20 August 2026` / `20 أغسطس 2026`. */
export const formatDateLong = (
  value: string | number | Date | null | undefined,
  locale: string,
): string => {
  const d = parse(value);
  if (!d) return "";
  const month = isArabic(locale) ? AR_MONTHS[d.month()] : d.format("MMMM");
  return `${d.date()} ${month} ${d.year()}`;
};

/**
 * dayjs pattern for an antd `DatePicker`, following the same reasoning as
 * `formatDateNumeric`: the field is one left-to-right run of digits, so Arabic
 * needs the year written first for it to land on the left of the input.
 */
export const datePickerFormat = (locale: string): string =>
  isArabic(locale) ? "YYYY/MM/DD" : "DD/MM/YYYY";

/** 24-hour clock. Kept separate so callers can place it either side of a date. */
export const formatTime = (
  value: string | number | Date | null | undefined,
): string => parse(value)?.format("HH:mm") ?? "";

/**
 * Date and time joined by a dot. The time sits after the date in both locales:
 * RTL flips the whole sequence, so the date still ends up leading the line.
 */
export const formatDateTime = (
  value: string | number | Date | null | undefined,
  locale: string,
  { style = "medium" }: { style?: "numeric" | "medium" | "long" } = {},
): string => {
  const d = parse(value);
  if (!d) return "";
  const date =
    style === "numeric"
      ? formatDateNumeric(value, locale)
      : style === "long"
        ? formatDateLong(value, locale)
        : formatDateMedium(value, locale);
  return `${date} · ${formatTime(value)}`;
};
