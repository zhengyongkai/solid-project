import { getAdministratorList } from '@/api/administrator'
import type { getAdministratorListResult as adminInf } from '@/api/types/adminstrator'
import Card from '@/components/layout/Card/Card'

import useTable from '@/hooks/useTable'
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
  modal,
  message,
  Divider,
  Tag
} from 'cui-solid'
import { createSignal } from 'solid-js'
import HandleAdForm from './form/HandleAdForm'
import { initalData } from './data/data'

export default function Administrator() {
  const initalCurrent = Object.assign({}, initalData)

  const form = useForm({
    data: {
      account: ''
    }
  })

  const {
    tableData,
    page,
    requestData,
    loading,
    onChange,
    onChangePageSize,
    setSearchForm,
    selectedRowKeys,
    setSelectedRowKeys
  } = useTable<
    adminInf,
    {
      account: string
    }
  >(getAdministratorList, {
    account: form.account
  })

  const [addVisabled, setAddVisabled] = createSignal(false)
  const [current, setCurrent] = createSignal<adminInf>(initalCurrent)
  const [handleType, setHandleType] = createSignal('add')

  const columns = [
    { type: 'checkbox', width: '55px' },
    {
      type: 'account',
      title: '账号',
      fixed: 'left',
      render: (_c: any, _v: any, d: adminInf) => {
        return d.account
      }
    },
    {
      name: 'deparmentName',
      title: '使用单位',
      render: (_c: any, _v: any, d: adminInf) => {
        return d.deparmentName
      }
    },
    { name: 'bgName', title: '事业群' },
    { name: 'buName', title: '事业处' },
    { name: 'empno', title: '負責人工號' },
    { name: 'name', title: '負責人姓名' },
    {
      name: 'isvalid',
      title: '是否有效',
      render: (_c: any, _v: any, d: adminInf) => {
        return d.isvalid ? '有效' : '无效'
      }
    },
    {
      name: 'roleName',
      title: '角色身份',
      render: (_c: any, _v: any, d: adminInf) => {
        return <Tag theme="primary">用户</Tag>
      }
    },
    {
      title: '操作',
      width: '250px',
      render: (_c: any, _v: any, d: adminInf) => {
        return (
          <div>
            <Button
              type="primary"
              onClick={() => {
                setCurrent(d)
                setAddVisabled(true)
                setHandleType('edit')
              }}
              icon={<Icon name="edit"></Icon>}
            ></Button>
            <Divider dir="v" />
            <Button
              type="error"
              onClick={() => onDelete(d)}
              icon={<Icon name="delete"></Icon>}
            ></Button>
            <Divider dir="v" />
            <Button type="warning" icon={<Icon name="stop-circle"></Icon>}></Button>
          </div>
        )
      }
    }
  ]

  function onHandleClose() {
    setAddVisabled(false)
  }

  function onAddUser() {
    return false
  }

  function onDelete(data?: adminInf) {
    let deleteData = []
    if (data) {
      deleteData.push(data.id)
    } else {
      if (selectedRowKeys().length === 0) {
        return message.warning('请选择要清除的数据')
      }
      deleteData = selectedRowKeys()
    }
    modal.confirm({
      title: `是否删除这${deleteData.length}条数据`,
      content: '删除后不可恢复！',
      onOk: () => {
        setSelectedRowKeys([])
        message.success({
          content: '删除成功'
        })
      }
    })
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
                  account: form.account
                })
                requestData(true)
              }}
              type="primary"
              icon={<Icon name="search"></Icon>}
            >
              搜索
            </Button>

            <Button
              onClick={() => {
                setCurrent(initalCurrent)
                setAddVisabled(true)
                setHandleType('add')
              }}
              type="primary"
              icon={<Icon name="user"></Icon>}
            >
              新增
            </Button>

            <Button
              onClick={() => {
                form.resetFields()
                setSearchForm({
                  account: form.account
                })
                requestData(true)
              }}
              type="warning"
              icon={<Icon name="refresh-cw"></Icon>}
            >
              重置
            </Button>

            <Button type="error" onClick={() => onDelete()} icon={<Icon name="trash"></Icon>}>
              批量删除
            </Button>
          </Row>
        </Form>
      </Card>
      <Card>
        <Table
          rowKey="id"
          selectedRowKeys={[selectedRowKeys, setSelectedRowKeys]}
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
      <HandleAdForm
        visable={addVisabled()}
        onClosed={onHandleClose}
        onOk={onAddUser}
        currentData={current()}
        handleType={handleType()}
      />
    </div>
  )
}
