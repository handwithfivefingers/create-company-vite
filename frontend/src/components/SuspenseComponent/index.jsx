import { Suspense } from 'react'
import { Space, Spin } from 'antd'
const SuspendComponent = ({ children }) => {
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
      {children}
    </Suspense>
  )
}

export default SuspendComponent
