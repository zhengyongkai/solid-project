import { asyncRoutes } from '@/router/index';
import { atom, useAtom } from 'solid-jotai';

const initData = {
  menuRoutes: useAtom(atom(asyncRoutes)),
  userInfo: useAtom(atom({})),
  token: useAtom(atom('')),
  avatar: useAtom(atom('')),
};

const userStoreState = function () {
  return {
    ...initData,
  };
};

export default userStoreState;
