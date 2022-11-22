import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { DATE_FORMAT } from "Utils/Constants";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

export default class CustomDate {
  static dateFormatter(date, format = DATE_FORMAT.DEFAULT_DATE) {
    return dayjs(date).format(format);
  }
}
