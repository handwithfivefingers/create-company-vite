// import AdminSidebar from '@/components/Admin/AdminSidebar'
// import UserHeader from '@/components/User/UserHeader'
// import UserSidebar from '@/components/User/UserSidebar'
import { Layout } from 'antd'
import clsx from 'clsx'
import { AnimatePresence, domAnimation, LazyMotion } from 'framer-motion'
import { Children, cloneElement, memo, lazy } from 'react'
import { FcInfo } from 'react-icons/fc'
import { Link, Navigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import SuspendComponent from '../SuspenseComponent'

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
              <LazyMotion features={domAnimation} strict>
                <AnimatePresence mode="wait">
                  <Clone {...props}>
                    <Component />
                  </Clone>
                </AnimatePresence>
              </LazyMotion>
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
            <LazyMotion features={domAnimation}>
              <AnimatePresence>
                <Clone {...props}>
                  <Component {...props} />
                </Clone>
              </AnimatePresence>
            </LazyMotion>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>©2019 Created by Truyenmai</Footer> */}
          <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} © thanhlapcongtyonline.vn</Footer>
        </Layout>
      </Layout>
    )
  }

  return memo(Authenticated)
}

const Clone = (props) => {
  let location = useLocation()
  let { children, ...rest } = props

  return Children.map(children, (child) => {
    return cloneElement(child, { ...rest, ...child.props, key: location.pathname })
  })
}
