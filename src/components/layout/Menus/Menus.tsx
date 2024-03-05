import { useLocation, useNavigate } from "@solidjs/router";
import { Menu, MenuItem, SubMenu } from "cui-solid";

import useCommonStore from "@/stores/common/index";
import useUserStore from "@/stores/user/index";

import { routeInf } from "@/types";
import SvgIcon from "@/components/common/SvgIcon/index";

export default function Menus() {
  const location = useLocation();
  const navigate = useNavigate();

  // 拿到第一层的层级
  const [menuRoutes] = useUserStore().menuRoutes;
  const [fold] = useCommonStore().fold;
  const baseRoute = menuRoutes();

  function to(item: string) {
    navigate(item);
  }

  console.log(location.pathname);

  function renderMenu(menus: routeInf[], path: string = ""): any {
    return menus.map((item) => {
      // 設置Icon
      let icon = item.meta.icon ? <SvgIcon name={item.meta.icon} /> : <></>;
      if (item.path === "/") {
        return <>{renderMenu(item.children as routeInf[], "/")}</>;
      }
      if (item.children && item.children.length === 1 && item.path === "/") {
        let children = item.children ? item.children[0] : item;
        return <MenuItem icon={icon}>{children.meta.title}</MenuItem>;
      }
      if (item.children) {
        return (
          <SubMenu name={item.path} icon={icon} title={item.meta.title}>
            {renderMenu(item.children, path + item.path)}
          </SubMenu>
        );
      }
      return (
        <MenuItem name={"/" + path + item.path} icon={icon}>
          <div onClick={() => to(path + item.path)}>{item.meta.title}</div>
        </MenuItem>
      );
    });
  }

  return (
    <>
      <Menu
        onSelect={(path: string) => {
          path && to(path);
        }}
        dir="v"
        activeName={location.pathname}
        min={fold()}
        accordion={true}
      >
        {renderMenu(baseRoute, "")}
      </Menu>
    </>
  );
}
