import { createWithSignal, createWithStore } from 'solid-zustand';
import routes from '@/router/index';
import { routeInf } from '~/src/types';

export interface userStoreState {
  token: string;
  avatar: string;
  userInfo: {};
  menuRoutes: routeInf[];
}

const useStore = createWithStore<userStoreState>((set) => ({
  token: '',
  avatar: '',
  userInfo: {},
  //仓库存储生成菜单需要数组(路由)
  menuRoutes: routes,
}));

export default useStore;
