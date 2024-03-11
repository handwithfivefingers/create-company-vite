import { useRouterData } from '@/helper/Context'
import { Button, Card, Form, Input, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import AuthService from '@/service/AuthService'
const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const { status, role } = useSelector((state) => state.authReducer)
  const route = useRouterData()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (status) {
      handleNavigate()
    }
  }, [status])

  useEffect(() => {
    if (location.state) {
      formRef.current.setFieldsValue({
        ...location.state,
      })
    }
  }, [location.state])

  const handleNavigate = () => {
    let listHistory = route.listHistory
    if (listHistory.length) {
      let nextNavigate = listHistory[listHistory.length - 1]
      if (location.pathname.includes(nextNavigate.from)) {
        navigate(`/${role}`)
      } else navigate(nextNavigate.from)
    } else {
      navigate(`/${role}`)
    }
  }

  const onFinish = async (value) => {
    try {
      setLoading(true)
      const resp = await AuthService.onLoginWithAdmin(value)
      if (resp.data.data) {
        const { data } = resp.data
        window.location.href = '/'
      }
    } catch (error) {
      const msg = error.response?.data?.error?.message || error.toString()
      message.error(msg)
      console.log('error', error.toString())
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5">
      <Card title="Đăng nhập với Admin" className={styles.card} style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish} ref={formRef}>
          <Form.Item name="phone" label="Tên đăng nhập">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
