import { useLocation, useNavigate } from '@solidjs/router';
import { Icon, Menu, MenuItem, SubMenu } from 'cui-solid';

import useCommonStore from '@/stores/common';
import useUserStore from '@/stores/user';

import { routeInf } from '@/types';
import SvgIcon from '@/components/common/SvgIcon';

export default function Menus() {
  const location = useLocation();
  const navigate = useNavigate();

  // 拿到第一层的层级
  const [menuRoutes] = useUserStore().menuRoutes;
  const [fold] = useCommonStore().fold;

  const baseRoute = menuRoutes()[0].children as routeInf[];

  function to(item: string) {
    navigate(item);
  }

  function renderMenu(menus: routeInf[], path: string = '') {
    return menus.map((item) => {
      // 設置Icon
      let icon = item.meta.icon ? <SvgIcon name={item.meta.icon} /> : <></>;
      if (item.children && item.children.length === 1 && item.path === '/') {
        let children = item.children[0] ? item.children[0] : item;
        return (
          <MenuItem icon={icon}>
            <div onClick={() => to('/' + children.path)}>
              {children.meta.title}
            </div>
          </MenuItem>
        );
      }
      if (item.children) {
        return (
          <SubMenu name={item.path} icon={icon} title={item.meta.title}>
            {renderMenu(item.children, path + item.path)}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem name={path + item.path} icon={icon}>
            <div onClick={() => to(path + item.path)}>{item.meta.title}</div>
          </MenuItem>
        );
      }
    });
  }

  return (
    <>
      <Menu dir="v" activeName={location.pathname} min={fold()}>
        {renderMenu(baseRoute, '')}
      </Menu>
    </>
  );
}
