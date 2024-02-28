import { useLocation, useNavigate } from '@solidjs/router';
import { Icon, Menu, MenuItem, SubMenu } from 'cui-solid';

import type { userStoreState } from '~/src/stores/user';
import userStore from '~/src/stores/user';
import { routeInf } from '~/src/types';

export default function Menus() {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRoutes = userStore((state: userStoreState) => state.menuRoutes);

  function to(item: string) {
    navigate(item);
  }

  function renderMenu(menus: routeInf[], parent: routeInf | null) {
    return menus.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            name={item.path}
            icon={<Icon name="users" />}
            title={item.meta.title}
          >
            {renderMenu(item.children, item)}
          </SubMenu>
        );
      } else {
        console.log(parent!.path + item.path);
        return (
          <MenuItem
            name={parent!.path + item.path}
            icon={<Icon name="users" />}
          >
            <div onClick={() => to(parent!.path + item.path)}>
              {item.meta.title}
            </div>
          </MenuItem>
        );
      }
    });
  }

  return (
    <>
      <Menu dir="v" activeName={location.pathname} min={false}>
        {renderMenu(menuRoutes, null)}
      </Menu>
    </>
  );
}
