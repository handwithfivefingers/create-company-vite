import React, { useContext, useEffect, useRef, useState } from 'react'
import LoginForm from './Login'
import RegisterForm from './Register'
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
  const [tab, setTab] = useState(1)

  let type = useNavigationType()

  useEffect(() => {
    if (route.to && authReducer.status) {
      navigate(route.to)
    }
  }, [])

  useEffect(() => {
    console.log('start ??');
    formRef.current?.start()
  }, [tab])

  const onLogin = async (val) => {
    setLoading(true)
    dispatch(AuthAction.AuthLogin(val))
    setLoading(false)
  }

  const loginWithGoogle = async (val) => {
    // alert('Login with Google')
    await dispatch(AuthAction.AuthLogin(val))
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

  // const handleTabChange = async (tab) => {
  //   formRef.current.start()
  // }

  return (
    <Tabs defaultActiveKey="1" centered className={styles.tabs} onChange={(tab) => setTab(tab)}>
      <TabPane tab="Đăng nhập" key="1">
        <LoginForm ref={formRef} onFinish={onLogin} loading={loading} loginWithGoogle={loginWithGoogle} forgotPassword={forgotPassword} />
      </TabPane>
      <TabPane tab="Đăng kí" key="2">
        <RegisterForm ref={formRef} onFinish={onRegister} loading={loading} loginWithGoogle={loginWithGoogle} />
      </TabPane>
    </Tabs>
  )
}
