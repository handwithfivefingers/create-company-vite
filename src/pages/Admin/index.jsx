import { Spin, Space } from 'antd'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import WithAuth from '@/components/HOC/WithAuth'
import { motion } from 'framer-motion'
const Admin = (props) => {
  return (
    <motion.div initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
    </motion.div>
  )
}

export default WithAuth(Admin, 'admin')
