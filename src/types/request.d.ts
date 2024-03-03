export type tableResponse<T> = {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
  list: Array<T>;
};

export type ResponsePageSize<T> = {
  data: tableResponse<T>;
  message: string;
};
