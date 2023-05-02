import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/catalog',
      component: () => import('@/views/CatalogView.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})
