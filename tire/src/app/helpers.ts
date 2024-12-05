import { TimeDiff } from './types';

export function getDataDiff(startDate: Date, endDate: Date): TimeDiff {
  try {
    var diff = endDate.getTime() - startDate.getTime();
    var hour = Math.floor(diff / (60 * 60 * 1000));
    var minute = Math.floor(diff / (60 * 1000)) - hour * 60;
    var second = Math.floor(diff / 1000) - (hour * 60 * 60 + minute * 60);
    return { hour, minute, second };
  } catch (error) {
    console.error(error);
    return { hour: 0, minute: 0, second: 0 };
  }
}
