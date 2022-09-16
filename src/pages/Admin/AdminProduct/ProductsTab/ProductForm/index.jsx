import { Form, Input, Card, Button, message, Select, InputNumber, Cascader } from 'antd'
import React, { useState, useEffect, useRef, memo } from 'react'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { number_format } from '../../../../../helper/Common'
import { useFetch } from '../../../../../helper/Hook'
const FormProduct = (props) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const {
    data: category,
    isLoading: categoryLoading,
    status: categoryStatus,
    refetch: cateRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'category'],
    fn: () => AdminProductService.getCategory(),
  })

  useEffect(() => {
    formRef.current.setFieldsValue({
      name: props?.data?.name || '',
      price: props?.data?.price || '',
      type: props?.data?.type || '',
      parentId: props?.data?.parentId?.map((item) => item._id) || [],
      categories: props?.data?.categories?.map((item) => item._id),
    })
  }, [props])

  const onFinish = async (val) => {
    try {
      if (props?.data) {
        await onUpdate(val)
      } else {
        await onCreate(val)
      }
    } catch (e) {
      console.log(e)
    } finally {
      if (props.onFinishScreen) {
        props.onFinishScreen()
      }
    }
  }

  const onUpdate = async (val) => {
    console.log(val)
    try {
      let res = await AdminProductService.updateProduct({ ...val, _id: props?.data?._id })

      if (res.status === 200) {
        message.success('Product update successfully ')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onCreate = async (val) => {
    try {
      console.log(val)

      let res = await AdminProductService.createProduct(val)

      if (res.status === 200) {
        message.success('Product create successfully ')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card title={props?.data ? 'Chỉnh sửa' : 'Thêm sản phẩm'} bordered={false}>
      <Form onFinish={onFinish} layout="vertical" ref={formRef}>
        <Form.Item label="Danh mục" name={['categories']} required>
          <Cascader fieldNames={{ label: 'name', value: '_id', children: 'children' }} options={category} changeOnSelect={true} placeholder="Please select" />
        </Form.Item>

        <Form.Item label="Tên sản phẩm" name={['name']} required>
          <Input />
        </Form.Item>

        <Form.Item label="Giá tiền" name={['price']} required>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Type" name={['type']}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default memo(FormProduct)
