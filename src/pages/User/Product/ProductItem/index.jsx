import CCSteps from '@/components/CCHeaderSteps'
import { CREATE_COMPANY_STEP, DISSOLUTION_STEP, PENDING_STEP } from '@/constant/Step'
import { useStepAPI } from '@/context/StepProgressContext'
import ProductService from '@/service/UserService/ProductService'
import { MessageAction } from '@/store/actions'
import { Spin, message } from 'antd'
import { lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../../../helper/Hook'
import styles from './styles.module.scss'

const CreateCompanyPages = lazy(() => import('./CreateCompanyPages'))
const ChangeInfoPages = lazy(() => import('./ChangeInfoPages'))
const PendingPages = lazy(() => import('./PendingPages'))
const DissolutionPages = lazy(() => import('./DissolutionPages'))

const UserProductItem = (props) => {
  const formRef = useRef()

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

  const { onCreateStep } = useStepAPI()

  let params = useParams()

  const dispatch = useDispatch()

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

  const { errorList } = useSelector((state) => state.messageReducer)

  useEffect(() => {
    if (data?.type) {
      let steps = []
      if (data.type === 1) steps = CREATE_COMPANY_STEP
      else if (data.type === 2) steps = changeInforStep
      else if (data.type === 3) steps = PENDING_STEP
      else if (data.type === 4) steps = DISSOLUTION_STEP
      onCreateStep(steps)
    }
  }, [data])

  useEffect(() => {
    if (errorList.length > 0) {
      const cardScrollTop = document.querySelector('.card-scrollTop')
      cardScrollTop?.scrollIntoView()
    }
  }, [errorList])

  useEffect(() => {
    if (productData && status === 'success') {
      setData({ ...productData, data: productData.data.sort((a, b) => a.type - b.type) })
    }
  }, [productData])

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
        // res = await ProductService.updateAndPayment(_id, params)
        await ProductService.updateOrder(_id, params)
        return navigate(`/user/checkout/${_id}`)
      } else {
        const resp = await ProductService.createOrder(params)
        // res = await ProductService.createOrderWithPayment(params)
        return navigate(`/user/checkout/${resp.data._id}`)
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
    dispatch(MessageAction.setErrorsMessage(errorList))
  }

  const renderFormByType = useMemo(() => {
    const configs = {
      ref: formRef,
      loading: isLoading,
      paymentService,
      saveService,
      data: data?.data,
    }
    switch (data?.type) {
      case 1:
        // Thành lập doanh nghiệp
        return <CreateCompanyPages {...configs} />
      case 2:
        // Thay đổi thông tin
        configs.changeInforStep = changeInforStep
        // configs.onFinishScreen = handleChangeInforForm
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
  }, [data])

  return (
    <div className={styles.mainContent}>
      <CCSteps />
      <div className={styles.formContent}>
        <Spin spinning={isFetching || loading}>{data && renderFormByType}</Spin>
      </div>
    </div>
  )
}

export default UserProductItem
