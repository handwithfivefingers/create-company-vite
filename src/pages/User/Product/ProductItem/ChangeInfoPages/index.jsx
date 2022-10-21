import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
// import PreviewData from '../../../../../components/Form/PreviewData'

const ChangeInforForm = lazy(() => {
  return import('@/components/Form/ChangeInforForm')
})

const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})

const ChangeInfoPages = forwardRef((props, ref) => {
  const location = useLocation()
  const { saveService, paymentService, data, step, loading, onFinishScreen, Prev, Next, changeInforStep, editData } = props

  const handleSaveChangeInfo = useCallback(
    (ref) => {
      let value = ref.current.getFieldsValue()
      const params = {
        track: {
          step: 1,
          status: 'progress',
        },
        payment: 0,
        data: {
          ...value,
        },
      }
      if (location.state?._id) {
        params._id = location.state._id
      }
      return saveService(params)
    },
    [data],
  )

  const handlePurchaseChangeInfo = useCallback(
    (ref) => {
      const params = getParams(ref)

      return paymentService(params)
    },
    [data],
  )

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
            <>
              <Button loading={loading} onClick={() => handleSaveChangeInfo(ref)}>
                Lưu lại
              </Button>

              <Button onClick={Prev} type="dashed">
                Quay lại
              </Button>
            </>
          )}

          {step < changeInforStep?.length - 1 && (
            <Button onClick={Next} type="primary">
              Tiếp tục
            </Button>
          )}

          {step === changeInforStep?.length - 1 && (
            <>
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
