import { Button, Form, Input, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import styles from './styles.module.scss'

const RegisterForm = forwardRef((props, ref) => {
  const ggRef = useRef()

  useImperativeHandle(ref, () => ({
    start: () => {
      const CLIENT_ID = '216335889679-9d8fesnrk3nh8gp2sktnepq4d63mfgi9'
      google.accounts.id.initialize({
        client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
        callback: async (response) => await handleCredentialResponse(response),
      })
      google.accounts.id.renderButton(ggRef.current, { theme: 'filled_blue', size: 'large', width: '308', text: 'signup_with' })
      google.accounts.id.prompt() // also display the One Tap dialog
    },
  }))

  const handleCredentialResponse = async (response) => {
    if (props.loginWithGoogle) {
      return props?.loginWithGoogle({ type: 'google', ...response })
    }
  }

  return (
    <div className={clsx([styles.registerWrap, 'container'])}>
      <h1>Đăng kí</h1>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Form.Item label="Họ và tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại (Zalo)">
            <Input />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', flexDirection: 'column', gap: 8 }}>
            <div ref={ggRef} />

            <Button type="primary" htmlType="submit" block>
              Đăng kí
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  )
})

export default RegisterForm
