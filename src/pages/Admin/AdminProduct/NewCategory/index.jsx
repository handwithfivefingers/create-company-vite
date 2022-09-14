// import React from "react";
import React, { useState, useEffect, useRef } from 'react'
import { Form, Select, Card, Space, Input, Button, InputNumber } from 'antd'
import axios from '../../../../config/axios'
const NewCategory = (props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const formRef = useRef()

  const onFinish = (val) => {
    if (props.onFinishScreen) {
      props.onFinishScreen(val)
    }
  }
  //   console.log(props)

  const { category } = props
  return (
    <Card style={{ minWidth: '350px' }} title="Danh mục" bordered={false}>
      <Form ref={formRef} onFinish={onFinish} layout="vertical">
        <Form.Item name={['name']} label="Tên Danh Mục" required>
          <Input />
        </Form.Item>

        <Form.Item name={['parentCategory']} label="Danh mục cha">
          <Select allowClear>
            {category &&
              category?.map(({ name, _id }) => {
                return (
                  <Option value={_id} key={_id}>
                    {name}
                  </Option>
                )
              })}
          </Select>
        </Form.Item>

        <Form.Item name="type" label="Loại Danh mục" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="price" label="Giá tiền">
          <Input />
        </Form.Item>

        <Form.Item>
          <Space size="small" style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
            <Button type="outline">Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default NewCategory
