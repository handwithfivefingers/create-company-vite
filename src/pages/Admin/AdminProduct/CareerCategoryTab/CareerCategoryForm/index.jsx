import { Button, Card, Form, Input, Select } from 'antd'
import React, { useEffect, useRef } from 'react'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { useFetch } from '../../../../../helper/Hook'

const CareerCategoryForm = ({ data, onFinishScreen, id, name }) => {
  const formRef = useRef()

  useEffect(() => {
    if (id) {
      getScreenData(id)
    }
  }, [id])

  const onFinish = async (val) => {
    try {
      if (id) {
        await updateCareerCategory({ ...val, id })
      } else {
        await addCareerCategory(val)
      }
    } catch (error) {
    } finally {
      if (onFinishScreen) {
        onFinishScreen(val)
      }
    }
  }

  const getScreenData = async (id) => {
    try {
      let res = await AdminProductService.getSingleCareerCategory(id)
      formRef.current.setFieldsValue({
        name: name,
        category: res.data.data.map((item) => item._id),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const addCareerCategory = async (val) => {
    try {
      let res = await AdminProductService.createCareerCategory(val)
      message.success(res.data.message)
    } catch (err) {
      console.log(err)
      message.error('Something went wrong')
    }
  }

  const updateCareerCategory = async (val) => {
    try {
      let res = await AdminProductService.updateCareerCategory(val)
      message.success(res.data.message)
    } catch (err) {
      console.log(err)
      message.error('Something went wrong')
    }
  }

  return (
    <Card title="Danh mục ngành nghề" style={{ minWidth: '350px' }} bordered={false}>
      <Form onFinish={onFinish} ref={formRef} layout="vertical">
        <Form.Item name="name" label="Tên Group">
          <Input />
        </Form.Item>

        <Form.Item label="Ngành nghề" name="category">
          <Select
            showSearch
            mode="multiple"
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => option.children?.join('')?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0}
            style={{ width: '100%' }}
            placeholder="Please select"
          >
            {data?.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name} - {item.code}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            {name ? 'Cập nhật' : 'Tạo'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CareerCategoryForm
