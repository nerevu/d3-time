import interval from "./interval.js";
import {durationMinute} from "./duration.js";
import {convertDate} from "./timezone.js";

function timezoneMinute(tz) {
  function floor(date) {
    date.setTime(+convertDate(date, tz).second(0).millisecond(0));
  }

  function offset(date, step) {
    let converted = convertDate(date, tz);
    date.setTime(+converted + step * durationMinute);
  }

  let count = (start, end) => (end - start) / durationMinute;
  let field = date => convertDate(date, tz).minute();
  return interval(floor, offset, count, field)
}

export default timezoneMinute;
