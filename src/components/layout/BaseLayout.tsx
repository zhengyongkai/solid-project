import Header from "./Header/Header";
import Menus from "./Menus/Menus";

import Styles from "./css/index.module.scss";
import { comBineCss } from "@/utils/css";
import useCommonStore from "@/stores/common/index";
import { Show, Suspense } from "solid-js";
import locale from "@/locale";
import Logo from "@/assets/img/web-logo.png";
import TagList from "./TagList/TagList";

export default function BaseLayout(props: any) {
  const {
    fold: [fold],
  } = useCommonStore().data;
  return (
    <>
      <div class={comBineCss([Styles["layout_container"], "flex"])}>
        <div
          class={Styles["layout_slider"]}
          classList={{ [Styles["fold"]]: fold() }}
        >
          <div>
            <div class={Styles["logo"]}>
              <img src={Logo} />
            </div>
            <Show when={!fold()}>
              <div>{locale.t("title")}</div>
            </Show>
          </div>
          <Menus></Menus>
        </div>
        <div class={"flex-1"}>
          <Header></Header>
          <div>
            <TagList></TagList>
          </div>
          <div
            class={Styles["layout_content"]}
            classList={{ [Styles["fold"]]: fold() }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              {props.children}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
