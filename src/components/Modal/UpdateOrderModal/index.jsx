import { Modal, Button, Space } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './styles.module.scss'
import { DeleteOutlined, EyeOutlined, FormOutlined, MailOutlined } from '@ant-design/icons'

const UpdateOrderModal = forwardRef((props, ref) => {
  const { onUpdateOrder, onUpdateStatus, onPreviewPDF } = props
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
        <h2>Tùy chỉnh</h2>
      </div>
      <ul className={styles.action}>
        <li>
          <Button type="text" onClick={() => onUpdateOrder(data)} icon={<FormOutlined />}>
            Chỉnh sửa nội dung
          </Button>
        </li>
        <li>
          <Button type="text" onClick={() => onUpdateStatus(data)} icon={<MailOutlined />}>
            Trạng thái và email
          </Button>
        </li>
        <li>
          <Button type="text" onClick={() => onPreviewPDF(data)} icon={<EyeOutlined />}>
            Xem trước nội dung
          </Button>
        </li>
      </ul>
    </Modal>
  )
})

export default UpdateOrderModal
