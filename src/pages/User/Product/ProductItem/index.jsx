import CCSteps from '@/components/CCHeaderSteps'
import { CREATE_COMPANY_STEP, DISSOLUTION_STEP, PENDING_STEP } from '@/constant/Step'
import ProductService from '@/service/UserService/ProductService'
import { message, Spin, Form, notification, List } from 'antd'
import moment from 'moment'
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useFetch } from '../../../../helper/Hook'
import styles from './styles.module.scss'
import { FileExcelOutlined } from '@ant-design/icons'

// import CreateCompanyPages from './CreateCompanyPages'
const CreateCompanyPages = lazy(() => import('./CreateCompanyPages'))
const ChangeInfoPages = lazy(() => import('./ChangeInfoPages'))
const PendingPages = lazy(() => import('./PendingPages'))
const DissolutionPages = lazy(() => import('./DissolutionPages'))

const UserProductItem = (props) => {
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

  const [loading, setLoading] = useState(false)

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

  const Next = () => {
    setCurrent(current + 1)
  }

  const Prev = () => setCurrent(current - 1)

  const setDataOutput = (output) => {
  }

  const renderFormByType = (type) => {
    const configs = {
      ref: formRef,
      step: current,
      setStep: setCurrent,
      loading: isLoading,
      Prev,
      Next,
      paymentService,
      saveService,
      onFinishScreen: setDataOutput,
      data: data.data,
    }
    switch (type) {
      case 1:
        // Thành lập doanh nghiệp
        return <CreateCompanyPages {...configs} />
      case 2:
        // Thay đổi thông tin
        configs.changeInforStep = changeInforStep
        configs.onFinishScreen = handleChangeInforForm
        configs.data = data

        return <ChangeInfoPages {...configs} />
      case 3:
        // Tạm hoãn
        return <PendingPages {...configs} />
      case 4:
        return <DissolutionPages {...configs} />
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

  /**
   * @value {Object}
   */

  // Service
  const saveService = async ({ _id, ...params }) => {
    try {
      setLoading(true)

      let res
      if (_id) {
        res = await ProductService.updateOrder(_id, params)
      } else {
        res = await ProductService.createOrder(params)
      }
      if (res.status === 200) {
        message.success(res.data.message)
        return navigate('/user/san-pham')
      }
      throw res?.data
    } catch (error) {
      console.log('saveService', error)
      message.error({
        content: error.response?.data?.error || error.message || `Đã có lỗi xảy ra, vui lòng thử lại sau`,
        duration: 3,
      })
    } finally {
      setLoading(false)
    }
  }

  const paymentService = async ({ _id, ...params }, ref) => {
    if (!ref.current) return

    try {
      await ref.current?.validateFields()
    } catch (error) {
      console.log(error)
      return openNotification(error?.errorFields)
    }

    try {
      setLoading(true)
      let res
      if (_id) {
        res = await ProductService.updateAndPayment(_id, params)
      } else {
        res = await ProductService.createOrderWithPayment(params)
      }

      if (res.status === 200) {
        return window.open(res.data.url)
      }

      throw res?.data
    } catch (err) {
      console.log('paymentService', err)

      message.error({
        content: error.response?.data?.error || error.message || `Đã có lỗi xảy ra, vui lòng thử lại sau`,
      })
    } finally {
      setLoading(false)
    }
  }

  const openNotification = (errorList) => {
    notification.open({
      message: ``,
      icon: <FileExcelOutlined style={{ color: 'var(--light)' }} />,
      description: (
        <List size="small" dataSource={errorList} renderItem={(item) => <List.Item>{item.errors}</List.Item>} />
      ),

      style: {
        width: 400,
      },
    })
  }

  return (
    <div className={styles.mainContent}>
      {data && renderHeaderStep()}
      <div className={styles.formContent}>
        <Spin spinning={isFetching || loading}>{data && renderFormByType(data?.type)}</Spin>
      </div>
    </div>
  )
}

export default UserProductItem
