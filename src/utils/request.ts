import userStoreState from "@/stores/user";
import axios from "axios";
import { message as Message } from "cui-solid-better";

const request = axios.create({
  //基础路径
  //基础路径上会携带/facade
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //超时的时间的设置
  timeout: 15000,
});

const {
  token: [token],
} = userStoreState().data;

request.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  if (token()) {
    config.headers["Authorization"] = token() as string;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    let {
      data: { code, message },
    } = response;
    console.log(message);
    switch (code) {
      case 500:
        Message.error(message);
        return Promise.reject(response.data);
      case 401:
        let { clearUserInfo } = userStoreState().action;
        clearUserInfo();
        location.href = "/login";
        Message.error("登录状态已经过期");
    }

    // return Promise.reject(response.data);

    return response.data;
  },
  (reject) => {
    Message.error("网络错误，请联系管理员");
    return Promise.reject(reject);
  }
);

export default request;
