import { useRouterData } from '@/helper/Context'
import { Button, Card, Form, Input } from 'antd'
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
      let listHistory = route.listHistory
      if (listHistory.length) {
        let nextNavigate = listHistory[listHistory.length - 1]
        if (location.pathname.includes(nextNavigate.from)) {
          navigate(role)
        } else navigate(nextNavigate.from)
      } else {
        navigate(role)
      }
    }
  }, [status])

  useEffect(() => {
    if (location.state) {
      formRef.current.setFieldsValue({
        ...location.state,
      })
    }
  }, [location.state])

  const onFinish = async (value) => {
    try {
      setLoading(true)
      console.log(value)
      const resp = await AuthService.onLoginWithAdmin(value)
      console.log('resp', resp)
    } catch (error) {
      console.log('error', error)
    } finally {
      //   setLoading(false)
    }
  }

  return (
    <div className="p-5">
      <Card title="Đăng nhập với Admin" className={styles.card} style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish} ref={formRef}>
          <Form.Item name="phone">
            <Input />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password />
          </Form.Item>
          <Button htmlType="submit">Clicked</Button>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
