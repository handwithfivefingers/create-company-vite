import { Button, Drawer, Popconfirm, Space, Table } from 'antd'
import { FormOutlined, MinusSquareOutlined, PlusSquareOutlined, DeleteOutlined, SearchOutlined, BarsOutlined, MoreOutlined } from '@ant-design/icons'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { useFetch } from '../../../../helper/Hook'
import React, { useEffect, useState, memo } from 'react'
import { number_format } from '../../../../helper/Common'
import FormProduct from './ProductForm'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'

const ProductsTab = forwardRef((props, ref) => {
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  const {
    data: product,
    isLoading: productLoading,
    status: productStatus,
    refetch,
  } = useFetch({
    cacheName: ['adminProduct', 'product'],
    fn: () => AdminProductService.getProduct(),
  })

  useImperativeHandle(
    ref,
    () => ({
      addProduct: () => onHandleAddProduct(product),
    }),
    [product],
  )

  const onHandleAddProduct = (prod) => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <FormProduct
          onFinishScreen={() => {
            refetch()
            closeModal()
          }}
        />
      ),
    })
  }

  const onHandleEditProduct = (record) => {
    if (record) {
      setChildModal({
        visible: true,
        width: '50%',
        component: (
          <FormProduct
            data={record}
            onFinishScreen={() => {
              refetch()
              closeModal()
            }}
          />
        ),
      })
    }
  }

  const deleteProducts = async (record) => {
    try {
      let res = await AdminProductService.deleteProduct(record)

      if (res.data.status === 200) {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
      message.error('something went wrong')
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
  
  return (
    <>
      <Table
        loading={{
          spinning: productLoading,
          tip: 'Loading...',
          delay: 100,
        }}
        bordered
        dataSource={product}
        pagination={false}
        rowKey={(record) => record._id}
        size="small"
      >
        <Table.Column title="Tên sản phẩm" render={(val, { name }, i) => name} />

        <Table.Column title="Danh mục" render={(val, { categories }, i) => categories?.map(({ name }) => name)} />

        <Table.Column title="Giá tiền" width={'25%'} render={(val, { price }, i) => `${number_format(price)} VND`} />

        <Table.Column
          title=""
          width="100px"
          render={(val, record, i) => {
            return (
              <Space>
                <Button onClick={(e) => onHandleEditProduct(record)} icon={<FormOutlined />} />
                <Popconfirm placement="topRight" title={'Bạn có muốn xoá ?'} onConfirm={() => deleteProducts(record)} okText="Yes" cancelText="No">
                  <Button icon={<MinusSquareOutlined />} />
                </Popconfirm>
              </Space>
            )
          }}
        />
      </Table>

      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
})
export default memo(ProductsTab)
