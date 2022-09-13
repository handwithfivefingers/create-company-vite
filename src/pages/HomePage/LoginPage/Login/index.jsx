import { Button, Form, Input, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useRef } from 'react'
import { useEffect, useImperativeHandle } from 'react'
import { FcGoogle, FcUnlock } from 'react-icons/fc'
import AuthService from '../../../../service/AuthService'
import styles from './Login.module.scss'
let ready = false
const LoginForm = forwardRef((props, ref) => {
  const ggRef = useRef()

  useImperativeHandle(ref, () => ({
    start: () => {
      const CLIENT_ID = '216335889679-9d8fesnrk3nh8gp2sktnepq4d63mfgi9'
      google.accounts.id.initialize({
        client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
        callback: async (response) => await handleCredentialResponse(response),
      })
      google.accounts.id.renderButton(ggRef.current, { theme: 'outline', size: 'large', width: '308' })
      google.accounts.id.prompt() // also display the One Tap dialog
    },
  }))

  const handleCredentialResponse = async (response) => {
    if (props.loginWithGoogle) {
      return props?.loginWithGoogle({ type: 'google', ...response })
    }
  }
  return (
    <div className={clsx([styles.loginWrap, 'container'])}>
      <h1>Đăng nhập</h1>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0', flexDirection: 'column', gap: 12 }}>
              <div ref={ggRef} className={styles.googleBtn} />

              <Button type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>

              <Button type="link" onClick={props?.forgotPassword}>
                Quên mật khẩu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  )
})

export default LoginForm
