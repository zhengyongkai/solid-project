import { atom, useAtom, createStore } from "solid-jotai";

const initData = {
  fold: useAtom(atom(false)),
  lang: useAtom(atom("简体")),
};

const useCommonStore = function () {
  return {
    ...initData,
    setSomething(payload: boolean) {
      return initData.fold[1](payload);
    },
  };
};

export default useCommonStore;
