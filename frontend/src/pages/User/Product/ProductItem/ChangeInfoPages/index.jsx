import { Button, Card, Space, Spin } from 'antd'
import { Suspense, forwardRef, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import { useStepAPI, useStepData } from '../../../../../context/StepProgressContext'
import { useOrder } from '../../../../../store/reducer'
import { STATE_METHOD } from '../../../../../constant/Common'

const ChangeInforForm = lazy(() => import('@/components/Form/ChangeInforForm'))

const PreviewData = lazy(() => import('@/components/Form/PreviewData'))

const ChangeInfoPages = forwardRef((props, ref) => {
  const { onNextStep, onPrevStep } = useStepAPI()
  const { currentStep, steps } = useStepData()
  const { saveService, paymentService, data, loading, onFinishScreen, editData } = props
  const { category, _id, method } = useOrder()

  const handleSaveChangeInfo = (ref) => {
    const values = ref.current.getFieldsValue(true)
    console.log('values', values)
    const params = {
      data: { ...values, category },
    }
    if (method === STATE_METHOD['UPDATE'] && _id) {
      params._id = _id
    }
    return saveService(params)
  }

  const handlePayment = (ref) => {
    const values = ref.current.getFieldsValue(true)
    const params = {
      data: { ...values, category },
    }
    if (method === STATE_METHOD['UPDATE'] && _id) {
      params._id = _id
    }
    return paymentService(params, ref)
  }

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
        <ChangeInforForm data={data} ref={ref} current={currentStep} onFinishScreen={onFinishScreen} edit={editData} />

        {/* {currentStep === steps?.length - 1 && } */}
        <PreviewData
          key={['preview', 'change_info', steps.length]}
          ref={ref}
          active={currentStep === steps?.length - 1}
        />

        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {currentStep > 0 && (
            <Button onClick={onPrevStep} type="dashed">
              Quay lại
            </Button>
          )}

          {currentStep < steps?.length - 1 && (
            <Button onClick={onNextStep} type="primary">
              Tiếp tục
            </Button>
          )}

          {currentStep === steps?.length - 1 && (
            <>
              <Button loading={loading} onClick={() => handlePayment(ref)} type="primary">
                Thanh toán
              </Button>
            </>
          )}
          {currentStep > 0 && (
            <Button
              loading={loading}
              onClick={() => handleSaveChangeInfo(ref)}
              type="primary"
              style={{ background: 'var(--ant-info-color)', borderColor: 'var(--ant-info-color)' }}
            >
              Lưu lại
            </Button>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

ChangeInfoPages.displayName = 'ChangeInfoPages'

export default ChangeInfoPages
