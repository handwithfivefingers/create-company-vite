import { AdminRouter } from '@/constant/Route'
import { CommonAction } from '@/store/actions'
import { AuthAPIS } from '@/store/actions/auth.actions'
import { CaretLeftOutlined, CaretRightOutlined, PieChartOutlined, TeamOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthService from '../../../service/AuthService'
import styles from './styles.module.scss'

const { Sider } = Layout

const AdminSidebar = () => {
  const [collapse, setCollapse] = useState(false)
  const [current, setCurrent] = useState()
  const dispatch = useDispatch()
  let navigate = useNavigate()
  let location = useLocation()
  const collapsed = useSelector((state) => state.commonReducer.collapsed)
  const signOut = async () => {
    await AuthService.onLogout()
    navigate('/')
    dispatch(AuthAPIS.AuthLogout())
  }

  const onCollapse = (type) => {
    dispatch(CommonAction.sideCollapsed(type))
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

  const getOtherSidebar = (route) => {
    let result = []

    result = route.map((item, i) => {
      let obj = {}

      if (item.submenu) {
        return (obj.children = getOtherSidebar(item.submenu))
      }
      return (obj = {
        ...obj,
        label: <Link to={item.path}>{item.name}</Link>,
        icon: item?.icon || <PieChartOutlined />,
        key: item.path,
      })
    })

    return result
  }
  const ListMenu = [
    {
      label: <Link to={'/'}>Trang chủ</Link>,
      key: '/',
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to={'/user/san-pham'}>End User</Link>,
      key: '/end-user',
      icon: <TeamOutlined />,
    },
    ...getOtherSidebar(AdminRouter),
    {
      label: <a onClick={() => signOut()}>Đăng xuất</a>,
      key: '/logout',
      icon: <RiLogoutCircleLine />,
    },
  ]

  return (
    <>
      <Sider
        collapsible
        onCollapse={onCollapse}
        collapsedWidth={50}
        collapsed={collapsed}
        reverseArrow={true}
        breakpoint={'md'}
        trigger={<div className={styles.trigger}>{!collapse ? <CaretLeftOutlined /> : <CaretRightOutlined />}</div>}
        className={clsx([styles.sidebar, 'box__shadow'])}
      >
        <div className="logo" style={{ height: 65 }} />

        <Menu items={ListMenu} theme="light" defaultSelectedKeys={[current]} selectedKeys={[current]} mode="inline" />
      </Sider>
    </>
  )
}

export default memo(AdminSidebar)
