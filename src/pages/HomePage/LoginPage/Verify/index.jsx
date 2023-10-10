import { Card, Form, Button, message } from 'antd'
import React, { useState, useEffect } from 'react'
import OTPInput from '@/components/OTP'
import AuthService from '@/service/AuthService'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AuthAPIS } from '@/store/actions/auth.actions'

let timer
const NUM_LIMIT = 60
export default function Verify() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [count, setCount] = useState(NUM_LIMIT)
  const dispatch = useDispatch()

  useEffect(() => {
    if (count <= 0) {
      clearInterval(timer)
    } else {
      timer = setInterval(() => {
        updateCount()
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [count])

  const updateCount = () => {
    setCount((prev) => {
      let nextState = prev - 1
      return nextState
    })
  }

  const onFinish = async ({ otp }) => {
    try {
      setLoading(true)
      const resp = await AuthService.onVerify({ otp: otp.join('') })
      if (resp.status === 200) {
        if (resp.data.callbackUrl) navigate(resp.data.callbackUrl)
        const params = {
          authenticate: true,
          role: resp.data.role,
        }
        dispatch(AuthAPIS.AuthUser(params))
      }
    } catch (error) {
      console.log(error)
      const msg = error.response?.data?.message || error.response?.message || error.message || error.toString()
      message.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      const resp = await AuthService.onVerifyResend()
      message.success(resp.data.data.message)
    } catch (error) {
      message.error(error.response.data?.message || error.toString())
    } finally {
      setLoading(false)
      setCount(NUM_LIMIT)
    }
  }

  const onVerifyByEmail = () => {}

  return (
    <Form onFinish={onFinish} form={form}>
      <Card
        title="Xác thực OTP"
        className="box__shadow"
        extra={[
          <Button onClick={() => navigate(-1)} type="link">
            Quay lại
          </Button>,
        ]}
      >
        <OTPInput />
        <div className="d-flex align-items-center flex-column" style={{ gap: 12 }}>
          <Button htmlType="submit" type="primary" style={{ minWidth: 175 }} loading={loading}>
            Submit
          </Button>

          {/* <Button style={{ minWidth: 175 }}>Xác thực qua email</Button> */}

          <Button
            onClick={handleResend}
            type={count > 0 ? 'text' : 'link'}
            disabled={count > 0}
            block
            style={{ minWidth: 175 }}
            loading={loading}
          >
            Gửi lại {count > 0 && count}
          </Button>
        </div>
      </Card>
    </Form>
  )
}
