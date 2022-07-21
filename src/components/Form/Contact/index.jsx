// import Form from 'antd/lib/form/Form';
import React, { forwardRef, useState } from 'react';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import styles from './Contact.module.scss';
import clsx from 'clsx';
const ContactForm = forwardRef((props, ref) => {
  return (
    <div className={clsx([styles.loginWrap, 'container'])}>
      <h1>Thông tin liên hệ</h1>
      <Form onFinish={props.onFinish} layout="vertical" ref={ref}>
        <Form.Item label="Họ và tên" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại (Zalo)" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={props.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default ContactForm;
