import CCPagination from '@/components/CCPagination'
import { makeid, number_format } from '@/helper/Common'
import AdminOrderService from '@/service/AdminService/AdminOrderService'
import { CheckCircleTwoTone, DeleteOutlined, FormOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, message } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/Admin/AdminHeader'
import MailStatusModal from '../../../components/Modal/MailStatusModal'
import UpdateOrderModal from '../../../components/Modal/UpdateOrderModal'
import { useFetch } from '../../../helper/Hook'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { useFileAction } from '../../../store/actions/file.action'
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
    onChange: (current) => {
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
  const onPreviewPDF = async (record) => {
    try {
      const resp = await AdminOrderService.previewFileOrder(record._id)
      if (resp.data?.data?.data?.length) {
        Modal.info({
          title: 'File Info',
          content: (
            <ul>
              {resp.data.data.data?.map((item, index) => (
                <li key={item.name + index}>
                  <a href={`/${item.url}`} target="blank">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          ),
          width: 500,
        })
      } else {
        message.info('Chưa có files')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const renderDate = (record) => {
    let result = dayjs(record.createdAt).format('DD/MM/YYYY HH:mm')
    return <span style={{ display: 'block', width: 120 }}>{result}</span>
  }

  const renderProduct = (val, record) => {
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

  const renderService = (val, record) => {
    let html = []
    if (record?.category) {
      html = <Tag color="#108ee9">{record?.category?.name}</Tag>
    }
    return html
  }

  const onFilter = async ({ _id, product }) => {
    let nextState = [...data?.data]
    if (_id || product) {
      if (_id) {
        nextState = nextState.filter((item) => item.id === _id)
      }
      if (product) {
        nextState = nextState.filter((item) => !!item.data[product])
      }
      console.log('nextState', nextState)
      pagiConfigs.total = nextState?.length
      setOrderData(nextState)
    }
  }
  console.log('orderData', orderData)
  return (
    <>
      <AdminHeader title="Quản lý đơn hàng" />

      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <div className={clsx(styles.filter, '')}>
            <Form onFinish={onFilter} layout="vertical">
              <Form.Item name="_id" label="Mã đơn">
                <Input />
              </Form.Item>
              <Form.Item name="product" label="Sản phẩm">
                <Select
                  allowClear
                  options={[
                    { label: 'Thành lập doanh nghiệp', value: 'create_company' },
                    { label: 'Thay đổi thông tin', value: 'change_info' },
                    { label: 'Tạm hoãn', value: 'pending' },
                    { label: 'Giải thể', value: 'dissolution' },
                  ]}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form>
          </div>
          <Table
            size="small"
            dataSource={orderData}
            loading={{
              spinning: isLoading,
              tip: 'Loading...',
              delay: 100,
            }}
            bordered
            className="table rounded"
            pagination={false}
            rowKey={(record) => record._id || makeid(9)}
            scroll={{
              x: 1500,
            }}
          >
            <Table.Column title="Mã đơn" width={210} render={(val, record) => record?._id} />

            <Table.Column
              className={styles.inline}
              title="Người đăng kí"
              width="175px"
              render={(val, record) => <span>{record?.orderOwner?.email}</span>}
            />
            <Table.Column title="Sản phẩm" render={renderProduct} width={175} />

            <Table.Column title="Dịch vụ" width={275} render={renderService} />

            <Table.Column
              width={'150px'}
              align="center"
              title="Mã hóa đơn"
              render={(val, record) => {
                const isHaveTransaction = record?.transactionId?.paymentType
                if (!isHaveTransaction) return '-'
                return record?.transactionId?.paymentCode || '-'
              }}
            />

            <Table.Column
              className={styles.inline}
              dataIndex={'fileReady'}
              title="Tệp tài liệu"
              align="center"
              width="100px"
              render={(val, record) =>
                record?.fileReady ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <LoadingOutlined spin />
              }
            />
            <Table.Column
              align="center"
              title="Thanh toán"
              width="120px"
              dataIndex=""
              render={(val, record) => {
                return record?.transactionId?.isPayment ? (
                  <Tag color="green">Đã thanh toán</Tag>
                ) : (
                  <Tag color="volcano">Chưa thanh toán</Tag>
                )
              }}
            />
            <Table.Column title="Ngày tạo" width={150} render={(val, record) => renderDate(record)} />
            <Table.Column
              className={styles.inline}
              title="Giá tiền"
              width="135px"
              render={(val, record) => <>{number_format(record?.price)} VND</>}
            />
            <Table.Column title="" width={85} render={(val, record) => renderAction(record)} />
          </Table>
        </div>

        <div className={styles.pagination}>
          {/* <CCPagination {...pagiConfigs} /> */}
          <CCPagination
            current={current}
            pageSize={10}
            total={orderData.length}
            onChange={(current) => {
              setCurrent(current)
            }}
          />
        </div>

        <UpdateOrderModal
          ref={updateModalRef}
          onUpdateOrder={onUpdateOrder}
          onUpdateStatus={onUpdateStatus}
          onPreviewPDF={onPreviewPDF}
          width={300}
        />
        <MailStatusModal ref={statusModalRef} />
      </div>
    </>
  )
}

export default AdminOrder
