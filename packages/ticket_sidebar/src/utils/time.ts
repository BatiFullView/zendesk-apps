import { intervalToDuration } from "date-fns";

export class TimeUtils {
  static formatIntervalToTime(
    start: number | Date,
    end: number | Date
  ): string {
    const duration = intervalToDuration({ start, end });

    const formatDurationValue = (value?: number) =>
      value !== undefined ? (value < 10 ? `0${value}` : `${value}`) : "00";

    return `${formatDurationValue(duration.minutes)}:${formatDurationValue(
      duration.seconds
    )}`;
  }
}
