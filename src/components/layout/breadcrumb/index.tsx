import useCommonStore from "@/stores/common";
import { useLocation } from "@solidjs/router";
import { Breadcrumb, Icon } from "cui-solid";
import { createEffect, createSignal, on } from "solid-js";
import { shallow } from "zustand/shallow";

export default function BreadcrumbLayout() {
  const location = useLocation();

  const [fold, setFold] = useCommonStore().fold;

  return (
    <>
      <Icon
        name="anchor"
        size={12}
        onClick={() => {
          setFold(!fold());
        }}
      />
      <Breadcrumb>
        <Breadcrumb.Item icon={<Icon name="anchor" size={12} />}>
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item
          icon={<Icon name="dashboard" size={12} />}
          link="#/nav/breadcrumb"
        >
          面板
        </Breadcrumb.Item>
        <Breadcrumb.Item>管理</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
