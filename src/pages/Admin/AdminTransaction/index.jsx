import AdminHeader from '@/components/Admin/AdminHeader'
import { PAYMENT_TYPE_CODE } from '@/constant/Payment'
import { number_format } from '@/helper/Common'
import { Button, DatePicker, Form, Input, Modal, Space, Table, Tag, Spin, message } from 'antd'
import moment from 'moment'
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import AdminTransactionService from '@/service/AdminService/AdminTransactionService'
import styles from './styles.module.scss'

const TransactionModal = lazy(() => import('@/components/Modal/UpdateTransactionModal'))
function AdminTransaction() {
  const [loading, setLoading] = useState(false)
  const dataRef = useRef([])
  const modalRef = useRef()
  useEffect(() => {
    getScreenData()
  }, [])

  const getScreenData = async (query = {}) => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams(query).toString()
      const resp = await AdminTransactionService.getTransaction(queryParams)
      const { data } = resp.data
      dataRef.current = data
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const renderService = (val, record, i) => {
    if (record?.data?.create_company) {
      return (
        <>
          <Tag color="#108ee9">Thành lập doanh nghiệp</Tag>
        </>
      )
    } else if (record?.data?.change_info) {
      return (
        <>
          <Tag color="#108ee9">Thay đổi thông tin</Tag>
        </>
      )
    } else if (record?.data?.pending) {
      return (
        <>
          <Tag color="#108ee9">Tạm hoãn</Tag>
        </>
      )
    } else if (record?.data?.dissolution) {
      return (
        <>
          <Tag color="#108ee9">Giải thể</Tag>
        </>
      )
    }
  }

  const onFilter = (value) => {
    getScreenData(value)
  }

  const onDoubleClick = (record) => {
    console.log('record', record)
    modalRef.current.openModal()
    modalRef.current.onSetData(record)
  }

  const onFinishScreen = async (value) => {
    // console.log('finish', value)
    try {
      const data = await AdminTransactionService.updateTransaction(value)
      message.success('Cập nhật thành công')
      modalRef.current?.closeModal()
      getScreenData()
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.repsonse?.message ||
        error?.message ||
        'Đã có lỗi xảy ra, vui lòng liên hệ admin'
      message.error(msg)
    }
  }

  return (
    <>
      <AdminHeader title="Quản lý Hóa đơn" />
      <div className={styles.contentWrapper}>
        <Form onFinish={onFilter}>
          <Space>
            <Form.Item name="paymentCode">
              <Input placeholder="Mã hóa đơn" />
            </Form.Item>
            <Form.Item name="date">
              <DatePicker.RangePicker placeholder={['Từ ngày ...', '...Đến ngày']} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Space>
        </Form>
        <div className={styles.tableWrapper}>
          <Table
            size="small"
            bordered
            dataSource={dataRef.current}
            loading={{
              spinning: loading,
              tip: 'Loading...',
              delay: 100,
            }}
            rowKey={(record) => record._id}
            pagination={false}
            onRow={(record) => {
              return {
                onDoubleClick: () => onDoubleClick(record),
              }
            }}
          >
            <Table.Column align="center" title="Mã đơn" dataIndex="paymentCode" />

            <Table.Column align="left" title="Dịch vụ" dataIndex="" render={renderService} width={250} />

            <Table.Column
              align="center"
              title="Giá tiền"
              dataIndex="price"
              render={(val, record, i) => {
                return <span style={{ display: 'block', width: '150px' }}>{number_format(record?.price)} VND</span>
              }}
            />

            <Table.Column
              align="center"
              title="Ngày tạo"
              render={(val, record, i) => {
                return (
                  <span style={{ display: 'block', width: '150px' }}>
                    {moment(record.createdAt).format('DD/MM/YYYY HH:mm')}
                  </span>
                )
              }}
            />
            <Table.Column
              align="center"
              title="Cổng thanh toán"
              dataIndex="paymentType"
              render={(val, record, i) => PAYMENT_TYPE_CODE[val]}
            />
            <Table.Column
              align="center"
              title="Thanh toán"
              dataIndex="isPayment"
              render={(val, record, i) => {
                return val ? <Tag color="green">Đã thanh toán</Tag> : <Tag color="volcano">Chưa thanh toán</Tag>
              }}
            />
          </Table>

          <Suspense fallback={<Spin />}>
            <TransactionModal ref={modalRef} onFinishScreen={onFinishScreen} />
          </Suspense>
        </div>

        <div className={styles.pagination}>{/* <CCPagination {...pagiConfigs} /> */}</div>
      </div>
    </>
  )
}

export default AdminTransaction
