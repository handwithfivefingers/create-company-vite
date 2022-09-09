import { Button, Card, Form, Input, Select } from 'antd'
import React, { useEffect, useRef } from 'react'
import AdminProductService from '../../../../service/AdminService/AdminProductService'

const CareerCategory = ({ data, onFinishScreen, id, name }) => {
  const formRef = useRef()

  const onFinish = (val) => {
    if (onFinishScreen) {
      onFinishScreen(val)
    }
  }

  // if (id) {
  //   getScreenData(id)
  // }

  useEffect(() => {
    if (id) {
      getScreenData(id)
    }
  }, [id])

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

export default CareerCategory
