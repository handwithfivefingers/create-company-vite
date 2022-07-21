import { Button, Form, Input, Space, Spin } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import styles from "./styles.module.scss";

const RegisterForm = forwardRef((props, ref) => {
  return (
    <div className={clsx([styles.registerWrap, "container"])}>
      <h1>Đăng kí</h1>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Form.Item label="Họ và tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại (Zalo)">
            <Input />
          </Form.Item>
          {/* <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item> */}
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
          </Space>
        </Form>
      </Spin>
    </div>
  );
});

export default RegisterForm;
