import { Descriptions, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './styles.module.scss'
import { PAYMENT_TYPE_CODE } from '@/constant/Payment'
import { number_format } from '@/helper/Common'

const TransactionModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
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
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  const onSetData = (resp) => setData(resp)
  console.log('data', data)
  return (
    <Modal open={open} onCancel={closeModal} onOk={closeModal} width={'75%'}>
      <div className={styles.heading}>
        <h2>Hóa đơn</h2>
      </div>
      <div className={styles.content}>
        
        <Descriptions title={'Thông tin giao nhận'} layout="vertical">
          <Descriptions.Item label="Tên">{data.deliveryInformation?.name}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{data.deliveryInformation?.phone}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{data.deliveryInformation?.address}</Descriptions.Item>
        </Descriptions>

        <Descriptions title={'Thông tin thanh toán'} layout="vertical">
          <Descriptions.Item label="Mã thanh toán">{data.paymentCode}</Descriptions.Item>
          <Descriptions.Item label="Cổng thanh toán">{PAYMENT_TYPE_CODE[data?.paymentType] || '-'}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái thanh toán">
            {!data.isPayment ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền">{number_format(data.price)}đ</Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  )
})

export default TransactionModal
