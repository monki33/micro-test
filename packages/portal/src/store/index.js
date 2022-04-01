import { createStore } from 'vuex'
import auth from '@mictest/library/store/auth'
export default createStore({
  modules: {
    auth,
  },
})
