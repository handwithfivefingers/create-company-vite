import CustomHeader from '@/components/CustomHeader'
import Footer from '@/components/Footer'
import { Layout, Spin } from 'antd'
import clsx from 'clsx'
import { Suspense, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRouterData } from '../../helper/Context'
import styles from './styles.module.scss'
import { useAuthStore } from '../../store/reducer'

const { Content } = Layout
const ROUTER_EXCLUDE = ['/', '/verification']
export default function HomePage() {
  const route = useRouterData()
  const navigate = useNavigate()
  const authData = useAuthStore()
  const { status } = authData

  useEffect(() => {
    if (status) {
      if (route.to && !ROUTER_EXCLUDE.includes(route.to)) {
        navigate(route.to)
      } else navigate('/user')
    }
  }, [status])

  if (!status) {
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
}
