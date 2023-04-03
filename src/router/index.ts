import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    // redirect: '/home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Mind/Home.vue'),
  },
  // {
  //   path: '/home',
  //   name: 'home',
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
