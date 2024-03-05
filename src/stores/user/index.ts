import { M_TOKEN } from '@/constants';
import { asyncRoutes } from '@/router/index';
import { getStorage } from '@/utils/storage';
import { atom, useAtom } from 'solid-jotai';

const initData = {
  menuRoutes: useAtom(atom(asyncRoutes)),
  userInfo: useAtom(atom({})),
  token: useAtom<string>(atom(getStorage(M_TOKEN) || '')),
  avatar: useAtom(atom('')),
};

const userStoreState = function () {
  return {
    ...initData,
  };
};

export default userStoreState;
