import { CommonAction } from '@/store/actions'
import { AuthAPIS } from '@/store/actions/auth.actions'
import { CaretLeftOutlined, CaretRightOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { UserRouter } from '../../../constant/Route'
import styles from './styles.module.scss'
import { useMemo } from 'react'
import AuthService from '../../../service/AuthService'

const { Sider } = Layout

const UserSidebar = (props) => {
  const [current, setCurrent] = useState()
  const { collapsed } = useSelector((state) => state.commonReducer)

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
    await AuthService.onLogout()
    navigate('/')
    dispatch(AuthAPIS.AuthLogout())
  }

  const openHomePage = () => {
    window.open('https://thanhlapcongtyonline.vn/', '_blank')
  }

  const handleMenuItemClick = ({ key }) => {
    if (key === '/logout') return signOut()
    if (key === '/') return openHomePage()
    else navigate(key)
  }

  const menuItems = useMemo(() => {
    return [
      {
        key: '/',
        label: 'Trang chủ',
        icon: <PieChartOutlined />,
      },
      ...UserRouter.map((item) => ({ ...item, label: item.title, key: item.path })),
      {
        key: '/logout',
        icon: <DesktopOutlined />,
        label: 'Đăng xuất',
      },
    ]
  }, [])
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
        className={clsx([styles.sidebar, 'box__shadow'])}
      >
        <div className="logo" style={{ height: 64 }} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[current]}
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleMenuItemClick}
        />
      </Sider>
    </>
  )
}

export default memo(UserSidebar)
