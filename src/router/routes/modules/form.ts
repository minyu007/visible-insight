import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/Authoring',
  name: 'form',
  redirect: '/authoring/authoring-edit',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'Authoring',
    icon: 'icon-file',
    requiresAuth: true,
    order: 4,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'authoring-edit',
      name: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin'],
        activeMenu: 'form',
      },
    },
    {
      path: 'group',
      name: 'Group',
      component: () => import('@/views/form/group/index.vue'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default FORM;
