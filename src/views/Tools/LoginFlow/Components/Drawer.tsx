import { destructure } from "@solid-primitives/destructure";
import Styles from "../css/drawer.module.scss";
import { createComputed, createEffect } from "solid-js";

interface drawerPropsInf {
  visible: boolean;
  top: number;
  title: string;
  children?: any;
}

export default function Drawer(props: drawerPropsInf) {
  const { top, title, children } = props;
  const { visible } = destructure(props);

  const offsetWidth = createComputed<string>(() => {
    return visible() ? "200px" : "0";
  });

  console.log(offsetWidth);
  return (
    <div
      class={Styles["drawer-wrapper"]}
      style={{
        display: visible() ? "" : "none",
        top: top + "px",

        // position
      }}
    >
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
}
