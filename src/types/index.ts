import { RouteDefinition } from "@solidjs/router";

export type routeInf = {
  meta?: {
    login: boolean;
  };
} & RouteDefinition;
