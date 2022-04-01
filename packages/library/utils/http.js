/**
 * 请求方法类
 * @description 当前使用axios进行数据获取，接口返回格式需要统一规范
 */
import axios from 'axios'
import { merge } from 'lodash-es'
import { ElMessageBox } from 'element-plus'
import Auth from './auth'

class Http {
  static request(opt, origin) {
    const instance = axios.create()
    instance.interceptors.request.use(
      (config) => {
        // 空token（防止恶意攻击）
        const tempToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbm9ueW1vdXMiLCJhdWQiOiIiLCJzZXJ2ZXIiOiJodHRwOi8vbG9jYWxob3N0OjMwMzQiLCJyb2xlIjoiIiwic3RhdHVzIjoiMyIsImlzcyI6Imluc3B1ciIsImp0aSI6ImQzMmViMjE0LWViNjYtNDM2Ni05ZTVlLWI1NWQwMWM5MDJlMiIsImlhdCI6MTYyMDk3MTQ3NCwiZXhwIjoxNjIxMDAwMjc0fQ.M8XAoxEpHX--OnAJaRhmTb8YkhFzO2mKoUUji74VcFpZstUCRnpURAh0WhkFjei98jddk1yvD-DHLxmu0OuvJg'
        const requestConfig = { ...config }
        requestConfig.headers.Authorization = Auth.getToken() || tempToken
        return requestConfig
      },
      error => Promise.reject(error),
    )
    const defaultOption = {
      method: 'POST',
      baseURL: import.meta.env.VITE_BASE_URL,
      url: opt.url,
    }
    if ((opt.method === 'GET') || (opt.method === 'get'))
      defaultOption.params = opt.data
    else
      defaultOption.data = opt.data

    const axiosOpt = merge(defaultOption, opt)
    return new Promise((resolve, reject) => {
      instance(axiosOpt).then((res) => {
        if (origin) {
          resolve(res)
        }
        else {
          const { code, msg, data, status } = res.data
          if (code === 1) {
            // 正确返回
            resolve(data)
          }
          else if (status === 410) {
            // token过期
            // 将新token存起
            Auth.setToken(data)
            // 返回过期状态码
            resolve(status)
          }
          else if (status === 401 || status === 403) {
            // 无访问权限，可能情况有
            // 401:没传token或者使用伪造的token
            // 403:访客越权访问用户服务
            ElMessageBox.alert('用户权限有误，请重新登录!', '权限有误', {
              type: 'warning',
              confirmButtonText: '确定',
              callback: async() => {
                window.location.reload()
              },
            })
          }
          else if (status === 200) {
            // 其他异常情况（服务内部逻辑错误）
          }
          else {
            const error = new Error(msg)
            error.name = status
            reject(error)
          }
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default Http
