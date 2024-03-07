import request from "@/utils/request";

import { Response } from "@/types/request";
import { loginRequestParamsInf, loginResponseInf } from "./types/user";

enum API {
  LOGIN_URL = "/login",
  // USERINFO_URL = '/info',
  LOGOUT_URL = "/logout",
}

export const reqLogin = (
  data: loginRequestParamsInf
): Response<loginResponseInf> => {
  return request.post(API.LOGIN_URL, data);
};
