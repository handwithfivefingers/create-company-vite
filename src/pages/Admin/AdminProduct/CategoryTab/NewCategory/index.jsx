// import React from "react";
import React, { useState, useEffect, useRef } from 'react'
import { Form, Select, Card, Space, Input, Button, InputNumber, message } from 'antd'
// import axios from '../../../../config/axios'
import AdminProductService from '@/service/AdminService/AdminProductService'
const NewCategory = (props) => {
  const { category, data } = props

  const [loading, setLoading] = useState(false)

  const formRef = useRef()

  const onFinish = async (val) => {
    try {
      setLoading(true)
      // edit
      if (data) {
        await onUpdateCate({ ...val, _id: data._id })
      } else {
        await onCreateCate(val)
      }

      //add
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      if (props.onFinishScreen) {
        props.onFinishScreen()
      }
    }
  }

  const onCreateCate = async (data) => {
    try {
      let res = await AdminProductService.createCategory(data)
      if (res.status === 200) {
        message.success(res.data?.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
    }
  }

  const onUpdateCate = async (data) => {
    try {
      let res = await AdminProductService.updateCategories(data)
      if (res.status === 200) {
        message.success(res.data?.message)
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  return (
    <Card style={{ minWidth: '350px' }} title="Danh mục" bordered={false}>
      <Form
        ref={formRef}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...data,
        }}
      >
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

        <Form.Item name={'price'} label="Giá tiền" placeholder="Giá tiền">
          <InputNumber formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="desc" label="Mô tả">
          <Input.TextArea rows={4} placeholder="Nội dung" showCount style={{ resize: 'none' }} />
        </Form.Item>
        <Form.Item>
          <Space size="small" style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {data ? 'Cập nhật' : 'Tạo'}
            </Button>
            <Button type="outline">Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default NewCategory
