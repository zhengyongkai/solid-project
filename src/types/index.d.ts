import { RouteDefinition } from "@solidjs/router";

export type routeInf = {
  meta: {
    login?: boolean;
    title?: string;
    icon?: string;
    path?: string;
  };
  children?: routeInf[];
} & RouteDefinition;

export type simpleRouteInf = {
  title: string;
  path: string;
};

export type langInf = "zh-TW" | "zh-CN" | "en-US";
