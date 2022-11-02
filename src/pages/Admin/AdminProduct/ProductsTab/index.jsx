import { Button, Drawer, Popconfirm, Space, Table } from 'antd'
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
import React, { useEffect, useState, memo } from 'react'
import { number_format } from '../../../../helper/Common'
import FormProduct from './ProductForm'
import { forwardRef } from 'react'
import { useImperativeHandle } from 'react'
import styles from './styles.module.scss'
import CCPagination from '@/components/CCPagination'

const ProductsTab = forwardRef((props, ref) => {
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })
  const [current, setCurrent] = useState(1)

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

      if (res.status === 200) {
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

  const pagiConfigs = {
    current: current,
    pageSize: 10,
    total: product?.count,
    onChange: (page, pageSize) => setCurrent(page),
    showSizeChanger: false,
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <Table
          bordered
          size="small"
          loading={{
            spinning: productLoading,
            tip: 'Loading...',
            delay: 100,
          }}
          dataSource={product?._product?.slice(
            (current - 1) * pagiConfigs.pageSize,
            (current - 1) * pagiConfigs.pageSize + pagiConfigs.pageSize,
          )}
          pagination={false}
          rowKey={(record) => record._id}
        >
          <Table.Column
            width={300}
            title="Tên sản phẩm"
            render={(val, { name }, i) => (
              <span className="inline" style={{ display: 'block', width: '250px' }}>
                {name}
              </span>
            )}
          />

          <Table.Column
            title="Danh mục"
            width={250}
            render={(val, { categories }, i) =>
              categories?.map(({ name, index }) => (
                <span className="inline" style={{ display: 'block', width: '250px' }} key={[name, i, index]}>
                  {name}
                </span>
              ))
            }
          />

          <Table.Column
            title="Giá tiền"
            render={(val, { price }, i) => (
              <span className="inline" style={{ display: 'block', width: '100px' }}>{`${number_format(
                price,
              )} VND`}</span>
            )}
          />

          <Table.Column
            title=""
            width="100px"
            render={(val, record, i) => {
              return (
                <Space>
                  <Button onClick={(e) => onHandleEditProduct(record)} icon={<FormOutlined />} />
                  <Popconfirm
                    placement="topRight"
                    title={'Bạn có muốn xoá ?'}
                    onConfirm={() => deleteProducts(record)}
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

      <div className={styles.pagination}>
        <CCPagination {...pagiConfigs} />
      </div>

      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
})
export default memo(ProductsTab)
