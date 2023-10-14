import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import { onSetFields } from '@/helper/Common'
import { Col, Form, Row, Select, Space, Spin } from 'antd'
import clsx from 'clsx'
import moment from 'moment'
import { Suspense, forwardRef, lazy, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useStepData } from '../../../context/StepProgressContext'
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

const ThanhVienGopVon = lazy(async () => {
  return import(`./ThanhVienGopVon`).then(({ default: Component }) => {
    return {
      default: forwardRef((props, ref) => <Component ref={ref} {...props} />),
    }
  })
})

const BASE_FORM = ['create_company', 'approve']

const animateClass = 'animate__animated animate__fadeIn animate__faster'

const CreateCompany = forwardRef(({ data }, formRef) => {
  const [select, setSelect] = useState()
  const { currentStep } = useStepData()
  const [createCompanyForm] = Form.useForm()
  const [reload, setReload] = useState(false)
  let location = useLocation()

  useEffect(() => {
    if (location?.state) {
      // setTimeout(() => {
      initDataforEditing()
      // }, 2000)
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
      const nextData = JSON.parse(JSON.stringify(data))
      
      let approve = nextData.create_company?.approve

      if (approve) {
        let { origin_person, legal_respon } = approve

        if (origin_person) {
          origin_person = origin_person?.map(({ birth_day, doc_time_provide, doc_outdate, organization, ...item }) => {
            let obj = {
              ...item,
            }
            if (doc_outdate) obj.doc_outdate = moment(doc_outdate, 'YYYY-MM-DD')
            if (birth_day) obj.birth_day = moment(birth_day, 'YYYY-MM-DD')
            if (doc_time_provide) obj.doc_time_provide = moment(doc_time_provide, 'YYYY-MM-DD')

            if (organization) {
              obj.organization = {
                ...organization,
                doc_time_provide: moment(organization.doc_time_provide, 'YYYY-MM-DD'),
              }
            }
            return obj
          })
        }

        // if (legal_respon) {
        //   legal_respon = legal_respon.map(({ birth_day, doc_time_provide, doc_outdate, ...item }) => {
        //     let obj = {
        //       ...item,
        //     }
        //     if (doc_time_provide) {
        //       obj.doc_time_provide = moment(doc_time_provide, 'YYYY-MM-DD')
        //     }
        //     if (birth_day) {
        //       obj.birth_day = moment(birth_day, 'YYYY-MM-DD')
        //     }
        //     if (doc_outdate) {
        //       obj.doc_outdate = moment(doc_outdate, 'YYYY-MM-DD')
        //     }
        //     return obj
        //   })
        // }

        // if (legal_respon?.length) {
        //   let i = 0
        //   for (let legal of legal_respon) {
        //     console.log('legal', legal)
        //     formRef.current.setFields([
        //       {
        //         name: [...BASE_FORM, 'legal_respon', i],
        //         value: legal,
        //       },
        //     ])
        //     i++
        //   }
        //   delete approve.legal_respon
        // }

        approve.origin_person = origin_person

        delete approve.legal_respon
      }
      _data.create_company = {
        approve,
      }
    }

    formRef.current.setFieldsValue({ ..._data })

    setSelect({ type: category.type, value: category._id, name: category.name })
    setReload(!reload)
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

  const renderFormItem = useMemo(() => {
    let html = null
    const listForm = [GiaTriGopVon, ThanhVienGopVon, NguoiDaiDienPhapLuat, TenCongTy, DiaChiTruSoChinh, NgangNgheDangKi]
    const configs = {
      BASE_FORM: BASE_FORM,
      ref: formRef,
      className: animateClass,
      data: select,
    }
    html = listForm.map((Component, index) => (
      <Row key={[configs, index]}>
        <Col span={24}>
          <Component {...configs} />
        </Col>
      </Row>
    ))
    return html
  }, [select, reload])

  const rowClassName = clsx([
    styles.hide,
    {
      [styles.visible]: currentStep === 0,
    },
  ])

  return (
    <Form
      layout="vertical"
      ref={formRef}
      autoComplete="off"
      validateMessages={VALIDATE_MESSAGE}
      form={createCompanyForm}
    >
      <Row className={rowClassName}>
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
            <Select placeholder="Bấm vào đây" onChange={(v, opt) => handleSelect(v, opt, ['category'])}>
              {data?.map((item) => {
                return (
                  <Select.Option key={item._id} value={item._id} {...item}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
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
        {renderFormItem}
      </Suspense>
    </Form>
  )
})

export default CreateCompany
