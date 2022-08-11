import { Col, Form, Row, Select, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, lazy, useEffect, useState, Suspense } from 'react'

import styles from './CreateCompany.module.scss'

const DiaChiTruSoChinh = lazy(() => {
  return import(`./DiaChiTruSoChinh`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})

const GiaTriGopVon = lazy(() => {
  return import(`./GiaTriGopVon`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const NgangNgheDangKi = lazy(() => {
  return import(`./NgangNgheDangKi`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const NguoiDaiDienPhapLuat = lazy(() => {
  return import(`./NguoiDaiDienPhapLuat`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const TenCongTy = lazy(() => {
  return import(`./TenCongTy`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const ThanhVienGopVon = lazy(() => {
  return import(`./ThanhVienGopVon`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})

const BASE_FORM = ['create_company', 'approve']

const CreateCompany = forwardRef((props, formRef) => {
  useEffect(() => {
    onSetFields([...BASE_FORM, 'origin_person', 'national'], 'Việt Nam')
  }, [])

  const onSetFields = (pathName, val) => {
    formRef.current.setFields([
      {
        name: pathName,
        value: val,
      },
    ])
  }

  const dropdownRender = (pathName) => {
    return (
      <Select
        placeholder="Bấm vào đây"
        onChange={(v, opt) => onSetFields([pathName], opt)}
      >
        {props.data?.map((item) => {
          return (
            <Select.Option key={item._id} value={item._id} {...item}>
              {item.name}
            </Select.Option>
          )
        })}
      </Select>
    )
  }
  const animateClass = 'animate__animated animate__fadeIn animate__faster'

  const renderFormItem = () => {
    let html = null
    const listForm = [
      GiaTriGopVon,
      ThanhVienGopVon,
      NguoiDaiDienPhapLuat,
      TenCongTy,
      DiaChiTruSoChinh,
      NgangNgheDangKi,
    ]

    const configs = {
      BASE_FORM: BASE_FORM,
      current: props.step,
      ref: formRef,
      className: animateClass,
    }

    html = listForm.map((Component) => <Component {...configs} />)

    return html
  }
  return (
    <>
      <Form
        layout="vertical"
        ref={formRef}
        // onFieldsChange={handleFieldsChange}
        autoComplete="off"
      >
        <Row
          className={clsx([
            styles.hide,
            {
              [styles.visible]: props.step === 0,
            },
          ])}
        >
          <Col span={24}>
            <Form.Item
              name={['selectProduct']}
              required
              label="Chọn loại hình doanh nghiệp"
              placeholder="Bấm vào đây"
              className={animateClass}
            >
              {dropdownRender(['selectProduct'])}
            </Form.Item>
          </Col>
        </Row>
        <Suspense
          fallback={
            <div className="container spin-suspense">
              <Space align="center">
                <Spin spinning={true} tip="Loading..." />
              </Space>
            </div>
          }
        >
          {renderFormItem()}
    
        </Suspense>
      </Form>
    </>
  )
})

export default CreateCompany
