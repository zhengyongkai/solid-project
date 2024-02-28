import Header from './header';
import Menus from './menus';

import Styles from './css/index.module.scss';
import { comBineCss } from '@/utils/css';
import { Breadcrumb, Icon } from 'cui-solid';

interface BaseLayoutInf {
  children: Element;
}

export default function BaseLayout(props: BaseLayoutInf) {
  return (
    <>
      <Header></Header>
      <div class={comBineCss([Styles['layout_container'], 'flex'])}>
        <div class={Styles['layout_slider']}>
          <Menus></Menus>
        </div>
        <div class={'flex-1'}>
          <div class={Styles['layout_tabbar']}>
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
          </div>
          <div class={Styles['layout_content']}>{props.children}</div>
        </div>
      </div>
    </>
  );
}
