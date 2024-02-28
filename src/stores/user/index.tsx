import createStore from 'solid-zustand';
import { asyncRoutes } from '@/router/index';
import { routeInf } from '~/src/types';

export interface userStoreState {
  token: string;
  avatar: string;
  userInfo: {};
  menuRoutes: routeInf[];
}

const useStore = createStore<userStoreState>((set) => ({
  token: '',
  avatar: '',
  userInfo: {},
  //仓库存储生成菜单需要数组(路由)
  menuRoutes: asyncRoutes,
}));

export default useStore;
