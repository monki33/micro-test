import { find } from 'lodash-es'
// const microAppFile = import.meta.globEager('../config/microApp.js')
// let microAppList = []
// Object.keys(microAppFile).forEach((key) => {
//   microAppList = microAppFile[key].microAppList
// })
import { microAppList } from '../config/microApp'

export default class Micro {
  /**
   * @method 生成microApp的modules组件
   */
  static initMicroModules() {
    const microModules = {}
    microAppList.forEach((value) => {
      microModules[value.app] = [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
              const reg = new RegExp(`(from|import)(\\s*['"])(\/${value.base}\/)`, 'g')
              code = code.replace(reg, (all) => {
                return all.replace(`/${value.base}/`, `${value.host}/${value.base}/`)
              })
            }
            return code
          },
        },
      ]
    })
    return microModules
  }

  /**
   * @method 生成microApp的通信对象
   */
  static initMicroEventCenter(EventCenter) {
    microAppList.forEach((value) => {
      window[`${value.app}MicroEvent`] = new EventCenter(value.app)
    })
  }

  /**
   * @method 根据子应用标识获得子应用信息
   * @param {String} microCode 子应用标识
   */
  static getMicroInfo(microCode) {
    return find(microAppList, item => item.app === microCode)
  }

  /**
   * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
   * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
   * @param {*} router 子应用的路由
   * @param {String} base 子应用的base，与vite.config一致，不含两侧斜杠
   */
  static fixMircoRouter(router, base) {
    const realBaseRoute = `/${base}/#`

    router.beforeEach(() => {
      if (typeof window.history.state?.current === 'string')
        window.history.state.current = window.history.state.current.replace(new RegExp(realBaseRoute, 'g'), '')
    })

    router.afterEach(() => {
      if (typeof window.history.state === 'object' && window.history.state?.current.indexOf(realBaseRoute) < 0)
        window.history.state.current = realBaseRoute + (window.history.state.current || '')
    })
  }
}
