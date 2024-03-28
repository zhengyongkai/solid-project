import request from "@/utils/request";
import { getAccountListParams } from "./types/adminstrator";
import { ResponsePageSize, tableResponse } from "@/types/request";

const API = {
  ACCOUNTLIST_URL: "account/list/",
};

// const MOCK_API = {
//   ACCOUNTLIST_URL: "/mock/administrator.json",
// };

export function getAdministratorList(
  params: getAccountListParams
): ResponsePageSize<any> {
  return request.get(API.ACCOUNTLIST_URL, {
    params,
  });
}
