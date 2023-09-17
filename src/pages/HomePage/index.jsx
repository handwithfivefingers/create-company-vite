import CustomHeader from '@/components/CustomHeader'
import Footer from '@/components/Footer'
import { Layout, Spin } from 'antd'
import clsx from 'clsx'
import React, { Suspense, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRouterData } from '../../helper/Context'
import styles from './styles.module.scss'
import { FormProviderContext } from '../../context/FormProviderContext'

const { Content } = Layout

export default function HomePage() {
  const route = useRouterData()
  const navigate = useNavigate()

  useEffect(() => {
    if (route.to && status) {
      if (route.to !== '/') navigate(route.to)
      else navigate('/user')
    }
  }, [])

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
