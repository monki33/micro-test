import Http from '../utils/http'

// 登录
export const apiLogin = (params) => {
  return Http.request({
    url: '/auth/user/login',
    data: params,
  })
}
// 获取空token
export function apiGetEmptyValidToken() {
  return Http.request({
    url: '/auth/utils/uuid',
    method: 'get',
  }, true)
}
// 验证码工具
export const apiGetVerifyCode = () => {
  return Http.request({
    url: '/auth/utils/send/slideCode',
    method: 'get',
  })
}
// 用户菜单
export const apiGetUserMenu = (params) => {
  return Http.request({
    url: '/auth/user/menus',
    data: {
      appCode: process.env.VUE_APP_CODE,
      level: '3',
    },
  })
}
// 修改密码
export const apiUpdatePassword = (currentPwd, newPwd) => {
  return Http.request({
    url: '/auth/user/modifyPwd',
    data: {
      originPwd: currentPwd,
      newPwd,
    },
  })
}
