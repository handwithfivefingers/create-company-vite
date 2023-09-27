// import AdminSidebar from '@/components/Admin/AdminSidebar'
// import UserHeader from '@/components/User/UserHeader'
// import UserSidebar from '@/components/User/UserSidebar'
import { Layout } from 'antd'
import clsx from 'clsx'
import { lazy, memo } from 'react'
import { FcInfo } from 'react-icons/fc'
import { Link, Navigate } from 'react-router-dom'
import SuspendComponent from '../SuspenseComponent'
import styles from './styles.module.scss'

const AdminSidebar = lazy(() => import('@/components/Admin/AdminSidebar'))
const UserSidebar = lazy(() => import('@/components/User/UserSidebar'))
const UserHeader = lazy(() => import('@/components/User/UserHeader'))

const { Content, Footer } = Layout

export default function WithAuth(Component, role) {
  const Authenticated = (props) => {
    if (!props.status) {
      return <Navigate to="/" />
    }

    if (role === 'admin') {
      return (
        <Layout className={[styles.adminLayout]} theme="light">
          <SuspendComponent>
            <AdminSidebar />
          </SuspendComponent>
          <Layout className={clsx(['site-layout', styles.adminSiteLayout])}>
            <Content className={clsx([styles.adminMainContent])}>
              <Component {...props} />
            </Content>

            <Footer style={{ textAlign: 'center' }} className={styles.footer}>
              <div className={styles.footerLeft}>{new Date().getFullYear()} © thanhlapcongtyonline.vn</div>
              <Link className={styles.footerRight} to="/admin/about">
                <FcInfo />
              </Link>
            </Footer>
          </Layout>
        </Layout>
      )
    }

    return (
      <Layout className={styles.mainLayout}>
        <SuspendComponent>
          <UserSidebar />
        </SuspendComponent>
        <Layout className={clsx(['site-layout', styles.siteLayout])}>
          <Content className={clsx(styles.mainContent)}>
            <SuspendComponent>
              <UserHeader className="site-layout-background" />
            </SuspendComponent>
            <Component {...props} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} © thanhlapcongtyonline.vn</Footer>
        </Layout>
      </Layout>
    )
  }

  return memo(Authenticated)
}

