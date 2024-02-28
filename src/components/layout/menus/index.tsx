import { Icon, Menu, MenuItem, SubMenu } from 'cui-solid';

export default function Menus() {
  return (
    <>
      <Menu dir="v">
        <SubMenu name="1" icon={<Icon name="users" />} title="角色管理">
          <MenuItem name="11">添加</MenuItem>
          <MenuItem name="12">修改</MenuItem>
          <MenuItem name="13">删除</MenuItem>
        </SubMenu>
        <MenuItem name="2" icon={<Icon name="user" />}>
          用户管理
        </MenuItem>
      </Menu>
    </>
  );
}
