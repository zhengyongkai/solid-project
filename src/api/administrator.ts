import request from "@/utils/request";
import { getAccountListParams } from "./types/adminstrator";

const API = {
  ACCOUNTLIST_URL: "account/list/",
};

const MOCK_API = {
  ACCOUNTLIST_URL: "/mock/administrator.json",
};

export function getAdministratorList(data: getAccountListParams) {
  return request.post(API.ACCOUNTLIST_URL, data);
}
