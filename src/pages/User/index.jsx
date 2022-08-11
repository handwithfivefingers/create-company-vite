import { Spin, Space } from 'antd'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import WithAuth from '@/components/HOC/WithAuth'
import { useOutletContext } from 'react-router-dom'
const UserDashboard = () => {
  return (
    <Suspense
      fallback={
        <div className="container spin-suspense">
          <Space align="center">
            <Spin spinning={true} tip="Loading..." delay={500} />
          </Space>
        </div>
      }
    >
      <Outlet
        context={{
          animateClass: 'animate__animated animate__fadeIn animate__faster',
        }}
      />
    </Suspense>
  )
}

export default WithAuth(UserDashboard, 'user')
