import { createRouter, createWebHistory } from 'vue-router';

import ResourceHome from '@/pages/ResourceHome';
import ResourceNew from '@/pages/ResourceNew';

const routes = [
  { path: '/', component: ResourceHome },
  { path: '/new', component: ResourceNew },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
