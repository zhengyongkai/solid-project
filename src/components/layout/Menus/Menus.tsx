import { useLocation, useNavigate } from "@solidjs/router";
import { Menu, MenuItem, SubMenu } from "cui-solid";

import useCommonStore from "@/stores/common/index";
import useUserStore from "@/stores/user/index";

import { routeInf } from "@/types";
import SvgIcon from "@/components/common/SvgIcon/index";
import { getMenuItemInMenuListByPath } from "@/utils";
import { createEffect, createMemo, createSignal, on, onMount } from "solid-js";

export default function Menus() {
  const location = useLocation();
  const navigate = useNavigate();

  // 拿到第一层的层级

  const { setTagList } = useCommonStore().action;
  const {
    menuRoutes: [menuRoutes],
  } = useUserStore().data;
  const {
    fold: [fold],
  } = useCommonStore().data;
  const baseRoute = menuRoutes();

  function onSelectMenu(item: string = "home") {
    navigate(item);
    let menuItem = getMenuItemInMenuListByPath(menuRoutes(), item);
    setTagList(menuItem!);
  }

  function renderMenu(menus: routeInf[]): any {
    return [...menus].map((item) => {
      // 設置Icon
      let icon = item.meta.icon ? <SvgIcon name={item.meta.icon} /> : <></>;
      if (item.children) {
        return (
          <SubMenu name={item.path} icon={icon} title={item.meta.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem name={"/" + item.meta.path} icon={icon}>
          {item.meta.title}
        </MenuItem>
      );
    });
  }

  const pathname = createMemo(() => location.pathname);

  const [activeName, setActiveName] = createSignal(pathname());

  createEffect(
    on(pathname, () => {
      setActiveName(pathname());
    })
  );

  onMount(() => {
    setTagList({ path: "home", title: "主頁" });
    // onSelectMenu("/home");
    onSelectMenu(location.pathname);
  });

  return (
    <>
      <Menu
        onSelect={(path: string) => {
          path && onSelectMenu(path);
        }}
        dir="v"
        activeName={[activeName, setActiveName]}
        min={fold()}
      >
        {renderMenu(baseRoute)}
      </Menu>
    </>
  );
}
