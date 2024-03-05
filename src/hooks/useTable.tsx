import type { tableResponse } from "@/types/request";
import { AxiosResponse } from "axios";
import { useForm } from "cui-solid";

import { Accessor, createSignal, onMount } from "solid-js";

export function useSearchForm<T>(props: T) {
  const form = useForm({
    data: {
      pageNum: 1,
      pageSize: 10,
      ...props,
    },
  });
  return [form];
}

export default function useTable<T>(
  api: () => Promise<AxiosResponse<tableResponse<T>>>
) {
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
    } = await api();

    setTableData(list);

    setPage({
      pageNum,
      pageSize,
      pages,
      total,
    });
    setLoading(false);
  }

  onMount(() => {
    requestData(true);
  });

  return {
    tableData,
    setTableData,

    requestData,
    page,
    loading,
  };
}
