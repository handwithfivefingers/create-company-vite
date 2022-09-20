import { Card, Col, Row, Tabs } from 'antd'
import React from 'react'
import { m } from 'framer-motion'
import styles from './styles.module.scss'
import clsx from 'clsx'


const UserDashboard = () => {
 
  return (
    <m.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Row gutter={[0, 12]}>
        <Col span={24}></Col>
      </Row>
    </m.div>
  )
}

export default UserDashboard
