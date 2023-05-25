import { Button, Form, Input, Spin, Typography } from 'antd'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { Link as NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
const { Text } = Typography

const RegisterForm = forwardRef((props, ref) => {
  const { step } = props

  const renderFormInput = () => {
    let html = null
    html = (
      <>
        <FirstStep />
      </>
    )

    return html
  }

  return (
    <div className={clsx([styles.registerWrap, 'container'])}>
      <Spin spinning={props.loading}>
        <Form ref={ref} onFinish={props.onFinish} layout="vertical">
          <Text>Vui lòng nhập thông tin liên hệ dưới đây để nhận được bộ hồ sơ đầy đủ và nhanh chóng</Text>

          {renderFormInput()}
          <div className={styles.flexWrapper}>
            <Button type="primary" htmlType="submit" block>
              Tiếp theo
            </Button>
          </div>
        </Form>
      </Spin>

      <Text style={{ border: 0, maxWidth: 350, padding: '20px 0' }}>
        <span>
          Quý khách đã có tài khoản và đã điền form trên hệ thống của chúng tôi?{' '}
          <NavLink to="/login" style={{ border: 0, fontSize: 14 }}>
            Hãy nhấn vào đây{' '}
          </NavLink>
          và nhập email để nhận mã xác nhận. Sau đó, quý khách có thể đăng nhập lại và quản lý thông tin đã nhập một
          cách dễ dàng.
        </span>
      </Text>
    </div>
  )
})

const FirstStep = (props) => {
  return (
    <>
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
                console.log('value')
                return Promise.reject(new Error('Số điện thoại định dạng không đúng'))
              } else {
                return Promise.resolve()
              }
            },
          },
        ]}
      >
        <Input value="0798341239" />
      </Form.Item>
    </>
  )
}

export default RegisterForm
