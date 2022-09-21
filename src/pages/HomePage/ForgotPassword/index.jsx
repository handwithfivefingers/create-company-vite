import { Button, Card, Form, Input, message, Typography } from 'antd'
import React, { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import styles from './styles.module.scss'
// import axios from '@/config/axios'

import AuthService from '@/service/AuthService'
import { useEffect } from 'react'
const { Text, Link } = Typography
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  let [params] = useSearchParams()
  const navigate = useNavigate()

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
  let email = params.get('email')
  let step = params.get('step')

  useEffect(() => {
    formRef.current.setFieldsValue({
      email: email,
    })
  }, [params])

  if (step && !email) navigate('/forgot-password')

  const onFinish = (val) => {
    switch (step) {
      case '2':
        return validateOTP(val)
      case '3':
        return resetPassword(val)
      default:
        return generateOtp(val)
    }
  }

  const generateOtp = async (val) => {
    try {
      setLoading(true)
      let res = await AuthService.forgotPassword(val)
      if (res.status !== 200) throw { message: 'Something went wrong' }
      message.success(res.data?.data.message || res.data.message)
    } catch (err) {
      console.log(err)
      message.error(err.response.data?.error?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const validateOTP = async (val) => {
    try {
      setLoading(true)
      let res = await AuthService.checkOtp(val)
      if (res.status !== 200) throw { message: 'Something went wrong' }

      if (res.status === 200) {
        message.success(res.data?.data?.message || res.data?.message || 'Successfully')
        navigate({
          pathname: '/forgot-password',
          search: `?step=3&email=${email}`,
        })
      }
    } catch (err) {
      console.log(err)
      message.error(err.response.data?.error?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (val) => {
    try {
      setLoading(true)

      let res = await AuthService.resetPassword(val)

      if (res.status !== 200) throw { message: 'Something went wrong' }
      message.success(res.data?.data.message || res.data.message)
      navigate('/')
    } catch (err) {
      console.log(err)
      message.error(err.response.data?.error?.message || err.message || 'Something went wrong')
    } finally {
      setLoading(false)
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
      <Form layout="vertical" validateMessages={validateMessages} onFinish={onFinish} ref={formRef}>
        <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]} required hidden={step && email}>
          <Input />
        </Form.Item>

        <Form.Item name={['otp']} label="Mã OTP" hidden={step !== '2'}>
          <Input maxLength={6} />
        </Form.Item>

        <Form.Item name={['password']} label="Mật khẩu mới" hidden={step !== '3'}>
          <Input.Password maxLength={6} />
        </Form.Item>

        <Form.Item name={['confirm_password']} label="Xác nhận lại mật khẩu" hidden={step !== '3'}>
          <Input.Password maxLength={6} />
        </Form.Item>

        <Text type="secondary" className={clsx(styles.text, 'ant-row ant-form-item')}>
          Mật khẩu sẽ được cấp mới và gửi qua email. Vui lòng check mail sau khi xác thực.
        </Text>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Xác thực
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
