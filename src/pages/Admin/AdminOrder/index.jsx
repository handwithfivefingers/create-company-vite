import CCPagination from '@/components/CCPagination'
import Tracking from '@/components/Tracking'
import axios from '@/config/axios'
import { makeid, number_format } from '@/helper/Common'
import AdminOrderService from '@/service/AdminService/AdminOrderService'
import { DeleteOutlined, FormOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table, Tag, Tooltip, Row } from 'antd'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminHeader from '../../../components/Admin/AdminHeader'
import styles from './styles.module.scss'
import { useFetch } from '../../../helper/Hook'
const AdminOrder = () => {
  const [loading, setLoading] = useState(false)

  const [orderData, setOrderData] = useState([])

  const [childModal, setChildModal] = useState({
    visible: false,
    component: null,
    width: 0,
  })
  const [current, setCurrent] = useState(1)

  const navigate = useNavigate()
  const { data, isLoading, status, refetch } = useFetch({
    cacheName: ['adminOrder'],
    fn: () => AdminOrderService.getOrder(),
  })

  const pagiConfigs = {
    current: current,
    total: data?.count,
    pageSize: 10,
    onChange: (current, pageSize) => setCurrent(current),
  }

  useEffect(() => {
    if (status === 'success' && data) {
      setOrderData((state) => {
        let { _order } = data

        let sliceData = _order?.slice(
          (current - 1) * pagiConfigs.pageSize,
          (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
        )
        return sliceData
      })
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

  const checkProgress = (record) => {
    setChildModal({
      visible: true,
      width: '100%',
      component: (
        <Tracking
          data={record}
          onFinishScreen={(attachments, content, email) => {
            handleSendMailWithAttach(attachments, content, email)
            onClose()
          }}
        />
      ),
    })
  }

  const handleSendMailWithAttach = async (attachments, content, email) => {
    try {
      setLoading(true)

      const form = new FormData()

      attachments?.fileList?.map((item) => {
        form.append('attachments', item.originFileObj)
      })

      form.append('content', content)

      form.append('email', email)

      let res = await axios.post('/api/sendmail', form)

      let msg = res.data.message

      message.success(`${msg} -> Email: ${[res.data.info.accepted].join('')}`)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const onClose = useCallback(() => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }, [childModal])

  const renderAction = (record) => {
    let xhtml = null

    xhtml = (
      <Space>
        <Button
          type="primary"
          icon={
            <Link to={`/admin/order/${record?._id}`}>
              <EyeOutlined />
            </Link>
          }
        />
        <Button type="primary" onClick={() => handleEditRecord(record)} icon={<FormOutlined />} />
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
  const handleEditRecord = (record) => {
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
  const renderDate = (record) => {
    let result = moment(record.createdAt).format('HH:mm DD-MM-YYYY ')
    return <span style={{ display: 'block', width: 120 }}>{result}</span>
  }

  const renderTag = (record) => {
    return record?.payment === 1 ? (
      <Tag key={makeid(9)} color="green">
        Đã thanh toán
      </Tag>
    ) : (
      <Tag key={makeid(9)} color="volcano">
        Chưa thanh toán
      </Tag>
    )
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
    if (record?.products) {
      html = (
        <Row gutter={[12, 4]}>
          {record.products.map((item) => (
            <Tag color="#108ee9" key={makeid(9)}>
              {item.name}
            </Tag>
          ))}
        </Row>
      )
    }
    return html
  }
  return (
    <>
      <AdminHeader title="Quản lý đơn hàng" />

      <div className={styles.contentWrapper}>
        <div className={styles.tableWrapper}>
          <Table
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
          >
            <Table.Column
              title="Đơn hàng"
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
            <Table.Column title="Sản phẩm" render={renderProduct} />
            <Table.Column title="Dịch vụ" width={210} render={renderService} />
            <Table.Column
              className={styles.inline}
              title="Giá tiền"
              width="175px"
              render={(val, record, i) => <>{number_format(record?.price)} VND</>}
            />
            <Table.Column title="Thanh toán" width={150} render={(val, record, i) => renderTag(record)} />
            <Table.Column title="Ngày tạo" width={150} render={(val, record, i) => renderDate(record)} />
            <Table.Column title="Thao tác" width={104} render={(val, record, i) => renderAction(record)} />
          </Table>
        </div>

        <div className={styles.pagination}>
          <CCPagination {...pagiConfigs} />
        </div>

        {childModal.visible && (
          <Modal footer={null} onCancel={() => onClose()} visible={childModal.visible} width={childModal.width}>
            {childModal.component}
          </Modal>
        )}
      </div>
    </>
  )
}

export default AdminOrder
