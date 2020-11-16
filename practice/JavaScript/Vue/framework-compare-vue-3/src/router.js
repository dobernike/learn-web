import { createRouter, createWebHistory } from 'vue-router';

// import ResourceRoutes from '@/pages/ResourceRoutes';
import ResourceHome from '@/pages/ResourceHome';
import ResourceNew from '@/pages/ResourceNew';

// const routes = [
//   { path: '/', redirect: { name: 'resourceHomePage' } },
//   {
//     path: '/resources',
//     name: 'resourcesRoutes',
//     component: ResourceRoutes,
//     children: [
//       {
//         path: '',
//         name: 'resourceHomePage',
//         component: ResourceHome,
//       },
//       {
//         path: 'new',
//         name: 'resourceNewPage',
//         component: ResourceNew,
//       },
//     ],
//   },
// ];

const routes = [
  { path: '/', redirect: { name: 'resourceHomePage' } },
  { path: '/resources', name: 'resourceHomePage', component: ResourceHome },
  { path: '/resources/new', name: 'resourceNewPage', component: ResourceNew },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes,
});

export default router;
