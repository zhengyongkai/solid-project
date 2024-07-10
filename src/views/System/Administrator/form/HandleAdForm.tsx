import Modal from '@/components/common/Modal/Modal'
import { destructure } from '@solid-primitives/destructure'
import { Col, Form, Input, Row, Option, FormItem, useForm } from 'cui-solid'

import { getAdministratorListResult } from '@/api/types/adminstrator'
import { createEffect, on } from 'solid-js'

interface EditAdFormProps {
  visable: boolean
  onClosed: () => void
  onOk: () => void
  currentData: getAdministratorListResult
  handleType: string
}

export default function HandleAdForm(props: EditAdFormProps) {
  const { visable, onClosed, currentData, handleType } = destructure(props)

  const form = useForm<getAdministratorListResult>({
    data: currentData(),
    validation: {
      account: {
        required: true
      },
      password: {
        required: true
      },
      empno: {
        required: true
      },
      name: {
        required: true
      },
      bgName: {
        required: true
      },
      buName: {
        required: true
      },
      deparmentName: {
        required: true
      },
      phone: {
        required: true
      },
      email: {
        required: true
      },
      roleName: {
        required: true
      }
    },
    message: {
      account: {
        required: '请填写账号'
      },
      password: {
        required: '请填写密码'
      },
      empno: {
        required: '请填写负责人工号'
      },
      name: {
        required: '请填写负责人姓名'
      },
      bgName: {
        required: '请填写事业群'
      },
      buName: {
        required: '请填写事业处'
      },
      deparmentName: {
        required: '请填写使用单位(部门)'
      },
      phone: {
        required: '请填写负责人电话'
      },
      email: {
        required: '请填写负责人邮箱'
      },
      roleName: {
        required: '请填写角色身份'
      }
    }
  })

  async function onSubmit(type: string) {
    if (await form.validate()) {
      if (type === 'add') {
        alert('add')
      } else {
        alert('edit')
      }
    }
  }

  createEffect(
    on(currentData, () => {
      form.resetFields()
      form.setFormData(currentData())
    })
  )

  return (
    <>
      <Modal
        title="提示"
        visible={visable()}
        onClosed={onClosed()}
        onOk={() => onSubmit(handleType())}
        width={700}
      >
        <div>
          <Form form={form} labelWidth={120}>
            <Row>
              <Col grid={1}>
                <FormItem name="account" label="账号：">
                  <Input type="text" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="password" label="密码">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem
                  name="comfirmPassword"
                  rules={[
                    {
                      required: true,
                      asyncValidator: (_rule: any, value: string) => {
                        return new Promise<void>((resolve, reject) => {
                          if (value !== form.password) {
                            reject('密码不一致') // reject with error message
                          } else {
                            resolve()
                          }
                        })
                      }
                    },
                    {
                      required: true,
                      message: '请填写确认密码'
                    }
                  ]}
                  label="确认密码"
                >
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="empno" label="负责人工号">
                  <Input />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="name" label="负责人姓名">
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="bgName" label="事业群">
                  <Input />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="buName" label="事业处">
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1}>
                <FormItem name="deparmentName" label="使用单位(部门)">
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="phone" label="负责人电话">
                  <Input />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="email" label="负责人邮箱">
                  <Input />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="isvalid" label="是否有效">
                  <Input type="switch" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="roleName" label="角色身份">
                  <Input type="select" clearable placeholder="请选择" transfer>
                    <Option value={'1'} label="管理员"></Option>
                    <Option value={'2'} label="用户"></Option>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}
