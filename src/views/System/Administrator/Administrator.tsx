import { getAdministratorList } from '@/api/administrator';
import type {
  getAccountListParams,
  getAdministratorListResult,
} from '@/api/types/adminstrator';
import Col from '@/components/row/Col';
import Row from '@/components/row/Row';
import TableTooltip from '@/components/table/Tooltip';
import useTable from '@/hooks/useTable';
import {
  Input,
  Button,
  Icon,
  Pagination,
  Table,
  Modal,
  useForm,
  Form,
  FormItem,
} from 'cui-solid';
import { createSignal } from 'solid-js';

export default function Administrator() {
  const form = useForm({
    data: {
      account: '',
    },
  });

  const { tableData, setPages, page, requestData, loading, setPageSize } =
    useTable<getAdministratorListResult>(() =>
      getAdministratorList({
        ...form.getFormData(),
      })
    );

  const columns = [
    { type: 'checkbox', width: '55px' },
    {
      type: 'account',
      title: '账号',
      width: '120px',
      render: (_c: any, _v: any, d: getAdministratorListResult) => {
        return d.account;
      },
    },
    {
      name: 'deparmentName',
      title: '使用单位',
      width: '150px',
      render: (_c: any, _v: any, d: getAdministratorListResult) => {
        return d.deparmentName;
      },
    },
    { name: 'x', title: 'X', width: '300px' },
    { name: 'y', title: 'Y', width: '300px' },
    { name: 'date', title: '日期', width: '200px' },
  ];

  const [visible2, setVisible2] = createSignal(false);
  return (
    <>
      <div class="table-handle-box">
        <Form
          form={form}
          onChange={(name: string, v: any) => {
            console.log(name, v);
            console.log(form.getFormData());
          }}
        >
          <Row gutter={24}>
            <Col span={4}>
              <FormItem name="account" label="用户名：">
                <Input
                  onChange={(e: string) => {
                    form.account = e;
                  }}
                ></Input>
              </FormItem>
            </Col>
            <Col span={2}>
              <Button
                onClick={() => requestData()}
                type="primary"
                icon={<Icon name="search"></Icon>}
              >
                搜索
              </Button>
            </Col>
            <Col span={2}>
              <Button
                onClick={() => setVisible2(true)}
                type="primary"
                icon={<Icon name="user"></Icon>}
              >
                新增
              </Button>
            </Col>
            <Col span={2}>
              <Button
                onClick={() => {
                  form.setFormData({
                    account: '',
                  });
                  requestData();
                }}
                type="warning"
                icon={<Icon name="refresh-cw"></Icon>}
              >
                重置
              </Button>
            </Col>
            <Col span={2}>
              <Button type="error" icon={<Icon name="trash"></Icon>}>
                批量删除
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        columns={columns}
        data={tableData()}
        loading={loading()}
        height={500}
      />
      <div class="pagination">
        <Pagination
          startEndShowNum={0}
          current={page().pageNum}
          pageSize={page().pageSize}
          total={page().total}
          onChange={(page: number) => {
            setPages(page);
          }}
          onChangePageSize={(pageSize: number) => {
            setPageSize(pageSize);
          }}
        />
      </div>
      <Modal disabled title="提示" visible={[visible2, setVisible2]}>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
        <div>modal 内容</div>
      </Modal>
    </>
  );
}
