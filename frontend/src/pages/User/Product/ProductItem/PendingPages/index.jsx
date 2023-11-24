import { Button, Card, Space, Spin } from 'antd'
import { forwardRef, lazy, Suspense, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useStepAPI, useStepData } from '@/context/StepProgressContext'

const TamHoanForm = lazy(() => {
  return import('@/components/Form/PendingForm')
})

const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})

const PendingPages = forwardRef((props, ref) => {
  const { onNextStep, onPrevStep } = useStepAPI()
  const { currentStep } = useStepData()
  const { data, loading, saveService, paymentService } = props
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
    <Card className="card-boxShadow card-scrollTop">
      <Suspense
        fallback={
          <div className="container spin-suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." />
            </Space>
          </div>
        }
      >
        <TamHoanForm data={data} ref={ref} current={currentStep} />

        <PreviewData key={['preview', 'pending']} ref={ref} active={currentStep === 2} />
        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {currentStep > 0 && (
            <>
              <Button onClick={onPrevStep} type="dashed">
                Quay lại
              </Button>
            </>
          )}

          {currentStep < 2 && (
            <Button onClick={onNextStep} type="primary">
              Tiếp tục
            </Button>
          )}
          {currentStep === 2 && (
            <>
              <Button loading={loading} onClick={() => handlePurchasePending(ref)} type="primary">
                Thanh toán
              </Button>
            </>
          )}
          {currentStep > 0 && (
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

PendingPages.displayName = 'PendingPages'
export default PendingPages
