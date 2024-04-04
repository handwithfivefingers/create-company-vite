import CCSteps from '@/components/CCHeaderSteps'
import { CREATE_COMPANY_STEP, DISSOLUTION_STEP, PENDING_STEP, CHANGE_INFO_BASE_STEP } from '@/constant/Step'
import { useStepAPI } from '@/context/StepProgressContext'
import ProductService from '@/service/UserService/ProductService'
import { MessageAction } from '@/store/actions'
import { Spin, message } from 'antd'
import { lazy, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '@/helper/Hook'
import styles from './styles.module.scss'
import { useStepData } from '@/context/StepProgressContext'

const CreateCompanyPages = lazy(() => import('./CreateCompanyPages'))
const ChangeInfoPages = lazy(() => import('./ChangeInfoPages'))
const PendingPages = lazy(() => import('./PendingPages'))
const DissolutionPages = lazy(() => import('./DissolutionPages'))

const UserProductItem = () => {
  const formRef = useRef()

  const [data, setData] = useState()

  const [loading, setLoading] = useState(false)

  const { onCreateStep, updateStep } = useStepAPI()
  const { steps } = useStepData()

  let params = useParams()

  const dispatch = useDispatch()

  const {
    data: productData,
    isFetching,
    isLoading,
    status,
  } = useFetch({
    cacheName: ['userProduct', params],
    fn: () => ProductService.getCategoryBySlug(params),
    otherPath: true,
  })
  const navigate = useNavigate()

  const { errorList } = useSelector((state) => state.messageReducer)

  useEffect(() => {
    dispatch(MessageAction.clearMessage())
    updateStep(0)
  }, [])

  useEffect(() => {
    if (data?.type) {
      let steps = []
      if (data.type === 1) steps = CREATE_COMPANY_STEP
      else if (data.type === 2) steps = CHANGE_INFO_BASE_STEP
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
    console.log('coming saveService')
    try {
      setLoading(true)
      let res
      if (_id) {
        res = await ProductService.updateOrder(_id, params)
      } else {
        res = await ProductService.createOrder(params)
      }
      const { data } = res.data
      return message.success(data.message)
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
      const isValidation = await handleValidate(ref)
      if (!isValidation) return
      setLoading(true)
      if (_id) {
        await ProductService.updateOrder(_id, params)
        return navigate(`/user/checkout/${_id}`)
      } else {
        const resp = await ProductService.createOrder(params)
        const { data } = resp.data
        return navigate(`/user/checkout/${data._id}`)
      }
    } catch (error) {
      let msg = error.response?.data?.error || error.message || `Đã có lỗi xảy ra, vui lòng thử lại sau`
      message.error({
        content: msg,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleValidate = async (ref) => {
    let result = false
    try {
      await ref.current?.validateFields()
      result = true
    } catch (error) {
      const listValidate = []
      const { errorFields } = error
      if (errorFields && errorFields.length) {
        for (let step of steps) {
          const { field } = step
          const nameJoin = field?.join('_') || false
          for (let errorField of errorFields) {
            const fieldNameError = errorField.name?.join('_')
            if (nameJoin && fieldNameError.includes(nameJoin)) {
              listValidate.push({ ...errorField, errors: [step.title, ' : ', ...errorField.errors] })
            }
          }
        }
      }
      if (listValidate.length) {
        openNotification(listValidate)
        result = false
      } else {
        result = true
      }
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return result
    }
  }

  const openNotification = (errorList) => {
    dispatch(MessageAction.setErrorsMessage(errorList))
  }

  return (
    <div className={styles.mainContent}>
      <CCSteps />
      <div className={styles.formContent}>
        <Spin spinning={isFetching || loading}>
          {/* {data && renderFormByType} */}
          {data?.type === 1 && (
            <CreateCompanyPages
              data={data?.data}
              paymentService={paymentService}
              saveService={saveService}
              loading={isLoading}
              ref={formRef}
            />
          )}
          {data?.type === 2 && (
            <ChangeInfoPages
              loading={isLoading}
              ref={formRef}
              data={data}
              changeInforStep={CHANGE_INFO_BASE_STEP}
              paymentService={paymentService}
              saveService={saveService}
            />
          )}
          {data?.type === 3 && (
            <PendingPages
              data={data?.data}
              paymentService={paymentService}
              saveService={saveService}
              loading={isLoading}
              ref={formRef}
            />
          )}
          {data?.type === 4 && (
            <DissolutionPages
              data={data?.data}
              paymentService={paymentService}
              saveService={saveService}
              loading={isLoading}
              ref={formRef}
            />
          )}
        </Spin>
      </div>
    </div>
  )
}

export default UserProductItem
