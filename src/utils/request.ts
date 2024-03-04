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

const [token] = userStoreState().token;

request.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  if (token()) {
    config.headers["Authorization"] = token();
  }
  return config;
});

request.interceptors.response.use((response) => {
  let { status, data } = response;
  if (status != 200) {
    message.error("网络错误，请联系管理员");
  }
  if (data.status !== 200) {
    message.error(data.message);
    return Promise.reject(response.data);
  }
  return response.data;
});

export default request;
