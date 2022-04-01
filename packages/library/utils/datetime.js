/**
 * Datetime 类
 * @desc 基于moment,用于格式化日期及日期时间
 * @author ZhangYe
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
export default class Datetime {
  static currentHour() {
    return dayjs().hour()
  }

  // 抹平时区差异
  static handleTime(datetime) {
    return dayjs(datetime).add(-8, 'hour')
  }

  // 日期格式化
  static format(datetime) {
    return this.handleTime(datetime).format('YYYY-MM-DD')
  }

  // 日期时间格式化
  static formatDatetime(datetime) {
    return this.handleTime(datetime).format('YYYY-MM-DD HH:mm:ss')
  }

  // 相对日期时间格式化
  static formatToNow(datetime) {
    return this.handleTime(datetime).toNow()
  }

  // 相对日期时间格式化
  static formatFromNow(datetime) {
    return this.handleTime(datetime).fromNow()
  }
}
