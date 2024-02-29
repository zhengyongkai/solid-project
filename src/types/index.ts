import { RouteDefinition } from "@solidjs/router";

export type routeInf = {
  meta: {
    login?: boolean;
    title?: string;
    icon?: string;
  };
  children?: routeInf[];
} & RouteDefinition;
