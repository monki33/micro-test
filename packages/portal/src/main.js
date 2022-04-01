import { createApp } from 'vue'
// micro App微前端
import microApp from '@micro-zoe/micro-app'
// 微前端相关方法
import Micro from '@mictest/library/utils/micro'
// 时间处理工具
import datetime from '@mictest/library/utils/datetime'
// vue App
import App from './App.vue'
// vue router
import router from './router'
// vuex
import store from './store'
// 工程通用方法
import '@mictest/library/main'

// 生成微前端插件，对开发环境的子应用进行处理，补全静态资源路径
const microModules = Micro.initMicroModules()
microApp.start({
  plugins: {
    modules: microModules,
  },
})
// 初始化应用
const app = createApp(App)
// 在app应用挂载处理日期工具
app.config.globalProperties.$datetime = datetime

app.use(router)
app.use(store)
app.mount('#app-main')
