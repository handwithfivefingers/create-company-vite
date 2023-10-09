import AdminHeader from '@/components/Admin/AdminHeader'
import CCInput from '@/components/CCInput'
import { onSetFields } from '@/helper/Common'
import AdminMailService from '@/service/AdminService/AdminMailService'
import AdminSettingService from '@/service/AdminService/AdminSettingService'
import { Button, Card, Col, Form, Row, Select, message } from 'antd'
import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

const SettingMail = (props) => {
  const [mailOptions, setMailOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    fetchSetting()
    fetchTemplateMail()
  }, [])

  const fetchTemplateMail = async (page = 1) => {
    try {
      setLoading(true)
      let params = { page: page }
      let res = await AdminMailService.getTemplate(params)
      setMailOptions(res.data.data._template)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSetting = async () => {
    try {
      setLoading(true)
      let res = await AdminSettingService.getSetting()
      const params = {}
      for (let key in res.data) {
        if (key !== '_id') params[key] = res.data[key]._id
      }
      form.setFieldsValue(params)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      console.log(form.getFieldsValue())
    }
  }

  console.log('mailOptions', mailOptions)
  return (
    <>
      <AdminHeader title="Cài đặt > Email" />
      <Card className="box__shadow">
        <Form onFinish={props.mailSubmit} layout="vertical" form={form}>
          <h3>Cài đặt mail</h3>
          <Form.Item label={'Mail đăng kí'} name="mailRegister">
            <Select options={mailOptions} fieldNames={{ label: 'name', value: '_id' }} />
          </Form.Item>

          <Form.Item label={'Mail Quên mật khẩu'} name="mailForgotPass">
            <Select options={mailOptions} fieldNames={{ label: 'name', value: '_id' }} />
          </Form.Item>

          <Form.Item label={'Mail hồ sơ sau khi thanh toán'} name="mailPayment">
            <Select options={mailOptions} fieldNames={{ label: 'name', value: '_id' }} />
          </Form.Item>

          <Form.Item label={'Mail Thanh Toán Thành Công'} name="mailPaymentSuccess">
            <Select options={mailOptions} fieldNames={{ label: 'name', value: '_id' }} />
          </Form.Item>
          <Form.Item noStyle>
            <Button htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default SettingMail
