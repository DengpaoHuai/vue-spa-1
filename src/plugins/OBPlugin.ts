import DataTable from '@/components/ui/DataTable.vue';
import type { App } from 'vue';

export default {
  install(app: App<Element>, options?: {}) {
    app.component('DataTable', DataTable);

    app.provide('myPluginOptions', options);

    const availableRight = ['admin1', 'user'];

    const vCheckRight = {
      mounted(el: HTMLElement) {
        if (!availableRight.includes('admin')) {
          el.remove();
        }
      },
    };

    app.directive('check-right', vCheckRight);
  },
};
