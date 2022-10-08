import { FormOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, message, Modal, Table, Tag, Tooltip } from 'antd'
import dateformat from 'dateformat'
import { useEffect, useState } from 'react'
import { MdCreditCard } from 'react-icons/md'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { number_format } from '@/helper/Common'
import OrderService from '@/service/UserService/OrderService'
import moment from 'moment'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { m } from 'framer-motion'
const UserOrder = () => {
  const { animateClass } = useOutletContext()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [modal, setModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const [drawer, setDrawer] = useState({
    visible: false,
    width: 0,
    data: null,
  })

  let navigate = useNavigate()

  useEffect(() => {
    getScreenData()
  }, [])

  const getScreenData = async () => {
    try {
      setLoading(true)
      let res = await OrderService.getOrders()

      if (res.data.status === 200) {
        setData(res.data.data)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = (record) => {
    const date = new Date()
    var createDate = dateformat(date, 'yyyymmddHHmmss')
    var orderId = dateformat(date, 'HHmmss')

    let params = {
      createDate,
      orderId,
      amount: +record?.price * 100,
      orderInfo: record?._id,
    }

    return paymentService(params)
  }

  const paymentService = async (params) => {
    setLoading(true)
    try {
      const res = await OrderService.Payment(params)
      if (res.status === 200) {
        window.open(res.data.url)
      }
    } catch (err) {
      console.log(err)
      message.error('something was wrong')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setModal({
      ...modal,
      visible: false,
    })
    setDrawer((draw) => ({ ...draw, visible: false }))
  }

  const onEditOrder = (record) => {
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


  const renderService = (val, record, i) => {
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
  return (
    <m.div className={clsx(['cc-scroll', animateClass])} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Table
        size="small"
        bordered
        dataSource={data}
        loading={{
          spinning: loading,
          tip: 'Loading...',
          delay: 100,
        }}
        rowKey={(record) => record._id}
        scroll={{ x: 1000 }}
      >
        <Table.Column
          align="center"
          title="Mã đơn hàng"
          dataIndex="per_main"
          render={(val, record, i) => {
            return record._id
          }}
        />
        <Table.Column
          align="center"
          title="Người đăng kí"
          render={(val, record, i) => {
            return record?.orderOwner.name
          }}
        />

        <Table.Column width="200px" align="center" title="Dịch vụ" dataIndex="" render={renderService} />

        <Table.Column
          align="center"
          title="Giá tiền"
          render={(val, record, i) => {
            return <>{number_format(record?.price)} VND</>
          }}
        />
        <Table.Column
          align="center"
          title="Ngày tạo"
          render={(val, record, i) => {
            return <>{moment(record.createdAt).format('HH:mm DD-MM-YYYY')}</>
          }}
        />
        <Table.Column
          align="center"
          title="Thanh toán"
          dataIndex=""
          render={(val, record, i) => {
            return record?.payment === 1 ? <Tag color="green">Đã thanh toán</Tag> : <Tag color="volcano">Chưa thanh toán</Tag>
          }}
        />

        <Table.Column
          align="center"
          width={88}
          render={(v, record, i) => (
            <div className={styles.btnGroup}>
              <Tooltip title="Chỉnh sửa" color={'blue'}>
                <Button size="large" type="primary" shape="circle" onClick={() => onEditOrder(record)}>
                  <FormOutlined />
                </Button>
              </Tooltip>

              <Tooltip title="Thanh toán" color={'blue'}>
                <Button size="large" type="primary" shape="circle" disabled={record.payment} onClick={() => handlePurchase(record)}>
                  <MdCreditCard />
                </Button>
              </Tooltip>
            </div>
          )}
        />
      </Table>

      <Modal visible={modal.visible} footer={null} bodyStyle={null} width={modal.width} onCancel={() => closeModal()}>
        {modal.component}
      </Modal>
    </m.div>
  )
}
export default UserOrder
