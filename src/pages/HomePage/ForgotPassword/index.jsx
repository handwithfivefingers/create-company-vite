import { Button, Card, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import styles from './styles.module.scss'
export default function ForgotPassword() {
  const navigate = useNavigate()

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
      <Form layout="vertical" validateMessages={validateMessages}>
        <Form.Item name={['phone']} label="Số điện thoại" required>
          <Input />
        </Form.Item>
        <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]} required>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác thực
          </Button>
        </Form.Item>
        <p>Mật khẩu sẽ được cấp mới và gửi qua email. Vui lòng check mail sau khi xác thực.</p>
      </Form>
    </Card>
  )
}
