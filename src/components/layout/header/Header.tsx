import { Dropdown, DropdownItem, DropdownMenu } from 'cui-solid';
import Styles from './css/header.module.scss';

import Logo from '@/assets/img/web-logo.png';
import Setting from '../Setting/Setting';
import Lang from '@/components/common/Lang/Lang';

export default function Header() {
  return (
    <div class={Styles['layout_header']}>
      <div class={Styles['logo']}>
        <img src={Logo} />
      </div>
      <div>人臉考勤門禁總管理平台</div>
      <div>
        <Lang></Lang>
      </div>
      <div>
        <Setting></Setting>
      </div>
      <div>
        <Dropdown
          trigger="click"
          align="bottom"
          menu={
            <DropdownMenu>
              <DropdownItem>修改密碼</DropdownItem>
              <DropdownItem>退出登錄</DropdownItem>
            </DropdownMenu>
          }
          onSelect={(name: string) => {
            console.log(name);
          }}
        >
          <div>鄭永楷</div>
        </Dropdown>
      </div>
    </div>
  );
}
