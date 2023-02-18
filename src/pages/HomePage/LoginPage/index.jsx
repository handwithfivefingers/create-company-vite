import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useNavigationType } from 'react-router-dom'
import LoginForm from './Login'
import RegisterForm from './Register'
import { RouterContext } from '@/helper/Context'
import { AuthAction } from '@/store/actions'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
const { TabPane } = Tabs

export default function LoginPage() {
  const formRef = useRef()

  const [loading, setLoading] = useState(false)

  const [tab, setTab] = useState(1)

  const [ggScript, setGGScript] = useState()

  const [ready, setReady] = useState(false)

  const { route } = useContext(RouterContext)

  const authReducer = useSelector((state) => state.authReducer)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  let type = useNavigationType()

  useEffect(() => {
    loadingScript()

    if (route.to && authReducer.status) {
      navigate(route.to)
    }
  }, [])

  useEffect(() => {
    if (window?.google) {
      setGGScript(window.google)
    }
  }, [ready])

  const onLogin = async (val) => {
    setLoading(true)
    dispatch(AuthAction.AuthLogin(val))
    setLoading(false)
  }

  const loginWithGoogle = async (val) => {
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
      let lastRoute = route.from

      if (lastRoute !== '' || lastRoute !== '/' || lastRoute !== '/user') {
        navigate(lastRoute)
      } else {
        navigate('/user/san-pham')
      }
    } else {
      if (authReducer.role === 'user') {
        navigate('/user/san-pham')
      } else {
        navigate(authReducer.role)
      }
    }
  }

  const loadingScript = () => {
    if (!window?.google) {
      let ggScript = document.createElement('script')

      ggScript.src = `//accounts.google.com/gsi/client`

      document.body.appendChild(ggScript)

      ggScript.onload = ggScript.onreadystatechange = function () {
        if (!ready && (!this.readyState || this.readyState == 'complete')) {
          setReady(true)
        }
      }
    }
  }

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        centered
        className={styles.tabs}
        onChange={(tab) => setTab(tab)}
        destroyInactiveTabPane={false}
      >
        <TabPane tab="Đăng nhập" key="1">
          <LoginForm
            ref={formRef}
            onFinish={onLogin}
            loading={loading}
            loginWithGoogle={loginWithGoogle}
            ggScript={ggScript}
            forgotPassword={forgotPassword}
          />
        </TabPane>
        <TabPane tab="Đăng kí" key="2">
          <RegisterForm
            ref={formRef}
            onFinish={onRegister}
            loading={loading}
            loginWithGoogle={loginWithGoogle}
            ggScript={ggScript}
          />
        </TabPane>
      </Tabs>
    </>
  )
}
