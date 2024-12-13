import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('./pages/home/Home.page.vue'), // Lazy loading
  },
  {
    path: '/discounts/:id/:percentage',
    name: 'Discounts',
    component: () => import('./pages/discounts/Discounts.page.vue'), // Lazy loading
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
