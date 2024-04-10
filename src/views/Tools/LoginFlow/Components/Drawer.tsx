import { destructure } from "@solid-primitives/destructure";
import Styles from "../css/drawer.module.scss";
import { createMemo } from "solid-js";
import { Icon } from "cui-solid";

interface drawerPropsInf {
  visible: boolean;
  top: number;
  title: string;
  children?: any;
  width?: number;
  onClose?: Function;
}

export default function Drawer(props: drawerPropsInf) {
  const { top, title, width = 350, onClose } = props;
  const { visible, children } = destructure(props);

  const offsetWidth = createMemo<string>(() => {
    return visible() ? width + "px" : "0";
  });

  const childrens = createMemo<string>(() => {
    return children ? children() : <></>;
  });

  function onCloseDrawer() {
    onClose && onClose();
  }

  return (
    <div
      class={Styles["drawer-wrapper"]}
      style={{
        width: offsetWidth(),
        top: top + "px",
      }}
    >
      <div class={Styles["drawer-title"]}>
        <div>{title}</div>
        <div onclick={() => onCloseDrawer()}>
          <Icon name="x"></Icon>
        </div>
      </div>
      <div class={Styles["drawer-content"]}>{childrens()}</div>
    </div>
  );
}
