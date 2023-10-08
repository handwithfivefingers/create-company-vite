import CCPagination from '@/components/CCPagination'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { FormOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, message, Popconfirm, Space, Table } from 'antd'
import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import { useFetch } from '../../../../helper/Hook'
import CareerForm from './CarrerForm'
import styles from './styles.module.scss'
const CareerTab = forwardRef((props, ref) => {
  const [current, setCurrent] = useState(1)
  const modalRef = useRef()
  const [dataFilter, setDataFilter] = useState([])
  const {
    data: careerData,
    isLoading,
    refetch,
  } = useFetch({
    cacheName: ['adminProduct', 'career'],
    fn: () => AdminProductService.getCareer(),
  })

  const handleAddCareer = () => {
    modalRef.current.onToggleModal()
    modalRef.current.onSetComponent(<CareerForm onFinishScreen={onFinish} />)
  }

  const onFinish = () => {
    refetch()
    modalRef.current.closeModal()
  }

  const onCareerEdit = (record) => {
    modalRef.current.onToggleModal()
    modalRef.current.onSetComponent(<CareerForm onFinishScreen={onFinish} data={record} />)
  }

  const deleteCareer = async ({ _id }) => {
    try {
      let res = await AdminProductService.deleteCareer(_id)
      if (res.data.status === 200) {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      refetch()
    }
  }
  const onHandleFilter = ({ name }) => {
    if (!name) {
      setDataFilter(careerData?.data)
      // setCurrent
    } else {
      const nextData = careerData?.data.filter(
        ({ name: itemName, code }) => itemName?.toLowerCase().includes(name?.toLowerCase()) || code.includes(name),
      )
      setDataFilter(nextData)
      setCurrent(1)
    }
  }

  useEffect(() => {
    if (careerData?.data) {
      setDataFilter(careerData.data)
    }
  }, [isLoading])

  const pagiConfigs = {
    current: current,
    total: dataFilter?.length,
    showSizeChanger: false,
    pageSize: 10,
    onChange: (current, pageSize) => setCurrent(current),
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <div className={styles.filter}>
          <FilterTab onHandleFilter={onHandleFilter} />
        </div>

        <Table
          dataSource={
            dataFilter?.slice(
              (current - 1) * pagiConfigs.pageSize,
              (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
            ) || []
          }
          scroll={{
            x: 500,
            y: 50 * 8,
          }}
          rowKey={(record) => record._id}
          size="small"
          bordered
          pagination={false}
          loading={isLoading}
        >
          <Table.Column title="Tên ngành" dataIndex={'name'} />
          <Table.Column title="Mã ngành" dataIndex={'code'} />
          <Table.Column
            width={100}
            title={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="dashed" onClick={handleAddCareer} icon={<FormOutlined />} />
              </div>
            }
            render={(val, record, i) => (
              <Space>
                <Button type="primary" onClick={(e) => onCareerEdit(record)} icon={<EditOutlined />} />
                <Popconfirm
                  placement="topRight"
                  title={'Bạn có muốn xoá ?'}
                  onConfirm={() => deleteCareer(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </div>

      <div className={styles.pagination}>
        <CCPagination {...pagiConfigs} className={styles.pagi} />
      </div>
      <CareerModal ref={modalRef} />
    </>
  )
})

export default CareerTab

const CareerModal = forwardRef((props, ref) => {
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })
  useImperativeHandle(
    ref,
    () => {
      return {
        onToggleModal,
        onSetComponent,
        closeModal,
      }
    },
    [],
  )

  const onToggleModal = () => {
    setChildModal((prev) => ({
      ...prev,
      visible: !prev.visible,
      width: '50%',
    }))
  }
  const onSetComponent = (comp) => {
    setChildModal((prev) => ({ ...prev, component: comp }))
  }
  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }
  return (
    <Drawer open={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
      {childModal.component}
    </Drawer>
  )
})
const FilterTab = ({ onHandleFilter }) => {
  const [form] = Form.useForm()
  const onFinish = (val) => {
    console.log('val', val)
    onHandleFilter(val)
  }
  return (
    <Form name="form" form={form} className={styles.filterForm} onFinish={onFinish}>
      <Form.Item name="name">
        <Input placeHolder="Tên ngành - Mã ngành" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Tìm kiếm</Button>
      </Form.Item>
    </Form>
  )
}
