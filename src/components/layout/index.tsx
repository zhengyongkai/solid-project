import Header from './header';
import Menus from './menus';

import Styles from './css/index.module.scss';

interface BaseLayoutInf {
  children: Element;
}

export default function BaseLayout(props: BaseLayoutInf) {
  return (
    <>
      <Header></Header>
      <div class={Styles['layout_container']}>
        <div class={Styles['layout_slider']}>
          <Menus></Menus>
        </div>
        <div class={Styles['layout_content']}>
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
}
