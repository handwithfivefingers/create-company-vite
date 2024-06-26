import { Button, Drawer, Popconfirm, Space, Table, message, Input } from 'antd'
import {
  FormOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
  SearchOutlined,
  BarsOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { useFetch } from '../../../../helper/Hook'
import React, { useEffect, useState } from 'react'
import CareerCategoryForm from './CareerCategoryForm'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import moment from 'moment'
import styles from './styles.module.scss'
import CCPagination from '@/components/CCPagination'

const CareerCategoryTab = forwardRef((props, ref) => {
  const [data, setData] = useState([])

  const [current, setCurrent] = useState(1)

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const {
    data: careerCategory,
    isLoading: careerCategoryLoading,
    status,
    refetch: careerCategoryRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'careerCategory'],
    fn: () => AdminProductService.getCareerCategory(),
  })

  const { data: career } = useFetch({
    cacheName: ['adminProduct', 'career'],
    fn: () => AdminProductService.getCareer(),
  })

  useEffect(() => {
    if (status === 'success' && careerCategory) {
      setData((state) => {
        let { data } = careerCategory
        let sliceData = careerCategory?.data?.slice((current - 1) * 10, (current - 1) * 10 + 10)
        return sliceData
      })
    }
  }, [current, props])

  useImperativeHandle(
    ref,
    () => ({
      addCareerCategory: () => {
        setChildModal({
          visible: true,
          width: '50%',
          component: (
            <CareerCategoryForm
              data={career}
              onFinishScreen={() => {
                careerCategoryRefetch()
                closeModal()
              }}
            />
          ),
        })
      },
    }),
    [career],
  )

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
          loading={careerCategoryLoading}
          rowKey={(record) => record._uuid || record._id || Math.random()}
          size="small"
          bordered
          // scroll={{ x: 768 }}
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
                {moment(record.createdAt).format('[Ngày] DD [Tháng] MM [Năm] YYYY')}
              </span>
            )}
          />

          <Table.Column title="ID" render={(val, record, i) => record._id} />

          <Table.Column
            width="100px"
            render={(val, record, i) => (
              <Space>
                <Button onClick={(e) => onHandleUpdateCareerCategory(record)} icon={<FormOutlined />} />
                <Popconfirm
                  placement="topRight"
                  title={'Bạn có muốn xoá ?'}
                  onConfirm={() => onCareerCateDelete(record)}
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

export default CareerCategoryTab
