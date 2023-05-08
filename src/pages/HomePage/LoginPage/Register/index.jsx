import { Button, Descriptions, Divider, Form, Input, Spin, Typography } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { Link as NavLink } from 'react-router-dom'
const { Link, Text } = Typography

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
      props.ggScript?.accounts?.id?.renderButton(ggRef.current, {
        theme: 'filled_blue',
        size: 'large',
        width: '308',
        text: 'signup_with',
      })
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
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Text>Vui lòng nhập thông tin liên hệ dưới đây để nhận được bộ hồ sơ đầy đủ và nhanh chóng</Text>
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
          >
            <Input />
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
                    console.log('value')
                    return Promise.reject(new Error('Số điện thoại định dạng không đúng'))
                  } else {
                    return Promise.resolve()
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <div className={styles.flexWrapper}>
            <Button type="primary" htmlType="submit" block>
              Đăng kí
            </Button>
            <div ref={ggRef} />
          </div>
        </Form>
      </Spin>

      <Text style={{ border: 0, maxWidth: 350, fontSize: 12, padding: '20px 0' }}>
        <span>
          Quý khách đã có tài khoản và đã điền form trên hệ thống của chúng tôi?{' '}
          <NavLink to="/login" style={{ border: 0, fontSize: 12 }}>
            Hãy nhấn vào đây{' '}
          </NavLink>
          và nhập email để nhận mã xác nhận. Sau đó, quý khách có thể đăng nhập lại và quản lý thông tin đã nhập một
          cách dễ dàng.
        </span>
      </Text>
    </div>
  )
})

export default RegisterForm
