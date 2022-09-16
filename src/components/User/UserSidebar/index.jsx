import { CaretLeftOutlined, CaretRightOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthAction, CommonAction } from '@/store/actions'
import { UserRouter } from '../../../constant/Route'
import styles from './styles.module.scss'

const { Sider } = Layout

const UserSidebar = (props) => {
  const [current, setCurrent] = useState()
  const { collapsed } = useSelector((state) => state.commonReducer)
  const { role } = useSelector((state) => state?.authReducer)

  let location = useLocation()
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const onCollapse = (type) => {
    dispatch(CommonAction.sideCollapsed(type))
  }

  useEffect(() => {
    if (location.pathname.includes('/user/san-pham')) setCurrent('/user/san-pham')
    else setCurrent(location.pathname)
  }, [location])

  const renderSidebar = (route) => {
    let xhtml = null
    xhtml = route.map((item, i) => {
      return (
        <Menu.Item key={item.path} icon={item?.icon || <PieChartOutlined />}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      )
    })
    return xhtml
  }

  const signOut = async () => {
    await dispatch(AuthAction.AuthLogout())
    navigate('/')
  }

  return (
    <>
      <Sider
        collapsedWidth={50}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint={'md'}
        reverseArrow={true}
        trigger={<div className={styles.trigger}>{!collapsed ? <CaretLeftOutlined /> : <CaretRightOutlined />}</div>}
        className={styles.sidebar}
      >
        <div className="logo" style={{ height: 64 }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[current]} selectedKeys={[current]}>
          <Menu.Item key={'/'} icon={<PieChartOutlined />}>
            <Link to={`/${role}`}>Trang chủ</Link>
          </Menu.Item>

          {renderSidebar(UserRouter)}

          <Menu.Item key="/logout" onClick={() => signOut()} icon={<DesktopOutlined />}>
            <a>Đăng xuất</a>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  )
}

export default React.memo(UserSidebar)
