import interval from "./interval.js";
import {convertDate} from "./timezone.js";

function timezoneMonth(tz) {
  function floor(date) {
    date.setTime(+convertDate(date, tz).date(1).hour(0).minute(0).second(0).millisecond(0));
  }

  function offset(date, step) {
    date.setTime(+convertDate(date, tz).month(date.getMonth() + step));
  }

  function count(start, end) {
    [start, end] = [convertDate(start), convertDate(end)]
    return end.month() - start.month() + (end.year() - start.year()) * 12
  }

  let field = date => convertDate(date, tz).month();
  return interval(floor, offset, count, field)
}

export default timezoneMonth;
