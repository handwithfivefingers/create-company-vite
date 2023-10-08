import { Tabs } from 'antd'
import React, { useState } from 'react'
import RegisterProvider from './Register'
import styles from './styles.module.scss'
const LIST_TABS = {
  1: 'login',
  2: 'register',
}

export default function HomeLogin() {
  const [tab, setTab] = useState(LIST_TABS[2])
  return (
    <>
      <Tabs
        defaultActiveKey={tab}
        centered
        className={styles.tabs}
        onChange={setTab}
        destroyInactiveTabPane={false}
        items={[
          {
            label: 'Nhập thông tin liên hệ',
            key: LIST_TABS[2],
            children: <RegisterProvider />,
          },
        ]}
      />
    </>
  )
}
