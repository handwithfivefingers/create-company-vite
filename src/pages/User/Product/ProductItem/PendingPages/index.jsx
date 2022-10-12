import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'

const TamHoanForm = lazy(() => {
  // console.log('lazy TamHoanForm')
  return import('@/components/Form/PendingForm')
})

const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})
const PendingPages = forwardRef((props, ref) => {
  const { data, loading, Prev, Next, handleSavePending, handlePurchasePending, step } = props
  // console.log(step)
  return (
    <Card className="card-boxShadow">
      <Suspense
        fallback={
          <div className="container spin-suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." />
            </Space>
          </div>
        }
      >
        <TamHoanForm data={data} ref={ref} current={step} />

        {step === 2 && (
          <PreviewData
            ref={ref}
            onFinishScreen={() => {
              closeModal()
            }}
          />
        )}
        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {step > 0 && (
            <>
              <Button onClick={Prev} type="dashed">
                Quay lại
              </Button>
              <Button loading={loading} onClick={() => handleSavePending(ref)}>
                Lưu lại
              </Button>
            </>
          )}

          {step < 2 && (
            <Button onClick={Next} type="primary">
              Tiếp tục
            </Button>
          )}
          {step === 2 && (
            <>
              <Button loading={loading} onClick={() => handlePurchasePending(ref)} type="primary">
                Thanh toán
              </Button>
            </>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default PendingPages
