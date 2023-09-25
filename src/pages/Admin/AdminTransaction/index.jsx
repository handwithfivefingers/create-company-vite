import AdminHeader from '@/components/Admin/AdminHeader'
import { PAYMENT_TYPE_CODE } from '@/constant/Payment'
import { number_format } from '@/helper/Common'
import { Button, DatePicker, Form, Input, Space, Table, Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import AdminTransactionService from '@/service/AdminService/AdminTransactionService'
import styles from './styles.module.scss'

function AdminTransaction() {
  const [loading, setLoading] = useState(false)
  const dataRef = useRef([])

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
              <Button type="primary" htmlType='submit'>Tìm kiếm</Button>
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
                    {moment(record.createdAt).format('HH:mm DD-MM-YYYY')}
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
        </div>

        <div className={styles.pagination}>{/* <CCPagination {...pagiConfigs} /> */}</div>
        {/* 
        {childModal.visible && (
          <Modal footer={null} onCancel={() => onClose()} visible={childModal.visible} width={childModal.width}>
            {childModal.component}
          </Modal>
        )} */}
      </div>
    </>
  )
}

export default AdminTransaction
