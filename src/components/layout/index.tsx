import Header from './header';
import Menus from './menus';

import Styles from './css/index.module.scss';
import { comBineCss } from '@/utils/css';
import { Breadcrumb, Icon } from 'cui-solid';
import BreadcrumbLayout from './breadcrumb';
import useCommonStore from '@/stores/common';
import { shallow } from 'zustand/shallow';
import Main from './main';
import { Transition } from 'solid-transition-group';
import { Show, Suspense } from 'solid-js';

interface BaseLayoutInf {
  children: Element;
}

export default function BaseLayout(props: BaseLayoutInf) {
  const [fold] = useCommonStore().fold;
  return (
    <>
      <Header></Header>
      <div class={comBineCss([Styles['layout_container'], 'flex'])}>
        <div
          class={Styles['layout_slider']}
          classList={{ [Styles['fold']]: fold() }}
        >
          <Menus></Menus>
        </div>
        <div class={'flex-1'}>
          <div
            class={Styles['layout_tabbar']}
            classList={{ [Styles['fold']]: fold() }}
          >
            <BreadcrumbLayout></BreadcrumbLayout>
          </div>
          <div
            class={Styles['layout_content']}
            classList={{ [Styles['fold']]: fold() }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              {props.children}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
