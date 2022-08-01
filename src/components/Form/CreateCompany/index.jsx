import { Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import ChuTichHoiDongThanhVien from './ChuTichHoiDongThanhVien'
import styles from './CreateCompany.module.scss'
import DiaChiTruSoChinh from './DiaChiTruSoChinh'
import GiaTriGopVon from './GiaTriGopVon'
import NgangNgheDangKi from './NgangNgheDangKi'
import NguoiDaiDienPhapLuat from './NguoiDaiDienPhapLuat'
import TenCongTy from './TenCongTy'
import ThanhVienGopVon from './ThanhVienGopVon'

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
        <GiaTriGopVon
          BASE_FORM={BASE_FORM}
          current={props.step}
          ref={formRef}
        />
        {/** 1 */}
        <ThanhVienGopVon
          BASE_FORM={BASE_FORM}
          current={props.step}
          ref={formRef}
        />
        {/** 2 */}
        <NguoiDaiDienPhapLuat
          BASE_FORM={BASE_FORM}
          current={props.step}
          ref={formRef}
        />
        {/** 3 */}
        {/**     <ChuTichHoiDongThanhVien BASE_FORM={BASE_FORM} current={props.step} ref={formRef} /> 4 */}
        <TenCongTy BASE_FORM={BASE_FORM} current={props.step} ref={formRef} />
        {/** 5 */}
        <DiaChiTruSoChinh
          BASE_FORM={BASE_FORM}
          current={props.step}
          ref={formRef}
        />
        {/** 6 */}
        <NgangNgheDangKi
          BASE_FORM={BASE_FORM}
          current={props.step}
          ref={formRef}
        />
        {/** 7 */}
      </Form>
    </>
  )
})

export default CreateCompany
