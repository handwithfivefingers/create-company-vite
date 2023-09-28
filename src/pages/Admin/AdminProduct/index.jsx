import { PlusSquareOutlined } from '@ant-design/icons'

import { Button, Tabs, Grid } from 'antd'
import React, { useRef, useState, useMemo } from 'react'

import AdminHeader from '../../../components/Admin/AdminHeader'
import styles from './styles.module.scss'

import CareerCategoryTab from './CareerCategoryTab'
import CareerTab from './CareerTab'
import CategoryTab from './CategoryTab'
import ProductsTab from './ProductsTab'

import { useSelector } from 'react-redux'

const AdminProduct = (props) => {
  const [activeTabs, setActiveTabs] = useState(1)
  const productRef = useRef()

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

  const { collapsed } = useSelector((state) => state.commonReducer)

  const listPanel = [
    {
      key: 1,
      label: 'Danh mục',
      children: <CategoryTab />,
    },
    {
      key: 2,
      label: 'Sản phẩm',
      children: <ProductsTab />,
    },
    {
      key: 3,
      label: 'Danh mục Ngành nghề',
      children: <CareerCategoryTab />,
    },
    {
      key: 4,
      label: 'Ngành nghề',
      children: <CareerTab />,
    },
  ]
  return (
    <>
      <AdminHeader title="Quản lý sản phẩm" />
      <Tabs
        className={styles.tabsPanel}
        activeKey={activeTabs}
        onChange={(key) => setActiveTabs(key)}
        style={{ width: collapsed ? 'calc(100vw - 62px)' : 'calc(100vw - 236px)' }}
        items={listPanel}
      />
    </>
  )
}

export default AdminProduct
