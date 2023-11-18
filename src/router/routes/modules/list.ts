import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/data',
  name: 'list',
  component: DEFAULT_LAYOUT,
  redirect: '/data/datasource',
  meta: {
    locale: 'Data',
    requiresAuth: true,
    icon: 'icon-storage',
    order: 2,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'datasource',
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: 'Data Source',
        requiresAuth: true,
        roles: ['*'],
        activeMenu: 'list',
      },
    },
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default LIST;
