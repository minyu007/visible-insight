import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const replay: AppRouteRecordRaw = {
  path: '/replay',
  name: 'replay',
  component: DEFAULT_LAYOUT,
  redirect: '/replay/workplace',
  meta: {
    locale: 'menu.replay',
    requiresAuth: true,
    icon: 'icon-play-circle',
    order: 0,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/replay/workplace/index.vue'),
      meta: {
        locale: 'menu.replay.workplace',
        requiresAuth: true,
        activeMenu: 'replay',
        roles: ['*'],
      },
    },

    {
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/replay/monitor/index.vue'),
      meta: {
        locale: 'menu.replay.monitor',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default replay;
