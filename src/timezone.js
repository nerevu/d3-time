import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import arraySupport from "dayjs/plugin/arraySupport.js";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(arraySupport)

export function convertDate(date, tz, keepLocalTime) {
  let dateIsDayjs = dayjs.isDayjs(date);
  tz = tz.toLowerCase().endsWith("utc") ? "UTC" : tz;

  if (tz) {
    return dateIsDayjs ? date.tz(tz, keepLocalTime) : dayjs(date).tz(tz, keepLocalTime)
  } else {
    return dateIsDayjs ? date : dayjs(date)
  }
}

export function createDate(tz, ...args) {
  tz = tz.toLowerCase().endsWith("utc") ? "UTC" : tz;
  return tz ? dayjs(args).tz(tz, Boolean(args.length)) : dayjs(args);
}
