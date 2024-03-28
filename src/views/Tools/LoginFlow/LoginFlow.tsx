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
import Card from "@/components/layout/Card/Card";
import Drawer from "./Components/Drawer";
import useResize from "@/hooks/useResize";

import { Form, Input, FormItem, useForm, ColorPicker } from "cui-solid-better";
import Circle from "./Node/RectNewModel";

LogicFlow.use(Menu);
LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
LogicFlow.use(MiniMap);
LogicFlow.use(Snapshot);
LogicFlow.use(Control);

export default function G6Topo() {
  let a: HTMLDivElement | undefined = undefined;
  let lf: LogicFlow | undefined = undefined;

  useResize(resize);

  const data = {
    // node data
    nodes: [],
    // edge data
    edges: [],
  };

  const [visible, setVisible] = createSignal(false);

  const form = useForm<{
    text: string;
    id: string;
    borderStyle: string;
  }>({
    data: {
      text: "",
      id: "",
      borderStyle: "#000",
    },
  });

  createEffect(
    on(form.data, () => {
      lf?.updateText(form.id, form.data().text);
      setStyle(form.id, {
        borderColor: form.borderStyle,
      });
    })
  );

  function onDrawerClose() {
    setVisible(false);
  }

  function resize() {
    const width = a?.getBoundingClientRect().width || 600;
    lf?.extension.miniMap.hide();
    lf?.extension.miniMap.show(width - 200, 0);
    lf?.resize();
  }

  function setStyle(id: string, item: Object) {
    lf?.setProperties(id, item);
  }

  onMount(() => {
    lf = new LogicFlow({
      grid: true,
      container: a as HTMLElement,
      zoom: true,
    });
    lf.register(UserTaskModel);
    lf.register(Circle);
    lf.render(data);
    lf.extension.dndPanel.setPatternItems(menuConfig(lf));

    const { eventCenter } = lf.graphModel;

    eventCenter.on("node:dbclick", function (e) {
      let obj = {
        text: "",
        id: "",
      };
      obj.id = e.data.id;
      if (e.data.text) {
        obj.text = e.data.text.value;
      }
      form.setFormData(obj);
      setVisible(true);
    });

    resize();
  });

  return (
    <div>
      <div style={{ height: "100%" }}>
        <Card>
          <div style={{ height: "70vh", width: "100%" }} ref={a}></div>
        </Card>
        <Drawer
          visible={visible()}
          onClose={onDrawerClose}
          top={48}
          title="彈窗"
        >
          <Form form={form}>
            <FormItem name="text" label="標題：">
              <Input></Input>
            </FormItem>
            <FormItem name="borderStyle" label="邊距顏色：">
              <ColorPicker />
            </FormItem>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}
