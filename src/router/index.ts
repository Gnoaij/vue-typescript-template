import { createRouter, createWebHistory } from 'vue-router'

import NProgress from 'nprogress'

import basicRoutes from './routes/basic'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...basicRoutes]
})

NProgress.configure({
  showSpinner: false
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title ?? import.meta.env.VITE_DEFAULT_TITLE
})

export default router
