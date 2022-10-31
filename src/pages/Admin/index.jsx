import { Spin, Space } from 'antd'
import React, { Suspense } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import WithAuth from '@/components/HOC/WithAuth'
import { useSelector } from 'react-redux'
const Admin = (props) => {
  
  const auth = useSelector((state) => state.authReducer)

  const navigate = useNavigate()

  if (!auth.status) {
    navigate('/login')
  }

  if (auth.role !== 'admin') {
    navigate('/user/san-pham')
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="container spin-suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." delay={500} />
            </Space>
          </div>
        }
      >
        <div className="animate__animated animate__fadeIn">
          <Outlet
            context={{
              animateClass: 'animate__animated animate__fadeIn animate__faster',
            }}
          />
        </div>
      </Suspense>
    </div>
  )
}

export default WithAuth(Admin, 'admin')
