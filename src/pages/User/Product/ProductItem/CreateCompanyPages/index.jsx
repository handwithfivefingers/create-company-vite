import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'

const CreateCompany = lazy(() => {
  // console.log('lazy CreateCompany')
  return import('@/components/Form/CreateCompany')
})
const CreateCompanyPages = forwardRef((props, ref) => {
  const {
    setStep,
    renderPrewviewForm,
    handleSave,
    handlePurchaseCreateCompany,
    data,
    step,
    loading,
    onFinishScreen,
    Prev,
    Next,
  } = props

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
        <CreateCompany
          data={data}
          ref={ref}
          onFinishScreen={onFinishScreen}
          step={step}
          setStep={setStep}
        />

        {step === 7 ? renderPrewviewForm(ref) : ''}

        <div
          className={'card-boxShadow'}
          style={{ position: 'sticky', bottom: 0 }}
        >
          {step > 0 ? <Button onClick={Prev}>Prev</Button> : ''}
          {step < 7 ? <Button onClick={Next}>Next</Button> : ''}
          {step === 7 ? (
            <>
              <Button loading={loading} onClick={handleSave}>
                Lưu lại
              </Button>
              <Button loading={loading} onClick={handlePurchaseCreateCompany}>
                Thanh toán
              </Button>
            </>
          ) : (
            ''
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default CreateCompanyPages
