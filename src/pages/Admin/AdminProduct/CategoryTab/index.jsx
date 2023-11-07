import AdminProductService from '@/service/AdminService/AdminProductService'
import { FormOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Drawer, message, Popconfirm, Space, Table } from 'antd'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { number_format } from '../../../../helper/Common'
import { useFetch } from '../../../../helper/Hook'
import NewCategory from './NewCategory'
import styles from './styles.module.scss'

const CategoryTab = (props) => {
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const {
    data: category,
    isLoading,
    refetch,
  } = useFetch({
    cacheName: ['adminProduct', 'category'],
    fn: () => AdminProductService.getCategory(),
  })

  const createCategory = () => {
    setChildModal({
      visible: true,
      width: '50%',
      component: <NewCategory category={category} onFinishScreen={onFinish} />,
    })
  }

  const onFinish = () => {
    refetch()
    closeModal()
  }

  const onHandleDeleteCategory = async ({ _id }) => {
    try {
      let res = await AdminProductService.deleteCate(_id)
      if (res.status === 200) {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
      message.error(res.response.data?.message || res.message)
    } finally {
      refetch()
    }
  }

  const onHandleUpdateCategory = (record) => {
    setChildModal({
      visible: true,
      width: '50%',
      component: <NewCategory data={record} category={category} onFinishScreen={onFinish} />,
    })
  }

  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <Table
          loading={{
            spinning: isLoading,
            tip: 'Loading...',
            delay: 100,
          }}
          scroll={{
            x: 800,
          }}
          dataSource={category}
          pagination={false}
          size="small"
          bordered
          rowKey={(record) => record._id}
        >
          <Table.Column title="Danh mục" render={(val, record, index) => record.name} />
          <Table.Column
            title="Giá"
            width={'25%'}
            render={(val, record, index) => {
              return `${number_format(record.price)} VND`
            }}
          />
          <Table.Column title="Loại" width="100px" render={(val, record, index) => record.type} />
          <Table.Column
            title={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="dashed" onClick={createCategory} icon={<FormOutlined />} />
              </div>
            }
            width="100px"
            render={(val, record, i) => {
              return (
                <Space>
                  <Button type="primary" onClick={(e) => onHandleUpdateCategory(record)} icon={<EditOutlined />} />

                  <Popconfirm
                    placement="topRight"
                    title={'Bạn có muốn xoá ?'}
                    onConfirm={() => onHandleDeleteCategory(record)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              )
            }}
          />
        </Table>
      </div>
      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
}

export default CategoryTab
