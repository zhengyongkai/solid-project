import type { tableResponse } from "@/types/request";
import { AxiosResponse } from "axios";
import { Accessor, createSignal, onMount } from "solid-js";

type pageInf<U> = U & {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
};

export default function useTable<U, T>(
  api: (
    params: Omit<pageInf<U>, "pages" | "total">
  ) => Promise<AxiosResponse<tableResponse<T>>>,
  requestParams: Accessor<U>
) {
  const [loading, setLoading] = createSignal(false);

  const [tableData, setTableData] = createSignal<T[]>([]);

  const [parameter, setParameter] = createSignal<U>(requestParams());

  const [page, setPage] = createSignal({
    pageNum: 1,
    pageSize: 10,
    total: 10,
    pages: 1,
  });

  async function requestData(params: U, reset: boolean = true) {
    setLoading(true);
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
      pageNum: page().pageNum,
      pageSize: page().pageSize,
      ...params,
    } as Omit<pageInf<U>, "pages" | "total">);

    setTableData(list);

    setPage({
      pageNum,
      pageSize,
      pages,
      total,
    });
    setLoading(false);
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
    requestData(requestParams(), true);
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
    loading,
  };
}
