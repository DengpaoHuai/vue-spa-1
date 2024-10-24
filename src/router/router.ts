import CarsListScreen from '@/pages/CarsListScreen.vue';
import CreateCarForm from '@/pages/CreateCarForm.vue';
import DemoPage from '@/pages/DemoPage.vue';
import PlanetListComposable from '@/pages/PlanetListComposable.vue';
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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
