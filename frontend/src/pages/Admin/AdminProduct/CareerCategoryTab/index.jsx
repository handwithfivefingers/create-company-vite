import CCPagination from '@/components/CCPagination'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { FormOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Drawer, Input, message, Popconfirm, Space, Table } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useFetch } from '../../../../helper/Hook'
import CareerCategoryForm from './CareerCategoryForm'
import styles from './styles.module.scss'

const CareerCategoryTab = (props) => {
  const [current, setCurrent] = useState(1)

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const {
    data: careerCategory,
    isLoading,
    refetch: careerCategoryRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'careerCategory'],
    fn: () => AdminProductService.getCareerCategory(),
  })

  const { data: career } = useFetch({
    cacheName: ['adminProduct', 'career'],
    fn: () => AdminProductService.getCareer(),
  })

  const addCareerCategory = () => {
    setChildModal({
      visible: true,
      width: '50%',
      component: <CareerCategoryForm data={career} onFinishScreen={onFinish} />,
    })
  }

  const onFinish = () => {
    careerCategoryRefetch()
    closeModal()
  }

  /**
   *
   * @param {*} record
   * @desc Open Modal CareerCategory to Edit
   */
  const onHandleUpdateCareerCategory = (record) => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <CareerCategoryForm
          data={career}
          name={record.name}
          id={record._id}
          onFinishScreen={() => {
            careerCategoryRefetch()
            closeModal()
          }}
        />
      ),
    })
  }

  const onCareerCateDelete = async ({ _id }) => {
    try {
      let res = await AdminProductService.deleteCareerCategory(_id)
      message.success(res.data.message)
    } catch (error) {
      console.log(error)
    } finally {
      careerCategoryRefetch()
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
    showSizeChanger: false,
    pageSize: 10,
    total: careerCategory?.count,
    onChange: (current) => setCurrent(current),
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <Table
          dataSource={careerCategory?.data?.slice(
            (current - 1) * pagiConfigs.pageSize,
            (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
          )}
          loading={isLoading}
          rowKey={(record) => record._uuid || record._id || Math.random()}
          size="small"
          bordered
          scroll={{
            x: 500,
          }}
          pagination={false}
        >
          <Table.Column
            width={250}
            title="Tên"
            render={(val, record, i) => record.name}
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
                    enterButton
                    className={styles.inpSearch}
                  />
                </div>
              )
            }}
          />

          <Table.Column
            title="Ngày tạo"
            render={(val, record, i) => (
              <span style={{ width: '200px', display: 'block' }}>
                {moment(record.createdAt).format('DD/MM/YYYY')}
              </span>
            )}
          />

          <Table.Column
            title={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="dashed" onClick={addCareerCategory} icon={<FormOutlined />} />
              </div>
            }
            width="100px"
            render={(val, record, i) => (
              <Space>
                <Button type="primary" onClick={(e) => onHandleUpdateCareerCategory(record)} icon={<EditOutlined />} />
                <Popconfirm
                  placement="topRight"
                  title={'Bạn có muốn xoá ?'}
                  onConfirm={() => onCareerCateDelete(record)}
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
      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
}

export default CareerCategoryTab
