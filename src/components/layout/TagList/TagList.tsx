import Scrollbars from "solid-custom-scrollbars";

import Styles from "./css/index.module.scss";
import { Tag } from "cui-solid";
import useCommonStore from "@/stores/common/index";
import { simpleRouteInf } from "@/types";
import { useLocation, useNavigate } from "@solidjs/router";
import { createMemo } from "solid-js";

export default function TagList() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    tagList: [tagList],
  } = useCommonStore().data;
  const { delTagList } = useCommonStore().action;

  const onCloseTag = (e: MouseEvent, item: simpleRouteInf) => {
    e.stopPropagation();
    const list = tagList();
    if (list.length && list[list.length - 1].title === item.title) {
      navigate(list[list.length - 2].path);
    }
    delTagList(item.path!);
  };

  const onChooseTag = (path: string) => {
    navigate(path);
  };

  const activeTag = createMemo(() => location.pathname);

  const tagLists = () => {
    return tagList().map((item) => {
      return (
        <span onClick={() => onChooseTag(item.path)}>
          <Tag
            closable={item.path !== "home"}
            theme={activeTag() === "/" + item.path ? "warning" : "primary"}
            onBeforeClose={(e: MouseEvent) => onCloseTag(e, item)}
          >
            {item.title}
          </Tag>
        </span>
      );
    });
  };

  return (
    <div class={Styles["layout_tagList"]}>
      <Scrollbars>{tagLists()}</Scrollbars>
    </div>
  );
}
