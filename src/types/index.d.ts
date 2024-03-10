import { RouteDefinition } from "@solidjs/router";

// 路由
export type routeInf = {
  meta: {
    login?: boolean;
    title?: string;
    icon?: string;
    path?: string;
  };
  children?: routeInf[];
} & RouteDefinition;

// TagList 对应的路由
export type simpleRouteInf = {
  title: string;
  path: string;
};

// 语言列表
export type langInf = "zh-TW" | "zh-CN" | "en-US";
