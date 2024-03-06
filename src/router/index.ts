// @ts-nocheck

import { lazy } from "solid-js";
import { routeInf } from "@/types";
import { redirect } from "@solidjs/router";

const Home = lazy(() => import("@/components/layout/BaseLayout"));

const baseRoutes: routeInf[] = [
  {
    path: "/login",
    meta: {
      title: "登录",
    },
    component: lazy(() => import("@/views/Login/Login")),
  },
];

const asyncRoutes: routeInf[] = [
  {
    path: "home",
    component: lazy(() => import("@/views/Home/Home")),
    meta: {
      title: "主頁",
      icon: "home",
      path: "home",
    },
  },
  {
    path: "system",
    children: [
      {
        path: "/administrator",
        component: lazy(
          () => import("@/views/System/Administrator/Administrator")
        ),
        meta: {
          login: true,
          title: "管理员列表",
          path: "system/administrator",
        },
      },
      {
        path: "/role",
        component: lazy(() => import("@/views/System/Role/Role")),
        meta: {
          login: true,
          title: "人员管理",
          path: "system/role",
        },
      },
    ],
    meta: {
      login: true,
      title: "系統管理",
      icon: "setting",
    },
  },
  {
    path: "equipment",
    children: [
      {
        path: "/list",
        component: lazy(() => import("@/views/Equipment/list/List")),
        meta: {
          login: true,
          title: "設備列表",
          path: "equipment/list",
        },
      },

      {
        path: "/region",
        component: lazy(() => import("@/views/Equipment/region/Region")),
        meta: {
          login: true,
          title: "區域配置",
          path: "equipment/region",
        },
      },
    ],
    meta: {
      login: true,
      title: "設備管理",
      icon: "setting",
    },
  },
  {
    path: "equipment1",
    children: [
      {
        path: "/list",
        component: lazy(() => import("@/views/Equipment/list/List")),
        meta: {
          login: true,
          title: "設備列表",
          path: "equipment1/list",
        },
      },

      {
        path: "/region",
        component: lazy(() => import("@/views/Equipment/region/Region")),
        meta: {
          login: true,
          title: "區域配置",
          path: "equipment1/region",
        },
      },
    ],
    meta: {
      login: true,
      title: "設備管理",
      icon: "setting",
    },
  },
];

export { baseRoutes, asyncRoutes };
