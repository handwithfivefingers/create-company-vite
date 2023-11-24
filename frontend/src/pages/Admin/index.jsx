import WithAuth from '@/components/HOC/WithAuth'
import { Space, Spin } from 'antd'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
const Admin = () => {
  const auth = useSelector((state) => state.authReducer)

  const navigate = useNavigate()

  if (!auth.status) {
    navigate('/login')
  }

  if (auth.role !== 'admin') {
    navigate('/user/san-pham')
  }

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
      <div className="animate__animated animate__fadeIn">
        <Outlet
          context={{
            animateClass: 'animate__animated animate__fadeIn animate__faster',
          }}
        />
      </div>
    </Suspense>
  )
}

const AdminWithAuth = WithAuth(Admin, 'admin')
export default AdminWithAuth
