import { Layout } from 'antd'
import clsx from 'clsx'
import AdminSidebar from '@/components/Admin/AdminSidebar'
import UserHeader from '@/components/User/UserHeader'
import UserSidebar from '@/components/User/UserSidebar'
import { AnimatePresence, domAnimation, LazyMotion, m, domMax } from 'framer-motion'
import { FcInfo } from 'react-icons/fc'
import { Link, Navigate, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
import React, { Children, cloneElement, memo } from 'react'

const { Content, Footer } = Layout

export default function WithAuth(Component, role) {
  return memo(function Authenticated(props) {
    if (!props.status) {
      return <Navigate to="/" />
    }

    if (role === 'admin') {
      return (
        <Layout className={[styles.adminLayout]}>
          <AdminSidebar />

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
              {/* <div className={styles.footerLeft}>Truyen Mai ©2019</div> */}
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
        <UserSidebar />
        <Layout className={clsx(['site-layout', styles.siteLayout])}>
          <Content className={clsx(styles.mainContent)}>
            <UserHeader className="site-layout-background" />
            <LazyMotion features={domAnimation} strict>
              <AnimatePresence mode="wait">
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
  })
}

const Clone = (props) => {
  let location = useLocation()
  let { children, ...rest } = props

  return Children.map(children, (child) => {
    return cloneElement(child, { ...rest, ...child.props, key: location.pathname })
  })
}
