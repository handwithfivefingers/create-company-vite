import React, { forwardRef, Suspense, lazy, useCallback } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import CreateCompany from '@/components/Form/CreateCompany'
import { useLocation } from 'react-router-dom'

const PreviewData = lazy(() => import('@/components/Form/PreviewData'))

const CreateCompanyPages = forwardRef((props, ref) => {
  const { setStep, saveService, paymentService, data, step, loading, onFinishScreen, Prev, Next } = props
  const location = useLocation()

  const getParams = useCallback(
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
      return params
    },
    [data],
  )

  const saveCreateCompany = useCallback(
    (ref) => {
      const params = getParams(ref)
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
    <Card className="card-boxShadow">
      <Suspense
        fallback={
          <div className="container spin-suspense" key="create_company_page_suspense">
            <Space align="center">
              <Spin spinning={true} tip="Loading..." />
            </Space>
          </div>
        }
      >
        <CreateCompany data={data} ref={ref} onFinishScreen={onFinishScreen} step={step} setStep={setStep} />

        {step === 7 && <PreviewData key={['preview', 'create_company']} ref={ref} />}

        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {step > 0 && (
            <>
              <Button onClick={Prev} type="dashed">
                Quay lại
              </Button>
              {/* <Button loading={loading} onClick={() => saveCreateCompany(ref)}>
                Lưu lại
              </Button> */}
            </>
          )}
          <Button loading={loading} onClick={() => saveCreateCompany(ref)}>
            Lưu lại
          </Button>
          {step < 7 && (
            <Button onClick={Next} type="primary">
              Tiếp tục
            </Button>
          )}

          {/* {step === 7 && (
            <Button loading={loading} onClick={() => handlePayment(ref)} type="primary">
              Thanh toán
            </Button>
          )} */}
          <Button loading={loading} onClick={() => handlePayment(ref)} type="primary">
            Thanh toán
          </Button>
        </div>
      </Suspense>
    </Card>
  )
})

export default CreateCompanyPages
