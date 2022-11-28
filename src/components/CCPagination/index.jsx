import React from 'react'
import { Pagination } from 'antd'
import styles from './styles.module.scss'
import clsx from 'clsx'
export default function CCPagination(props) {
  return (
    <Pagination
      className={clsx([styles.pagi, props.className])}
      size="small"
      total={props?.total}
      current={props?.current}
      defaultCurrent={1}
      pageSize={props?.pageSize}
      onChange={props?.onChange}
      showSizeChanger={props?.showSizeChanger}
    />
  )
}
