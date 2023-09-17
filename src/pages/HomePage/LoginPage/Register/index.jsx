import { Button, Form, Input, Spin, Typography } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import styles from './styles.module.scss'
import { useSearchParams } from 'react-router-dom'
const { Text } = Typography

const RegisterProvider = forwardRef((props, ref) => {
  const { step } = props

  const onFinish = (e) => {
    e.preventDefault()
    const value = ref.current.getFieldsValue()
    if (props?.submit) {
      props?.submit(value)
    }
  }
  return (
    <div className={clsx([styles.registerWrap, 'container'])}>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={onFinish} layout="vertical">
          <RegisterForm hidden={step !== 1} />

          <OTPInput hidden={step !== 2} />

          <div className={styles.flexWrapper}>
            <Button type="primary" block onClick={onFinish}>
              {step === 1 ? 'Tiếp theo' : 'Xác nhận'}
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  )
})

const RegisterForm = ({ hidden }) => {
  return (
    <>
      {!hidden ? <Text>Vui lòng nhập thông tin liên hệ dưới đây để nhận được bộ hồ sơ đầy đủ và nhanh chóng</Text> : ''}
      <Form.Item
        label="Email"
        name="email"
        validateTrigger={['onBlur']}
        rules={[
          {
            required: true,
            message: 'Email là bắt buộc',
          },
          {
            type: 'email',
            message: 'Định dạng email không đúng',
          },
        ]}
        hidden={hidden}
      >
        <Input value="handgod1995@gmail.com" />
      </Form.Item>
      <Form.Item
        validateTrigger={['onBlur']}
        name="phone"
        label="Số điện thoại (Zalo)"
        rules={[
          {
            required: true,
            message: 'Số điện thoại là bắt buộc',
            type: 'string',
          },
          {
            type: 'string',
            min: 9,
            max: 11,
            message: 'Số điện thoại cần > 9 số và < 11 số',
          },
          {
            validator: (_, value) => {
              if (value && value.match(/([^0-9])/)) {
                return Promise.reject(new Error('Số điện thoại định dạng không đúng'))
              } else {
                return Promise.resolve()
              }
            },
          },
        ]}
        hidden={hidden}
      >
        <Input value="0798341239" />
      </Form.Item>
    </>
  )
}
const OTPInput = ({ hidden }) => {
  const [_, setParams] = useSearchParams()
  const handleRemoveParams = () => {
    setParams('')
  }
  return (
    <>
      <div className={clsx(' justify-content-end ', { 'd-none': hidden, 'd-flex': !hidden })}>
        <Button type="link" onClick={handleRemoveParams}>
          Quay lại
        </Button>
      </div>
      <Form.Item name={['otp']} label="Mã OTP" rules={[{ required: true, message: 'OTP là bắt buộc' }]} hidden={hidden}>
        <Input placeholder="OTP code" maxLength={6} />
      </Form.Item>
    </>
  )
}
export default RegisterProvider
