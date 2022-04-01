import { createApp } from 'vue'
// 微前端通用方法
import Micro from '@mictest/library/utils/micro'
// 时间处理工具
import datetime from '@mictest/library/utils/datetime'
// vue App
import App from './App.vue'
// vue router
import router from './router'
// vuex
import store from './store'
// 初始化应用
const app = createApp(App)
// 在app应用挂载处理日期工具
app.config.globalProperties.$datetime = datetime

// 根据是否微前端环境下需要执行的方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // 修复路由
  Micro.fixMircoRouter(router, import.meta.env.VITE_CONTEXT)
  // 卸载应用
  window.addEventListener('unmount', () => {
    app.unmount()
    // 卸载所有数据监听函数
    window.eventCenterForAppDataManage?.clearDataListener()
  })
}
else {
  // 工程通用方法
  import ('@mictest/library/main')
}

app.use(router)
app.use(store)
app.mount('#app-doc')
