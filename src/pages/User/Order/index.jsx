import CCPagination from '@/components/CCPagination'
import { number_format } from '@/helper/Common'
import OrderService from '@/service/UserService/OrderService'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Table, Tag, Tooltip, Popconfirm, message } from 'antd'
import clsx from 'clsx'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import styles from './styles.module.scss'
import { PAYMENT_TYPE_CODE } from '@/constant/Payment'
const UserOrder = () => {
  const { animateClass } = useOutletContext()

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState([])

  const [current, setCurrent] = useState(1)

  let navigate = useNavigate()

  useEffect(() => {
    getScreenData()
  }, [])

  const getScreenData = async () => {
    try {
      setLoading(true)
      const res = await OrderService.getOrders()
      setData(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
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
        <>
          <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
            Thành lập doanh nghiệp
          </Tag>
          - {record.category.name}
        </>
      )
    } else if (record?.data?.change_info) {
      return (
        <>
          <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
            Thay đổi thông tin
          </Tag>
          - {record.category.name}
        </>
      )
    } else if (record?.data?.pending) {
      return (
        <>
          <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
            Tạm hoãn
          </Tag>
          - {record.category.name}
        </>
      )
    } else if (record?.data?.dissolution) {
      return (
        <>
          <Tag color="#108ee9" key={[Math.random(), Math.random().toFixed(Math.random() * 10)]}>
            Giải thể
          </Tag>
          - {record.category.name}
        </>
      )
    }
  }

  const handleDeleteOrder = async (id) => {
    try {
      const resp = await OrderService.deleteOrder(id)
      console.log('resp', resp.data)
      message.success(resp.data.message)
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.message ||
        error.message ||
        'Đã có lỗi xảy ra , vui lòng liên hệ admin'
      message.error(msg)
    } finally {
      getScreenData()
    }
  }

  const pagiConfigs = {
    current: current,
    total: data?.count,
    pageSize: 10,
    onChange: (current, pageSize) => setCurrent(current),
  }

  return (
    <div className={clsx([animateClass, styles.orderWrapper])}>
      <div className="cc-scroll" style={{ backgroundColor: '#fff' }}>
        <Table
          size="small"
          bordered
          dataSource={data?.data?.slice(
            (current - 1) * pagiConfigs.pageSize,
            (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
          )}
          loading={{
            spinning: loading,
            tip: 'Loading...',
            delay: 100,
          }}
          rowKey={(record) => record._id}
          pagination={false}
        >
          <Table.Column
            align="center"
            title="Mã đơn"
            dataIndex="per_main"
            render={(val, record, i) => {
              return record._id
            }}
          />

          <Table.Column align="left" title="Dịch vụ" dataIndex="" render={renderService} width={250} />

          <Table.Column
            align="center"
            title="Giá tiền"
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
            dataIndex=""
            render={(val, record, i) => {
              return (record?.transactionId?.paymentType && PAYMENT_TYPE_CODE[record?.transactionId?.paymentType]) || '-'
            }}
          />
          <Table.Column
            align="center"
            title="Thanh toán"
            dataIndex=""
            render={(val, record, i) => {
              return record?.transactionId?.isPayment ? (
                <Tag color="green">Đã thanh toán</Tag>
              ) : (
                <Tag color="volcano">Chưa thanh toán</Tag>
              )
            }}
          />

          <Table.Column
            align="center"
            width={100}
            render={(v, record, i) => (
              <div className={styles.btnGroup}>
                {record.payment ? (
                  <Button
                    className={styles.btn}
                    onClick={() => onEditOrder(record)}
                    disabled
                    type="primary"
                    icon={<FormOutlined />}
                    sise="middle"
                  />
                ) : (
                  <>
                    <Tooltip title="Chỉnh sửa & Thanh toán" color={'blue'} placement="left">
                      <Button
                        className={styles.btn}
                        onClick={() => onEditOrder(record)}
                        type="primary"
                        icon={<FormOutlined />}
                        sise="middle"
                      />
                    </Tooltip>
                    <Popconfirm
                      placement="topRight"
                      title={'Bạn có muốn xoá ?'}
                      onConfirm={() => handleDeleteOrder(record._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </>
                )}
              </div>
            )}
          />
        </Table>
      </div>
      <div className={styles.pagination}>
        <CCPagination {...pagiConfigs} />
      </div>
    </div>
  )
}
export default UserOrder
