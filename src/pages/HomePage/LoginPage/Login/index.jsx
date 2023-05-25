import { RouterContext } from '@/helper/Context'
import AuthService from '@/service/AuthService'
import { AuthAction } from '@/store/actions'
import { Button, Card, Form, Input, message } from 'antd'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

const TYPE_VERIFY = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
}

const FIELD_RULE = {
  EMAIL: [
    {
      required: true,
      message: 'Email là bắt buộc',
    },
    {
      type: 'email',
      message: 'Định dạng email không đúng',
    },
  ],
  PHONE: [
    {
      required: true,
      message: 'Số điện thoại là bắt buộc',
      type: 'string',
    },
    {
      type: 'string',
      min: 9,
      max: 11,
      message: 'Số điện thoại cần > 9 số và < 11 số',
    },
    {
      validator: (_, value) => {
        if (value && value.match(/([^0-9])/)) {
          console.log('value')
          return Promise.reject(new Error('Số điện thoại định dạng không đúng'))
        } else {
          return Promise.resolve()
        }
      },
    },
  ],
}
const LoginForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const [step, setStep] = useState(1)
  const { status, role } = useSelector((state) => state.authReducer)
  const { route } = useContext(RouterContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (status) {
      let listHistory = route.listHistory
      if (listHistory.length) {
        let nextNavigate = listHistory[listHistory.length - 1]
        navigate(nextNavigate.from)
      } else {
        navigate(role)
      }
    }
  }, [status])

  useEffect(() => {
    if (location.state) {
      formRef.current.setFieldsValue({
        ...location.state,
      })
    }
  }, [location.state])

  const onFinish = async (value) => {
    try {
      setLoading(true)
      await onLogin()
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }

  const onGetOTP = async (value) => {
    try {
      const response = await AuthService.getLoginOTP(value)
      if (response.status === 200) {
        message.success(response.data?.data?.message)
        return true
      }
    } catch (error) {
      message.error(error.response?.message || error.message || 'Đã có lỗi xảy ra, vui lòng liên hệ admin')
      return false
    }
  }

  const sendOTP = async (formData) => {
    return (await AuthService.getLoginOTP(formData)).data
  }

  const onHandleSendOTPByEmail = async () => {
    try {
      setLoading(true)
      const { phone, email } = formRef.current.getFieldsValue(true)
      const type = 'EMAIL'
      const data = await sendOTP({ phone, email, type })
      console.log('onHandleSendOTPByEmail data', data)
      data && setStep(2)
      message.success(data.data.message)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const onHandleSendOTPBySMS = async () => {
    try {
      setLoading(true)
      const { phone, email } = formRef.current.getFieldsValue(true)
      const type = 'SMS'
      const data = await sendOTP({ phone, email, type })
      console.log('onHandleSendOTPBySMS data', data)
      data && setStep(2)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onLogin = async () => {
    try {
      const value = formRef.current.getFieldsValue(true)
      dispatch(AuthAction.AuthLoginWithEmail(value))
    } catch (error) {
      console.log('onLogin error', error)
    }
  }

  const handleFinishFail = (value) => {
    const { errorFields } = value
    const listMess = errorFields.reduce((prev, current) => {
      prev = prev + '\n' + current.errors
      return prev
    }, '')
    message.error(listMess)
  }

  const renderFieldByStep = useMemo(() => {
    let html = null

    if (step === 1) {
      html = (
        <>
          <Form.Item name={['email']} label="Email" rules={FIELD_RULE['EMAIL']} required>
            <Input />
          </Form.Item>

          <Form.Item name={['phone']} label="Số điện thoại" rules={FIELD_RULE['PHONE']} required>
            <Input />
          </Form.Item>

          <Form.Item noStyle>
            <div className="d-flex flex-column" style={{ gap: 12 }}>
              <Button type="primary" loading={loading} block onClick={onHandleSendOTPByEmail}>
                Xác thực qua Email
              </Button>
              <span style={{ textAlign: 'center' }}>Hoặc</span>
              <Button loading={loading} block onClick={onHandleSendOTPBySMS}>
                Xác thực qua số điện thoại
              </Button>
            </div>
          </Form.Item>
        </>
      )
    } else if (step === 2) {
      html = (
        <>
          <Form.Item name={['otp']} label="Mã OTP" rules={[{ required: true, message: 'OTP là bắt buộc' }]}>
            <Input maxLength={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Xác thực
            </Button>
          </Form.Item>
        </>
      )
    }

    return html
  }, [step])

  return (
    <div className="p-5">
      <Card
        title="Xác thực tài khoản"
        className={styles.card}
        style={{ width: 350 }}
        extra={[<Link to="/">Quay lại</Link>]}
      >
        <Form layout="vertical" onFinish={onFinish} ref={formRef} onFinishFailed={handleFinishFail}>
          {renderFieldByStep}
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
