import request from '@/utils/request';
import { getAdministratorListParams } from './types/adminstrator';

export function getAdministratorList(params: getAdministratorListParams) {
  return request.get('/mock/administrator.json', {
    params,
  });
}
