import { Descriptions, Form, Modal, Select, Input } from 'antd'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import styles from './styles.module.scss'
import { PAYMENT_TYPE_CODE } from '@/constant/Payment'
import { number_format } from '@/helper/Common'

const TransactionModal = forwardRef(({ onFinishScreen, ...props }, ref) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
  const [formInstance] = Form.useForm()
  useImperativeHandle(
    ref,
    () => {
      return {
        openModal,
        closeModal,
        onSetData,
      }
    },
    [props],
  )
  useEffect(() => {
    window.form = formInstance
  }, [])
  useEffect(() => {
    if (data) {
      const { deliveryInformation, isPayment } = data
      formInstance.setFieldsValue({
        deliveryInformation,
        isPayment,
      })
    }
  }, [data])

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  const onSetData = (resp) => setData(resp)

  const onFinish = (e) => {
    const value = formInstance.getFieldsValue()
    onFinishScreen({ ...value, _id: data._id })
  }

  console.log('form', formInstance.getFieldsValue(true))
  return (
    <Modal open={open} onCancel={closeModal} onOk={onFinish} width={'75%'}>
      <Form form={formInstance}>
        <div className={styles.heading}>
          <h2>Hóa đơn</h2>
        </div>
        <div className={styles.content}>
          <Descriptions title={'Thông tin giao nhận'} layout="vertical">
            <Descriptions.Item label="Tên người nhận" style={{ padding: '0 4px 0 0' }}>
              <Form.Item name={['deliveryInformation', 'name']} noStyle>
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại" style={{ padding: '0 4px ' }}>
              <Form.Item name={['deliveryInformation', 'phone']} noStyle>
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" style={{ padding: '0 0 0 4px' }}>
              <Form.Item name={['deliveryInformation', 'address']} noStyle>
                <Input />
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>

          <Descriptions title={'Thông tin thanh toán'} layout="vertical">
            <Descriptions.Item label="Mã thanh toán">{data?.paymentCode}</Descriptions.Item>
            <Descriptions.Item label="Cổng thanh toán">{PAYMENT_TYPE_CODE[data?.paymentType] || '-'}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái thanh toán">
              <Form.Item name={'isPayment'} noStyle>
                <Select style={{ width: '100%' }}>
                  <Select.Option value={false}>Chưa thanh toán</Select.Option>
                  <Select.Option value={true}>Đã thanh toán</Select.Option>
                </Select>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="Số tiền">{number_format(data?.price)}đ</Descriptions.Item>
          </Descriptions>
        </div>
      </Form>
    </Modal>
  )
})

export default TransactionModal
