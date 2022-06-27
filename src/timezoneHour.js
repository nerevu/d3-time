import interval from "./interval.js";
import {durationHour} from "./duration.js";
import {convertDate} from "./timezone.js";

function timezoneHour(tz) {
  function floor(date) {
    date.setTime(+convertDate(date, tz).minute(0).second(0).millisecond(0));
    // date.setUTCMinutes(0, 0, 0);
  }

  function offset(date, step) {
    let converted = convertDate(date, tz);
    date.setTime(+converted + step * durationHour);
    // date.setTime(+date + step * durationHour);
  }

  let count = (start, end) => (end - start) / durationHour;
  let field = date => convertDate(date, tz).hour();
  // let field = date => date.getUTCHours();
  return interval(floor, offset, count, field)
}

export default timezoneHour;
