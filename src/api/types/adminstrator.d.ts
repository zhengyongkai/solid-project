import { pageInf } from "@/hooks/useTable";

export type getAccountListParams = {
  account: string;
};

export interface getAdministratorListResult {
  id: string;
  account: string;
  bgName: string;
  buName: string;
  createby: string;
  createtime: string;
  deparmentName: string;
  email: string;
  empno: string;
  facadeAccountId?: number;
  fcserverNames: string[];
  isvalid: number;
  lasteditby: string;
  lasteditdt: string;
  name: string;
  phone: string;
  roleId: number;
  roleName: string;
  password: string;
}
