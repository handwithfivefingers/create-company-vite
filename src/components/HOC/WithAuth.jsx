import { Layout } from 'antd';
import clsx from 'clsx';
import { FcInfo } from 'react-icons/fc';
import { Link, Navigate } from 'react-router-dom';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import UserHeader from '@/components/User/UserHeader';
import UserSidebar from '@/components/User/UserSidebar';
import styles from './styles.module.scss';
const { Content, Footer } = Layout;

export default function WithAuth(Component, role) {
  return function Authenticated(props) {

    if (!props.status) {
      return <Navigate to="/" />;
    }

    if (role === 'admin') {
      return (
        <Layout className={[styles.adminLayout]}>
          <AdminSidebar />
          <Layout className={clsx(['site-layout', styles.adminSiteLayout])}>
            <Content className={clsx([styles.adminMainContent])}>
              <div className={`site-layout-background`}>
                <Component {...props} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }} className={styles.footer}>
              <div className={styles.footerLeft}>Truyen Mai ©2019</div>

              <Link className={styles.footerRight} to="/admin/about">
                <FcInfo />
              </Link>
            </Footer>
          </Layout>
        </Layout>
      );
    }

    return (
      <Layout className={styles.mainLayout}>
        <UserSidebar />
        <Layout className={clsx(['site-layout', styles.siteLayout])}>
          <Content className={clsx(styles.mainContent)}>
            <UserHeader className="site-layout-background"
            //  style={{ padding: 0 }} 
             />

            <Component {...props} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2019 Created by Truyenmai</Footer>
        </Layout>
      </Layout>
    );
  };
}
