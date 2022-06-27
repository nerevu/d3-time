import interval from "./interval.js";
import {durationDay} from "./duration.js";
import {convertDate} from "./timezone.js";

function timezoneDay(tz) {
  function floor(date) {
    date.setTime(+convertDate(date, tz).hour(0).minute(0).second(0).millisecond(0));
  }

  function offset(date, step) {
    let converted = convertDate(date, tz);
    date.setTime(+converted.date(converted.date() + step));
  }

  let count = (start, end) => (end - start) / durationDay;
  let field = date => convertDate(date, tz).date() - 1;
  return interval(floor, offset, count, field)
}

export default timezoneDay;
