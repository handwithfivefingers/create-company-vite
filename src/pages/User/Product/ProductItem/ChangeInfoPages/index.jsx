import { forwardRef, Suspense, lazy, useCallback } from 'react'
import { Card, Space, Spin, Button } from 'antd'
import { useLocation } from 'react-router-dom'

const ChangeInforForm = lazy(() => import('@/components/Form/ChangeInforForm'))

const PreviewData = lazy(() => import('@/components/Form/PreviewData'))

const ChangeInfoPages = forwardRef((props, ref) => {
  const location = useLocation()

  const { saveService, paymentService, data, step, loading, onFinishScreen, Prev, Next, changeInforStep, editData } =
    props
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
        <ChangeInforForm data={data} ref={ref} current={step} onFinishScreen={onFinishScreen} edit={editData} />

        {step === changeInforStep?.length - 1 && <PreviewData key={['preview', 'change_info']} ref={ref} />}

        <div className={'card-boxShadow flex flex__spacing-4'} style={{ position: 'sticky', bottom: 0 }}>
          {step > 0 && (
            <>
              <Button onClick={Prev} type="dashed">
                Quay lại
              </Button>
            </>
          )}

          {step < changeInforStep?.length - 1 && (
            <Button onClick={Next} type="primary">
              Tiếp tục
            </Button>
          )}

          {step === changeInforStep?.length - 1 && (
            <>
              <Button loading={loading} onClick={() => handlePayment(ref)} type="primary">
                Thanh toán
              </Button>
            </>
          )}
          {step > 0 && (
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
