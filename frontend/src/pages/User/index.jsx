import WithAuth from '@/components/HOC/WithAuth'
import { StepProgressProvider } from '@/context/StepProgressContext'
import { useFetch } from '@/helper/Hook'
import GlobalService from '@/service/GlobalService'
import { Space, Spin } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const User = () => {
  useFetch({
    cacheName: ['careerData', 'province'],
    fn: () => GlobalService.getProvince(),
  })
  return (
    <>
      <Suspense
        fallback={
          <div className="container spin-suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." delay={500} />
            </Space>
          </div>
        }
      >
        <StepProgressProvider>
          <Outlet
            context={{
              animateClass: 'animate__animated animate__fadeIn animate__faster',
            }}
          />
        </StepProgressProvider>
      </Suspense>
    </>
  )
}

export default WithAuth(User, 'user')
