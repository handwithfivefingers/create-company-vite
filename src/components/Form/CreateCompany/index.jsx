import { Col, Form, Row, Select, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, lazy, useEffect, useState, Suspense } from 'react'
import { onSetFields } from '@/helper/Common'
import styles from './CreateCompany.module.scss'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
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

const ThanhVienGopVon = lazy(async () => {
  return import(`./ThanhVienGopVon`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})

const BASE_FORM = ['create_company', 'approve']

const animateClass = 'animate__animated animate__fadeIn animate__faster'

const CreateCompany = forwardRef((props, formRef) => {
  const [select, setSelect] = useState()

  let location = useLocation()

  useEffect(() => {
    if (location?.state) {
      initDataforEditing()
    }
  }, [location])

  const initDataforEditing = () => {
    let { state } = location

    let _data = {}

    let { category, data } = state

    if (!category) return

    _data.category = {
      type: category.type,
      value: category._id,
      name: category.name,
    }

    if (data) {
      let approve = data?.create_company?.approve

      if (approve) {
        let { origin_person, legal_respon } = approve
        if (origin_person) {
          origin_person = origin_person.map(({ birth_day, doc_time_provide, organization, ...item }) => {
            let obj = {
              ...item,
              birth_day: moment(birth_day, 'YYYY-MM-DD'),
              doc_time_provide: moment(doc_time_provide, 'YYYY-MM-DD'),
            }
            if (organization) {
              obj.organization = {
                ...organization,
                doc_time_provide: moment(organization.doc_time_provide, 'YYYY-MM-DD'),
              }
            }
            return obj
          })
        }
        if (legal_respon) {
          legal_respon = legal_respon.map(({ birth_day, doc_time_provide, ...item }) => {
            return {
              ...item,
              birth_day: moment(birth_day, 'YYYY-MM-DD'),
              doc_time_provide: moment(doc_time_provide, 'YYYY-MM-DD'),
            }
          })
        }
        approve = {
          ...approve,
          origin_person,
          legal_respon,
        }
      }
      _data.create_company = {
        approve,
      }
    }

    console.log(_data)
    formRef.current?.setFieldsValue({
      ..._data,
    })
  }

  const handleSelect = (v, opt, pathName) => {
    let { type, name, value } = opt

    onSetFields([pathName], { type, name, value }, formRef)
    // reset Field
    let originPerson = [...BASE_FORM, 'origin_person']

    let legelRespon = [...BASE_FORM, 'legal_respon']

    onSetFields([pathName], { type, name, value }, formRef)

    onSetFields([originPerson], undefined, formRef)

    onSetFields([legelRespon], undefined, formRef)

    setSelect({ type, name, value })
  }

  const dropdownRender = (pathName) => {
    return (
      <Select placeholder="Bấm vào đây" onChange={(v, opt) => handleSelect(v, opt, pathName)}>
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

  const renderFormItem = (data) => {
    let html = null
    const listForm = [GiaTriGopVon, ThanhVienGopVon, NguoiDaiDienPhapLuat, TenCongTy, DiaChiTruSoChinh, NgangNgheDangKi]

    const configs = {
      BASE_FORM: BASE_FORM,
      current: props.step,
      ref: formRef,
      className: animateClass,
      data,
    }

    html = listForm.map((Component) => <Component {...configs} />)

    return html
  }

  return (
    <>
      <Form layout="vertical" ref={formRef} autoComplete="off" validateMessages={VALIDATE_MESSAGE}>
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
              name={['category']}
              label="Chọn loại hình doanh nghiệp"
              placeholder="Bấm vào đây"
              className={animateClass}
              required
              rules={[
                {
                  required: true,
                },
              ]}
            >
              {dropdownRender(['category'])}
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
          {renderFormItem(select)}
        </Suspense>
      </Form>
    </>
  )
})

export default CreateCompany
