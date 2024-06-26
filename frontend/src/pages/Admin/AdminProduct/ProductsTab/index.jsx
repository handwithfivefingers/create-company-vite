import CCPagination from '@/components/CCPagination'
import AdminProductService from '@/service/AdminService/AdminProductService'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Drawer, Popconfirm, Space, Table, List, Tag } from 'antd'
import React, { forwardRef, memo, useState } from 'react'
import { number_format } from '../../../../helper/Common'
import { useFetch } from '../../../../helper/Hook'
import FormProduct from './ProductForm'
import styles from './styles.module.scss'

const ProductsTab = forwardRef((props, ref) => {
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })
  const [current, setCurrent] = useState(1)

  const {
    data: product,
    isLoading,
    refetch,
  } = useFetch({
    cacheName: ['adminProduct', 'product'],
    fn: () => AdminProductService.getProduct(),
  })

  const onHandleAddProduct = () => {
    setChildModal({
      visible: true,
      width: '50%',
      component: <FormProduct onFinishScreen={onFinish} />,
    })
  }

  const onHandleEditProduct = (record) => {
    if (record) {
      setChildModal({
        visible: true,
        width: '50%',
        component: <FormProduct data={record} onFinishScreen={onFinish} />,
      })
    }
  }

  const onFinish = () => {
    refetch()
    closeModal()
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
            spinning: isLoading,
            tip: 'Loading...',
            delay: 100,
          }}
          scroll={{ x: 768 }}
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

          <Table.Column title="Danh mục" width={250} render={(val, record) => <CategoryCell {...record} />} />

          <Table.Column
            title="Giá tiền"
            render={(val, { price }, i) => (
              <span className="inline" style={{ display: 'block', width: '100px' }}>{`${number_format(
                price,
              )} VND`}</span>
            )}
          />

          <Table.Column
            title={
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="dashed" onClick={onHandleAddProduct} icon={<FormOutlined />} />
              </div>
            }
            width="100px"
            render={(val, record, i) => {
              return (
                <Space>
                  <Button type="primary" onClick={(e) => onHandleEditProduct(record)} icon={<EditOutlined />} />
                  <Popconfirm
                    placement="topRight"
                    title={'Bạn có muốn xoá ?'}
                    onConfirm={() => deleteProducts(record)}
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

      <div className={styles.pagination}>
        <CCPagination {...pagiConfigs} />
      </div>

      <Drawer open={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  )
})
export default memo(ProductsTab)

const CategoryCell = ({ categoryData, parentData }) => {
  return parentData.map(({ name }) => {
    return (
      <>
        <List className="p-4" size="small">
          <Tag color="#108ee9">{name}</Tag>
          {categoryData.map(({ name: cateName }) => {
            return <List.Item>{cateName}</List.Item>
          })}
        </List>
      </>
    )
  })
}
