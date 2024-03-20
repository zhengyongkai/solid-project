import LogicFlow from "@logicflow/core";
import { Menu } from "@logicflow/extension";
import {
  DndPanel,
  SelectionSelect,
  MiniMap,
  Snapshot,
  Control,
} from "@logicflow/extension";

import "@logicflow/extension/lib/style/index.css";
import "@logicflow/core/dist/style/index.css";

import { menuConfig } from "./config/index";

import { createEffect, createSignal, on, onMount } from "solid-js";

import UserTaskModel from "./Node/UserTaskModel";
import { Button } from "cui-solid";
import Card from "@/components/layout/Card/Card";

import Style from "./css/loginFlow.module.scss";
import Drawer from "./Components/Drawer";
import useUserStore from "@/stores/user";
import useCommonStore from "@/stores/common/index";
import useResize from "@/hooks/useResize";

LogicFlow.use(Menu);
LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
LogicFlow.use(MiniMap);
LogicFlow.use(Snapshot);
LogicFlow.use(Control);

export default function G6Topo() {
  let a: HTMLDivElement | undefined = undefined;
  let lf: LogicFlow | undefined = undefined;

  const data = {
    // node data
    nodes: [],
    // edge data
    edges: [],
  };

  const [visible, setVisible] = createSignal(false);

  useResize(resize);

  onMount(() => {
    const width = a?.getBoundingClientRect().width || 600;
    const height = a?.scrollHeight;
    lf = new LogicFlow({
      grid: true,
      container: a as HTMLElement,
      zoom: true,
    });
    lf.register(UserTaskModel);
    lf.render(data);
    lf.extension.dndPanel.setPatternItems(menuConfig(lf));

    const { eventCenter } = lf.graphModel;

    eventCenter.on("history:change", function (e, v) {
      console.log(e, v);
      setVisible(true);
    });

    resize();
  });

  function onExport() {
    console.log(data);
    lf?.getSnapshot();
  }

  function onClear() {
    lf?.clearData();
  }

  function resize() {
    const width = a?.getBoundingClientRect().width || 600;
    lf?.extension.miniMap.hide();
    lf?.extension.miniMap.show(width - 200, 0);
    lf?.resize();
  }
  return (
    <div>
      <div style={{ height: "100%" }}>
        <Card>
          <div style={{ height: "70vh", width: "100%" }} ref={a}></div>
        </Card>
        <Drawer visible={visible()} top={48} title="彈窗">
          dasdasd
        </Drawer>
      </div>
    </div>
  );
}
