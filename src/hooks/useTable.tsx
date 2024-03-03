import type { tableResponse } from '@/types/request';
import { AxiosResponse } from 'axios';
import { createSignal, onMount } from 'solid-js';

type pageInf<U> = U & {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
};

export default function useTable<U, T>(
  api: (paramss: pageInf<U>) => Promise<AxiosResponse<tableResponse<T>>>,
  requestParams: U
) {
  const [tableData, setTableData] = createSignal<T[]>([]);

  const [parameter, setParameter] = createSignal<U>(requestParams);

  const [page, setPage] = createSignal({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    pages: 0,
  });

  async function requestData(params: U, reset: boolean = true) {
    if (reset) {
      setPage({
        ...page(),
        pageNum: 1,
      });
    }
    setParameter(params as Exclude<U, Function>);
    const {
      data: { pageNum, pageSize, pages, total, list },
    } = await api({
      ...page(),
      ...params,
    });
    setTableData(list);

    setPage({
      pageNum,
      pageSize,
      pages,
      total,
    });
  }

  function setPageSize(pageSize: number) {
    setPage({
      ...page(),
      pageSize,
    });
    requestData(parameter(), false);
  }

  function setPages(pageNum: number) {
    setPage({
      ...page(),
      pageNum,
    });

    requestData(parameter(), false);
  }

  onMount(() => {
    requestData(requestParams, true);
  });

  return {
    tableData,
    setTableData,
    setPages,
    setPageSize,
    requestData,
    page,
    parameter,
    setParameter,
  };
}
