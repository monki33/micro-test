import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import NProgress from '@mictest/library/utils/nprogress'
import Auth from '@mictest/library/utils/auth'
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
Auth.initRouterAuth(router)

// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   next()
// })
// router.afterEach(() => {
//   NProgress.done()
// })

export default router
