import CCInput from '@/components/CCInput'
import { number_format } from '@/helper/Common'
import OrderService from '@/service/UserService/OrderService'
import { Alert, Button, Card, Col, Descriptions, Form, List, Radio, Row, Space, message, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdOutlineCopyAll } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { CHANGE_INFO_FORM, CREATE_COMPANY_FORM, DISSOLUTION_FORM, PENDING_FORM } from '../../../constant/FormConstant'
import VNPAY_LOGO from '@/assets/img/vnpay.png'
import styles from './styles.module.scss'

const BANK_INFO = {
  NAME: 'Ngân hàng TMCP Quân Đội',
  CODE: '005686868',
  DESCRIPTION: 'Công ty TNHH Dịch vụ Tư vấn Warren B',
  IMG: '/public/QR_code.jpg',
}

const Checkout = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  if (!slug) navigate('/404')

  const [data, setData] = useState()
  const [form] = Form.useForm()

  useEffect(() => {
    getScreenData(slug)
  }, [])

  const getScreenData = async (id) => {
    try {
      setLoading(true)
      const resp = await OrderService.getOrderById(id)
      setData(resp.data.data)
    } catch (error) {
      console.log('error', error)
      navigate('/404')
    } finally {
      setLoading(false)
    }
  }

  const getTitle = (data) => {
    let result = ''
    if (data?.change_info) {
      result = 'Thay đổi thông tin'
    } else if (data?.create_company) {
      result = 'Thành lập công ty'
    } else if (data?.pending) {
      result = 'Tạm ngưng'
    } else if (data?.dissolution) {
      result = 'Giải thể'
    }
    return (
      <div>
        <b>{result}</b>
      </div>
    )
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
      setLoading(true)
      const params = { name, address, phone: `+84${phone}`, paymentType, orderId: slug }
      const resp = await OrderService.createTransaction(params)
      if (resp.status === 200) {
        message.success('Tạo hóa đơn thành công')
      }
    } catch (error) {
      console.log('error', error)
      message.error('Tạo đơn hàng thất bại')
    } finally {
      setLoading(false)
      getScreenData(slug)
    }
  }

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num)
    notification.success({
      placement: 'bottomRight',
      message: 'Đã sao chép',
    })
  }

  const getContent = () => {
    // Transfer
    if (data.transactionId.paymentType === 1) {
      return (
        <Row gutter={[12, 12]}>
          <Col lg={{ span: 16, order: 1 }} md={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }}>
            <Card className={'box__shadow'}>
              <Descriptions title="Thông tin chuyển khoản">
                <Descriptions.Item span={24} label="Tên">
                  {BANK_INFO.DESCRIPTION}
                </Descriptions.Item>
                <Descriptions.Item span={24} label="Ngân hàng">
                  {BANK_INFO.NAME}
                </Descriptions.Item>
                <Descriptions.Item span={24} label="Số tài khoản">
                  <Button
                    onClick={() => handleCopy(BANK_INFO.CODE)}
                    type="text"
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 0, height: 22 }}
                  >
                    {BANK_INFO.CODE}
                    <MdOutlineCopyAll fontSize={16} />
                  </Button>
                </Descriptions.Item>
                <Descriptions.Item label="QR code" span={24}></Descriptions.Item>
                <Descriptions.Item span={24}>
                  <div className={styles.imgBlock} style={{ margin: '0 auto' }}>
                    <img src={BANK_INFO.IMG} width={400} />
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col lg={{ span: 8, order: 2 }} md={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }}>
            <Card className={'box__shadow'}>
              <Descriptions title="Nội dung chuyển khoản">
                <Descriptions.Item label="Nội dung" span={24}>
                  <Button
                    onClick={() => handleCopy(data?.transactionId?.paymentCode)}
                    type="text"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: 0,
                      padding: 0,
                      lineHeight: 1,
                      gap: 12,
                      height: 22,
                    }}
                  >
                    <b>{data?.transactionId?.paymentCode}</b>
                    <MdOutlineCopyAll fontSize={16} />
                  </Button>
                </Descriptions.Item>
                <Descriptions.Item label="Số tiền" span={24}>
                  <b>{number_format(data?.price)} đ</b>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Alert
              message="Chúng tôi sẽ cập nhật trạng thái khi nhận được thông tin. Nếu gặp vấn đề, xin vui lòng liên hệ hotline"
              style={{ marginTop: 8 }}
            />
          </Col>
        </Row>
      )
    } else if (data.transactionId.paymentType === 2) {
      return (
        <>
          <Card className={'box__shadow'}>
            <Descriptions title="Thông tin chuyển khoản" />
            <div className={styles.grid}>
              <div className={styles.imgBlock}>
                <img src={VNPAY_LOGO} />
              </div>
              <Button type="primary">Thanh toán bằng VN-PAY</Button>
            </div>
          </Card>
        </>
      )
    } else if (data.transactionId.paymentType === 3) {
      return (
        <>
          <Card className={'box__shadow'}>
            <Descriptions title="Thông tin chuyển khoản" />
            <div className={styles.grid}>
              <div className={styles.imgBlock}>
                <img src={VNPAY_LOGO} />
              </div>
              <Button type="primary">Thanh toán bằng MOMO</Button>
            </div>
          </Card>
        </>
      )
    } else
      return (
        <>
          <Card className={'box__shadow'}>
            <Descriptions title="Trạng thái đơn hàng không đúng, vui lòng liên hệ admin"></Descriptions>
          </Card>
        </>
      )
  }

  if (data?.transactionId) {
    return (
      <div className={styles.mainContent}>
        <div className="cc-scroll">
          {data?.transactionId.isPayment && 'Đơn hàng đã được thanh toán'}

          {!data.transactionId.isPayment && getContent()}
        </div>
      </div>
    )
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
                          <Radio value={2} disabled>
                            Qua Momo ( đang phát triển )
                          </Radio>
                          <Radio value={3} disabled>
                            Qua VN-PAY ( đang phát triển )
                          </Radio>
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
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Thanh toán
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
