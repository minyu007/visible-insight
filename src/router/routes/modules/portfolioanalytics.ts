import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PORTFOLIOANALYTICS: AppRouteRecordRaw = {
  path: '/portfolio',
  name: 'portfolio',
  component: DEFAULT_LAYOUT,
  redirect: '/portfolio/analytics',
  meta: {
    locale: 'Portfolio Analytics',
    requiresAuth: true,
    icon: 'icon-layers',
    order: 8,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'analytics',
      name: 'analytics',
      component: () => import('@/views/portfolio/analytics/index.vue'),
      meta: {
        locale: 'Analytics',
        requiresAuth: true,
        activeMenu: 'analytics',
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

export default PORTFOLIOANALYTICS;
