import CarsListScreen from '@/pages/CarsListScreen.vue';
import CreateCarForm from '@/pages/CreateCarForm.vue';
import DemoPage from '@/pages/DemoPage.vue';
import EditCardScreen from '@/pages/EditCardScreen.vue';
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
    component: CreateCarForm,
  },
  {
    path: '/cars',
    component: CarsListScreen,
    meta: {
      layout: 'MainLayout',
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
    component: EditCardScreen,
    props: true,
    meta: {
      layout: 'MainLayout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
