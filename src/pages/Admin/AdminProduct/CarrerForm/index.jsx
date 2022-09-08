import { Button, Card, Form, Input } from 'antd'
import React, { useRef } from 'react'

const CareerForm = (props) => {
  const formRef = useRef()

  const onFinish = (val) => {
    if (props.onFinishScreen) {
      props.onFinishScreen(val)
    }
  }

  return (
    <Card title="Ngành nghề" style={{ minWidth: '350px' }} bordered={false}>
      <Form
        onFinish={onFinish}
        ref={formRef}
        layout="vertical"
        initialValues={{
          ...props?.data,
        }}
      >
        <Form.Item name="name" label="Tên ngành">
          <Input />
        </Form.Item>
        <Form.Item name="code" label="Mã ngành">
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            {props?.data ? 'Cập nhật' : 'Tạo'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CareerForm
