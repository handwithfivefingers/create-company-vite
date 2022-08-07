import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'

const TamHoanForm = lazy(() => {
  // console.log('lazy TamHoanForm')
  return import('@/components/Form/PendingForm')
})
const PendingPages = forwardRef((props, ref) => {
  const {
    renderPrewviewForm,
    data,
    loading,
    Prev,
    Next,
    handleSavePending,
    handlePurchasePending,
    step,
  } = props
  // console.log(step)
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
        <TamHoanForm data={data} ref={ref} current={step} />
        {step === 2 ? renderPrewviewForm(ref) : ''}
        <div
          className={'card-boxShadow'}
          style={{ position: 'sticky', bottom: 0 }}
        >
          {step > 0 && <Button onClick={Prev}>Prev</Button>}

          {step < 2 && <Button onClick={Next}>Next</Button>}
          {step === 2 && (
            <>
              <Button loading={loading} onClick={handleSavePending}>
                Lưu lại
              </Button>
              <Button loading={loading} onClick={handlePurchasePending}>
                Thanh toán
              </Button>
            </>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default PendingPages
