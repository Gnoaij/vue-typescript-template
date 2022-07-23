import type { RouteRecordRaw } from 'vue-router'

import Layout from '@/layout/Layout.vue'

const children: RouteRecordRaw[] = []

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children
  }
]

const regExp = /([^/\s]+)\.vue$/

const modules = import.meta.glob('@/views/*/*.vue')

Object.keys(modules).forEach((key) => {
  const match = regExp.exec(key)
  if (match) {
    const [, capture] = match
    children.push({
      path: `/${capture === '404' ? ':pathMatch(.*)*' : capture.toLowerCase()}`,
      name: capture.toLowerCase(),
      meta: {
        title: capture
      },
      component: modules[key]
    })
  }
})

export default routes
