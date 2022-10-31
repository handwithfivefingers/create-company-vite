import React, { useEffect, useState } from 'react'
import { Card, message, Modal, Table, Button, PageHeader } from 'antd'
import AdminUserService from '@/service/AdminService/AdminUserService'
import styles from './styles.module.scss'
import CCPagination from '@/components/CCPagination'
import AdminHeader from '@/components/Admin/AdminHeader'
const AdminUser = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    fetchUser()
  }, [])

  const pagiConfig = {
    current: data.current_page,
    pageSize: 10,
    total: data.count,
    onChange: (page, pageSize) => {
      fetchUser(page)
    },
    showSizeChanger: false,
  }

  const fetchUser = async (page = null) => {
    try {
      setLoading(true)
      let params = {
        page: page || 1,
      }
      let res = await AdminUserService.getUser(params)
      let { status, data } = res.data
      if (status === 200) {
        setData(data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Warning',
      content: `Bạn có chắc chắn muốn xóa user ${record.name}?`,
      onOk: onDelete,
    })
  }

  const onDelete = async (record) => {
    try {
      setLoading(true)
      let res = await AdminUserService.deleteUser(record._id)
      if (res.data.status === 200) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      await fetchUser()
    }
  }

  return (
    <>
      <AdminHeader title="Quản lý người dùng" />
      <div className={styles.tableWrapper}>
        <Table
          bordered
          size="small"
          loading={{
            spinning: loading,
            tip: 'Loading...',
            delay: 100,
          }}
          dataSource={data._user}
          pagination={false}
          rowKey={(record) => record._id}
        >
          <Table.Column
            title="Tên người dùng"
            className={styles.inline}
            width={'25%'}
            render={(v, record, i) => record.name}
          />
          <Table.Column className={styles.inline} title="Email" render={(v, record, i) => record.email} />
          <Table.Column
            title="Số điện thoại"
            width={'120px'}
            className={styles.inline}
            render={(v, record, i) => record.phone}
          />
          <Table.Column title="Role" width={'80px'} render={(v, record, i) => record.role} />
          <Table.Column
            title="Ngày khởi tạo"
            render={(v, record, i) => (
              <span style={{ display: 'block', width: 150 }}>{record.createdAt.substring(0, 10)}</span>
            )}
          />
          <Table.Column
            title=""
            width={'80px'}
            render={(v, record, i) => <Button onClick={() => handleDelete(record)}>Xóa</Button>}
          />
        </Table>
      </div>
      <div className={styles.pagination}>
        <CCPagination {...pagiConfig} />
      </div>
    </>
  )
}

export default AdminUser
