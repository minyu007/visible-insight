import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EXCEPTION: AppRouteRecordRaw = {
  path: '/modelling',
  name: 'exception',
  component: DEFAULT_LAYOUT,
  redirect: '/modelling/modelling-edit',
  meta: {
    locale: 'modelling',
    requiresAuth: true,
    icon: 'icon-common',
    order: 3,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'modelling-edit',
      name: '403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        locale: 'modelling-Edit',
        requiresAuth: true,
        roles: ['admin'],
        activeMenu: 'exception',
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default EXCEPTION;
