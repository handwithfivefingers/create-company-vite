import { RouterContext } from '@/helper/Context'
import AuthService from '@/service/AuthService'
import { AuthAction } from '@/store/actions'
import { Alert, Button, Input, Modal, Tabs, message } from 'antd'
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RegisterForm from './Register'
import styles from './styles.module.scss'

const { TabPane } = Tabs

const LIST_TABS = {
  1: 'login',
  2: 'register',
}

const STEP = {
  1: 'PREPARE',
  2: 'REGISTER',
  3: 'LOGIN',
  4: 'VERIFY',
}

export default function LoginPage() {
  const formRef = useRef()

  const [loading, setLoading] = useState(false)

  const [tab, setTab] = useState(LIST_TABS[2])

  const { route } = useContext(RouterContext)

  const { status, role } = useSelector((state) => state.authReducer)

  const [modal, setModal] = useState({
    open: false,
    component: null,
  })

  const inputRef = useRef()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    if (route.to && status) {
      navigate(route.to)
    }
  }, [])

  useEffect(() => {
    if (status) {
      navigateLastRoute()
    }
    // formRef.current.setFieldsValue({
    //   email: 'truyenmai95@gmail.com',
    //   phone: '0798341239',
    // })
  }, [status])

  console.log('status, role', status, role)

  const navigateLastRoute = () => {
    let listHistory = route.listHistory
    const listExcludes = ['login', 'register', 'forgot-password']
    if (listHistory.length) {
      let nextNavigate = listHistory[listHistory.length - 1]
      if (listExcludes.includes(nextNavigate.from)) navigate(nextNavigate.from)
      else navigate(role)
    } else {
      navigate(role)
    }
  }
  const onHandleRegister = async (val) => {
    setLoading(true)
    await dispatch(AuthAction.AuthRegister(val))
    setLoading(false)
  }

  const toggleModal = () => setModal((state) => ({ ...state, open: !state.open }))

  const isUserExist = async ({ phone, email, type = undefined }) => {
    return (await AuthService.isUserExist({ phone, email, type }))?.data?.status || false
  }

  const onRegisterSubmit = async () => {
    try {
      let otp = inputRef.current.getValue()
      const { email, phone } = formRef.current.getFieldsValue(true)
      await onHandleRegister({ email, phone, otp, deleteOldUser: true })
    } catch (error) {
      console.log('onRegisterSubmit', error)
    }
  }
  // GHxcrKaZdv
  const sendOTP = async (type = 'EMAIL') => {
    try {
      const { phone, email } = formRef.current.getFieldsValue(true)
      const resp = await AuthService.getLoginOTP({ phone, email, type })
      return resp.data
    } catch (error) {
      throw error
    }
  }

  const onRegisterWithSMS = async () => {
    try {
      const result = await sendOTP('SMS')
      // const result = await sendOTP()
      if (result.data) {
        message.success(result.data.message)
      }
      setModal((state) => ({ ...state, component: <OTPInput ref={inputRef} onSubmit={onRegisterSubmit} /> }))
    } catch (error) {
      message.error(error.response.data?.error?.message)
    }
  }

  const onLogin = () => {
    navigate('/login', {
      state: {
        ...formRef.current.getFieldsValue(),
      },
    })
  }

  const onFinish = async (value) => {
    try {
      setLoading(true)
      const userExist = await isUserExist(value)
      if (userExist) {
        setModal({
          open: true,
          component: <AlertNotify onRegister={onRegisterWithSMS} onLogin={onLogin} />,
        })
      } else {
        const result = await sendOTP()
        if (result.data) {
          message.success(result.data.message)
        }
        await onHandleRegister(value)
      }
    } catch (error) {
      console.log('finish error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Tabs defaultActiveKey={tab} centered className={styles.tabs} onChange={setTab} destroyInactiveTabPane={false}>
        <TabPane tab="Nhập thông tin liên hệ" key={LIST_TABS[2]}>
          <RegisterForm ref={formRef} onFinish={onFinish} loading={loading} />
        </TabPane>
      </Tabs>
      <Modal open={modal.open} footer={false} onCancel={toggleModal}>
        {modal.component}
      </Modal>
    </>
  )
}

const OTPInput = forwardRef((props, ref) => {
  const [otpValue, setOTPValue] = useState('')

  const { onSubmit } = props
  useImperativeHandle(ref, () => ({
    getValue: () => otpValue,
  }))

  return (
    <div className="d-flex flex-column align-items-center" style={{ padding: '20px 0', gap: 12 }}>
      <Input value={otpValue} onChange={(e) => setOTPValue(e.target.value)} placeholder="OTP code" />
      <div>
        <Button type="primary" onClick={onSubmit}>
          Xác nhận
        </Button>
      </div>
    </div>
  )
})

const AlertNotify = (props) => {
  const { onRegister, onLogin } = props

  return (
    <div className="d-flex flex-column justify-content-center p-5" style={{ gap: 20 }}>
      <div className={'p-5'}>
        <Alert
          message={
            <>
              <p>Đã có tài khoản trùng số điện thoại.</p>
              <p>Tiếp tục đăng kí và xóa tài khoản cũ ?</p>
            </>
          }
          type="warning"
        />
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center" style={{ gap: 8 }}>
        <Button type="primary" style={{ width: '120px' }} onClick={onLogin}>
          Đăng nhập
        </Button>
        <Button style={{ width: '160px' }} onClick={onRegister}>
          Xác thực và Tiếp tục
        </Button>
      </div>
    </div>
  )
}
