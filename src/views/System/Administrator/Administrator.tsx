import { getAdministratorList } from "@/api/administrator";
import type { getAdministratorListResult } from "@/api/types/adminstrator";
import Card from "@/components/layout/Card/Card";

import useTable from "@/hooks/useTable";
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
  Col,
  Row,
} from "cui-solid";
import { createSignal } from "solid-js";
import AddAdForm from "./form/AddAdForm";

export default function Administrator() {
  const form = useForm({
    data: {
      account: "",
    },
  });

  const {
    tableData,
    page,
    requestData,
    loading,
    onChange,
    onChangePageSize,
    setSearchForm,
  } = useTable<
    getAdministratorListResult,
    {
      account: string;
    }
  >(getAdministratorList, {
    account: form.account,
  });

  const [visible, setVisible] = createSignal(false);

  const columns = [
    { type: "checkbox", width: "55px" },
    {
      type: "account",
      title: "账号",
      fixed: "left",
      render: (_c: any, _v: any, d: getAdministratorListResult) => {
        return d.account;
      },
    },
    {
      name: "deparmentName",
      title: "使用单位",
      render: (_c: any, _v: any, d: getAdministratorListResult) => {
        return d.deparmentName;
      },
    },
    { name: "bgName", title: "事业群" },
    { name: "buName", title: "事业处" },
    { name: "empno", title: "負責人工號" },
    { name: "name", title: "負責人姓名" },
    {
      name: "isvalid",
      title: "是否有效",
      render: (_c: any, _v: any, d: getAdministratorListResult) => {
        return d.isvalid ? "有效" : "无效";
      },
    },
    { name: "roleName", title: "角色身份" },
    {
      title: "操作",
      width: "250px",
      render: (_c: any, _v: any) => {
        return (
          <div>
            <Button
              type="text"
              class="cui-text-button-primary"
              icon={<Icon name="edit"></Icon>}
            >
              编辑
            </Button>
            <Button
              type="text"
              class="cui-text-button-danger"
              icon={<Icon name="delete"></Icon>}
            >
              删除
            </Button>
            <Button
              type="text"
              class="cui-text-button-danger"
              icon={<Icon name="stop-circle"></Icon>}
            >
              禁用
            </Button>
          </div>
        );
      },
    },
  ];

  function onHandleClose() {
    setVisible(false);
  }

  function onAddUser() {
    return false;
  }

  function onRowSelect(value: getAdministratorListResult[]) {
    console.log(value);
  }

  return (
    <div>
      <Card class="button-handle-box ">
        <Form form={form} labelWidth={0}>
          <Row gutter={24}>
            <Col grid={1 / 6}>
              <FormItem name="account">
                <Input placeholder="请输入用户名"></Input>
              </FormItem>
            </Col>

            <Button
              onClick={() => {
                setSearchForm({
                  account: form.account,
                });
                requestData(true);
              }}
              type="primary"
              icon={<Icon name="search"></Icon>}
            >
              搜索
            </Button>

            <Button
              onClick={() => setVisible(true)}
              type="primary"
              icon={<Icon name="user"></Icon>}
            >
              新增
            </Button>

            <Button
              onClick={() => {
                form.resetFields();
                setSearchForm({
                  account: form.account,
                });
                requestData(true);
              }}
              type="warning"
              icon={<Icon name="refresh-cw"></Icon>}
            >
              重置
            </Button>

            <Button type="error" icon={<Icon name="trash"></Icon>}>
              批量删除
            </Button>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table
          onRowChecked={onRowSelect}
          columns={columns}
          data={tableData()}
          loading={loading()}
          height={500}
          size="small"
        />
      </Card>
      <div class="pagination">
        <Pagination
          startEndShowNum={0}
          current={page().pageNum}
          pageSize={page().pageSize}
          total={page().total}
          onChange={onChange}
          onChangePageSize={onChangePageSize}
        />
      </div>
      <AddAdForm
        visable={visible()}
        onClosed={onHandleClose}
        onOk={onAddUser}
      ></AddAdForm>
    </div>
  );
}
