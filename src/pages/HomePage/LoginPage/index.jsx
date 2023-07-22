import { RouterContext } from '@/helper/Context'
import AuthService from '@/service/AuthService'
import { AuthAction } from '@/store/actions'
import { Alert, Button, Input, Modal, Tabs, message, Form, Typography } from 'antd'
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import RegisterProvider from './Register'
import styles from './styles.module.scss'

const { TabPane } = Tabs

const LIST_TABS = {
  1: 'login',
  2: 'register',
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

  const [step, setStep] = useState(1)

  const inputRef = useRef()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [params, setParams] = useSearchParams()

  useEffect(() => {
    if (route.to && status) {
      navigate(route.to)
    }
    formRef.current.setFieldsValue({
      email: 'handgod1995@gmail.com',
      phone: '0798341239',
    })
  }, [])

  useEffect(() => {
    if (status) {
      navigateLastRoute()
    }
  }, [status])

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

  const onHandleRegister = async (value) => {
    setLoading(true)
    await dispatch(AuthAction.AuthRegister(value))
    setLoading(false)
  }

  const toggleModal = () => setModal((state) => ({ ...state, open: !state.open }))

  const isUserExist = async ({ phone, email, type = undefined }) => {
    return (await AuthService.isUserExist({ phone, email, type }))?.data
  }

  const onRegisterAndRemoveOldAccount = async (value) => {
    try {
      await onHandleRegister({ ...value, deleteOldUser: true })
    } catch (error) {
      console.log('onRegisterAndRemoveOldAccount', error)
    }
  }

  const sendOTP = async (type = 'EMAIL') => {
    try {
      const { phone, email } = formRef.current.getFieldsValue(true)
      const resp = await AuthService.getRegisterOTP({ phone, email, type })
      return resp.data
    } catch (error) {
      throw error
    }
  }

  const onRegisterWithSMS = async () => {
    try {
      setLoading(true)
      const result = await sendOTP()
      message.success(result.data.message)
      let newParams = {
        verifyOTP: 1,
      }
      setParams(newParams)
      setModal({ ...modal, open: false })
    } catch (error) {
      message.error(error.response.data?.message)
    } finally {
      setLoading(false)
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

      if (step === 2) {
        onRegisterAndRemoveOldAccount(value)
      } else if (step === 1) {
        const { status: userExist, message: msg } = await isUserExist(value)
        if (userExist) {
          if (msg) {
            message.error(msg)
          } else
            setModal({
              open: true,
              component: <AlertNotify onRegister={onRegisterWithSMS} onLogin={onLogin} loading={loading} />,
            })
        } else {
          await onHandleRegister()
        }
      }
    } catch (error) {
      console.log('finish error')
      message.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (+params.get('verifyOTP') === 1) {
      setStep(2)
    } else {
      setStep(1)
    }
  }, [params])

  return (
    <>
      <Tabs defaultActiveKey={tab} centered className={styles.tabs} onChange={setTab} destroyInactiveTabPane={false}>
        <TabPane tab="Nhập thông tin liên hệ" key={LIST_TABS[2]}>
          <RegisterProvider ref={formRef} submit={onFinish} loading={loading} step={step} />
        </TabPane>
      </Tabs>

      <Modal open={modal.open} footer={false} onCancel={toggleModal}>
        {modal.component}
      </Modal>
    </>
  )
}

const AlertNotify = ({ onRegister, onLogin, loading }) => {
  return (
    <div className="d-flex flex-column justify-content-center p-5" style={{ gap: 20 }}>
      <div className={'p-5'}>
        <Alert
          message={
            <>
              <Typography.Text style={{ border: 0, maxWidth: 350, padding: '20px 0' }}>
                <span>
                  Số điện thoại đã tồn tại! Quý khách đã có tài khoản và đã từng điền form trên hệ thống của chúng tôi?
                  Hãy
                  <Button type="link" onClick={onLogin} style={{ padding: '0 4px', fontSize: 14 }}>
                    <b> {` nhấn vào đây `} </b>
                  </Button>
                  và nhập mã xác thực được gửi qua số điện thoại. Sau đó, quý khách có thể đăng nhập lại và quản lý
                  thông tin đã nhập một cách dễ dàng. Hoặc <b>bỏ qua</b> thông báo này và đăng ký tài khoản mới.
                </span>
              </Typography.Text>
            </>
          }
          type="warning"
        />
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center" style={{ gap: 8 }}>
        <Button style={{ width: '180px' }} onClick={onRegister} loading={loading}>
          Bỏ qua và đăng ký mới
        </Button>
      </div>
    </div>
  )
}
