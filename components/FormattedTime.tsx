import * as dayjs from 'dayjs';
// import isLeapYear from 'dayjs/plugin/isLeapYear';
import timezone from "dayjs/plugin/timezone";
// import 'dayjs/locale/zh-cn';
import utc from "dayjs/plugin/utc";
// dayjs.extend(isLeapYear);
dayjs.extend(timezone);
// dayjs.locale('zh-cn');
dayjs.extend(utc);

// export const formatFix = (time: string | Date, format: string) => {
//   return dayjs.utc(time).tz('Asia/Tokyo').format(format)
// }

export default function FormattedTime({ time, format }: { time: string | Date, format: string }) {
  return <time>{dayjs.utc(time).tz('Asia/Tokyo').format(format)}</time>
} 
