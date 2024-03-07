import { userInfoInf } from "@/api/types/user";
import { M_TOKEN, M_USERNAME } from "@/constants";
import { asyncRoutes } from "@/router/index";
import { clearStorage, getStorage, setStorage } from "@/utils/storage";
import { atom, useAtom } from "solid-jotai";

const initData = {
  menuRoutes: useAtom(atom(asyncRoutes)),
  userInfo: useAtom(atom(getStorage(M_USERNAME, true))),
  token: useAtom(atom(getStorage(M_TOKEN) || "")),
  avatar: useAtom(atom("")),
};

const useUserStore = function () {
  return {
    data: {
      ...initData,
    },
    action: {
      setToken: function (token: string) {
        let [, setToken] = initData.token;
        setStorage(M_TOKEN, token);
        setToken(token);
      },
      setUserInfo: function (payload: userInfoInf) {
        let [, setUserInfo] = initData.userInfo;
        setStorage(M_USERNAME, JSON.stringify(payload));
        setUserInfo(payload);
      },
      clearUserInfo: function () {
        let [, setToken] = initData.token;
        let [, setUserInfo] = initData.userInfo;
        setToken("");
        setUserInfo({});
        clearStorage(M_TOKEN);
        clearStorage(M_USERNAME);
      },
    },
  };
};

export default useUserStore;
