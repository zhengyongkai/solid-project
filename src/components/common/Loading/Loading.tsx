import { Show, createMemo } from "solid-js";
import SvgIcon from "../SvgIcon";
import Styles from "./css/index.module.scss";
import { destructure } from "@solid-primitives/destructure";

interface loadingProps {
  loading?: boolean;
  children: any;
}

export default function Loading(props: loadingProps) {
  let { children } = props;
  let { loading } = destructure(props);
  const isLoading = createMemo(() => {
    return !loading ? false : loading();
  });
  return (
    <>
      <div class={Styles["loading-mask"]}>
        <Show when={isLoading()}>
          <div class={Styles["loading-wrapper"]}>
            <SvgIcon name="loading" color="blue" size={32}></SvgIcon>
          </div>
        </Show>

        <div>{children}</div>
      </div>
    </>
  );
}
