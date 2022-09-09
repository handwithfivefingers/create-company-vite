import { Card, Col, Row, Tabs } from 'antd'
import React from 'react'
import { m } from 'framer-motion'

const UserDashboard = () => {
  return (
    <m.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Row gutter={[0, 12]}>
        <Col span={16}>
          <Card title="Changelog thanhlapcongtyonline.vn"></Card>
        </Col>
        <Col span={8}>
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Card title="Đơn hàng đã thanh toán"></Card>
            </Col>
            <Col span={24}>
              <Card title="Đơn hàng vừa tạo"></Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </m.div>
  )
}

export default UserDashboard
