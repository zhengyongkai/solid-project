import { getAdministratorList } from '@/api/administrator';
import type {
  getAdministratorListParams,
  getAdministratorListResult,
} from '@/api/types/adminstrator';
import useTable from '@/hooks/useTable';
import { Button, Icon, Pagination, Table } from 'cui-solid';

export default function Administrator() {
  const { tableData, setPages, page } = useTable<
    getAdministratorListParams,
    getAdministratorListResult
  >(getAdministratorList, {
    searchKey: '',
  });

  const columns = [
    { type: 'checkbox', width: '55px' },
    { type: 'index', title: '序号', width: '80px' },
    { name: 'name', title: '名称', width: '150px' },
    { name: 'x', title: 'X', width: '300px' },
    { name: 'y', title: 'Y', width: '300px' },
    { name: 'date', title: '日期', width: '200px' },
  ];

  return (
    <>
      <Button type="error" icon={<Icon name="trash"></Icon>}>
        批量删除
      </Button>

      <Table columns={columns} data={tableData()} />
      <Pagination
        current={page().pageNum}
        pageSize={page().pageSize}
        total={page().total}
        onChange={(page: number) => {
          setPages(page);
          // console.log();
        }}
      />
    </>
  );
}
