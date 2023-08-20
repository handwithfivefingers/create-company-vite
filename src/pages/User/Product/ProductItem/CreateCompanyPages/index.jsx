import CreateCompany from '@/components/Form/CreateCompany'
import { Button, Card, Space, Spin } from 'antd'
import clsx from 'clsx'
import { forwardRef, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './styles.module.scss'
// const PreviewData = lazy(() => import('@/components/Form/PreviewData'))
import PreviewData from '@/components/Form/PreviewData'
import { useStepAPI } from '@/context/StepProgressContext'
import { useStepData } from '@/context/StepProgressContext'

const CreateCompanyPages = forwardRef((props, ref) => {
  const { onNextStep, onPrevStep } = useStepAPI()
  const { currentStep } = useStepData()
  const { saveService, paymentService, data, loading, onFinishScreen } = props

  const location = useLocation()

  const getParams = (ref) => {
    let value = ref.current.getFieldsValue()
    const params = {
      data: {
        ...value,
      },
    }
    if (location.state?._id) {
      params._id = location.state._id
    }
    return params
  }

  const saveCreateCompany = (ref) => {
    const params = getParams(ref)
    return saveService(params)
  }

  const handlePayment = (ref) => {
    const params = getParams(ref)
    return paymentService(params, ref)
  }

  return (
    <Card className="card-boxShadow card-scrollTop">
      <Suspense
        fallback={
          <div className="container spin-suspense" key="create_company_page_suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." />
            </Space>
          </div>
        }
      >
        <CreateCompany data={data} ref={ref} onFinishScreen={onFinishScreen} step={currentStep} />

        {currentStep === 7 && <PreviewData key={['preview', 'create_company']} ref={ref} />}

        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {currentStep > 0 && (
            <Button onClick={onPrevStep} type="dashed">
              Quay lại
            </Button>
          )}

          {currentStep < 7 && (
            <Button onClick={onNextStep} type="primary">
              Tiếp tục
            </Button>
          )}

          {currentStep === 7 && (
            <Button loading={loading} onClick={() => handlePayment(ref)} type="primary">
              Thanh toán
            </Button>
          )}
          <Button
            loading={loading}
            onClick={() => saveCreateCompany(ref)}
            className={clsx(styles.btnSave, { [styles.active]: currentStep > 0 })}
            type="primary"
            style={{ background: 'var(--ant-info-color)', borderColor: 'var(--ant-info-color)' }}
          >
            Lưu lại
          </Button>
        </div>
      </Suspense>
    </Card>
  )
})

export default CreateCompanyPages
