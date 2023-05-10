import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'ProductView',
    component: () => import('@/views/ProductView.vue'),
    props: (route: { params: { id: Number; }; }) => ({ id: Number(route.params.id) }),
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

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   } else {
//     document.title = 'CeramicShop';
//   }
//   next();
// });

export default router;