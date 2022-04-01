import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import Auth from '@mictest/library/utils/auth'
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
// 第二个参数，放行门户的web路由
Auth.initRouterAuth(router, true)
export default router
