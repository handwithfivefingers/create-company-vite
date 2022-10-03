import { FormOutlined, MinusSquareOutlined, PlusSquareOutlined, DeleteOutlined, SearchOutlined, BarsOutlined, MoreOutlined } from '@ant-design/icons'

import { Button, Drawer, message, Modal, Space, Table, Tabs, Popconfirm } from 'antd'
import React, { useEffect, useState, useRef, Suspense } from 'react'

import { number_format, makeid } from '@/helper/Common'
import AdminProductService from '@/service/AdminService/AdminProductService'
import CCPagination from '@/components/CCPagination'
import styles from './styles.module.scss'
import AdminHeader from '../../../components/Admin/AdminHeader'
import { useFetch } from '../../../helper/Hook'

const CategoryTab = React.lazy(async () => await import('./CategoryTab'))
const ProductsTab = React.lazy(async () => await import('./ProductsTab'))
const CareerCategoryTab = React.lazy(async () => await import('./CareerCategoryTab'))
const CareerTab = React.lazy(async () => await import('./CareerTab'))

const { TabPane } = Tabs
const AdminProduct = (props) => {
  const [activeTabs, setActiveTabs] = useState(1)
  const productRef = useRef()

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  })

  // Career

  // Categories
  const onHandleCreateCategory = () => {
    try {
      return productRef.current.addCategory()
    } catch (err) {
      setTimeout(onHandleCreateCategory, 1000)
    }
  }

  const onHandleAddProduct = () => {
    try {
      return productRef.current.addProduct()
    } catch (err) {
      setTimeout(onHandleAddProduct, 1000)
    }
  }

  /**
   *
   * @desc Open Modal CareerCategory to Create
   */
  const onHandleAddCareerCategory = () => {
    try {
      return productRef.current.addCareerCategory()
    } catch (err) {
      setTimeout(onHandleAddCareerCategory, 1000)
    }
  }

  const onHandleAddCareer = () => {
    try {
      return productRef.current.addCareer()
    } catch (err) {
      setTimeout(onHandleAddCareer, 1000)
    }
  }

  const renderExtra = () => {
    let xhtml = null

    xhtml = (
      <div className={styles.extraAction}>
        <Button
          type="dashed"
          onClick={() => {
            setActiveTabs('1')
            onHandleCreateCategory()
          }}
          icon={<PlusSquareOutlined />}
        >
          Thêm danh mục
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            setActiveTabs('2')
            onHandleAddProduct()
          }}
          icon={<PlusSquareOutlined />}
        >
          Thêm sản phẩm
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            setActiveTabs('3')
            onHandleAddCareerCategory()
          }}
          icon={<PlusSquareOutlined />}
        >
          Thêm danh mục ngành nghề
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            setActiveTabs('4')
            onHandleAddCareer()
          }}
          icon={<PlusSquareOutlined />}
        >
          Thêm ngành nghề
        </Button>
      </div>
    )

    return xhtml
  }
  const items = [
    {
      label: 'Danh mục',
      key: 1,
      children: <CategoryTab ref={productRef} />,
    },
    {
      label: 'Sản phẩm',
      key: 2,
      children: <ProductsTab ref={productRef} />,
    },
    {
      label: 'Danh mục Ngành nghề',
      key: 3,
      children: <CareerCategoryTab ref={productRef} />,
    },
    {
      label: 'Ngành nghề',
      key: 4,
      children: <CareerTab ref={productRef} />,
    },
  ]
  return (
    <>
      <AdminHeader title="Quản lý sản phẩm" extra={renderExtra()} />

      <Tabs
        className={styles.tabsPanel}
        defaultActiveKey={1}
        activeKey={activeTabs}
        onChange={(key) => setActiveTabs(key)}
        destroyInactiveTabPane
        items={items}
      />
    </>
  )
}

export default AdminProduct
