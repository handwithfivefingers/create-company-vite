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

const DesktopMenu = (props) => {
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
  const [path, setPath] = useState()
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

  return (
    <>
      <nav className={clsx([styles.headerMenu])}>
        <DesktopMenu permis={permis} path={path} auth={auth} />
      </nav>
    </>
  )
}

export default CustomHeader
