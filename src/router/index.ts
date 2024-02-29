// @ts-nocheck

import { lazy } from 'solid-js';
import { routeInf } from '@/types';

const Home = lazy(() => import('@/components/layout/index'));

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
    path: '/',
    component: Home,
    meta: {
      title: '',
      icon: 'home',
    },
    children: [
      {
        path: 'home',
        component: lazy(() => import('@/views/home/index')),
        meta: {
          title: '主頁',
          icon: 'home',
        },
      },
      {
        path: 'system',
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
              title: '人员管理',
            },
          },
        ],
        meta: {
          login: true,
          title: '系統管理',
          icon: 'setting',
        },
      },
      {
        path: 'equipment',
        children: [
          {
            path: '/list',
            component: lazy(() => import('@/views/equipment/list')),
            meta: {
              login: true,
              title: '設備列表',
            },
          },

          {
            path: '/region',
            component: lazy(() => import('@/views/equipment/region')),
            meta: {
              login: true,
              title: '區域配置',
            },
          },
        ],
        meta: {
          login: true,
          title: '設備管理',
          icon: 'setting',
        },
      },
    ],
  },
];

export { baseRoutes, asyncRoutes };
