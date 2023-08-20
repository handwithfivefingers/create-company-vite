import { forwardRef, Suspense, lazy, useCallback, useEffect } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import { useLocation } from 'react-router-dom'
import { useStepAPI, useStepData } from '../../../../../context/StepProgressContext'

const ChangeInforForm = lazy(() => import('@/components/Form/ChangeInforForm'))

const PreviewData = lazy(() => import('@/components/Form/PreviewData'))

const ChangeInfoPages = forwardRef((props, ref) => {
  const location = useLocation()
  const { onNextStep, onPrevStep } = useStepAPI()
  const { currentStep, steps } = useStepData()

  const { saveService, paymentService, data, loading, onFinishScreen, editData } = props

  const getParams = (ref) => {
    let value = ref.current.getFieldsValue()
    const params = {
      data: {
        ...value,
        products: value?.products?.map((item) => {
          if (item?.value) {
            return item.value
          }
          return item
        }),
      },
    }
    if (location.state?._id) {
      params._id = location.state._id
    }
    return params
  }

  const handleSaveChangeInfo = useCallback(
    (ref) => {
      const params = getParams(ref)
      // console.log(params)
      // return;
      return saveService(params)
    },
    [data],
  )

  const handlePayment = useCallback(
    (ref) => {
      const params = getParams(ref)
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
        <ChangeInforForm data={data} ref={ref} current={currentStep} onFinishScreen={onFinishScreen} edit={editData} />

        {currentStep === steps?.length - 1 && <PreviewData key={['preview', 'change_info']} ref={ref} />}

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

export default ChangeInfoPages
