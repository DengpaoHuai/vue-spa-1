import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';
import MainLayout from './components/layouts/MainLayout.vue';
import DefaultLayout from './components/layouts/DefaultLayout.vue';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(router);

app.use(pinia);
app.use(VueQueryPlugin);

app.component('MainLayout', MainLayout);
app.component('DefaultLayout', DefaultLayout);

app.mount('#app');
