import { comBineCss } from "@/utils/css";
import Styles from "./css/card.module.scss";
import { JSX, Show } from "solid-js";

interface propsInf {
  title: string;
  children: any;
  more?: boolean;
  onClickMore?: JSX.EventHandlerUnion<HTMLSpanElement, MouseEvent>;
  width?: string;
  height?: string;
}

export default function Card(props: propsInf) {
  let {
    title,
    children,
    more = false,
    onClickMore,
    width = "200px",
    height = "200px",
  } = props;
  return (
    <div class={Styles["layout_module_title"]} style={{ width, height }}>
      <div>
        <div class="font-semibold flex-1">{title}</div>
        <Show when={more}>
          <a
            class={comBineCss([Styles["more"], "text-sm"])}
            onClick={onClickMore}
          >
            更多
          </a>
        </Show>
      </div>
      <div>{children}</div>
    </div>
  );
}
