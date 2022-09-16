import { Button, Drawer, Popconfirm, Space, Table } from 'antd'
import { FormOutlined, MinusSquareOutlined, PlusSquareOutlined, DeleteOutlined, SearchOutlined, BarsOutlined, MoreOutlined } from '@ant-design/icons'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { useFetch } from '../../../../helper/Hook'
import React, { useEffect, useState } from 'react'
import { number_format } from '../../../../helper/Common'
import CareerCategory from '../CareerCategoryTab/CareerCategoryForm'
import CareerForm from './CarrerForm'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { useMemo } from 'react'

const CareerTab = forwardRef((props, ref) => {
  const [career, setCareer] = useState([])
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })
  const {
    data: careerData,
    // isLoading: careerLoading,
    // status: careerStatus,
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

  const filterMemo = useMemo(() => {
    return careerData?.map((item) => ({
      text: item.name,
      value: item._id,
    }))
  }, [careerData])

  console.log('rendered')
  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }

  return (
    <>
      <Table dataSource={careerData} rowKey={(record) => record._uuid || record._id} size="small" bordered>
        <Table.Column
          title="Tên ngành"
          render={(val, record, i) => record.name}
          filterSearch
          onFilter={(value, record) => record._id.indexOf(value) === 0}
          filters={filterMemo}
          filterDropdown={(filterProps) => {
            console.log(filterProps)
            return <div></div>
          }}
        />
        <Table.Column title="Mã ngành" width={'25%'} render={(val, record, i) => record.code} />
        <Table.Column
          width="100px"
          title=""
          render={(val, record, i) => (
            <Space>
              <Button onClick={(e) => onCareerEdit(record)} icon={<FormOutlined />} />
              <Button onClick={(e) => deleteCareer(record)} icon={<MinusSquareOutlined />} />
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
export default CareerTab
