import { M_LANG } from '@/constants';
import { langInf } from '@/types';
import { atom, useAtom } from 'solid-jotai';

const initData = {
  fold: useAtom(atom(false)),
  lang: useAtom<langInf>(
    atom((localStorage.getItem(M_LANG) as langInf) || 'zh-CN')
  ),
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
