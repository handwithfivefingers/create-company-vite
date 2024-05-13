import AdminProductService from '@/service/AdminService/AdminProductService'
import { Button, Card, Cascader, Form, Input, InputNumber, message } from 'antd'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useFetch } from '../../../../../helper/Hook'
const FormProduct = (props) => {
  const formRef = useRef()

  const [cate, setCate] = useState({
    parentId: [],
    categories: [],
  })
  const { data: category } = useFetch({
    cacheName: ['adminProduct', 'category'],
    fn: () => AdminProductService.getCategory(),
  })

  useEffect(() => {
    formRef.current.setFieldsValue({
      name: props?.data?.name || '',
      price: props?.data?.price || '',
      type: props?.data?.type || '',
      parentId: props?.data?.parentData?.map((item) => item._id) || [],
      categories: props.data ? getCategories(props.data) : [],
    })
  }, [props])

  useEffect(() => {
    window.form = formRef.current
  }, [])

  const getCategories = ({ categoryData = [], parentData = [] }) => {
    console.log('categoryData', categoryData)
    console.log('parentData', parentData)
    let result = []
    if (!categoryData?.length) {
      result = [...parentData.map((item) => item._id)]
    } else {
      for (let { _id } of parentData) {
        for (let _category of categoryData) {
          if (_category.parentCategory === _id) result.push([_id, _category._id])
        }
      }
    }
    console.log('result: ', result)
    return result
  }

  const onFinish = async (val) => {
    try {
      if (props?.data) {
        await onUpdate({ ...val, ...cate })
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
    try {
      let res = await AdminProductService.updateProduct({ ...val, _id: props?.data?._id })

      if (res.status === 200) {
        message.success('Product update successfully ')
      }
    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.error.message || error.response?.data.message)
    }
  }

  const onCreate = async (val) => {
    try {
      let res = await AdminProductService.createProduct(val)

      if (res.status === 200) {
        message.success('Product create successfully ')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onHandleChangeCategory = (val, opt) => {
    const result = {
      categories: [],
      parentId: [],
    }
    for (let option of opt) {
      const [parent, ...child] = option

      if (parent?._id && result.parentId?.indexOf(parent._id) === -1) {
        result.parentId.push(parent?._id)
      }
      if (child?.length) {
        result.categories.push(...child.map(({ _id }) => _id))
      } else {
        result.categories = parent.children.map(({ _id }) => _id)
      }
    }
    setCate(result)
  }
  return (
    <Card title={props?.data ? 'Chỉnh sửa' : 'Thêm sản phẩm'} bordered={false}>
      <Form onFinish={onFinish} layout="vertical" ref={formRef}>
        <Form.Item label="Danh mục" name={['categories']}>
          <Cascader
            fieldNames={{ label: 'name', value: '_id', children: 'children' }}
            options={category}
            onChange={onHandleChangeCategory}
            placeholder="Please select"
            multiple
          />
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
          <Button htmlType="submit" type="primary">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default memo(FormProduct)
