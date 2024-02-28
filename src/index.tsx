import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import routes from "@/router/index";
import "cui-solid/dist/styles/cui.css";

function renderRoute() {
  return routes.map((item) => {
    if (item.meta?.login) {
      // item.component =
    }
    return item;
  });
}

render(
  () => <Router>{renderRoute()}</Router>,
  document.getElementById("root")!
);
