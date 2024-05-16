import { comBineCss } from "@/utils/css";
import Styles from "./css/card.module.scss";
import { JSX, Show, createMemo } from "solid-js";

interface propsInf {
  children: any;
  more?: boolean;
  onClickMore?: JSX.EventHandlerUnion<HTMLSpanElement, MouseEvent>;
  width?: string;
  height?: string;
  class?: string;
  style?: any;
}

export default function Card(props: propsInf) {
  let { children, style } = props;

  let classes = createMemo(() => {
    return (props.class || "") + " " + Styles["layout_module_title"];
  });

  return (
    <div class={classes()} style={style}>
      <div>{children}</div>
    </div>
  );
}
