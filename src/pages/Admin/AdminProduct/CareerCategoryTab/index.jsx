import { Button, Drawer, Popconfirm, Space, Table, message } from 'antd'
import { FormOutlined, MinusSquareOutlined, PlusSquareOutlined, DeleteOutlined, SearchOutlined, BarsOutlined, MoreOutlined } from '@ant-design/icons'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { useFetch } from '../../../../helper/Hook'
import React, { useEffect, useState } from 'react'
import CareerCategoryForm from './CareerCategoryForm'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'

const CareerCategoryTab = forwardRef((props, ref) => {
  const [data, setData] = useState([])
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const {
    data: careerCategory,
    isLoading: careerCategoryLoading,
    status: careerCategoryStatus,
    refetch: careerCategoryRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'careerCategory'],
    fn: () => AdminProductService.getCareerCategory(),
  })

  const { data: career } = useFetch({
    cacheName: ['adminProduct', 'career'],
    fn: () => AdminProductService.getCareer(),
  })

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
  return (
    <>
      <Table dataSource={careerCategory} loading={careerCategoryLoading} rowKey={(record) => record._uuid || record._id || Math.random()} size="small" bordered>
        <Table.Column title="ID" render={(val, record, i) => record._id} />
        <Table.Column title="Tên" render={(val, record, i) => record.name} />
        <Table.Column title="Ngày tạo" render={(val, record, i) => record.createdAt} />
        <Table.Column
          width="100px"
          render={(val, record, i) => (
            <Space>
              <Button onClick={(e) => onHandleUpdateCareerCategory(record)} icon={<FormOutlined />} />
              <Popconfirm placement="topRight" title={'Bạn có muốn xoá ?'} onConfirm={() => onCareerCateDelete(record)} okText="Yes" cancelText="No">
                <Button icon={<MinusSquareOutlined />} />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
})

export default CareerCategoryTab
