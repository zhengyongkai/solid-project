import request from "@/utils/request";

import { ResponsePageSize } from "@/types/request";
import { barSeries } from "@/types/echarts";

enum API {
  ONLINESTATISTIC_URL = "/home/getOnLineStatistics",
  // USERINFO_URL = '/info',
}

// 獲取用戶在線統計
export const getOnLineStatistics = (): ResponsePageSize<barSeries> => {
  return request.get(API.ONLINESTATISTIC_URL);
};
