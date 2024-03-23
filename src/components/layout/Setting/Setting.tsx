import { Button } from 'cui-solid-better';

import Styles from './css/setting.module.scss';
import SvgIcon from '@/components/common/SvgIcon/index';

export default function Setting() {
  function onFullScreen() {
    let full = document.fullscreenElement;
    if (!full) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div class={Styles['layout_setting']}>
      <div>
        <Button
          type="dashed"
          icon={<SvgIcon name="refresh" size={12}></SvgIcon>}
        ></Button>
      </div>
      <div>
        <Button
          onClick={onFullScreen}
          type="dashed"
          icon={<SvgIcon name="fullscreen" size={12}></SvgIcon>}
        ></Button>
      </div>
    </div>
  );
}
