import Logo from '@/assets/img/logo/logo_1.png'
import { Image } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CustomHeader.module.scss'

const CustomHeader = (props) => {
  return (
    <>
      <nav className={clsx([styles.headerMenu])}>
        <div className={clsx([styles.container, 'container'])}>
          <Link to={'/'}>
            <Image height={80} src={Logo} alt="logo" preview={false} style={{ cursor: 'pointer' }} />
          </Link>
        </div>
      </nav>
    </>
  )
}

export default CustomHeader
