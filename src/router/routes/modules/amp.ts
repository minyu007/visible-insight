import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const AMP: AppRouteRecordRaw = {
  path: '/amp',
  name: 'amp',
  component: DEFAULT_LAYOUT,
  redirect: '/amp/reports',
  meta: {
    locale: 'AMP',
    requiresAuth: true,
    icon: 'icon-mobile',
    order: 6,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'reports',
      name: 'reports',
      component: () => import('@/views/amp/reports/index.vue'),
      meta: {
        locale: 'Reports',
        requiresAuth: true,
        activeMenu: 'amp',
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

export default AMP;
