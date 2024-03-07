import { M_LANG } from "@/constants";
import { langInf, simpleRouteInf } from "@/types";
import { getStorage } from "@/utils/storage";
import { atom, useAtom } from "solid-jotai";

const initData = {
  fold: useAtom(atom(false)),
  lang: useAtom<langInf>(atom(getStorage<langInf>(M_LANG) || "zh-CN")),
  tagList: useAtom(atom<simpleRouteInf[]>([])),
};

const useCommonStore = function () {
  return {
    data: {
      ...initData,
    },
    action: {
      setTagList(payload: simpleRouteInf) {
        if (payload) {
          let [tagList, setTagList] = initData.tagList;
          console.log(tagList().filter((item) => item.path === payload.path));
          if (tagList().filter((item) => item.path === payload.path).length) {
            return tagList;
          } else {
            setTagList([...tagList(), payload]);
            return tagList;
          }
        }
      },
      delTagList(payload: string) {
        let [tagList, setTagList] = initData.tagList;
        setTagList(tagList().filter((item) => item.path !== payload));
      },
    },
  };
};

export default useCommonStore;
