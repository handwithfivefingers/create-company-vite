import { Button, Drawer, Popconfirm, Space, Table, message } from 'antd'
import { FormOutlined, MinusSquareOutlined } from '@ant-design/icons'
import AdminProductService from '@/service/AdminService/AdminProductService'
import NewCategory from './NewCategory'
import { useFetch } from '../../../../helper/Hook'
import React, { useEffect, useState } from 'react'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import { number_format } from '../../../../helper/Common'
import styles from './styles.module.scss'
const CategoryTab = forwardRef((props, ref) => {
  const [cateData, setCateData] = useState([])

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const {
    data: category,
    isLoading: categoryLoading,
    status: categoryStatus,
    refetch: cateRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'category'],
    fn: () => AdminProductService.getCategory(),
  })

  useImperativeHandle(
    ref,
    () => ({
      addCategory: () => createCategory(category),
    }),
    [category],
  )

  const createCategory = (cate) => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <NewCategory
          category={cate}
          onFinishScreen={() => {
            cateRefetch()
            closeModal()
          }}
        />
      ),
    })
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
      cateRefetch()
    }
  }

  const onHandleUpdateCategory = (record) => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <NewCategory
          data={record}
          category={category}
          onFinishScreen={() => {
            cateRefetch()
            closeModal()
          }}
        />
      ),
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
            spinning: categoryLoading,
            tip: 'Loading...',
            delay: 100,
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
            title=""
            width="100px"
            render={(val, record, i) => {
              return (
                <Space>
                  <Button onClick={(e) => onHandleUpdateCategory(record)} icon={<FormOutlined />} />

                  <Popconfirm
                    placement="topRight"
                    title={'Bạn có muốn xoá ?'}
                    onConfirm={() => onHandleDeleteCategory(record)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<MinusSquareOutlined />} />
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
})

export default CategoryTab
