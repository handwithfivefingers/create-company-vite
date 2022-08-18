import {
  CaretLeftOutlined,
  CaretRightOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button } from 'antd'
// import { signOut } from "next-auth/react";
import { memo, useEffect, useState } from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminRouter } from '@/constant/Route'
import { AuthAction } from '@/store/actions'
import styles from './styles.module.scss'
const { Sider } = Layout

const AdminSidebar = () => {
  const [collapse, setCollapse] = useState(false)
  const [current, setCurrent] = useState()
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()

  const onCollapse = (collapsed) => {
    setCollapse(collapsed)
  }
  const signOut = async () => {
    await dispatch(AuthAction.AuthLogout())
    navigate('/')
  }

  const renderSidebar = (route) => {
    let xhtml = null
    xhtml = route.map((item, i) => {
      if (item.submenu) {
        return (
          <Menu.SubMenu
            key={item.path}
            title={
              <Link
                to={item.path}
                style={{
                  display: 'flex',
                  flex: 1,
                  width: '100%',
                  color: '#fff',
                }}
              >
                {item.name}
              </Link>
            }
          >
            {renderSidebar(item.submenu)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.path} icon={item?.icon || <PieChartOutlined />}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      )
    })
    return xhtml
  }
  useEffect(() => {
    if (location.pathname.includes('/admin/order')) setCurrent('/admin/order')
    else setCurrent(location.pathname)
  }, [location])
  return (
    <>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={onCollapse}
        collapsedWidth={50}
        reverseArrow={true}
        trigger={
          <div className={styles.trigger}>
            {!collapse ? <CaretLeftOutlined /> : <CaretRightOutlined />}
          </div>
        }
      >
        <div className="logo" style={{ height: 65 }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[current]}
          selectedKeys={[current]}
          mode="inline"
        >
          <Menu.Item key={'/'} icon={<PieChartOutlined />}>
            <Link to={'/'}>Trang chủ</Link>
          </Menu.Item>

          <Menu.Item key={'/end-user'} icon={<TeamOutlined />} type="text">
            <Link to={'/user'}>End User</Link>
          </Menu.Item>

          {renderSidebar(AdminRouter)}

          <Menu.Item
            key="/logout"
            onClick={() => signOut()}
            icon={<RiLogoutCircleLine />}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}

export default memo(AdminSidebar)
