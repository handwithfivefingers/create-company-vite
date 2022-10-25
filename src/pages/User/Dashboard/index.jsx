import { Card, Col, Row, Tabs } from 'antd'
import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const UserDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    navigate('/user/san-pham')
  }, [location])

  return (
    <div>
      <Row gutter={[0, 12]}>
        <Col span={24}></Col>
      </Row>
    </div>
  )
}

export default UserDashboard
