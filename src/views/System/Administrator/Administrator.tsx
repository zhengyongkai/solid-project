import { getAdministratorList } from '@/api/administrator';
import type {
  getAdministratorListParams,
  getAdministratorListResult,
} from '@/api/types/adminstrator';
import Col from '@/components/row/Col';
import Row from '@/components/row/Row';
import useTable from '@/hooks/useTable';
import { Input, Button, Icon, Pagination, Table } from 'cui-solid';
import { createSignal } from 'solid-js';

export default function Administrator() {
  const [params, setParams] = createSignal<getAdministratorListParams>({
    searchKey: '',
  });
  const { tableData, setPages, page, requestData, loading } = useTable<
    getAdministratorListParams,
    getAdministratorListResult
  >(getAdministratorList, params());

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
      <div class="table-handle-box">
        <Row gutter={24}>
          <Button type="error" icon={<Icon name="trash"></Icon>}>
            批量删除
          </Button>

          <Col span={4}>
            <Input
              onChange={(e: string) => {
                setParams({
                  searchKey: e,
                });
              }}
            ></Input>
          </Col>
          <Col span={4}>
            <Button
              onClick={() => requestData(params())}
              icon={<Icon name="search"></Icon>}
            >
              搜索
            </Button>
          </Col>
        </Row>
      </div>
      <Table columns={columns} data={tableData()} loading={loading()} />
      <div class="pagination">
        <Pagination
          current={page().pageNum}
          pageSize={page().pageSize}
          total={page().total}
          onChange={(page: number) => {
            setPages(page);
            // console.log();
          }}
        />
      </div>
    </>
  );
}
