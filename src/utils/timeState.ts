import { TimeState } from "../@types/MetaData";

export function format_time(s: number, add_milliseconds?: boolean) {
    if (add_milliseconds) {
      var d = new Date(s*1000)
      const timeStampCon = d.toLocaleString()
      return timeStampCon;
    } else {
      var d = new Date(s);
      const timeStampCon = d.toLocaleString()
      return timeStampCon;
    }
}  