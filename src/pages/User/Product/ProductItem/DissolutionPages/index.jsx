import React, { forwardRef, Suspense, lazy } from 'react'
import { Card, Space, Spin, Button } from 'antd'

const Dissolution = lazy(() => {
  // console.log('lazy CreateCompany')
  return import('@/components/Form/Dissolution')
})
const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})
const DissolutionPages = forwardRef((props, ref) => {
  const { handleSaveDissolution, handlePurchaseDissolution, data, step, loading, Prev, Next } = props

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
        {/* {step === 2 ? renderPrewviewForm(ref) : ''} */}
        {step === 2 && (
          <PreviewData
            ref={ref}
            onFinishScreen={() => {
              closeModal()
            }}
          />
        )}
        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {step > 0 && (
            <>
              <Button onClick={Prev} type="dashed">
                Quay lại
              </Button>{' '}
              <Button loading={loading} onClick={() => handleSaveDissolution(ref)}>
                Lưu lại
              </Button>
            </>
          )}

          {step < 2 && (
            <Button onClick={Next} type="primary">
              Tiếp tục
            </Button>
          )}
          {step === 2 && (
            <Button loading={loading} onClick={() => handlePurchaseDissolution(ref)} type="primary">
              Thanh toán
            </Button>
          )}
        </div>
      </Suspense>
    </Card>
  )
})

export default DissolutionPages
