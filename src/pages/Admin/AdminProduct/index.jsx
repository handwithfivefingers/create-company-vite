import CareerForm from '@/components/Form/CarrerForm'
import {
  FormOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
  SearchOutlined,
  BarsOutlined,
  MoreOutlined,
} from '@ant-design/icons'

import {
  Button,
  Card,
  Drawer,
  message,
  Modal,
  Space,
  Table,
  Tabs,
  PageHeader,
  Segmented,
} from 'antd'
import React, { useEffect, useState } from 'react'
import CategoryForm from '@/components/Form/CategoryForm'
import FormProduct from '@/components/Form/Product'
import axios from '@/config/axios'
import { number_format, makeid } from '@/helper/Common'
import AdminProductService from '@/service/AdminService/AdminProductService'
import CCPagination from '@/components/CCPagination'
import styles from './styles.module.scss'
import AdminHeader from '../../../components/Admin/AdminHeader'
import { useFetch } from '../../../helper/Hook'

const { TabPane } = Tabs
const AdminProduct = (props) => {
  const [data, setData] = useState([])
  const [cateData, setCateData] = useState([])
  const [loading, setLoading] = useState(false)
  const [career, setCareer] = useState([])

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })
  const {
    data: careerData,
    isLoading: careerLoading,
    status: careerStatus,
    refetch: careerRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'career'],
    fn: () => AdminProductService.getCareer(),
  })
  const {
    data: category,
    isLoading: categoryLoading,
    status: categoryStatus,
    refetch: categoryRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'category'],
    fn: () => AdminProductService.getCategory(),
  })
  const {
    data: product,
    isLoading: productLoading,
    status: productStatus,
    refetch: productRefetch,
  } = useFetch({
    cacheName: ['adminProduct', 'product'],
    fn: () => AdminProductService.getProduct(),
  })


  useEffect(() => {
    if (categoryStatus === 'success' && category) {
      setCateData(category)
    }
  }, [category])

  useEffect(() => {
    if (productStatus === 'success' && product) {

      let _data = product.map((el) => ({
        ...el,
        children: el.children.map((item) => ({
          ...item,
          _uuid: makeid(9),
        })),
      }))
      setData(_data)
      // setData(product)
    }
  }, [product])

  useEffect(() => {
    if (careerStatus === 'success' && careerData) {
      setCareer(careerData)
    }
  }, [careerData])


  // const getCareer = async () => {
  //   try {
  //     const { data } = await AdminProductService.getCareer()
  //     if (data.status === 200) {
  //       setCareer(data.data)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     message.error(data.message || data.error)
  //   }
  // }

  // const getScreenData = () => {
  //   setLoading(true)
  //   AdminProductService.getProduct()
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         let _data = res.data.data.map((el) => ({
  //           ...el,
  //           children: el.children.map((item) => ({
  //             ...item,
  //             _uuid: makeid(9),
  //           })),
  //         }))
  //         setData(_data)
  //       }
  //     })
  //     .finally(() => setLoading(false))
  // }

  // const getCateData = () => {
  //   AdminProductService.getCategory()
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         setCateData(res.data.data)
  //       }
  //     })
  //     .catch((err) => console.log(err))
  // }

  // Product

  const onHandleEdit = (record) => {
    if (record) {
      setChildModal({
        visible: true,
        width: '50%',
        component: (
          <FormProduct
            type="edit"
            data={record}
            onEventEdit={(output) => onEventEdit(output)}
            onFinishScreen={() => {
              getScreenData()
              closeModal()
            }}
          />
        ),
      })
    }
  }

  const onHandleAdd = () => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <FormProduct
          type="add"
          onEventAdd={(output) => onEventAdd(output)}
          onFinishScreen={() => {
            getScreenData()
            closeModal()
          }}
        />
      ),
    })
  }

  const onEventEdit = (params) => {
    AdminProductService.editProduct(params)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const onEventAdd = async (params) => {
    try {
      await AdminProductService.createProduct(params)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
      getScreenData()
    }
  }

  const onHandleDelete = (record) => {
    console.log(record)
    Modal.confirm({
      title: 'Bạn có chắc ?',
      content: `Muốn xóa sản phẩm ${record.name}`,
      onCancel: () => closeModal(),
      onOk: () => {
        AdminProductService.deleteProduct(record)
          .then((res) => {
            if (res.data.status === 200) {
              message.success(res.data.message)
            }
          })
          .finally(() => {
            setLoading(false)
            getScreenData()
          })
      },
    })
  }

  // Career

  const onHandleAddCareer = () => {
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <CareerForm
          onFinishScreen={(output) => {
            // getScreenData();
            addCareer(output)
            closeModal()
          }}
        />
      ),
    })
  }

  const addCareer = (val) => {
    let params = {
      name: val.career_name,
      code: val.career_code,
    }
    AdminProductService.createCareer(params)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const deleteCareer = async (record) => {
    try {
      let res = await AdminProductService.deleteCareer(record._id)
      if (res.data.status === 200) {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      getCareer()
    }
  }

  // Categories
  const onHandleCreateCategory = () => {
    // console.log("create category");
    setChildModal({
      visible: true,
      width: '50%',
      component: (
        <CategoryForm
          onFinishScreen={(output) => {
            // getScreenData();
            addCategory(output)
            closeModal()
          }}
        />
      ),
    })
  }

  const onHandleUpdateCate = (record) => {
    if (record) {
      setChildModal({
        visible: true,
        width: '50%',
        component: (
          <FormProduct
            type="edit"
            data={record}
            onEventEdit={(output) => onUpdateCate(output)}
            onFinishScreen={() => {
              getCateData()
              closeModal()
            }}
          />
        ),
      })
    }
  }

  const onUpdateCate = async (data) => {
    try {
      setLoading(true)
      await AdminProductService.updateCategories(data)
    } catch (err) {
      console.log(err)
    } finally {
      getCateData()
      setLoading(false)
    }
  }

  const addCategory = async (val) => {
    try {
      let res = await AdminProductService.createCategory(val)
      if (res.data.status === 201) {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
    } finally {
      getCateData()
    }
  }

  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    })
  }
  const renderExtra = () => {
    let xhtml = null

    xhtml = (
      <div className={styles.extraAction}>
        <Button
          type="dashed"
          onClick={onHandleAdd}
          icon={<PlusSquareOutlined />}
        >
          Thêm sản phẩm
        </Button>
        <Button
          type="dashed"
          onClick={onHandleCreateCategory}
          icon={<PlusSquareOutlined />}
        >
          Thêm danh mục
        </Button>
        <Button
          type="dashed"
          onClick={onHandleAddCareer}
          icon={<PlusSquareOutlined />}
        >
          Thêm ngành nghê
        </Button>
      </div>
    )

    return xhtml
  }
  return (
    <>
      <AdminHeader title="Template Mail" extra={renderExtra()} />

      <div style={{ padding: 8, background: '#fff' }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Danh mục" key="1">
            <Table
              loading={{
                spinning: categoryLoading,
                tip: 'Loading...',
                delay: 100,
              }}
              dataSource={cateData}
              pagination={false}
              size="small"
              bordered
              rowKey={(record) => record._id}
            >
              <Table.Column
                title="Danh mục"
                render={(val, record, index) => record.name}
              />
              <Table.Column
                title="Giá"
                width={'25%'}
                render={(val, record, index) => record.price}
              />
              <Table.Column
                title="Loại"
                width="100px"
                render={(val, record, index) => record.type}
              />
              <Table.Column
                title=""
                width="100px"
                render={(val, record, i) => {
                  return (
                    <Space>
                      <Button
                        onClick={(e) => onHandleUpdateCate(record)}
                        icon={<FormOutlined />}
                      />
                      {/* <Button onClick={(e) => onHandleDeleteProduct(record)} icon={<MinusSquareOutlined />} /> */}
                    </Space>
                  )
                }}
              />
            </Table>
          </TabPane>
          <TabPane tab="Sản phẩm" key="2">
            <Table
              loading={{
                spinning: productLoading,
                tip: 'Loading...',
                delay: 100,
              }}
              bordered
              dataSource={data}
              pagination={false}
              rowKey={(record) => record._uuid || record._id}
              size="small"
            >
              <Table.Column
                title="Tên sản phẩm"
                render={(val, record, i) => record?.name}
              />
              <Table.Column
                title="Giá tiền"
                width={'25%'}
                render={(val, record, i) =>
                  `${number_format(record?.price)} VND`
                }
              />
              <Table.Column
                title=""
                width="100px"
                render={(val, record, i) => {
                  return (
                    <Space>
                      <Button
                        onClick={(e) => onHandleEdit(record)}
                        icon={<FormOutlined />}
                      />
                      <Button
                        onClick={(e) => onHandleDelete(record)}
                        icon={<MinusSquareOutlined />}
                      />
                    </Space>
                  )
                }}
              />
            </Table>
          </TabPane>
          <TabPane tab="Ngành nghề" key="3">
            <Table
              dataSource={career}
              rowKey={(record) => record._uuid || record._id}
              size="small"
              bordered
            >
              <Table.Column
                title="Tên ngành"
                render={(val, record, i) => record.name}
              />
              <Table.Column
                title="Mã ngành"
                width={'25%'}
                render={(val, record, i) => record.code}
              />
              <Table.Column
                width="100px"
                title=""
                render={(val, record, i) => (
                  <Space>
                    <Button
                      onClick={(e) => onHandleEdit(record)}
                      icon={<FormOutlined />}
                    />
                    <Button
                      onClick={(e) => deleteCareer(record)}
                      icon={<MinusSquareOutlined />}
                    />
                  </Space>
                )}
              />
            </Table>
          </TabPane>
        </Tabs>
        <Drawer
          visible={childModal.visible}
          width={childModal.width}
          onClose={closeModal}
          destroyOnClose
        >
          {childModal.component}
        </Drawer>
      </div>
    </>
  )
}

export default AdminProduct
