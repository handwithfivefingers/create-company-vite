import { Modal, Timeline } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './styles.module.scss'

const MailStatusModal = forwardRef((props, ref) => {
  // const { onUpdateOrder, onUpdateStatus, onPreviewPDF } = props
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  useImperativeHandle(
    ref,
    () => {
      return {
        openModal,
        closeModal,
        setData,
      }
    },
    [props],
  )
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <Modal open={open} onCancel={closeModal} onOk={closeModal} width={400}>
      <div className={styles.heading}>
        <h2>Trạng thái</h2>
      </div>
      <Timeline pending="Recording...">
        <Timeline.Item>Khởi tạo đơn hàng vào ngày {data?.createdAt?.split('T')?.[0]}</Timeline.Item>
        <Timeline.Item>Thanh toán đơn hàng vào ngày {data?.createdAt?.split('T')?.[0]}</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
      </Timeline>
    </Modal>
  )
})

export default MailStatusModal
