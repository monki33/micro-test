import Auth from '../utils/auth'
const state = {
  // 用户数据
  user: Auth.getUserInfo(),
}
const mutations = {
  // 设置userInfo
  setUserInfo(state, props) {
    state.user = props
  },
}
const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
