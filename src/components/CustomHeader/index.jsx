import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Drawer, Dropdown, Image, Menu } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import clsx from 'clsx'
// import { signOut, useSession } from "next-auth/react";
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
// import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import Logo from '@/assets/img/Logo.png'
import styles from './CustomHeader.module.scss'
const MobileMenu = (props) => {
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState()

  let navigate = useNavigate()

  const showDefaultDrawer = () => {
    setSize('default')
    setVisible(true)
  }
  const signOut = () => {
    console.log('signout')
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <div className={clsx([styles.mobileMenu, 'container'])} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <Button
        type="text"
        onClick={showDefaultDrawer}
        style={{
          color: props.path === '/' ? '' : 'var(--text3)',
        }}
      >
        <MenuOutlined />
      </Button>
    </div>
  )
}

const DesktopMenu = (props) => {
  const signOut = () => {
    console.log('signout')
  }
  return (
    <div className={clsx([styles.container, 'container'])}>
      <Link to={'/'}>
        <Image width={58} src={Logo} alt="logo" preview={false} style={{ cursor: 'pointer' }} />
      </Link>
    </div>
  )
}
const CustomHeader = (props) => {
  const [permis, setPermis] = useState(false)
  const [top, setTop] = useState()
  const [path, setPath] = useState()
  const screens = useBreakpoint()
  let location = useLocation()
  const { auth } = props

  useEffect(() => {
    if (auth?.status) {
      setPermis(true)
    } else {
      setPermis(false)
    }
  }, [auth])

  useEffect(() => {
    setPath(location.pathname)
  }, [location])

  useEffect(() => {
    let onScroll = () => {
      let x = window.scrollY
      setTop(x)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [top])

  return (
    <>
      <div
        className={clsx({
          [styles.scrollHeader]: top > 60 ? true : false,
        })}
      />
      <nav
        className={clsx([
          styles.headerMenu,
          {
            [styles.active]: top > 60 ? true : false,
          },
        ])}
      >
        <DesktopMenu permis={permis} path={path} auth={auth} />
      </nav>
    </>
  )
}

export default CustomHeader
