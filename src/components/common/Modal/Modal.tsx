import { destructure } from "@solid-primitives/destructure";
import { Button, Modal as CModal } from "cui-solid";
import { createMemo, createSignal, onMount, splitProps } from "solid-js";

import Styles from "./css/modal.module.scss";

interface ModalPropsInf {
  visible: boolean;
  onOk: () => void;
  onClosed: () => void;
  width?: number;
  children: any;
  top?: number;
  title?: string;
  height?: number;
}

export default function Modal(props: ModalPropsInf) {
  let { visible, onOk, onClosed, width, children, top, title, height } =
    destructure(props);

  let offsetTop = createMemo(() => {
    return top ? top() + "px" : "30px";
  });

  let offsetWidth = createMemo(() => {
    return width ? width() + "px" : "600px";
  });

  let containerHeight = createMemo(() => {
    return height ? height() + "px" : "600px";
  });

  return (
    <CModal
      footer={false}
      title={title}
      visible={[visible, onClosed()]}
      style={{ width: `${offsetWidth()}` }}
      defaultPosition={{ top: offsetTop() }}
      disabled
    >
      <div
        class={Styles["modal_content_wrapper"]}
        style={{ "max-height": containerHeight() }}
      >
        {children()}
      </div>
      <div class={Styles["modal_footer_wrapper"]}>
        <Button type="primary" onClick={onOk()}>
          确定
        </Button>
        <Button onClick={onClosed()}>取消</Button>
      </div>
    </CModal>
  );
}
