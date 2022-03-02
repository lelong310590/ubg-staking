export class DateTimeUtils {
  static timeToSeconds(time: any): number {
    time = new Date(time);
    return +Math.floor(time.getTime() / 1000).toFixed(0)
  }

  static secondsToTime(time: any) {
    if (!time) return;
    try {
      return new Date(time * 1000)
    } catch (error) {
      return;
    }
  }

  static formatToShow(date: any, isShowTime = true, locale?: string) {
    if (!date) return '--';
    const time = new Date(date);
    let hours = time.getHours();
    let min: any = time.getMinutes();
    min = min < 10 ? `0${min}` : min;
    if (!isShowTime) return `${time.toLocaleDateString(locale)}`;
    return `${hours}:${min} - ${time.toLocaleDateString(locale)}`;
  }

  static coutdown(endTime: any, startTime = Date.now()) {
    if (!endTime || (new Date(endTime).getTime() <= new Date(startTime).getTime())) return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
    const distance = Math.abs(new Date(endTime).getTime() - startTime);
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, isExpired: false, }
  }
}