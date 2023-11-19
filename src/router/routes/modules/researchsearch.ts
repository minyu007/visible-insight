import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RESEARCHSEARCH: AppRouteRecordRaw = {
  path: '/research',
  name: 'research',
  component: DEFAULT_LAYOUT,
  redirect: '/research/search',
  meta: {
    locale: 'Research Search',
    requiresAuth: true,
    icon: 'icon-search',
    order: 7,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'search',
      name: 'search',
      component: () => import('@/views/research/search/index.vue'),
      meta: {
        locale: 'Search',
        requiresAuth: true,
        activeMenu: 'research',
        roles: ['*'],
      },
    },

    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default RESEARCHSEARCH;
