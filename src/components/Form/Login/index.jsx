import { Button, Form, Input, Space, Spin } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import styles from "./Login.module.scss";

const LoginForm = forwardRef((props, ref) => {
  return (
    <div className={clsx([styles.loginWrap, "container"])}>
      <h1>Đăng nhập</h1>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Space>
        </Form>
      </Spin>
    </div>
  );
});

export default LoginForm;
