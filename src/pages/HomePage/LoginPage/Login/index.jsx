import { FIELD_RULE, TYPE_VERIFY } from '@/constant/pages/Login'
import AuthService from '@/service/AuthService'
import { Button, Card, Form, Input, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRouterData } from '../../../../helper/Context'
import { useAuthStore } from '../../../../store/reducer'
import styles from './styles.module.scss'
import { getPhoneNumber } from '../../../../helper/Common'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef()
  const { status, role } = useAuthStore()
  const route = useRouterData()
  const [typeVerify, setTypeVerify] = useState(TYPE_VERIFY['EMAIL'])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log('LoginForm useEffect')
    if (status) {
      let listHistory = route.listHistory
      if (listHistory.length) {
        let nextNavigate = listHistory[listHistory.length - 1]
        if (location.pathname.includes(nextNavigate.from)) {
          navigate(`/${role}`)
        } else navigate(nextNavigate.from)
      } else {
        navigate(`/${role}`)
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
      switch (typeVerify) {
        case TYPE_VERIFY['EMAIL']:
          await onHandleSendOTPByEmail()
          break
        case TYPE_VERIFY['PHONE']:
          await onHandleSendOTPBySMS()
          break
      }
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
      const { phone, email } = formRef.current.getFieldsValue(true)
      const phoneNum = getPhoneNumber(phone)
      const type = 'EMAIL'
      const data = await sendOTP({ phone: phoneNum, email, type })
      message.success(data.data.message)
      navigate('/verification')
    } catch (error) {
      message.error(error.response.data?.message || error.toString())
    }
  }

  const onHandleSendOTPBySMS = async () => {
    try {
      const { phone, email } = formRef.current.getFieldsValue(true)
      const type = 'SMS'
      const data = await sendOTP({ phone, email, type })
      message.success(data.data.message)
    } catch (error) {
      if (error.response?.status === 429) {
        message.error('Request quá số lần cho phép, vui lòng thử lại sau 1 phút')
      } else {
        message.error(error.response.data.message || error.toString())
      }
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

  return (
    <div className="p-5">
      <Card
        title="Xác thực tài khoản"
        className={styles.card}
        style={{ width: 350 }}
        extra={[<Link to="/">Quay lại</Link>]}
      >
        <Form layout="vertical" onFinish={onFinish} ref={formRef} onFinishFailed={handleFinishFail}>
          <Form.Item
            name={['phone']}
            label="Số điện thoại"
            rules={FIELD_RULE['PHONE']}
            required
            key={FIELD_RULE['PHONE']}
          >
            <Input addonBefore={<span style={{ fontSize: 16 }}>+84</span>} />
          </Form.Item>

          <Form.Item noStyle>
            <div className="d-flex flex-column align-items-center " style={{ gap: 12, paddingTop: 12 }}>
              <Button type="primary" loading={loading} block htmlType="submit">
                Xác thực
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default LoginForm
