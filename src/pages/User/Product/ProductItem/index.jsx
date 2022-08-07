import CCSteps from '@/components/CCHeaderSteps'
import {
  CREATE_COMPANY_STEP,
  DISSOLUTION_STEP,
  PENDING_STEP,
} from '@/constant/Step'
import ProductService from '@/service/UserService/ProductService'
import { message, Modal, Spin } from 'antd'
import dateformat from 'dateformat'
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.scss'

const CreateCompanyPages = lazy(() => {
  return import('./CreateCompanyPages')
})

const ChangeInfoPages = lazy(() => {
  return import('./ChangeInfoPages')
})

const PendingPages = lazy(() => {
  return import('./PendingPages')
})

const DissolutionPages = lazy(() => {
  return import('./DissolutionPages')
})

const PreviewData = lazy(() => {
  return import('@/components/Form/PreviewData')
})

const UserProductItem = (props) => {
  const formRef = useRef()

  const uyquyenRef = useRef()

  const [current, setCurrent] = useState(0)

  const [data, setData] = useState()

  const [loading, setLoading] = useState()

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

  const navigate = useNavigate()

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

  const Next = useCallback(() => {
    setCurrent(current + 1)
  }, [current])

  const Prev = useCallback(() => {
    setCurrent(current - 1)
  }, [current])

  const setDataOutput = (output) => {
    console.log(output)
  }

  const renderPrewviewForm = useCallback((ref) => {
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
  }, [])

  const renderFormByType = (type) => {
    switch (type) {
      case 1:
        // Thành lập doanh nghiệp
        return (
          <CreateCompanyPages
            data={data.data}
            ref={formRef}
            onFinishScreen={(output) => setDataOutput(output)}
            step={current}
            setStep={(e) => setCurrent(e)}
            renderPrewviewForm={renderPrewviewForm}
            loading={loading}
            handleSave={handleSave}
            handlePurchaseCreateCompany={handlePurchaseCreateCompany}
            Prev={Prev}
            Next={Next}
          />
        )
      case 2:
        // Thay đổi thông tin
        return (
          <ChangeInfoPages
            data={data.data}
            ref={formRef}
            onFinishScreen={(val) => handleChangeInforForm(val)}
            step={current}
            renderPrewviewForm={renderPrewviewForm}
            loading={loading}
            handleSaveChangeInfo={handleSaveChangeInfo}
            handlePurchaseChangeInfo={handlePurchaseChangeInfo}
            Prev={Prev}
            Next={Next}
            changeInforStep={changeInforStep}
          />
        )
      case 3:
        // Tạm hoãn
        return (
          <PendingPages
            renderPrewviewForm={renderPrewviewForm}
            data={data.data}
            loading={loading}
            Prev={Prev}
            Next={Next}
            handleSavePending={handleSavePending}
            handlePurchasePending={handlePurchasePending}
            step={current}
            ref={formRef}
          />
        )
      case 4:
        return (
          <DissolutionPages
            renderPrewviewForm={renderPrewviewForm}
            handleSaveDissolution={handleSaveDissolution}
            handlePurchaseDissolution={handlePurchaseDissolution}
            data={data.data}
            step={current}
            loading={loading}
            Prev={Prev}
            Next={Next}
            ref={formRef}
          />
        )
      default:
        return null
    }
  }

  const renderHeaderStep = (type) => {
    let options = {
      step: current,
      data: null,
      onFinishScreen: (index) => setCurrent(index),
    }

    if (type === 1) options.data = CREATE_COMPANY_STEP
    else if (type === 2) options.data = changeInforStep
    else if (type === 3) options.data = PENDING_STEP
    else if (type === 4) options.data = DISSOLUTION_STEP
    return <CCSteps {...options} />
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
      title: `Bước ${val.length > 0 ? val.length + 3 : data.length + 1}`,
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
    const params = getParams()
    return paymentService(params)
  }, [data])

  const handlePurchaseCreateCompany = useCallback(() => {
    let val = formRef.current.getFieldsValue()
    let { approve } = val.create_company
    // console.log(approve)
    let company_opt_career = approve.company_opt_career?.map(
      ({ value, name, code }) => ({ value, name, code }),
    )
    let body = {
      ...val,
      create_company: {
        approve: {
          ...approve,
          company_opt_career,
        },
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
    return paymentService(params)
  }, [data])

  const handlePurchasePending = useCallback(() => {
    const params = getParams()
    return paymentService(params)
  }, [data])

  const handlePurchaseDissolution = useCallback(() => {
    const params = getParams()
    return paymentService(params)
  }, [data])
  const getParams = () => {
    let result = {}
    let val = formRef.current.getFieldsValue()

    result = {
      track: {
        step: 1,
        status: 'progress',
      },
      payment: 0,
      data: {
        ...val,
      },
    }
    return result
  }
  const handleSave = useCallback(() => {
    const params = getParams()
    saveService(params)
  }, [data])

  const handleSaveChangeInfo = useCallback(() => {
    const params = getParams()
    return saveService(params)
  }, [data])

  const handleSavePending = useCallback(() => {
    const params = getParams()
    return saveService(params)
  }, [data])

  const handleSaveDissolution = useCallback(() => {
    const params = getParams()
    return saveService(params)
  }, [data])

  // Service
  const saveService = async (params) => {
    try {
      setLoading(true)
      const res = await ProductService.createCompany(params)
      if (res.data.status === 200) {
        message.success(res.data.message)
        navigate('/user/san-pham')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const paymentService = async (params) => {
    const date = new Date()
    var createDate = dateformat(date, 'yyyymmddHHmmss')
    var orderId = dateformat(date, 'HHmmss')

    params.createDate = createDate
    params.orderId = orderId
    try {
      setLoading(true)
      let res = await ProductService.createCompanyWithPayment(params)
      if (res.data.status === 200) {
        return (window.location.href = res.data.url)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
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
