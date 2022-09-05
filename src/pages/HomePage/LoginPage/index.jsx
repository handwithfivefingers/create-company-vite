import React, { useContext, useEffect, useRef, useState } from 'react'
import LoginForm from '@/components/Form/Login'
import RegisterForm from '@/components/Form/Register'
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom'

import { Tabs } from 'antd'
import { AuthAction } from '@/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RouterContext } from '@/helper/Context'
import styles from './styles.module.scss'
const { TabPane } = Tabs

export default function LoginPage() {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { route } = useContext(RouterContext)
  const authReducer = useSelector((state) => state.authReducer)
  const navigate = useNavigate()
  let location = useLocation()
  let type = useNavigationType()

  useEffect(() => {
    if (route.to && authReducer.status) {
      navigate(route.to)
    }
  }, [])

  const onLogin = async (val) => {
    setLoading(true)
    dispatch(AuthAction.AuthLogin(val))
    setLoading(false)
  }
  const loginWithGoogle = async (val) => {
    alert('Login with Google')
  }

  const forgotPassword = async (val) => {
    navigate('/forgot-password')
  }

  const onRegister = async (val) => {
    setLoading(true)
    await dispatch(AuthAction.AuthRegister(val))
    setLoading(false)
  }

  if (authReducer.status) {
    if (type !== 'POP') {
      navigate(-1)
    } else {
      navigate(authReducer.role)
    }
  }
  return (
    <Tabs defaultActiveKey="1" centered className={styles.tabs}>
      <TabPane tab="Đăng nhập" key="1">
        <LoginForm ref={formRef} onFinish={onLogin} loading={loading} loginWithGoogle={loginWithGoogle} forgotPassword={forgotPassword} />
      </TabPane>
      <TabPane tab="Đăng kí" key="2">
        <RegisterForm ref={formRef} onFinish={onRegister} loading={loading} />
      </TabPane>
    </Tabs>
  )
}
