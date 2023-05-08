import { Button, Card, Form, Input, Typography, message } from 'antd'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useSearchParams, Link, useNavigationType } from 'react-router-dom'
const { Text } = Typography
import styles from './styles.module.scss'
import clsx from 'clsx'
import { RouterContext } from '@/helper/Context'
import AuthService from '@/service/AuthService'
import { AuthAction } from '@/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { status, role } = useSelector((state) => state.authReducer)
  let type = useNavigationType()
  const { route } = useContext(RouterContext)

  const onFinish = async (value) => {
    setLoading(true)
    if (step === 1) {
      await onGetOTP(value)
      setStep(2)
    } else if (step === 2) {
      await onLogin()
    }
    setLoading(false)
  }

  const onGetOTP = async (value) => {
    try {
      const response = await AuthService.getLoginOTP(value)
      if (response.status === 200) {
        message.success(response.data?.data?.message)
      }
    } catch (error) {
      message.error(error.response?.message || error.message || 'Đã có lỗi xảy ra, vui lòng liên hệ admin')
    }
  }

  const onLogin = async () => {
    const value = formRef.current.getFieldsValue(true)
    dispatch(AuthAction.AuthLogin(value))
  }

  const renderFieldByStep = useMemo(() => {
    let html = null

    if (step === 1) {
      html = (
        <>
          <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]} required>
            <Input />
          </Form.Item>

          <Text type="secondary" className={clsx(styles.text, 'ant-row ant-form-item')}>
            * Mã xác thực sẽ được gửi qua Email
          </Text>
        </>
      )
    } else if (step === 2) {
      html = (
        <>
          <Form.Item name={['otp']} label="Mã OTP" rules={[{ required: true, message: 'OTP là bắt buộc' }]}>
            <Input maxLength={6} />
          </Form.Item>
        </>
      )
    }

    return html
  }, [step])

  const handleFinishFail = (value) => {
    const { errorFields } = value
    const listMess = errorFields.reduce((prev, current) => {
      prev = prev + '\n' + current.errors
      return prev
    }, '')
    message.error(listMess)
  }

  if (status) {
    if (type !== 'POP') {
      if (route.from) {
        navigate(route.from)
      } else {
        navigate(role)
      }
    } else {
      navigate(role)
    }
  }
  return (
    <>
      <Card
        title="Xác thực tài khoản"
        className={styles.card}
        style={{ width: 350 }}
        extra={[<Link to="/">Quay lại</Link>]}
      >
        <Form layout="vertical" onFinish={onFinish} ref={formRef} onFinishFailed={handleFinishFail}>
          {renderFieldByStep}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Xác thực
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default LoginForm
