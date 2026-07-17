import dayjs from "dayjs";

export const PRIVATE_DATE_FORMAT = "YYYY-MM-DD";
export const PRIVATE_TIME_FORMAT = "HH:mm";
const TIMESTAMP_FORMAT = `${PRIVATE_DATE_FORMAT} ${PRIVATE_TIME_FORMAT}`;

/**
 * The URL keeps the date and the time apart so the form can restore each picker,
 * while the API takes them as one timestamp (`date_time` in bus-api-reference.md).
 */
export const combineDateTime = (
  date?: string | null,
  time?: string | null,
): string | undefined => {
  if (!date || !time) return undefined;
  const combined = dayjs(`${date} ${time}`);
  return combined.isValid() ? combined.format(TIMESTAMP_FORMAT) : undefined;
};

/** Merges a date picker's day with a time picker's clock reading. */
export const mergeDateAndTime = (date: dayjs.Dayjs, time: dayjs.Dayjs) =>
  dayjs(date).hour(time.hour()).minute(time.minute()).second(0).millisecond(0);
