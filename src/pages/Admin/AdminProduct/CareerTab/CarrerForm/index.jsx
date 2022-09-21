import { Button, Card, Form, Input, message } from 'antd'
import React, { useRef } from 'react'
import AdminProductService from '@/service/AdminService/AdminProductService'

const CareerForm = (props) => {
  const formRef = useRef()

  const onFinish = async (val) => {
    try {
      if (props.data) {
        // console.log(props.data)
        await update({ ...val, id: props.data._id })
      } else {
        await addNew(val)
      }
    } catch (err) {
      console.log('onFinish error: ' + err)
    } finally {
      if (props.onFinishScreen) {
        props.onFinishScreen(val)
      }
    }
  }

  const addNew = async (val) => {
    try {
      let res = await AdminProductService.createCareer(val)
      message.success(res.data.message)
    } catch (err) {
      console.log('addNew error: ' + err)
    }
  }

  const update = async (val) => {
    try {
      let res = await AdminProductService.updateCareer(val)

      message.success(res.data.message)
    } catch (err) {
      console.log('update error: ' + err)
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
