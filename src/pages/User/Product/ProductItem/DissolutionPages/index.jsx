import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'

const Dissolution = lazy(() => {
  // console.log('lazy CreateCompany')
  return import('@/components/Form/Dissolution')
})
const DissolutionPages = forwardRef((props, ref) => {
  const {
    renderPrewviewForm,
    handleSaveDissolution,
    handlePurchaseDissolution,
    data,
    step,
    loading,
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
        <Dissolution data={data} ref={ref} current={step} />
        {step === 2 ? renderPrewviewForm(ref) : ''}
        <div
          className={'card-boxShadow'}
          style={{ position: 'sticky', bottom: 0 }}
        >
          {step > 0 && <Button onClick={Prev}>Quay lại</Button>}

          {step < 2 && <Button onClick={Next}>Tiếp tục</Button>}
          {step === 2 && (
            <>
              <Button loading={loading} onClick={handleSaveDissolution}>
                Lưu lại
              </Button>
              <Button loading={loading} onClick={handlePurchaseDissolution}>
                Thanh toán
              </Button>
            </>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default DissolutionPages
