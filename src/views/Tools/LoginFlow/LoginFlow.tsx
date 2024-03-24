import LogicFlow from '@logicflow/core';
import { Menu } from '@logicflow/extension';
import {
  DndPanel,
  SelectionSelect,
  MiniMap,
  Snapshot,
  Control,
} from '@logicflow/extension';

import '@logicflow/extension/lib/style/index.css';
import '@logicflow/core/dist/style/index.css';

import { menuConfig } from './config/index';

import { createEffect, createSignal, on, onMount } from 'solid-js';

import UserTaskModel from './Node/UserTaskModel';
import Card from '@/components/layout/Card/Card';
import Drawer from './Components/Drawer';
import useResize from '@/hooks/useResize';

import { Form, Input, FormItem, useForm } from 'cui-solid-better';

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
  }>({
    data: {
      text: '',
      id: '',
    },
  });

  createEffect(
    on(form.data, () => {
      console.log('dd', form.data().text);
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

  onMount(() => {
    lf = new LogicFlow({
      grid: true,
      container: a as HTMLElement,
      zoom: true,
    });
    lf.register(UserTaskModel);
    lf.render(data);
    lf.extension.dndPanel.setPatternItems(menuConfig(lf));

    const { eventCenter } = lf.graphModel;

    eventCenter.on('node:click', function (e) {
      let obj = {
        text: '',
      };
      if (e.data.text) {
        obj.text = e.data.text.value;
        lf?.updateText(form.id, e.data.text.value);
      }
      form.setFormData(obj);
      setVisible(true);
    });

    resize();
  });

  return (
    <div>
      <div style={{ height: '100%' }}>
        <Card>
          <div style={{ height: '70vh', width: '100%' }} ref={a}></div>
        </Card>
        <Drawer
          visible={visible()}
          onClose={onDrawerClose}
          top={48}
          title="彈窗"
        >
          {form.text}
          <Form form={form}>
            <FormItem name="text" label="標題：">
              <Input></Input>
            </FormItem>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}
