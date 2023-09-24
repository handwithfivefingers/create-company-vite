import { FIELD_RULE, TYPE_VERIFY } from '@/constant/pages/Login'
import AuthService from '@/service/AuthService'
import { AuthAction } from '@/store/actions'
import { Button, Card, Form, Input, message } from 'antd'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { useRouterData } from '../../../../helper/Context'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const [step, setStep] = useState(1)
  const { status, role } = useSelector((state) => state.authReducer)
  const route = useRouterData()
  const [typeVerify, setTypeVerify] = useState(TYPE_VERIFY['PHONE'])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (status) {
      let listHistory = route.listHistory
      if (listHistory.length) {
        let nextNavigate = listHistory[listHistory.length - 1]
        if (location.pathname.includes(nextNavigate.from)) {
          navigate(`/${role}`)
        } else navigate(nextNavigate.from)
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

  const onFinish = async () => {
    try {
      setLoading(true)
      await onLogin()
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
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
      data && setStep(2)
      message.success(data.data.message)
    } catch (error) {
      message.error(error.response.data.message)
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
      message.success(data.data.message)
      data && setStep(2)
    } catch (error) {
      if (error.response?.status === 429) {
        message.error('Request quá số lần cho phép, vui lòng thử lại sau 1 phút')
      } else {
        message.error(error.response.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const onHandleSendOTP = () => {
    switch (typeVerify) {
      case TYPE_VERIFY['EMAIL']:
        return onHandleSendOTPByEmail()
      case TYPE_VERIFY['PHONE']:
        return onHandleSendOTPBySMS()
    }
  }

  const onLogin = async () => {
    try {
      const value = formRef.current.getFieldsValue(true)
      const resp = await AuthService.onLogin(value)
      // console.log('onLogin result', resp)
      if (resp.status === 200) {
        const { authenticate, data } = resp.data
        dispatch(AuthAction.loginSuccess({ authenticate, role: data.role }))
      }
    } catch (error) {
      // console.log('onLogin error', error)
      message.error(error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng liên hệ admin')
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

  const onResend = async () => {
    try {
      setLoading(true)
      const { phone, email } = formRef.current.getFieldsValue(true)
      const type = 'SMS'
      await sendOTP({ phone, email, type })
    } catch (error) {
      message.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const renderFieldByStep = useMemo(() => {
    let html = null

    const formInput = () => {
      if (typeVerify === TYPE_VERIFY['EMAIL']) {
        return (
          <Form.Item name={['email']} label="Email" rules={FIELD_RULE['EMAIL']} required>
            <Input />
          </Form.Item>
        )
      }
      return (
        <Form.Item name={['phone']} label="Số điện thoại" rules={FIELD_RULE['PHONE']} required>
          <Input />
        </Form.Item>
      )
    }

    if (step === 1) {
      html = (
        <>
          {formInput()}

          <Form.Item noStyle>
            <div className="d-flex flex-column align-items-center " style={{ gap: 12, paddingTop: 12 }}>
              <Button type="primary" loading={loading} block onClick={onHandleSendOTP}>
                Xác thực
              </Button>
            </div>
          </Form.Item>
        </>
      )
    } else if (step === 2) {
      html = <VerifyOTP loading={loading} onFinish={onFinish} onResend={onResend} />
    }

    return html
  }, [step, typeVerify, loading])

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

let timer

const VerifyOTP = ({ loading, onFinish, onResend }) => {
  const [count, setCount] = useState(60)
  const [hide, setHide] = useState(false)
  const handleResendOTP = () => {
    setHide(true)
    onResend()
  }

  useEffect(() => {
    timer = setInterval(() => {
      updateCount()
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (count <= 0) {
      clearInterval(timer)
    }
  }, [count])

  const updateCount = () => {
    setCount((prev) => {
      let nextState = prev - 1
      return nextState
    })
  }
  return (
    <>
      <Form.Item name={['otp']} label="Mã OTP" rules={[{ required: true, message: 'OTP là bắt buộc' }]}>
        <Input maxLength={6} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" loading={loading} block onClick={onFinish}>
          Xác thực
        </Button>

        <Button onClick={handleResendOTP} type={count > 0 ? 'text' : 'link'} disabled={count > 0} block>
          Gửi lại {count > 0 && count}
        </Button>
      </Form.Item>
    </>
  )
}
export default LoginForm
