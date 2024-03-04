import Header from "./Header/Header";
import Menus from "./Menus/Menus";

import Styles from "./css/index.module.scss";
import { comBineCss } from "@/utils/css";
import BreadcrumbLayout from "./Breadcrumb/Breadcrumb";
import useCommonStore from "@/stores/common/index";
import { Suspense } from "solid-js";

interface BaseLayoutInf {
  children: Element;
}

export default function BaseLayout(props: BaseLayoutInf) {
  const [fold] = useCommonStore().fold;
  return (
    <>
      <Header></Header>
      <div class={comBineCss([Styles["layout_container"], "flex"])}>
        <div
          class={Styles["layout_slider"]}
          classList={{ [Styles["fold"]]: fold() }}
        >
          <Menus></Menus>
        </div>
        <div class={"flex-1"}>
          <div
            class={Styles["layout_tabbar"]}
            classList={{ [Styles["fold"]]: fold() }}
          >
            <BreadcrumbLayout></BreadcrumbLayout>
          </div>
          <div
            class={Styles["layout_content"]}
            classList={{ [Styles["fold"]]: fold() }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <div>{props.children}</div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
