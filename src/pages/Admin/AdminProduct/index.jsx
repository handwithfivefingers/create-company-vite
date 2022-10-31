import { PlusSquareOutlined } from '@ant-design/icons'

import { Button, Tabs } from 'antd'
import React, { useRef, useState, useMemo } from 'react'

import AdminHeader from '../../../components/Admin/AdminHeader'
import styles from './styles.module.scss'

import CareerCategoryTab from './CareerCategoryTab'
import CareerTab from './CareerTab'
import CategoryTab from './CategoryTab'
import ProductsTab from './ProductsTab'
import clsx from 'clsx'

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
    },
    {
      label: 'Sản phẩm',
      key: 2,
    },
    {
      label: 'Danh mục ngành nghề',
      key: 3,
    },
    {
      label: 'Ngành nghề',
      key: 4,
    },
  ]

  const renderTabByKey = useMemo(() => {
    let html = null

    switch (activeTabs) {
      case 1:
        return <CategoryTab ref={productRef} />
      case 2:
        return <ProductsTab ref={productRef} />
      case 3:
        return <CareerCategoryTab ref={productRef} />
      case 4:
        return <CareerTab ref={productRef} />
    }

    return html
  }, [activeTabs])
  return (
    <>
      <AdminHeader title="Quản lý sản phẩm" extra={renderExtra()} />

      <Tabs className={styles.tabsPanel} activeKey={activeTabs} onChange={(key) => setActiveTabs(key)}>
        <Tabs.TabPane tab={'Danh mục'} key={1} className="tabContent">
          <CategoryTab ref={productRef} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'Sản phẩm'} key={2} className="tabContent">
          <ProductsTab ref={productRef} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'Danh mục Ngành nghề'} key={3} className="tabContent">
          <CareerCategoryTab ref={productRef} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={'Ngành nghề'} key={4} className="tabContent">
          <CareerTab ref={productRef} />
        </Tabs.TabPane>
      </Tabs>
      {/* <div className={styles.tabsPanel}>
        <div className={styles.tabHeader}>
          {items.map((item) => (
            <div
              className={clsx([styles.tabItem, { [styles.active]: item.key === activeTabs }])}
              onClick={() => setActiveTabs(item.key)}
              key={item.key}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.tabContent}>
          {renderTabByKey}
          
          </div>
      </div> */}
    </>
  )
}

export default AdminProduct
