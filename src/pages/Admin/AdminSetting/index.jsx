import React, { forwardRef, useEffect, useState, useRef } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Tabs,
  Select,
  message,
} from 'antd'
import AdminMailService from '@/service/AdminService/AdminMailService'
import AdminSettingService from '@/service/AdminService/AdminSettingService'
import { onSetFields } from '@/helper/Common'
import CCInput from '@/components/CCInput'
import AdminHeader from '@/components/Admin/AdminHeader'
import styles from './styles.module.scss'
const { TabPane } = Tabs

const ChangePassword = forwardRef((props, ref) => {
  return (
    <Form onFinish={props?.passwordSubmit} ref={ref} layout="vertical">
      <Form.Item label={<h3>Đổi mật khẩu</h3>}>
        <CCInput
          type="password"
          name="old_password"
          label="Mật khẩu hiện tại"
          placeholder="********"
        />
        <CCInput
          type="password"
          name="new_password"
          label="Mật khẩu mới"
          placeholder="********"
        />
        <CCInput
          type="password"
          name="confirm_password"
          label="Xác nhận mật khẩu mới"
          placeholder="********"
        />

        <Form.Item>
          <Button htmlType="submit" loading={props?.loading}>
            Xác nhận
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  )
})

const SettingMail = forwardRef((props, ref) => {
  useEffect(() => {
    let { _id, ...mail } = props?.settingMail
    if (mail) {
      for (let key in mail) {
        onSetFields([key], mail[key]._id, ref)
      }
    }
  }, [props])

  const getOptions = () => {
    let result = []
    result = props.options.map(({ _id, name }) => ({ value: _id, name: name }))
    return result
  }
  return (
    <Form ref={ref} onFinish={props.mailSubmit} layout="vertical">
      <Form.Item label={<h3>Đổi mật khẩu</h3>}>
        <CCInput
          type="select"
          label={'Mail đăng kí'}
          name="mailRegister"
          options={getOptions()}
        />

        <CCInput
          type="select"
          label={'Mail Thanh Toán'}
          name="mailPayment"
          options={getOptions()}
        />

        <CCInput
          type="select"
          label={'Mail Thanh Toán Thành Công'}
          name="mailPaymentSuccess"
          options={getOptions()}
        />

        <Form.Item>
          <Button htmlType="submit" loading={props?.loading}>
            Xác nhận
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  )
})

const AdminSetting = () => {
  const formRef = useRef()
  const mailRef = useRef()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [settingMail, setSettingMail] = useState({})

  useEffect(() => {
    fetchTemplateMail()
    fetchSetting()
  }, [])

  const passwordSubmit = (val) => {
    console.log(val)
  }

  const mailSubmit = async (val) => {
    try {
      setLoading(true)
      let res = await AdminSettingService.updateSetting({ ...val })
      message.success(res.data.message)
    } catch (err) {
      console.log(err)
    } finally {
      fetchSetting()
    }
  }

  const fetchTemplateMail = async (page = 1) => {
    setLoading(true)
    let params = { page: page }
    try {
      let res = await AdminMailService.getTemplate(params)
      if (res.data.status === 200) {
        setOptions(res.data.data._template)
      } else {
        message.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSetting = async () => {
    try {
      setLoading(true)
      let res = await AdminSettingService.getSetting()
      let { data } = res.data
      setSettingMail(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const tabList = [
    {
      name: 'Đổi mật khẩu',
      content: (
        <ChangePassword
          passwordSubmit={passwordSubmit}
          ref={formRef}
          loading={loading}
        />
      ),
    },
    {
      name: 'Mail',
      content: (
        <SettingMail
          mailSubmit={mailSubmit}
          ref={mailRef}
          options={options}
          settingMail={settingMail}
          loading={loading}
        />
      ),
    },
  ]

  return (
  
    <>
      <AdminHeader title="Cài đặt" />

      <Tabs defaultActiveKey="1" >
        {tabList.map((tab, i) => (
          <TabPane tab={tab.name} key={[tab.name, i]} className={styles.container}>
            {tab.content}
          </TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default AdminSetting
