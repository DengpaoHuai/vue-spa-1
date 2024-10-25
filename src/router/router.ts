import DemoPage from '@/pages/DemoPage.vue';
import PlanetListComposable from '@/pages/PlanetListComposable.vue';
import PlanetListPaginatedTanstackQuery from '@/pages/PlanetListPaginatedTanstackQuery.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: PlanetListComposable,
  },
  {
    path: '/demo',
    component: DemoPage,
  },
  {
    path: '/cars/create',
    component: import('@/pages/CreateCarForm.vue'),
    meta: {
      layout: 'MainLayout',
      right: ['admin'],
    },
  },
  {
    path: '/cars',
    component: import('@/pages/CarsListScreen.vue'),
    meta: {
      layout: 'MainLayout',
      right: ['admin', 'user', 'guest'],
    },
  },
  {
    path: '/demotanstack',
    component: PlanetListPaginatedTanstackQuery,
    meta: {
      layout: 'MainLayout',
    },
  },
  {
    path: '/cars/edit/:id',
    component: import('@/pages/EditCardScreen.vue'),
    props: true,
    meta: {
      layout: 'MainLayout',
    },
  },
  {
    path: '/datatable',
    component: () => import('@/pages/DataTablePage.vue'),
  },
  {
    path: '/planets/list',
    component: () => import('@/pages/planets/list.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.right)) {
    const rights = to.meta.right as string[];
    if (!rights.includes('admin')) {
      next({ path: from.path });
    }
  }
  next();
});
