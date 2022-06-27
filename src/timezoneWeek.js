import interval from "./interval.js";
import {durationWeek} from "./duration.js";
import {convertDate} from "./timezone.js";

function timezoneWeekday(i) {
  return function (tz) {
    function floor(date) {
      let converted = convertDate(date, tz);
      let monthDate = converted.date() - (converted.day() + 7 - i) % 7;
      date.setTime(+converted.date(monthDate).hour(0).minute(0).second(0).millisecond(0));
    }

    function offset(date, step) {
      let converted = convertDate(date, tz);
      date.setTime(+converted.date(converted.date() + step * 7));
    }

    let count = (start, end) => (end - start) / durationWeek;
    return interval(floor, offset, count)
  }
}

export var timezoneSunday = timezoneWeekday(0);
export var timezoneMonday = timezoneWeekday(1);
export var timezoneTuesday = timezoneWeekday(2);
export var timezoneWednesday = timezoneWeekday(3);
export var timezoneThursday = timezoneWeekday(4);
export var timezoneFriday = timezoneWeekday(5);
export var timezoneSaturday = timezoneWeekday(6);
