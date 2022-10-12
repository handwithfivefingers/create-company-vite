import { Button, Form, Input, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

const RegisterForm = forwardRef((props, ref) => {
  const ggRef = useRef()

  useEffect(() => {
    if (props.ggScript) {
      handleScriptLoaded()
    }
  }, [props.ggScript])

  const handleScriptLoaded = async () => {
    try {
      props.ggScript?.accounts?.id?.initialize({
        client_id: import.meta.env.GG_EMAIL_CLIENT_ID,
        callback: async (response) => await handleCredentialResponse(response),
      })
      props.ggScript?.accounts?.id?.renderButton(ggRef.current, { theme: 'filled_blue', size: 'large', width: '308', text: 'signup_with' })
      props.ggScript?.accounts?.id?.prompt() // also display the One Tap dialog
    } catch (error) {
      console.log('handleScriptLoaded script error: ' + error)
    }
  }

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
            <Button type="primary" htmlType="submit" block>
              Đăng kí
            </Button>

            <div ref={ggRef} />
          </div>
        </Form>
      </Spin>
    </div>
  )
})

export default RegisterForm
