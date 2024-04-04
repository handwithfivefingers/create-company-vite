import { Modal, Button, Space, Dropdown } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import styles from './styles.module.scss'
import { DownOutlined, EyeOutlined, FormOutlined, MailOutlined } from '@ant-design/icons'
import { MdSettingsBackupRestore } from 'react-icons/md'
const UpdateOrderModal = forwardRef((props, ref) => {
  const { onUpdateOrder, onUpdateStatus, onPreviewPDF, onConvertFileManual, ...rest } = props
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
  const items = [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ]
  const handleMenuClick = (e) => {
    console.log('e', e)
  }
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  return (
    <Modal open={open} onCancel={closeModal} onOk={closeModal} {...rest}>
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
          <Button
            type="text"
            onClick={() => onConvertFileManual(data)}
            icon={<MdSettingsBackupRestore fontSize={16} />}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            Manual Convert & Edit
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
