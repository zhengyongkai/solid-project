import Header from './header';
import Menus from './menus';

import Styles from './css/index.module.scss';
import { comBineCss } from '@/utils/css';

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
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
}
