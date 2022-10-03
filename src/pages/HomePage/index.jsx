import React, { useContext, useEffect, useRef, useState, Suspense, lazy } from 'react'

import { Outlet, useNavigate, useNavigationType } from 'react-router-dom'
import AuthService from '@/service/AuthService'
import { useDispatch, useSelector } from 'react-redux'
import { RouterContext } from '@/helper/Context'
import { Layout, Spin } from 'antd'
import CustomHeader from '@/components/CustomHeader'
import clsx from 'clsx'
import Footer from '@/components/Footer'
import styles from './styles.module.scss'

const { Content } = Layout

export default function HomePage() {
  const { route } = useContext(RouterContext)

  const authReducer = useSelector((state) => state.authReducer)

  const navigate = useNavigate()

  let type = useNavigationType()

  useEffect(() => {
    if (route.to && authReducer.status) {
      navigate(route.to)
    }
  }, [])

  if (authReducer.status) {
    if (type !== 'POP') {
      navigate(-1)
    } else {
      navigate(authReducer.role)
    }
  }

  return (
    <Layout style={{ background: '#fff', minHeight: '100vh' }}>
      <CustomHeader />
      <Content className={clsx(['site-layout', styles.siteLayout])}>
        <Suspense fallback={<Spin spinning={true} />}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer />
    </Layout>
  )
}
