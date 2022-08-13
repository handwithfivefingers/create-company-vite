import CCPagination from '@/components/CCPagination'
import Tracking from '@/components/Tracking'
import axios from '@/config/axios'
import { makeid, number_format } from '@/helper/Common'
import AdminOrderService from '@/service/AdminService/AdminOrderService'
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  const formRef = useRef()

  const { data, isLoading, status, refetch } = useFetch({
    cacheName: ['adminOrder'],
    fn: () => AdminOrderService.getOrder(),
  })

  const pagiConfigs = {
    current: current,
    total: data?.count,
    showSizeChanger: false,
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

  // const handlePayment = (record) => {
  //   // console.log(record);
  //   setLoading(true)
  //   axios
  //     .get(`/api/payment/${record._id}`)
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         window.location.href = res.data.url
  //       }
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(setLoading(false))
  // }

  const onHandleDelete = (record) => {
    // console.log("delete", record);
    Modal.confirm({
      title: 'Xác thực',
      content: 'Bạn có muốn xóa ?',
      async onOk() {
        return await handleDeleteOrder(record._id)
      },
    })
  }

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
      let { current_page } = data
      fetchOrders(current_page)
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
        <Button>
          <Link to={`/admin/order/${record?._id}`}>
            <FormOutlined />
          </Link>
        </Button>
        <Button
          onClick={() => onHandleDelete(record)}
          icon={<DeleteOutlined />}
        />
      </Space>
    )
    return xhtml
  }

  const renderDate = (record) => {
    let result = moment(record.createdAt).format('HH:mm DD-MM-YYYY ')
    return result
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

  const renderProgress = (record) => {
    return (
      <Tooltip
        title={
          <>
            Step: {record?.track.step} <br />
            Status: {record?.track.status}
          </>
        }
      >
        <Button type="text" onClick={() => checkProgress(record)}>
          {record?.track.step}
        </Button>
      </Tooltip>
    )
  }

  const renderProduct = (val, record, i) => {
    return (
      <div
        key={[val, i]}
        style={{ display: 'flex', justifyContent: 'flex-start' }}
      >
        <Space wrap size={[8, 16]} align="start">
          {record?.products.map((item) => (
            <Tag color="#108ee9" key={makeid(9)}>
              {item.name}
            </Tag>
          ))}
        </Space>
      </div>
    )
  }

  const handleSearch = (selectedKeys = null, confirm, dataIndex = null) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn([...dataIndex])
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Space align="center" size={0}>
          <Button
            onClick={() => {
              setSearchText('')
              setSelectedKeys([])
              handleSearch([], confirm, [])
            }}
            icon={<CloseOutlined />}
          />
          <Input.Search
            ref={searchInput}
            placeholder={`Tìm kiếm`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onSearch={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 0, display: 'block', width: 200 }}
          />
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      let [name1, name2] = dataIndex
      let label = record?.[name1]
      if (name2) label = label?.[name2]
      return label?.toString().toLowerCase().includes(value.toLowerCase())
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
  })

  return (
    <>
      <AdminHeader title="Quản lý đơn hàng" />

      <div style={{ padding: 8, background: '#fff' }}>
        <Table
          dataSource={orderData}
          loading={{
            spinning: isLoading,
            tip: 'Loading...',
            delay: 100,
          }}
          size="small"
          bordered
          className="table"
          pagination={false}
          rowKey={(record) => record._id || makeid(9)}
          scroll={{ x: 1280 }}
          sticky={{
            offsetScroll: 8,
            offsetHeader: -8,
          }}
        >
          <Table.Column
            title="Đơn hàng"
            width="210px"
            render={(val, record, i) => record?._id}
            {...getColumnSearchProps(['_id'])}
          />
          <Table.Column
            className={styles.inline}
            title="Người đăng kí"
            width="175px"
            render={(val, record, i) => record?.orderOwner?.email}
            {...getColumnSearchProps(['orderOwner', 'email'])}
          />
          <Table.Column
            title="Sản phẩm"
            render={(val, record, i) => renderProduct(val, record, i)}
          />
          <Table.Column
            title="Giá tiền"
            width="150px"
            render={(val, record, i) => <>{number_format(record?.price)} VND</>}
          />
          <Table.Column
            title="Tiến độ"
            width="75px"
            render={(val, record, i) => renderProgress(record)}
          />
          <Table.Column
            title="Thanh toán"
            width="150px"
            render={(val, record, i) => renderTag(record)}
          />
          <Table.Column
            title="Ngày tạo"
            width="150px"
            render={(val, record, i) => renderDate(record)}
          />
          <Table.Column
            title="Thao tác"
            width="104px"
            render={(val, record, i) => renderAction(record)}
          />
        </Table>
      </div>
      <CCPagination {...pagiConfigs} />

      <Modal
        footer={null}
        onCancel={() => onClose()}
        visible={childModal.visible}
        width={childModal.width}
      >
        {childModal.component}
      </Modal>
    </>
  )
}

export default AdminOrder
