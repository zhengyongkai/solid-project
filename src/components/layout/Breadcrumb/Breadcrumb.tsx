import SvgIcon from "@/components/common/SvgIcon/index";
import useCommonStore from "@/stores/common/index";
import { useLocation } from "@solidjs/router";
import { Breadcrumb } from "cui-solid";
import { For, createEffect, createMemo, createSignal } from "solid-js";
import { asyncRoutes } from "@/router";
import { routeInf } from "@/types";

export default function BreadcrumbLayout() {
  const location = useLocation();

  const {
    fold: [fold, setFold],
  } = useCommonStore().data;

  const [path, setPath] = createSignal<routeInf[]>([]);
  const pathname = createMemo(() => location.pathname);

  createEffect(() => {
    let pathList = pathname().split("/").splice(1);

    function routes(
      result: routeInf[],
      originalRoutes: routeInf[],
      originalPath: string
    ) {
      let arr = originalRoutes.filter((res) => {
        return res.path === originalPath || res.path === "/" + originalPath;
      });
      result.push(arr[0]);
      if (arr[0]?.children) {
        pathList.shift();
        return routes(result, arr[0].children, pathList[0]);
      }
      pathList.shift();
      return result;
    }

    setPath(routes([], asyncRoutes, pathList[0]));
  });

  const getFoldIcon = () => {
    if (fold()) {
      return <SvgIcon name="fold"></SvgIcon>;
    } else {
      return <SvgIcon name="expand"></SvgIcon>;
    }
  };

  function getBreadCrumbList() {
    return path().map((item) => {
      if (item) {
        if (item.meta.icon) {
          return (
            <Breadcrumb.Item icon={<SvgIcon name={item.meta.icon}></SvgIcon>}>
              {item.meta.title}
            </Breadcrumb.Item>
          );
        }
        return <Breadcrumb.Item>{item.meta.title}</Breadcrumb.Item>;
      } else {
        return <></>;
      }
    });
  }

  return (
    <>
      <span style={{ "margin-right": "10px" }} onClick={() => setFold(!fold())}>
        {getFoldIcon()}
      </span>
      <Breadcrumb>{getBreadCrumbList()}</Breadcrumb>
    </>
  );
}
