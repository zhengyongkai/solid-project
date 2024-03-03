import axios from 'axios';

const request = axios.create({
  //基础路径
  //基础路径上会携带/facade
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //超时的时间的设置
  timeout: 15000,
});

request.interceptors.request.use((conifg) => {
  return conifg;
});

request.interceptors.response.use((response) => {
  return response.data;
});

export default request;
