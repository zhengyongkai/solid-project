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
  const { tableData, setPages, page, requestData } = useTable<
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
      <Row gutter={20}>
        <Col span={5}>
          <Button type="error" icon={<Icon name="trash"></Icon>}>
            批量删除
          </Button>
        </Col>
        <Col span={5} offset={1}>
          <Input
            onChange={(e: string) => {
              setParams({
                searchKey: e,
              });
            }}
          ></Input>
        </Col>
        <Col span={4}>
          <Button onClick={() => requestData(params())}>批量删除</Button>
        </Col>
      </Row>
      <Table columns={columns} data={tableData()} />
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
