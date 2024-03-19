import Modal from "@/components/common/Modal/Modal";
import { destructure } from "@solid-primitives/destructure";
import { Col, Form, FormItem, Input, Row, useForm, Option } from "cui-solid";

interface AddAdFormProps {
  visable: boolean;
  onClosed: () => void;
  onOk: () => void;
}

export default function AddAdForm(props: AddAdFormProps) {
  const { visable, onClosed, onOk } = destructure(props);
  const form = useForm({
    data: {
      u: "",
      p: "",
    },
    validation: {},
    message: {},
  });

  return (
    <>
      <Modal
        title="提示"
        visible={visable()}
        onClosed={onClosed()}
        onOk={onOk()}
      >
        <div>
          <Form form={form} labelWidth={110}>
            <Row>
              <Col grid={1}>
                <FormItem name="u" label="账号：">
                  <Input type="text" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="p" label="密码">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="p" label="确认密码">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="p" label="负责人工号">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="p" label="负责人姓名">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="p" label="事业群">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="p" label="事业处">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1}>
                <FormItem name="p" label="使用单位(部门)">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="p" label="负责人电话">
                  <Input type="password" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="p" label="负责人邮箱">
                  <Input type="password" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col grid={1 / 2}>
                <FormItem name="p" label="是否有效">
                  <Input type="switch" />
                </FormItem>
              </Col>
              <Col grid={1 / 2}>
                <FormItem name="p" label="角色身份">
                  <Input type="select" clearable placeholder="请选择" transfer>
                    <Option value={"1"} label="北京"></Option>
                    <Option value={"2"} label="南京"></Option>
                    <Option value={"3"} label="廣州"></Option>
                    <Option value={"4"} label="深圳"></Option>
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
