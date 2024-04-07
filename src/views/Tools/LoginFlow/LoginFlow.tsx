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

import { Form, Input, FormItem, useForm, ColorPicker, Option } from "cui-solid";
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

  const form = useForm({
    data: {
      text: "",
      id: "",
      borderColor: "#000",
      gradientColor: "#000",
    },
  });

  function onFormChange(f: string, value: string) {
    console.log(f, value);
    if (f === "text") {
      lf?.updateText(form.id, value);
    } else {
      setStyle(form.id, {
        [f]: value,
      });
    }
  }

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
        <div class="text-sm mb-2">双击可以直接打开控件修改</div>
        <Card>
          <div style={{ height: "70vh", width: "100%" }} ref={a}></div>
        </Card>
        <Drawer
          visible={visible()}
          onClose={onDrawerClose}
          top={48}
          title="彈窗"
        >
          <Form form={form} onChange={onFormChange}>
            <FormItem name="text" label="標題：">
              <Input></Input>
            </FormItem>
            <FormItem name="fontSize" label="字体大小：">
              <Input type="select">
                <Option value={"12px"} label="12px"></Option>
                <Option value={"14px"} label="14px"></Option>
                <Option value={"16px"} label="16px"></Option>
                <Option value={"18px"} label="18px"></Option>
                <Option value={"20px"} label="20px"></Option>
              </Input>
            </FormItem>
            <FormItem name="borderColor" label="邊距顏色：">
              <ColorPicker />
            </FormItem>
            <FormItem name="gradientColor" label="背景颜色：">
              <ColorPicker />
            </FormItem>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}
