import userStoreState from "@/stores/user";
import axios from "axios";
import { message } from "cui-solid";

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
    let { data } = response;
    if (data.status !== 200) {
      let { clearUserInfo } = userStoreState().action;
      clearUserInfo();
      location.href = "/login";
      message.error("登录状态已经过期");
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (reject) => {
    message.error("网络错误，请联系管理员");
    return Promise.reject(reject);
  }
);

export default request;
