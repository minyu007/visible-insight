import { DEFAULT_LAYOUT } from '../base';

import { Icon } from '@arco-design/web-vue';
const IconFont = Icon.addFromIconFontCn({
  src: '//at.alicdn.com/t/c/font_3959654_asl72fm6sch.js',
});


const FIDELITYBI: AppRouteRecordRaw = {
  path: '/fidelity',
  name: 'fidelity',
  component: DEFAULT_LAYOUT,
  redirect: '/fidelity/bi',
  meta: {
    locale: 'Fidelity BI',
    requiresAuth: true,
    icon: 'icon-thunderbolt',
    order: 13,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'bi',
      name: 'bi',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        locale: 'BI',
        requiresAuth: true,
        activeMenu: 'fidelity',
        roles: ['admin'],
      },
    },
  ],
};

export default FIDELITYBI;
