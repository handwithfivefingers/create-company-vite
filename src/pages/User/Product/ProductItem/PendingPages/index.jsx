import React, { forwardRef, Suspense, lazy, useCallback } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import { useLocation } from 'react-router-dom'

const TamHoanForm = lazy(() => {
  return import('@/components/Form/PendingForm')
})

const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})
const PendingPages = forwardRef((props, ref) => {
  const { data, loading, Prev, Next, saveService, paymentService, step } = props
  const location = useLocation()

  const handleSavePending = useCallback(
    (ref) => {
      let value = ref.current.getFieldsValue()
      const params = {
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

  const handlePurchasePending = useCallback(
    (ref) => {
      let value = ref.current.getFieldsValue()
      const params = {
        data: {
          ...value,
        },
      }
      if (location.state?._id) {
        params._id = location.state._id
      }
      return paymentService(params, ref)
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
        <TamHoanForm data={data} ref={ref} current={step} />

        {step === 2 && (
          <PreviewData
            key={['preview', 'pending']}
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
          {step > 0 && (
            <>
              <Button
                loading={loading}
                onClick={() => handleSavePending(ref)}
                type="primary"
                style={{ background: 'var(--ant-info-color)', borderColor: 'var(--ant-info-color)' }}
              >
                Lưu lại
              </Button>
            </>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default PendingPages
