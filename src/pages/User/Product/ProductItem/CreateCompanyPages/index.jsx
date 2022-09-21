import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import CreateCompany from '@/components/Form/CreateCompany'
// const CreateCompany = lazy(() => {
//   return import('@/components/Form/CreateCompany')
// })
const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})

const CreateCompanyPages = forwardRef((props, ref) => {
  const {
    setStep,
    handleSave,
    handlePurchaseCreateCompany,
    data,
    step,
    loading,
    onFinishScreen,
    Prev,
    Next,
  } = props

  const saveCreateCompany = () => {
    // console
    let value = ref.current.getFieldsValue()
    console.log('saveCreateCompany', value)

    // handleSave()
  }

  return (
    <Card className="card-boxShadow">
      <Suspense
        fallback={
          <div
            className="container spin-suspense"
            key="create_company_page_suspense"
          >
            <Space align="center">
              <Spin spinning={true} tip="Loading..." />
            </Space>
          </div>
        }
      >
        <CreateCompany
          data={data}
          ref={ref}
          onFinishScreen={onFinishScreen}
          step={step}
          setStep={setStep}
        />

        {/* {step === 7 ? renderPrewviewForm(ref) : ''} */}
        {step === 7 && (
          <PreviewData
            ref={ref}
            onFinishScreen={() => {
              closeModal()
            }}
          />
        )}

        <div
          className={'card-boxShadow flex flex__spacing-4'}
          style={{ position: 'sticky', bottom: 0 }}
        >
          {step > 0 ? <Button onClick={Prev} type="dashed">Quay lại</Button> : ''}

          {step < 7 ? <Button onClick={Next}  type="primary">Tiếp tục</Button> : ''}

          {step === 7 && (
            <>
              <Button loading={loading} onClick={() => handleSave(ref)}>
                Lưu lại
              </Button>
              <Button
                loading={loading}
                onClick={() => handlePurchaseCreateCompany(ref)}
                type="primary"
              >
                Thanh toán
              </Button>
            </>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default CreateCompanyPages
