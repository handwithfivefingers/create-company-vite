import { Col, Form, Row, Select, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, lazy, useEffect, useState, Suspense } from 'react'

import styles from './CreateCompany.module.scss'

const DiaChiTruSoChinh = lazy(() => {
  return import(`./DiaChiTruSoChinh`).then(({ default: Component }) => {
    // console.log('import lazy DiaChiTruSoChinh')

    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})

const GiaTriGopVon = lazy(() => {
  return import(`./GiaTriGopVon`).then(({ default: Component }) => {
    // console.log('import lazy GiaTriGopVon')

    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const NgangNgheDangKi = lazy(() => {
  return import(`./NgangNgheDangKi`).then(({ default: Component }) => {
    // console.log('import lazy NgangNgheDangKi')

    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const NguoiDaiDienPhapLuat = lazy(() => {
  return import(`./NguoiDaiDienPhapLuat`).then(({ default: Component }) => {
    // console.log('import lazy NguoiDaiDienPhapLuat')

    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const TenCongTy = lazy(() => {
  return import(`./TenCongTy`).then(({ default: Component }) => {
    // console.log('import lazy TenCongTy')

    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})
const ThanhVienGopVon = lazy(() => {
  return import(`./ThanhVienGopVon`).then(({ default: Component }) => {
    // console.log('import lazy ThanhVienGopVon')
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})

const BASE_FORM = ['create_company', 'approve']

const CreateCompany = forwardRef((props, formRef) => {
  // const handleFieldsChange = (field, fields) => {
  // 	let val = formRef.current.getFieldsValue();
  // 	window.localStorage.setItem('formData', JSON.stringify(val));
  // };
  useEffect(() => {
    onSetFields([...BASE_FORM, 'origin_person', 'national'], 'Việt Nam')
  }, [])

  const onSetFields = (pathName, val) => {
    console.log(val)
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
          {/** 1 */}
          {props.step >= 1 && (
            <GiaTriGopVon
              BASE_FORM={BASE_FORM}
              current={props.step}
              ref={formRef}
            />
          )}
          {/** 2 */}
          {props.step >= 2 && (
            <ThanhVienGopVon
              BASE_FORM={BASE_FORM}
              current={props.step}
              ref={formRef}
            />
          )}
          {/** 3 */}
          {props.step >= 3 && (
            <NguoiDaiDienPhapLuat
              BASE_FORM={BASE_FORM}
              current={props.step}
              ref={formRef}
            />
          )}

          {/** 4 */}
          {props.step >= 4 && (
            <TenCongTy
              BASE_FORM={BASE_FORM}
              current={props.step}
              ref={formRef}
            />
          )}
          {/** 5 */}
          {props.step >= 5 && (
            <DiaChiTruSoChinh
              BASE_FORM={BASE_FORM}
              current={props.step}
              ref={formRef}
            />
          )}
          {/** 6 */}
          {props.step >= 6 && (
            <NgangNgheDangKi
              BASE_FORM={BASE_FORM}
              current={props.step}
              ref={formRef}
            />
          )}
        </Suspense>
      </Form>
    </>
  )
})

export default CreateCompany
