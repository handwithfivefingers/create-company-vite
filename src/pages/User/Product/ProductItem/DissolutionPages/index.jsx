import React, { forwardRef, Suspense, lazy, useCallback } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import { useLocation } from 'react-router-dom'

const Dissolution = lazy(() => import('@/components/Form/Dissolution'))

const PreviewData = lazy(() => import('@/components/Form/PreviewData'))

const DissolutionPages = forwardRef((props, ref) => {
  const { saveService, paymentService, data, step, loading, Prev, Next } = props

  const handleSaveDissolution = useCallback(
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

  const handlePurchaseDissolution = useCallback(
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
        <Dissolution data={data} ref={ref} current={step} />

        {step === 2 && <PreviewData key={['preview', 'dissolution']} ref={ref} />}

        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {step > 0 && (
            <>
              <Button onClick={Prev} type="dashed">
                Quay lại
              </Button>
              <Button loading={loading} onClick={() => handleSaveDissolution(ref)}>
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
            <Button loading={loading} onClick={() => handlePurchaseDissolution(ref)} type="primary">
              Thanh toán
            </Button>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default DissolutionPages
