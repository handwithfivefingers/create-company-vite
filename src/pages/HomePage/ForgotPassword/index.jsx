import { Button, Card, Form, Input, message, Typography } from 'antd'
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import styles from './styles.module.scss'
import axios from '@/config/axios'
const { Text, Link } = Typography
export default function ForgotPassword() {
  const navigate = useNavigate()
  let [params] = useSearchParams()
  // 303274
  const validateMessages = {
    required: '${label} là bắt buộc!',
    types: {
      email: '${label} định dạng không đúng!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  console.log(params.get('step'))

  let step = params.get('step')

  const onFinish = (val) => {
    switch (step) {
      case 2:
        return
      case 3:
        return
      default:
        return generateOtp(val)
    }
  }

  const generateOtp = async (val) => {
    try {
      let res = await axios.post('/forgot-password', val)
      if (!res.status) throw { message: 'Something went wrong' }
      message.success(res.data?.data.message || res.data.message)
    } catch (err) {
      console.log(err)
      message.error(err.message || 'Something went wrong')
    }
  }

  const validateOTP = async (val) => {
    try {
      let res = await axios.post('/check-otp', val)
      if (!res.status) throw { message: 'Something went wrong' }
      message.success(res.data?.data.message || res.data.message)
    } catch (err) {
      console.log(err)
      message.error(err.message || 'Something went wrong')
    }
  }

  const resetPassword = async (val) => {
    try {
      let res = await axios.post('/reset-password', val)
      if (!res.status) throw { message: 'Something went wrong' }
      message.success(res.data?.data.message || res.data.message)
    } catch (err) {
      console.log(err)
      message.error(err.message || 'Something went wrong')
    }
  }

  return (
    <Card
      title="Quên mật khẩu"
      className={styles.card}
      extra={[
        <Button type="text" onClick={() => navigate('/')}>
          Quay lại
        </Button>,
      ]}
      style={{ width: 350 }}
    >
      <Form layout="vertical" validateMessages={validateMessages} onFinish={onFinish}>
        <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]} required>
          <Input />
        </Form.Item>

        {/* <Form.Item label={} /> */}
        <Text type="secondary" className={clsx(styles.text, 'ant-row ant-form-item')}>
          Mật khẩu sẽ được cấp mới và gửi qua email. Vui lòng check mail sau khi xác thực.
        </Text>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác thực
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
