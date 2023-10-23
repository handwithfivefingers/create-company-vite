import Logo from '@/assets/img/logo/logo_1.png'
import { Image } from 'antd'
import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CustomHeader.module.scss'

const CustomHeader = (props) => {
  return (
    <nav className={clsx([styles.headerMenu])}>
      <Link to={'/'} className={styles.imgBlock}>
        <img src={Logo} alt="logo" preview={false} />
      </Link>
    </nav>
  )
}

export default CustomHeader
