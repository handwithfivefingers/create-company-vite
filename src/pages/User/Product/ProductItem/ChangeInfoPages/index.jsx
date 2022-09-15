import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'
// import PreviewData from '../../../../../components/Form/PreviewData'

const ChangeInforForm = lazy(() => {
  return import('@/components/Form/ChangeInforForm')
})

const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})

const ChangeInfoPages = forwardRef((props, ref) => {
  
  const { handleSaveChangeInfo, handlePurchaseChangeInfo, data, step, loading, onFinishScreen, Prev, Next, changeInforStep, editData } = props

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
        <ChangeInforForm data={data} ref={ref} current={step} onFinishScreen={onFinishScreen} edit={editData} />
        {step === changeInforStep?.length - 1 && (
          <PreviewData
            ref={ref}
            onFinishScreen={() => {
              closeModal()
            }}
          />
        )}
        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {step > 0 && (
            <Button onClick={Prev} type="dashed">
              Quay lại
            </Button>
          )}

          {step < changeInforStep?.length - 1 && (
            <Button onClick={Next} type="primary">
              Tiếp tục
            </Button>
          )}

          {step === changeInforStep?.length - 1 && (
            <>
              <Button loading={loading} onClick={() => handleSaveChangeInfo(ref)}>
                Lưu lại
              </Button>
              <Button loading={loading} onClick={() => handlePurchaseChangeInfo(ref)} type="primary">
                Thanh toán
              </Button>
            </>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default ChangeInfoPages
