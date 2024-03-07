export interface menuInf {}

export interface userInfoInf {
  account: string;
  password: string;
}

export interface loginRequestParamsInf {
  account: string;
  password: string;
}

export interface loginResponseInf {
  menu: menuInf[];
  userInfo: userInfoInf;
  token: string;
}
