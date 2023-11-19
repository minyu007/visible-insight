import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RESULT: AppRouteRecordRaw = {
  path: '/esg-ratings',
  name: 'result',
  redirect: '/esg-ratings/esg',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'ESG Ratings',
    icon: 'icon-relation',
    requiresAuth: true,
    order: 5,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'esg',
      name: 'Success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: 'ESG',
        requiresAuth: true,
        roles: ['admin'],
        activeMenu: 'result',
      },
    },
    {
      path: 'error',
      name: 'Error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default RESULT;
