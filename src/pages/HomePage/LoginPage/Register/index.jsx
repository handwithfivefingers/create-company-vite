import { Alert, Button, Form, Input, Modal, Spin, Typography, message } from 'antd'
import clsx from 'clsx'
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'
import styles from './styles.module.scss'
import AuthService from '../../../../service/AuthService'
import { FIELD_RULE } from '../../../../constant/pages/Login'
import { useNavigate } from 'react-router-dom'
const { Text } = Typography

const RegisterProvider = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const modalRef = useRef()
  const navigate = useNavigate()

  const isUserExist = async ({ phone, email, type = undefined }) => {
    return (await AuthService.isUserExist({ phone, email, type }))?.data
  }

  const sendOTP = async ({ type = 'EMAIL', deleteOldUser = false }) => {
    try {
      const { phone, email } = form.getFieldsValue(true)
      const resp = await AuthService.getRegisterOTP({ phone, email, type, deleteOldUser })
      return resp.data
    } catch (error) {
      throw error
    }
  }

  const onFinish = async ({ email, phone }) => {
    try {
      setLoading(true)
      const { status: userExist, message: msg } = await isUserExist({ email, phone: `0${phone}` })
      if (!userExist) {
        const result = await sendOTP()
        message.success(result.data.message)
        navigate('/verification')
        if (msg) message.error(msg)
        return
      } else {
        modalRef.current.onToggle()
        modalRef.current.onSetComponent(
          <AlertNotify onRegister={onRegistrationAndRemoveOldAccount} onLogin={onLogin} loading={loading} />,
        )
      }
    } catch (error) {
      console.log('error')
      message.error(error.toString())
    } finally {
      setLoading(false)
    }
  }

  const onRegistrationAndRemoveOldAccount = async () => {
    try {
      setLoading(true)
      const result = await sendOTP({ deleteOldUser: true })
      message.success(result.data.message)
      modalRef.current.onToggle()
      navigate('/verification')
    } catch (error) {
      message.error(error.response.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onLogin = () => {
    navigate('/login', {
      state: {
        ...form.getFieldsValue(),
      },
    })
  }

  return (
    <div className={clsx([styles.registerWrap, 'container'])}>
      <Spin spinning={loading}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Text>Vui lòng nhập thông tin liên hệ dưới đây để nhận được bộ hồ sơ đầy đủ và nhanh chóng</Text>

          <Form.Item label="Email" name="email" validateTrigger={['onBlur']} rules={FIELD_RULE.EMAIL}>
            <Input />
          </Form.Item>

          <Form.Item validateTrigger={['onBlur']} name="phone" label="Số điện thoại (Zalo)" rules={FIELD_RULE.PHONE}>
            <Input addonBefore={<span style={{ fontSize: 16 }}>+84</span>} />
          </Form.Item>

          <div className={styles.flexWrapper}>
            <Button type="primary" block htmlType="submit">
              Tiếp theo
            </Button>
          </div>
        </Form>
      </Spin>

      <AlertModal ref={modalRef} />
    </div>
  )
}

const AlertModal = forwardRef((props, ref) => {
  const [modal, setModal] = useState({
    open: false,
    component: null,
  })
  useImperativeHandle(
    ref,
    () => {
      return {
        onToggle: toggleModal,
        onSetComponent: onSetComponent,
      }
    },
    [],
  )

  const toggleModal = () => setModal((state) => ({ ...state, open: !state.open }))
  const onSetComponent = (component) => setModal((prev) => ({ ...prev, component }))
  return (
    <Modal open={modal.open} footer={false} onCancel={toggleModal}>
      {modal.component}
    </Modal>
  )
})

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

export default RegisterProvider
