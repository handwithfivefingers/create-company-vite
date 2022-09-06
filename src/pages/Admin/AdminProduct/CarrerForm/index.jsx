import { Button, Card, Form, Input } from "antd";
import React, { useRef } from "react";

const CareerForm = (props) => {
  const formRef = useRef();
  const onFinish = (val) => {
    if (props.onFinishScreen) {
      props.onFinishScreen(val);
    }
  };

  return (
    <Card title="Ngành nghề" style={{ minWidth: "350px" }} bordered={false}>
      <Form onFinish={onFinish} ref={formRef} layout="vertical">
        <Form.Item name="career_name" label="Tên ngành">
          <Input />
        </Form.Item>
        <Form.Item name="career_code" label="Mã ngành">
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CareerForm;
