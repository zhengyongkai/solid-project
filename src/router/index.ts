import { lazy } from 'solid-js';
import { routeInf } from '@/types';

const routes: routeInf[] = [
  {
    path: '/login',
    component: lazy(() => import('@/view/login/index')),
  },
  {
    path: '/users',
    component: lazy(() => import('@/components/layout/index')),
    children: [
      {
        path: '/lll',
        component: lazy(() => import('@/view/common/index')),
      },
    ],
    meta: {
      login: true,
    },
  },
];

export default routes;
