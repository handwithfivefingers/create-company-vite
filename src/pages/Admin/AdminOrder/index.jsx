import CCPagination from '@/components/CCPagination'
import Tracking from '@/components/Tracking'
import axios from '@/config/axios'
import { makeid, number_format } from '@/helper/Common'
import AdminOrderService from '@/service/AdminService/AdminOrderService'
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons'
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
import { useQuery } from '@tanstack/react-query'

const AdminOrder = () => {
  const [loading, setLoading] = useState(false)
  const [pagiConfigs, setPagiConfigs] = useState({
    current: 1,
    pageSize: 10,
    onChange: (page, pageSize) => handleChangePage(page, pageSize),
    showSizeChanger: false,
  })

  const [childModal, setChildModal] = useState({
    visible: false,
    component: null,
    width: 0,
  })

  const formRef = useRef()
  const { data, isFetching, isLoading, status } = useQuery(
    ['adminOrder'],
    () => AdminOrderService.getOrder(),
    {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: true,
    },
  )
  useEffect(() => {
    if (status === 'success') {
      setPagiConfigs({
        ...pagiConfigs,
        total: data?.data?.data?.count,
        pagiData: data?.data?.data?._order?.slice(
          (pagiConfigs.current - 1) * pagiConfigs.pageSize,
          (pagiConfigs.current - 1) * pagiConfigs.pageSize +
            pagiConfigs.pageSize,
        ),
      })
    }
  }, [data])

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
  const handleChangePage = (current, pageSize) => {
    console.log('handleChangePage', current, pageSize)
    setPagiConfigs({
      ...pagiConfigs,
      pagiData: data?.data?.data?._order?.slice(
        (current - 1) * pageSize,
        (current - 1) * pageSize + pageSize,
      ),
      current,
      pageSize,
      total: data?.data?.data?.count,
    })
  }

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

  console.log('renderProduct', data)
  return (
    <>
      <AdminHeader
        title="Quản lý đơn hàng"
        extra={
          <Form key="filter" ref={formRef}>
            <div className={styles.searchForm}>
              <Form.Item name="company" key="company">
                <Input placeholder="Tên công ty" />
              </Form.Item>

              <Form.Item name="user" key="user">
                <Input placeholder="người dùng" />
              </Form.Item>

              <Button htmlType="submit" icon={<SearchOutlined />} />
            </div>
          </Form>
        }
      />

      <div style={{ padding: 8, background: '#fff' }}>
        <Table
          dataSource={pagiConfigs?.pagiData}
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
          />
          <Table.Column
            className={styles.inline}
            title="Người đăng kí"
            width="175px"
            render={(val, record, i) => record?.orderOwner?.email}
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
      <CCPagination
        {...pagiConfigs}
        // current={1}
        // pageSize={10}
        // total={data?.data?.data?.count}
        // onChange={(page, pageSize) => {
        //   console.log(page, pageSize)
        // }}
        // showSizeChanger={false}
      />

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
