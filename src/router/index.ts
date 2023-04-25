import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home/index.vue'),
  },
  {
    path: '/game',
    name: 'game',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Game/index.vue'),
  },
  {
    path: '/mind',
    name: 'mind',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Mind/Home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
