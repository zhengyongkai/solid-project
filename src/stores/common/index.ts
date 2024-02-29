import { SetStateAction } from "jotai";
import { atom, useAtom } from "solid-jotai";

// interface initDataType {
//   fold:
// }

const initData = {
  fold: useAtom(atom(false)),
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
