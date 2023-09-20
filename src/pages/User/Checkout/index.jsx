import CCInput from '@/components/CCInput'
import { number_format } from '@/helper/Common'
import OrderService from '@/service/UserService/OrderService'
import { Button, Card, Col, Descriptions, Form, List, Radio, Row, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CHANGE_INFO_FORM, CREATE_COMPANY_FORM, DISSOLUTION_FORM, PENDING_FORM } from '../../../constant/FormConstant'
import styles from './styles.module.scss'

const Checkout = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  if (!slug) navigate('/404')

  const [data, setData] = useState()
  const [form] = Form.useForm()

  useEffect(() => {
    getScreenData(slug)
  }, [])

  const getScreenData = async (id) => {
    try {
      const resp = await OrderService.getOrderById(id)
      setData(resp.data.data)
    } catch (error) {
      console.log('error', error)
      navigate('/404')
    }
  }

  const getTitle = (data) => {
    let result = ''
    if (data?.change_info) {
      result = 'Thay đổi thông tin'
    } else if (data?.create_company) {
      result = 'Thành lập công ty'
    }
    return <div>{result}</div>
  }
  const getListInfo = (data) => {
    if (data) {
      if (data?.create_company) return Object.keys(data?.create_company).map((key) => CREATE_COMPANY_FORM[key]?.title)
      else if (data?.change_info) return Object.keys(data?.change_info).map((key) => CHANGE_INFO_FORM[key]?.title)
      else if (data?.dissolution) return Object.keys(data?.dissolution).map((key) => DISSOLUTION_FORM[key]?.title)
      else if (data?.pending) return Object.keys(data?.pending).map((key) => PENDING_FORM[key]?.title)
    }
    return []
  }

  const handleFinish = async ({ name, address, phone, paymentType }) => {
    try {
      const params = { name, address, phone: `+84${phone}`, paymentType, orderId: slug }
      const resp = await OrderService.createTransaction(params)
      if (resp.status === 200) {
        message.success('Tạo đơn hàng thành công')
      }
    } catch (error) {
      console.log('error', error)
      message.error('Tạo đơn hàng thất bại')
    }
  }

  return (
    <div className={styles.mainContent}>
      <div className="cc-scroll">
        <Form
          form={form}
          name="delivery_information"
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={(error) => console.log('error', error)}
        >
          <Row gutter={[0, 12]}>
            <Col span={16}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Card className={'box__shadow'}>
                    <Form.Item label="Thông tin người nhận hồ sơ">
                      <CCInput name="name" label="Họ và tên" />
                      <CCInput name="address" label="Địa chỉ" />
                      <CCInput
                        type="number"
                        name="phone"
                        label="Số điện thoại"
                        maxLength={10}
                        addonBefore={<span style={{ fontSize: 16 }}>+84</span>}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card className={'box__shadow'}>
                    <Form.Item label="Hình thức thanh toán" name="paymentType">
                      <Radio.Group>
                        <Space direction="vertical">
                          <Radio value={1}>Chuyển khoản</Radio>
                          <Radio value={2}>Qua Momo</Radio>
                          <Radio value={3}>Qua VN-PAY</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row gutter={[12, 12]}>
                <Col span={24}>
                  <Card className={'box__shadow'}>
                    <Descriptions title="Thông tin đơn hàng" layout="vertical" bordered />
                    <List header={getTitle(data?.data)}>
                      {getListInfo(data?.data)?.map((key, index) => (
                        <List.Item key={'list_info' + key}>{index + 1 + ' : ' + key}</List.Item>
                      ))}
                    </List>
                  </Card>
                </Col>

                <Col span={24}>
                  <Card className={'box__shadow'}>
                    <Descriptions title="Phí thanh toán" layout="vertical" bordered />
                    <List>
                      <List.Item>Total: {number_format(data?.price)} đ</List.Item>
                    </List>
                  </Card>
                </Col>
                <Col span={24} className="d-flex justify-content-end">
                  <Button type="primary" htmlType="submit">
                    Thanh toán{' '}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Checkout
