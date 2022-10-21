import CCSteps from '@/components/CCHeaderSteps'
import { CREATE_COMPANY_STEP, DISSOLUTION_STEP, PENDING_STEP } from '@/constant/Step'
import ProductService from '@/service/UserService/ProductService'
import { message, Spin, Form } from 'antd'
import moment from 'moment'
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useFetch } from '../../../../helper/Hook'
import styles from './styles.module.scss'
import { m } from 'framer-motion'

const CreateCompanyPages = lazy(() => import('./CreateCompanyPages'))
const ChangeInfoPages = lazy(() => import('./ChangeInfoPages'))
const PendingPages = lazy(() => import('./PendingPages'))
const DissolutionPages = lazy(() => import('./DissolutionPages'))

const UserProductItem = (props) => {
  let location = useLocation()

  const formRef = useRef()

  const [current, setCurrent] = useState(0)

  const [data, setData] = useState()

  const [changeInforStep, setChangeInforStep] = useState([
    {
      title: 'Bước 1',
      desc: 'Chọn loại hình doanh nghiệp',
    },
    {
      title: `Bước 2`,
      desc: 'Thông tin chung',
    },
    {
      title: `Bước 3`,
      desc: 'Xem lại',
    },
  ])

  let params = useParams()

  const {
    data: productData,
    isFetching,
    isLoading,
    status,
    refetch,
  } = useFetch({
    cacheName: ['userProduct', params],
    fn: () => ProductService.getCategoryBySlug(params),
    otherPath: true,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (productData && status === 'success') {
      setData({ ...productData, data: productData.data.sort((a, b) => a.type - b.type) })
    }
  }, [productData])

  const Next = useCallback(() => {
    setCurrent(current + 1)
  }, [current])

  const Prev = useCallback(() => {
    setCurrent(current - 1)
  }, [current])

  const setDataOutput = (output) => {
    console.log(output)
  }

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
            loading={isLoading}
            handleSave={handleSave}
            handlePurchaseCreateCompany={handlePurchaseCreateCompany}
            Prev={Prev}
            Next={Next}
            editData={location.state}
          />
        )
      case 2:
        // Thay đổi thông tin
        return (
          <ChangeInfoPages
            data={data}
            ref={formRef}
            onFinishScreen={(val) => handleChangeInforForm(val)}
            step={current}
            loading={isLoading}
            Prev={Prev}
            Next={Next}
            changeInforStep={changeInforStep}
            editData={location.state}
            saveService={saveService}
            paymentService={paymentService}
          />
        )
      case 3:
        // Tạm hoãn
        return (
          <PendingPages
            data={data.data}
            loading={isLoading}
            Prev={Prev}
            Next={Next}
            handleSavePending={handleSavePending}
            handlePurchasePending={handlePurchasePending}
            step={current}
            ref={formRef}
            editData={location.state}
          />
        )
      case 4:
        return (
          <DissolutionPages
            handleSaveDissolution={handleSaveDissolution}
            handlePurchaseDissolution={handlePurchaseDissolution}
            data={data.data}
            step={current}
            loading={isLoading}
            Prev={Prev}
            Next={Next}
            ref={formRef}
            editData={location.state}
          />
        )
      default:
        return null
    }
  }

  const renderHeaderStep = () => {
    // let { type } = data
    if (data) {
      let options = {
        step: current,
        data: null,
        onFinishScreen: (index) => setCurrent(index),
      }

      if (data.type === 1) options.data = CREATE_COMPANY_STEP
      else if (data.type === 2) options.data = changeInforStep
      else if (data.type === 3) options.data = PENDING_STEP
      else if (data.type === 4) options.data = DISSOLUTION_STEP
      return <CCSteps {...options} />
    }
  }

  const handleChangeInforForm = useCallback((val) => {
    let data = [
      {
        title: 'Bước 1',
        desc: 'Chọn loại hình doanh nghiệp',
      },
      {
        title: `Bước 2`,
        desc: 'Thông tin chung',
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

  // const handlePurchaseChangeInfo = useCallback(
  //   (ref) => {
  //     const params = getParams(ref)

  //     return paymentService(params)
  //   },
  //   [data],
  // )

  const handlePurchaseCreateCompany = useCallback(
    (ref) => {
      let val = ref.current.getFieldsValue()
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
      return paymentService(params)
    },
    [data],
  )

  const handlePurchasePending = useCallback(
    (ref) => {
      const params = getParams(ref)
      return paymentService(params)
    },
    [data],
  )

  const handlePurchaseDissolution = useCallback(
    (ref) => {
      const params = getParams(ref)
      return paymentService(params)
    },
    [data],
  )

  const getParams = (ref = null) => {
    let result = {}
    let val = ref?.current.getFieldsValue()
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
  /**
   * @value {Object}
   */
  const handleSave = useCallback(
    async (ref) => {
      let value = ref.current.getFieldsValue()
      let params = {
        track: {
          step: 1,
          status: 'progress',
        },
        payment: 0,
        data: {
          ...value,
        },
      }
      saveService(params)
    },
    [data],
  )

  // const handleSaveChangeInfo = useCallback(
  //   (ref) => {
  //     let value = ref.current.getFieldsValue()
  //     const params = {
  //       track: {
  //         step: 1,
  //         status: 'progress',
  //       },
  //       payment: 0,
  //       data: {
  //         ...value,
  //       },
  //     }
  //     return saveService(params)
  //   },
  //   [data],
  // )

  const handleSavePending = useCallback(
    (ref) => {
      const params = getParams(ref)
      return saveService(params)
    },
    [data],
  )

  const handleSaveDissolution = useCallback(
    (ref) => {
      const params = getParams(ref)
      return saveService(params)
    },
    [data],
  )

  // Service
  const saveService = async ({ _id, ...params }) => {
    try {
      let res
      if (_id) {
        res = await ProductService.updateOrder(_id, params)
      } else {
        res = await ProductService.createOrder(params)
      }
      if (res.status === 200) {
        message.success(res.data.message)
        navigate('/user/san-pham')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const paymentService = async (params) => {
    let createDate = moment().format('YYYYMMDDHHmmss')
    let orderId = moment().format('HHmmss')

    params.createDate = createDate
    params.orderId = orderId

    try {
      let res = await ProductService.createOrderWithPayment(params)
      if (res.data.status === 200) {
        return (window.location.href = res.data.url)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <m.div className={styles.mainContent} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {data && renderHeaderStep()}

      <div className={styles.formContent}>
        <Spin spinning={isFetching}>{data && renderFormByType(data?.type)}</Spin>
      </div>
    </m.div>
  )
}

export default UserProductItem
