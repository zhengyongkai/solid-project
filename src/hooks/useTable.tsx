import type { tableResponse } from '@/types/request';
import { AxiosResponse } from 'axios';
import { useFormProps } from 'cui-solid/types/utils/useForm';
import { Accessor, createSignal, onMount } from 'solid-js';

type pageInf = useFormProps & {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
};

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

  async function requestData(reset: boolean = true) {
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

  function setPageSize(pageSize: number) {
    setPage({
      ...page(),
      pageSize,
    });
    requestData();
  }

  function setPages(pageNum: number) {
    setPage({
      ...page(),
      pageNum,
    });
    requestData();
  }

  onMount(() => {
    requestData();
  });

  return {
    tableData,
    setTableData,
    setPages,
    setPageSize,
    requestData,
    page,
    loading,
  };
}
