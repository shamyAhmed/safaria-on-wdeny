import dayjs from "dayjs";
import arEG from "antd/locale/ar_EG";
import enUS from "antd/locale/en_US";
import type { Locale } from "antd/es/locale";

/**
 * antd renders its calendar with dayjs: rc-picker asks dayjs for the month and
 * weekday names of `locale.DatePicker.lang.locale`, which it maps `ar_EG` → `ar`.
 * So the panel only speaks Arabic once an `ar` locale is registered with dayjs.
 *
 * We register our own instead of importing `dayjs/locale/ar`, because that one
 * rewrites every digit to Arabic-Indic (`٢٠٢٦`) via `postformat`. The rest of the
 * app writes dates with Latin digits — `20 أغسطس 2026` in the picker's own input
 * — and a calendar counting `١ ٢ ٣` underneath it would not match. Same names,
 * same Saturday week start, plain digits.
 *
 * Registered (third arg `true`) rather than activated, so the global dayjs locale
 * stays `en` — dates we send to the API keep formatting as `YYYY-MM-DD`, and a
 * server rendering an Arabic page cannot leak its locale into an English one.
 */
const AR_MONTHS =
  "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
    "_",
  );

/** Sunday-first, the order both dayjs and antd index weekdays by. */
const AR_WEEKDAYS_MIN = "ح_ن_ث_ر_خ_ج_س".split("_");

const AR_LOCALE: ILocale & { meridiem: (hour: number) => string } = {
  name: "ar",
  weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
  weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
  weekdaysMin: AR_WEEKDAYS_MIN,
  months: AR_MONTHS,
  monthsShort: AR_MONTHS,
  weekStart: 6,
  meridiem: (hour: number) => (hour > 12 ? "م" : "ص"),
  ordinal: (n: number) => String(n),
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "D/‏M/‏YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  relativeTime: {
    future: "بعد %s",
    past: "منذ %s",
    s: "ثانية واحدة",
    m: "دقيقة واحدة",
    mm: "%d دقائق",
    h: "ساعة واحدة",
    hh: "%d ساعات",
    d: "يوم واحد",
    dd: "%d أيام",
    M: "شهر واحد",
    MM: "%d أشهر",
    y: "عام واحد",
    yy: "%d أعوام",
  },
};

dayjs.locale(AR_LOCALE, undefined, true);

/**
 * antd's own `ar_EG` bundle fills `shortWeekDays` with the *full* day names, so
 * the seven header columns render as `السبتالأحدالإثنين…` — each one wider than
 * its column and running into the next. The single-letter forms are what the
 * grid has room for.
 */
const AR_BUNDLE: Locale = {
  ...arEG,
  DatePicker: arEG.DatePicker && {
    ...arEG.DatePicker,
    lang: { ...arEG.DatePicker.lang, shortWeekDays: AR_WEEKDAYS_MIN },
  },
  Calendar: arEG.Calendar && {
    ...arEG.Calendar,
    lang: { ...arEG.Calendar.lang, shortWeekDays: AR_WEEKDAYS_MIN },
  },
};

/** The antd locale bundle (calendar, empty states, pagination…) for a page locale. */
export const antdLocale = (locale: string): Locale =>
  locale.startsWith("ar") ? AR_BUNDLE : enUS;

export default antdLocale;
