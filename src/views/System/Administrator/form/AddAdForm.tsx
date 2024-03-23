import Modal from '@/components/common/Modal/Modal';
import { destructure } from '@solid-primitives/destructure';
import {
  Col,
  Form,
  Input,
  Row,
  Option,
  FormItem,
  useForm,
} from 'cui-solid-better';

interface AddAdFormProps {
  visable: boolean;
  onClosed: () => void;
  onOk: () => void;
}

interface AddAdFormData {
  account: string;
  password: string;
  deparmentName: string;
  bgName: string;
  buName: string;
  empno: string;
  name: string;
  phone: string;
  email: string;
  isvalid: boolean;
  roleName: string;
  comfirmPassword: string;
}

export default function AddAdForm(props: AddAdFormProps) {
  const { visable, onClosed, onOk } = destructure(props);
  const form = useForm<AddAdFormData>({
    data: {
      name: '',
      account: '',
      password: '',
      deparmentName: '',
      bgName: '',
      buName: '',
      email: '',
      empno: '',
      phone: '',
      isvalid: false,
      roleName: '',
      comfirmPassword: '',
    },
    validation: {
      account: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    message: {
      account: {
        required: '请填写账号',
      },
      password: {
        required: '请填写账号',
      },
    },
  });

  async function onSubmit() {
    if (await form.isValid()) {
    }
  }

  return (
    <>
      <Modal
        title="提示"
        visible={visable()}
        onClosed={onClosed()}
        onOk={onSubmit}
      >
        <div>
          <Form form={form} labelWidth={110}>
            <Row>
              <Col grid={1}>
                {form.account}
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
                      message: '请填写确认密码',
                    },
                    {
                      required: true,
                      asyncValidator: (_rule: any, value: string) => {
                        return new Promise<void>((resolve, reject) => {
                          if (value !== form.password) {
                            reject('密码不一致'); // reject with error message
                          } else {
                            resolve();
                          }
                        });
                      },
                    },
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
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="name" label="负责人姓名">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="bgName" label="事业群">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="buName" label="事业处">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1}>
                <FormItem name="deparmentName" label="使用单位(部门)">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="phone" label="负责人电话">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="email" label="负责人邮箱">
                  <Input type="password" />
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
                    <Option value={'1'} label="北京"></Option>
                    <Option value={'2'} label="南京"></Option>
                    <Option value={'3'} label="廣州"></Option>
                    <Option value={'4'} label="深圳"></Option>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
