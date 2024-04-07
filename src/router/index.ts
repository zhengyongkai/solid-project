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
          title: "Table",
          path: "system/administrator",
        },
      },
      // {
      //   path: "/role",
      //   component: lazy(() => import("@/views/System/Role/Role")),
      //   meta: {
      //     login: true,
      //     title: "人员管理",
      //     path: "system/role",
      //   },
      // },
    ],
    meta: {
      login: true,
      title: "表单",
      icon: "setting",
    },
  },

  {
    path: "tools",
    children: [
      {
        path: "/LoginFlow",
        component: lazy(() => import("@/views/Tools/LoginFlow/LoginFlow")),
        meta: {
          login: true,
          title: "LoginFlow 流程圖",
          path: "tools/LoginFlow",
        },
      },
    ],
    meta: {
      login: true,
      title: "工具庫",
      icon: "setting",
    },
  },
];

export { baseRoutes, asyncRoutes };
