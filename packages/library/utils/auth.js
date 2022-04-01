import Cookies from 'js-cookie'
import { apiGetEmptyValidToken } from '../api/bsp'
import { cookieTokenKey, cookieUserInfoKey } from '../config/storageKey'
import NProgress from './nprogress'

// token的到期时间（天）
const cookieTokenExpire = 0.33
// 用户信息的到期时间
const cookieUserExpire = 0.33

export default class Auth {
  /**
   * @description 在cookie中获取token信息
   */
  static getToken() {
    return Cookies.get(cookieTokenKey)
  }

  /**
   * @param {String} token
   * @description 在cookie中存储空token
   */
  static setToken(token) {
    Cookies.set(cookieTokenKey, token, { expires: cookieTokenExpire })
  }

  /**
   * @description 检查token信息
   */
  static async checkToken() {
    if (!this.getToken()) {
      const result = await apiGetEmptyValidToken()
      this.setToken(result.data.data)
    }
  }

  /**
   * @description 在cookie中获取用户信息
   */
  static getUserInfo() {
    const userInfo = Cookies.get(cookieUserInfoKey)
    return userInfo ? JSON.parse(userInfo) : {}
  }

  /**
   * @param {Object} userInfo
   * @description 在cookie中存储用户信息
   */
  static setUserInfo(userInfo) {
    Cookies.set(cookieUserInfoKey, JSON.stringify(userInfo), { expires: cookieUserExpire })
  }

  /**
   * @param router 路由对象
   * @description 路由检查用户登录情况
   */
  static initRouterAuth(router, permitWebRoute = false) {
    router.beforeEach(async(to, from, next) => {
      NProgress.start()
      next()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }

  /**
   * @description 清除所有token、用户信息
   */
  static removeAll() {
    Cookies.remove(cookieTokenKey)
    Cookies.remove(cookieUserInfoKey)
  }
}
