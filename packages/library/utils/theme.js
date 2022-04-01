import { themeBackgroundKey, themeColorKey } from '../config/storageKey'
import { themeBackgroundList, themeColorList, themeDefaultBackground, themeDefaultColor } from '../config/theme'
import Storage from './storage'
export default class Theme {
  // 获取当前主色
  static getColor() {
    return Storage.get(themeColorKey) || themeDefaultColor
  }

  // 获取当前色彩列表
  static getColorList() {
    return themeColorList
  }

  // 获取当前背景列表
  static getBackgroundList() {
    return themeBackgroundList
  }

  // 获取当前背景模式
  static getBackgroundMode() {
    return Storage.get(themeBackgroundKey) || themeDefaultBackground
  }

  // 获取当前系统是否支持深色模式
  static isSystemBackgroundAvailable() {
    return window.matchMedia('(prefers-color-scheme)').media !== 'not all'
  }

  // 获取当前系统的外观模式
  static isSystemDarkMode() {
    if (this.isSystemBackgroundAvailable())
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    else
      return false
  }

  // 初始化外观
  static initTheme() {
    // 设置主题色
    this.changeThemeColor(this.getColor())
    // 设置背景模式
    this.changeBackgroundMode(this.getBackgroundMode())
    // 初始化系统外观监听
    this.initSystemModeWatch()
  }

  // 初始化系统外观监听
  static initSystemModeWatch() {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const callback = (e) => {
      const prefersDarkMode = e.matches
      if (this.getBackgroundMode() === 'auto')
        this.changeBackground(prefersDarkMode)
    }
    if (typeof media.addEventListener === 'function')
      media.addEventListener('change', callback)
  }

  // 切换当前主色
  static changeThemeColor(colorCode) {
    Storage.set(themeColorKey, colorCode)
    if (colorCode !== themeDefaultColor)
      document.getElementsByTagName('html')[0].setAttribute('data-brand-color', colorCode)
    else
      document.getElementsByTagName('html')[0].removeAttribute('data-brand-color')
  }

  // 切换当前背景模式
  static changeBackgroundMode(modeCode) {
    Storage.set(themeBackgroundKey, modeCode)
    // 自动模式深色
    if (modeCode === 'auto' && this.isSystemDarkMode())
      this.changeBackground(true)

    // 自动模式浅色
    else if (modeCode === 'auto' && !this.isSystemDarkMode())
      this.changeBackground()

    // 深色
    else if (modeCode === 'dark')
      this.changeBackground(true)

    // 浅色
    else
      this.changeBackground()
  }

  // 切换当前背景
  static changeBackground(isDark) {
    if (isDark)
      document.getElementsByTagName('html')[0].setAttribute('data-color-scheme', 'dark')
    else
      document.getElementsByTagName('html')[0].removeAttribute('data-color-scheme')
  }
}
