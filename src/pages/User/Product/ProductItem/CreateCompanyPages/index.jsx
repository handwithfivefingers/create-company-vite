import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'

const CreateCompany = lazy(() => {
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

        {step === 7 ? renderPrewviewForm(ref) : ''}

        <div
          className={'card-boxShadow'}
          style={{ position: 'sticky', bottom: 0 }}
        >
          {step > 0 ? <Button onClick={Prev}>Quay lại</Button> : ''}
          {step < 7 ? <Button onClick={Next}>Tiếp tục</Button> : ''}
          {step === 7 ? (
            <>
              <Button loading={loading} onClick={() => handleSave(ref)}>
                Lưu lại
              </Button>
              <Button
                loading={loading}
                onClick={() => handlePurchaseCreateCompany(ref)}
              >
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
