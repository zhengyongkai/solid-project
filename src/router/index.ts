// @ts-nocheck

import { lazy } from 'solid-js';
import { routeInf } from '@/types';

const baseRoutes: routeInf[] = [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: lazy(() => import('@/views/login/index')),
  },
];

const asyncRoutes: routeInf[] = [
  {
    path: '/system',
    component: lazy(() => import('@/components/layout/index')),
    children: [
      {
        path: '/administrator',
        component: lazy(() => import('@/views/system/administrator')),
        meta: {
          login: true,
          title: '管理员列表',
        },
      },
      {
        path: '/role',
        component: lazy(() => import('@/views/system/role')),
        meta: {
          login: true,
          title: '第一次菜单',
        },
      },
    ],
    meta: {
      login: true,
      title: '系統管理',
    },
  },
];

export { baseRoutes, asyncRoutes };
