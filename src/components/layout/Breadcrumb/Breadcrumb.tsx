import SvgIcon from "@/components/common/SvgIcon/index";
import useCommonStore from "@/stores/common/index";
import { useLocation } from "@solidjs/router";
import { Breadcrumb } from "cui-solid";
import { For, createEffect, createMemo, createSignal } from "solid-js";
import { asyncRoutes } from "@/router";
import { routeInf } from "@/types";

export default function BreadcrumbLayout() {
  const location = useLocation();

  const [fold, setFold] = useCommonStore().fold;
  const [path, setPath] = createSignal<routeInf[]>([]);
  const pathname = createMemo(() => location.pathname);

  createEffect(() => {
    let pathList = pathname().split("/");
    function routes(
      result: routeInf[],
      originalRoutes: routeInf[],
      originalPath: string
    ) {
      let arr = originalRoutes.filter(
        (res) => res.path === "/" + originalPath || res.path === originalPath
      );
      result.push(arr[0]);
      if (arr[0]?.children) {
        pathList.shift();
        return routes(result, arr[0].children, pathList[0]);
      }
      result.shift();
      return result;
    }
    setPath(routes([], asyncRoutes, ""));
  });

  const isFold = createMemo(() => {
    let icon = fold() ? "fold" : "expand";
    return (
      <span style={{ "margin-right": "10px" }}>
        <SvgIcon name={icon} onClick={() => setFold(!fold())}></SvgIcon>
      </span>
    );
  });

  return (
    <>
      {isFold()}
      <Breadcrumb>
        <For each={path()}>
          {(item) => {
            if (item.meta.icon) {
              return (
                <Breadcrumb.Item
                  icon={<SvgIcon name={item.meta.icon}></SvgIcon>}
                >
                  {item.meta.title}
                </Breadcrumb.Item>
              );
            }
            return <Breadcrumb.Item>{item.meta.title}</Breadcrumb.Item>;
          }}
        </For>
      </Breadcrumb>
    </>
  );
}
