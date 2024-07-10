import { Avatar, Dropdown, DropdownItem, DropdownMenu } from 'cui-solid'
import Styles from './css/header.module.scss'

import Setting from '../Setting/Setting'
import Lang from '@/components/common/Lang/Lang'
import BreadcrumbLayout from '../Breadcrumb/Breadcrumb'
import useCommonStore from '@/stores/common/index'

import useUserStore from '@/stores/user'

export default function Header() {
  const {
    fold: [fold]
  } = useCommonStore().data

  const {
    userInfo: [userInfo]
  } = useUserStore().data

  return (
    <div class={Styles['layout_header']}>
      <div class={Styles['layout_tabbar']} classList={{ [Styles['fold']]: fold() }}>
        <BreadcrumbLayout></BreadcrumbLayout>
      </div>

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
              <DropdownItem disabled>{userInfo().account}</DropdownItem>
              <DropdownItem>修改密碼</DropdownItem>
              <DropdownItem>退出登錄</DropdownItem>
            </DropdownMenu>
          }
          onSelect={(name: string) => {
            console.log(name)
          }}
        >
          <div class="cursor-pointer">
            <Avatar src={userInfo().avatar}></Avatar>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
