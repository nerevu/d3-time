import interval from "./interval.js";
import {convertDate} from "./timezone.js";

function timezoneYear(tz) {
  function floor(date) {
    date.setTime(+convertDate(date, tz).month(0).date(1).hour(0).minute(0).second(0).millisecond(0));
  }

  function offset(date, step) {
    date.setTime(+convertDate(date, tz).year(date.getFullYear() + step));
  }

  function count(start, end) {
    [start, end] = [convertDate(start), convertDate(end)]
    return end.year() - start.year()
  }

  let field = date => convertDate(date, tz).year();
  let _timezoneYear = interval(floor, offset, count, field);

  // An optimized implementation for this simple case.
  _timezoneYear.every = function (k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : interval(function (date) {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  return _timezoneYear;
}

export default timezoneYear;
