import type { ResponsePageSize } from "@/types/request";

import { createSignal, onMount } from "solid-js";

import { pageInf } from "@/types";

// interface apiInf = (params: getAccountListParams) => Promise<AxiosResponse<any, any>>

type KeyType = string | number;

export default function useTable<T, U>(
  api: (params: pageInf & U) => ResponsePageSize<T>,
  form: U
) {
  const [searchForm, setSearchForm] = createSignal<U>(form);
  const [selectedRowKeys, setSelectedRowKeys] = createSignal<KeyType[]>([]);

  const [loading, setLoading] = createSignal(false);

  const [tableData, setTableData] = createSignal<T[]>([]);

  const [page, setPage] = createSignal({
    pageNum: 1,
    pageSize: 10,
    total: 10,
    pages: 1,
  });

  async function requestData(reset: boolean = false) {
    setLoading(true);
    if (reset) {
      setPage({
        ...page(),
        pageNum: 1,
      });
    }
    const {
      data: { pageNum, pageSize, pages, total, list },
    } = await api({
      ...searchForm(),
      pageNum: page().pageNum,
      pageSize: page().pageSize,
      pages: page().pages,
      total: page().total,
    });
    setTableData(list);
    setPage({
      pageNum: Number(pageNum),
      pageSize,
      pages,
      total,
    });
    setLoading(false);
  }

  onMount(() => {
    requestData(true);
  });

  function onChange(pageNum: number) {
    setPage({
      ...page(),
      pageNum,
    });
    requestData();
  }

  function onChangePageSize(pageSize: number) {
    setPage({
      ...page(),
      pageSize,
    });
    requestData();
  }

  return {
    tableData,
    setTableData,
    requestData,
    page,
    loading,
    onChange,
    onChangePageSize,
    searchForm,
    setSearchForm,
    selectedRowKeys,
    setSelectedRowKeys,
  };
}
