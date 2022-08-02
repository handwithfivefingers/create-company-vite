import CCSteps from '@/components/CCHeaderSteps'
import { Button, Card, message, Modal, Space, Spin } from 'antd'
import dateformat from 'dateformat'
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  CREATE_COMPANY_STEP,
  DISSOLUTION_STEP,
  PENDING_STEP,
} from '@/constant/Step'
import ProductService from '@/service/UserService/ProductService'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.scss'

const ChangeInforForm = lazy(() => {
  // console.log('lazy ChangeInforForm')
  return import('@/components/Form/ChangeInforForm')
})
const CreateCompany = lazy(() => {
  // console.log('lazy CreateCompany')
  return import('@/components/Form/CreateCompany')
})

const PreviewData = lazy(() => {
  // console.log('lazy PreviewData')
  return import('@/components/Form/PreviewData')
})

const TamHoanForm = lazy(() => {
  // console.log('lazy TamHoanForm')
  return import('@/components/Form/PendingForm')
})

const Dissolution = lazy(() => {
  // console.log('lazy Dissolution')
  return import('@/components/Form/Dissolution')
})

const UserProductItem = (props) => {
  const formRef = useRef()

  const uyquyenRef = useRef()

  const [form, setForm] = useState({})

  const [current, setCurrent] = useState(0)

  const [data, setData] = useState()

  const [loading, setLoading] = useState()

  const navigate = useNavigate()

  const [changeInforStep, setChangeInforStep] = useState([
    {
      title: 'Bước 1',
      desc: 'Chọn loại hình doanh nghiệp',
    },
    {
      title: `Bước 2`,
      desc: 'Thông tin doanh nghiệp',
    },
    {
      title: `Bước 3`,
      desc: 'Xem lại',
    },
  ])

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  let params = useParams()

  useEffect(() => {
    getDataBySlug()
  }, [])

  const getDataBySlug = async () => {
    try {
      setLoading(true)
      let res = await ProductService.getDataBySlug(params)
      if (res) {
        setData(res.data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const Next = () => {
    // case here
    let val = formRef.current?.getFieldsValue()
    setForm({
      ...form,
      ...val,
    })
    setCurrent(current + 1)
  }

  const Prev = () => setCurrent(current - 1)
  // handle all data here
  const setDataOutput = (output) => {
    console.log(output)
  }

  const renderPrewviewForm = (ref) => {
    let val = ref?.current.getFieldsValue()
    let uy_quyen = uyquyenRef.current?.getFieldsValue()
    let input = {}
    if (uy_quyen) {
      input = { ...val, ...uy_quyen }
    } else {
      input = { ...val }
    }
    return (
      <PreviewData
        data={input}
        onFinishScreen={() => {
          closeModal()
        }}
      />
    )
  }

  const renderFormByType = (type) => {
    switch (type) {
      case 1:
        // Thành lập doanh nghiệp
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
                data={data.data}
                ref={formRef}
                onFinishScreen={(output) => setDataOutput(output)}
                step={current}
                setStep={(e) => setCurrent(e)}
              />

              {current === 7 ? renderPrewviewForm(formRef) : ''}

              <div
                className={'card-boxShadow'}
                style={{ position: 'sticky', bottom: 0 }}
              >
                {current > 0 ? <Button onClick={Prev}>Prev</Button> : ''}
                {current < 7 ? <Button onClick={Next}>Next</Button> : ''}
                {current === 7 ? (
                  <>
                    <Button loading={loading} onClick={handleSave}>
                      Lưu lại
                    </Button>
                    <Button
                      loading={loading}
                      onClick={handlePurchaseCreateCompany}
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
      case 2:
        // Thay đổi thông tin
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
              <ChangeInforForm
                data={data.data}
                ref={formRef}
                current={current}
                onFinishScreen={(val) => handleChangeInforForm(val)}
              />
              {current === changeInforStep?.length - 1
                ? renderPrewviewForm(formRef)
                : ''}
              <div
                className={'card-boxShadow'}
                style={{ position: 'sticky', bottom: 0 }}
              >
                {current > 0 && <Button onClick={Prev}>Prev</Button>}

                {current < changeInforStep.length - 1 && (
                  <Button onClick={Next}>Next</Button>
                )}

                {current === changeInforStep.length - 1 && (
                  <>
                    <Button loading={loading} onClick={handleSaveChangeInfo}>
                      Lưu lại
                    </Button>
                    <Button
                      loading={loading}
                      onClick={handlePurchaseChangeInfo}
                    >
                      Thanh toán
                    </Button>
                  </>
                )}
              </div>
            </Suspense>
          </Card>
        )
      case 3:
        // Tạm hoãn
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
              <TamHoanForm data={data.data} ref={formRef} current={current} />
              {current === 2 ? renderPrewviewForm(formRef) : ''}
              <div
                className={'card-boxShadow'}
                style={{ position: 'sticky', bottom: 0 }}
              >
                {current > 0 && <Button onClick={Prev}>Prev</Button>}

                {current < 2 && <Button onClick={Next}>Next</Button>}
                {current === 2 && (
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
      case 4:
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
              <Dissolution data={data.data} ref={formRef} current={current} />
              {current === 2 ? renderPrewviewForm(formRef) : ''}
              <div
                className={'card-boxShadow'}
                style={{ position: 'sticky', bottom: 0 }}
              >
                {current > 0 && <Button onClick={Prev}>Prev</Button>}

                {current < 2 && <Button onClick={Next}>Next</Button>}
                {current === 2 && (
                  <>
                    <Button loading={loading} onClick={handleSaveDissolution}>
                      Lưu lại
                    </Button>
                    <Button
                      loading={loading}
                      onClick={handlePurchaseDissolution}
                    >
                      Thanh toán
                    </Button>
                  </>
                )}
              </div>
            </Suspense>
          </Card>
        )
      default:
        return null
    }
  }

  const renderHeaderStep = (type) => {
    switch (type) {
      case 1:
        return (
          <CCSteps
            step={current}
            data={CREATE_COMPANY_STEP}
            onFinishScreen={(ind) => setCurrent(ind)}
          />
        )
      case 2:
        return (
          <CCSteps
            step={current}
            data={changeInforStep}
            onFinishScreen={(ind) => setCurrent(ind)}
          />
        )
      case 3:
        return (
          <CCSteps
            step={current}
            data={PENDING_STEP}
            onFinishScreen={(ind) => setCurrent(ind)}
          />
        )
      case 4:
        return (
          <CCSteps
            step={current}
            data={DISSOLUTION_STEP}
            onFinishScreen={(ind) => setCurrent(ind)}
          />
        )
      default:
        return null
    }
  }

  const handleChangeInforForm = useCallback((val) => {
    let data = [
      {
        title: 'Bước 1',
        desc: 'Chọn loại hình',
      },
      {
        title: `Bước 2`,
        desc: 'Thông tin doanh nghiệp',
      },
    ]

    for (let i = 0; i < val.length; i++) {
      data.push({ desc: val[i].children, title: `Bước ${i + 3}` })
    }

    data.push({
      title: `Bước ${val.length > 0 ? val.length + 4 : data.length + 3}`,
      desc: 'Xem lại',
    })
    setChangeInforStep(data)
  }, [])

  const closeModal = useCallback(() => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }, [])

  const handlePurchaseChangeInfo = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    // let uy_quyen = uyquyenRef.current.getFieldsValue();
    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
        // ...uy_quyen,
      },
    }
    paymentService(params)
  }, [data])

  const handlePurchaseCreateCompany = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    let body = {
      ...val,
      create_company: {
        ...val.create_company,
        company_opt_career: val.create_company.company_opt_career.map(
          (item) => ({
            value: item.value,
            name: item.name,
            code: item.code,
          }),
        ),
      },
    }

    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...body,
      },
    }

    paymentService(params)
  }, [data])

  const handlePurchasePending = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    // let uy_quyen = uyquyenRef.current.getFieldsValue();
    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
        // ...uy_quyen,
      },
    }

    paymentService(params)
  }, [data])

  const handlePurchaseDissolution = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    // let uy_quyen = uyquyenRef.current.getFieldsValue();
    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
        // ...uy_quyen,
      },
    }

    paymentService(params)
  }, [data])

  const handleSave = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    // console.log(val);

    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
      },
    }
    // console.log(params);
    saveService(params)
  }, [data])

  const handleSaveChangeInfo = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    // let uy_quyen = uyquyenRef.current.getFieldsValue();
    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
        // ...uy_quyen,
      },
    }
    // console.log(params);
    saveService(params)
  }, [data])

  const handleSavePending = useCallback(() => {
    let val = formRef.current.getFieldsValue()

    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
        // ...uy_quyen,
      },
    }
    saveService(params)
  }, [data])

  const handleSaveDissolution = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    let params = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
      },
    }

    saveService(params)
  }, [data])

  // Service
  const saveService = (params) => {
    setLoading(true)
    ProductService.createCompany(params)
      .then((res) => {
        if (res.data.status === 200) {
          message.success(res.data.message)
          navigate('/user/san-pham')
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  const paymentService = (params) => {
    const date = new Date()
    var createDate = dateformat(date, 'yyyymmddHHmmss')
    var orderId = dateformat(date, 'HHmmss')

    params.createDate = createDate
    params.orderId = orderId

    ProductService.createCompanyWithPayment(params)
      .then((res) => {
        if (res.data.status === 200) {
          return (window.location.href = res.data.url)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.mainContent}>
      {data && renderHeaderStep(data?.type)}

      <div className={styles.formContent}>
        <Spin spinning={loading}>{data && renderFormByType(data?.type)}</Spin>
      </div>

      <Modal
        visible={childModal.visible}
        width={childModal.width}
        footer={null}
        bodyStyle={{
          background: '#eee',
        }}
        onCancel={closeModal}
      >
        {childModal.component}
      </Modal>
    </div>
  )
}

export default UserProductItem
