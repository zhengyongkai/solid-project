import { routeInf, simpleRouteInf } from "@/types";

// 根据某个属性值从MenuList查找拥有该属性值的menuItem
export function getMenuItemInMenuListByPath(
  menuList: routeInf[],
  value: string
): simpleRouteInf {
  let stack: routeInf[] = [];
  stack = stack.concat(JSON.parse(JSON.stringify(menuList)));
  let result: simpleRouteInf[] = [];
  function fn(route: routeInf[], arr: string) {
    for (let res of route) {
      if (res.children?.length) {
        let data = arr + res.path;
        fn(res.children, data);
      } else {
        result.push({
          title: res?.meta?.title || "",
          path: arr + res.path,
        });
      }
    }
    return result;
  }
  let data = fn(stack, "");
  return data.filter((item) => "/" + item.path === value)[0];
}
