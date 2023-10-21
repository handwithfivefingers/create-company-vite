import CCPagination from '@/components/CCPagination'
import { makeid, number_format } from '@/helper/Common'
import AdminOrderService from '@/service/AdminService/AdminOrderService'
import { CheckCircleTwoTone, DeleteOutlined, FormOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Popconfirm, Space, Table, Tag, message, notification } from 'antd'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/Admin/AdminHeader'
import MailStatusModal from '../../../components/Modal/MailStatusModal'
import UpdateOrderModal from '../../../components/Modal/UpdateOrderModal'
import { useFetch } from '../../../helper/Hook'
import styles from './styles.module.scss'
const AdminOrder = () => {
  const [orderData, setOrderData] = useState([])
  const [current, setCurrent] = useState(1)
  const updateModalRef = useRef()
  const statusModalRef = useRef()
  const navigate = useNavigate()

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: ['adminOrder'],
    fn: () => AdminOrderService.getOrder(),
  })

  const pagiConfigs = {
    current: current,
    total: data?.count,
    pageSize: 10,
    onChange: (current, pageSize) => {
      setCurrent(current)
    },
  }

  useEffect(() => {
    if (status === 'success' && data) {
      const nextState = data?.data?.slice(
        (current - 1) * pagiConfigs.pageSize,
        (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
      )
      setOrderData(nextState)
    }
  }, [current, data])

  const handleDeleteOrder = async (id) => {
    try {
      let res = await AdminOrderService.deleteOrder(id)
      if (res.data.status === 200) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      refetch()
    }
  }

  const handleSetting = (record) => {
    updateModalRef.current.setData(record)
    updateModalRef.current.openModal()
  }

  const renderAction = (record) => {
    let xhtml = null

    xhtml = (
      <Space>
        <Button type="primary" onClick={() => handleSetting(record)} disabled={!record?.data} icon={<FormOutlined />} />
        <Popconfirm
          placement="topRight"
          title={'Bạn có muốn xoá ?'}
          onConfirm={() => handleDeleteOrder(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      </Space>
    )
    return xhtml
  }

  const onUpdateOrder = (record) => {
    let { data } = record
    let url = null
    for (let props in data) {
      if (props === 'pending') {
        url = 'tam-ngung'
      } else if (props === 'change_info') {
        url = 'thay-doi-thong-tin'
      } else if (props === 'dissolution') {
        url = 'giai-the'
      } else if (props === 'create_company') {
        url = 'thanh-lap-doanh-nghiep'
      }
    }
    navigate(`/user/san-pham/${url}`, { state: { ...record } })
  }

  const onUpdateStatus = (record) => {
    // console.log('record', record)
    statusModalRef.current.setData(record)
    statusModalRef.current.openModal()
  }
  const onPreviewPDF = (record) => {
    notification.info({ message: 'Chức năng đang phát triển' })
  }

  const renderDate = (record) => {
    let result = moment(record.createdAt).format('DD/MM/YYYY HH:mm')
    return <span style={{ display: 'block', width: 120 }}>{result}</span>
  }

  const renderProduct = (val, record, i) => {
    if (record?.data?.create_company) {
      return (
        <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
          Thành lập doanh nghiệp
        </Tag>
      )
    } else if (record?.data?.change_info) {
      return (
        <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
          Thay đổi thông tin
        </Tag>
      )
    } else if (record?.data?.pending) {
      return (
        <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
          Tạm hoãn
        </Tag>
      )
    } else if (record?.data?.dissolution) {
      return (
        <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
          Giải thể
        </Tag>
      )
    }
  }

  const handleSearch = (selectedKeys = null, confirm, dataIndex = null) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn([...dataIndex])
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input.Search
          placeholder={`Tìm kiếm`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          onSearch={() => handleSearch(selectedKeys, confirm, dataIndex)}
          allowClear
          className={styles.inpSearch}
          enterButton
        />
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      let [name1, name2] = dataIndex
      let label = record?.[name1]
      if (name2) label = label?.[name2]
      return label?.toString().toLowerCase().includes(value.toLowerCase())
    },
  })

  const renderService = (val, record, i) => {
    let html = []
    if (record?.category) {
      html = <Tag color="#108ee9">{record?.category?.name}</Tag>
    }
    return html
  }
  return (
    <>
      <AdminHeader title="Quản lý đơn hàng" />

      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <Table
            size="small"
            dataSource={orderData}
            loading={{
              spinning: isLoading,
              tip: 'Loading...',
              delay: 100,
            }}
            bordered
            className="table"
            pagination={false}
            rowKey={(record) => record._id || makeid(9)}
            scroll={{
              x: 1500,
              y: 50 * 10,
            }}
          >
            <Table.Column
              title="Mã đơn"
              width={210}
              render={(val, record, i) => record?._id}
              {...getColumnSearchProps(['_id'])}
            />
            <Table.Column
              className={styles.inline}
              title="Người đăng kí"
              width="175px"
              render={(val, record, i) => <span>{record?.orderOwner?.email}</span>}
              {...getColumnSearchProps(['orderOwner', 'email'])}
            />
            <Table.Column title="Sản phẩm" render={renderProduct} width={175} />
            
            <Table.Column title="Dịch vụ" width={275} render={renderService} />

            <Table.Column
              width={'150px'}
              align="center"
              title="Mã hóa đơn"
              render={(val, record, i) => {
                const isHaveTransaction = record?.transactionId?.paymentType
                if (!isHaveTransaction) return '-'
                return record?.transactionId?.paymentCode || '-'
              }}
            />

            <Table.Column
              className={styles.inline}
              title="Tệp tài liệu"
              align='center'
              width="100px"
              render={(val, record, i) =>
                record?.fileReady ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <LoadingOutlined spin />
              }
            />
            <Table.Column
              align="center"
              title="Thanh toán"
              width="120px"
              dataIndex=""
              render={(val, record, i) => {
                return record?.transactionId?.isPayment ? (
                  <Tag color="green">Đã thanh toán</Tag>
                ) : (
                  <Tag color="volcano">Chưa thanh toán</Tag>
                )
              }}
            />
            <Table.Column title="Ngày tạo" width={150} render={(val, record, i) => renderDate(record)} />
            <Table.Column
              className={styles.inline}
              title="Giá tiền"
              width="135px"
              render={(val, record, i) => <>{number_format(record?.price)} VND</>}
            />
            <Table.Column title="" width={85} render={(val, record, i) => renderAction(record)} />
          </Table>
        </div>

        <div className={styles.pagination}>
          <CCPagination {...pagiConfigs} />
        </div>

        <UpdateOrderModal
          ref={updateModalRef}
          onUpdateOrder={onUpdateOrder}
          onUpdateStatus={onUpdateStatus}
          onPreviewPDF={onPreviewPDF}
        />
        <MailStatusModal ref={statusModalRef} />
      </div>
    </>
  )
}

export default AdminOrder
