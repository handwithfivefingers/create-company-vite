import AdminOrderService from '@/service/AdminService/AdminOrderService'
import { EyeOutlined, FormOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { MdSettingsBackupRestore } from 'react-icons/md'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { useFileAction } from '../../../store/actions/file.action'

const UpdateOrderModal = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false)
  const { onUpdateOrder, onUpdateStatus, onPreviewPDF, ...rest } = props
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  const action = useFileAction()

  useImperativeHandle(
    ref,
    () => ({
      openModal,
      closeModal,
      setData,
      setLoading,
      onConvertFileManual,
    }),
    [props],
  )

  const onConvertFileManual = async (record) => {
    try {
      setLoading(true)
      const resp = await AdminOrderService.onConvertManual(record._id)
      const data = resp.data.data
      dispatch(action.onUpdateFiles(data))
      return props.onConvertManual(record)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }
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
            loading={loading}
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

UpdateOrderModal.displayName = 'UpdateOrderModal'
export default UpdateOrderModal
