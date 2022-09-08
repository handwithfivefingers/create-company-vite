import ProfileService from '@/service/UserService/ProfileService'
import { Button, Card, Col, Form, Input, message, Row } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { useOutletContext } from 'react-router-dom'
import { useFetch } from '../../../helper/Hook'

const UserProfile = () => {
  const [loading, setLoading] = useState(false)
  const { animateClass } = useOutletContext()

  const passRef = useRef()
  const profileRef = useRef()
  const screen = useBreakpoint()

  const {
    data: profileData,
    refetch,
    status,
    isLoading,
  } = useFetch({
    cacheName: ['userProfile'],
    fn: () => fetchProfile(),
  })

  const fetchProfile = () => ProfileService.getProfile()

  const onPassChange = async (val) => {
    try {
      console.log(val)
      let { confirm_password, new_password, old_password } = val
      if (!old_password) throw { message: 'Password is incorrect' }
      if (confirm_password !== new_password) {
        throw { message: 'Password does not match' }
      }

      let res = await ProfileService.changePassword(val)

      if (res.data.status === 200) {
        message.success(res.data.message)
      } else {
        throw { message: 'Something went wrong' }
      }
    } catch (err) {
      message.error(
        err.message || err.response.data.error || err.response.data.message,
      )
    } finally {
      refetch()
    }
  }

  const onProfileChange = async (val) => {
    try {
      let res = await ProfileService.changeProfile(val)
      if (!res) throw { message: 'Something went wrong' }

      if (res.data.status === 200) {
        message.success(res.data.message)
      } else {
        throw { message: 'Something went wrong' }
      }
    } catch (err) {
      message.error(
        err.message || err.response.data.error || err.response.data.message,
      )
    } finally {
      refetch()
    }
  }

  return (
    <Row gutter={[16, 12]} className={animateClass ?? animateClass}>
      <Col lg={8} sm={24} xs={24} md={12} order={!screen.md ? 1 : 0}>
        <Card title="Đổi mật khẩu" style={{ height: '100%' }}>
          <Form onFinish={onPassChange} ref={passRef} layout="vertical">
            <Form.Item label="Mật khẩu hiện tại" name="old_password">
              <Input />
            </Form.Item>

            <Form.Item label="Mật khẩu mới" name="new_password">
              <Input />
            </Form.Item>

            <Form.Item label="Xác thực mật khẩu" name="confirm_password">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col lg={16} sm={24} xs={24} md={12}>
        <Card title="Thông tin cá nhân">
          <Form
            onFinish={onProfileChange}
            ref={profileRef}
            layout="vertical"
            initialValues={profileData}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default UserProfile
