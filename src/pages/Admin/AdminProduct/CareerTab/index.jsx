import AdminProductService from '@/service/AdminService/AdminProductService'
import { FormOutlined, MinusSquareOutlined } from '@ant-design/icons'
import { Button, Drawer, Input, message, Popconfirm, Space, Table } from 'antd'
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { useFetch } from '../../../../helper/Hook'
import CareerForm from './CarrerForm'
import styles from './styles.module.scss'
import CCPagination from '@/components/CCPagination'
const CareerTab = forwardRef((props, ref) => {
  const [current, setCurrent] = useState(1)

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })
  const {
    data: careerData,
    isLoading,
    status,
    refetch,
  } = useFetch({
    cacheName: ['adminProduct', 'career'],
    fn: () => AdminProductService.getCareer(),
  })

  useImperativeHandle(
    ref,
    () => ({
      addCareer: () => handleAddCareer(),
    }),
    [],
  )

  const handleAddCareer = () => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <CareerForm
          onFinishScreen={() => {
            refetch()
            closeModal()
          }}
        />
      ),
    })
  }

  const onCareerEdit = (record) => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <CareerForm
          data={record}
          onFinishScreen={() => {
            refetch()
            closeModal()
          }}
        />
      ),
    })
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

  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }

  const pagiConfigs = {
    current: current,
    total: careerData?.count,
    showSizeChanger: false,
    pageSize: 10,
    onChange: (current, pageSize) => setCurrent(current),
  }
  return (
    <>
      <div className={styles.tableWrapper}>
        <Table
          dataSource={
            careerData?.data?.slice(
              (current - 1) * pagiConfigs.pageSize,
              (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
            ) || []
          }
          rowKey={(record) => record._uuid || record._id}
          size="small"
          bordered
          pagination={false}
          loading={isLoading}
        >
          <Table.Column
            title="Tên ngành"
            dataIndex={'name'}
            filterSearch
            onFilter={(value, record) => record['name'].toString().toLowerCase().includes(value.toLowerCase())}
            filterDropdown={({ confirm, clearFilters, filters, prefixCls, selectedKeys, setSelectedKeys, visible }) => {
              return (
                <div style={{ padding: 8 }}>
                  <Input.Search
                    placeholder={`Search 'name'`}
                    value={selectedKeys[0]}
                    onPressEnter={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : [])
                      confirm()
                    }}
                    onSearch={(val) => {
                      setSelectedKeys(val ? [val] : [])
                      confirm()
                    }}
                    allowClear
                    className={styles.inpSearch}
                    enterButton
                  />
                </div>
              )
            }}
            render={(val, record, i) => record.name}
          />
          <Table.Column title="Mã ngành" render={(val, record, i) => record.code} />
          <Table.Column
            width={80}
            title=""
            render={(val, record, i) => (
              <Space>
                <Button onClick={(e) => onCareerEdit(record)} icon={<FormOutlined />} />
                <Popconfirm
                  placement="topRight"
                  title={'Bạn có muốn xoá ?'}
                  onConfirm={() => deleteCareer(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon={<MinusSquareOutlined />} />
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </div>

      <div className={styles.pagination}>
        <CCPagination {...pagiConfigs} className={styles.pagi} />
      </div>
      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
})
export default CareerTab
