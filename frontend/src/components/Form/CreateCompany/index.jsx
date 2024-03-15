/* eslint-disable react/display-name */
import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import { onSetFields } from '@/helper/Common'
import { Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useStepData } from '../../../context/StepProgressContext'
import styles from './CreateCompany.module.scss'
import DiaChiTruSoChinh from './DiaChiTruSoChinh'
import GiaTriGopVon from './GiaTriGopVon'
import NgangNgheDangKi from './NgangNgheDangKi'
import NguoiDaiDienPhapLuat from './NguoiDaiDienPhapLuat'
import TenCongTy from './TenCongTy'
import ThanhVienGopVon from './ThanhVienGopVon'
import { useOrder } from '../../../store/reducer'
import { useDispatch } from 'react-redux'
import { useOrderAction } from '../../../store/actions/order.actions'

const BASE_FORM = ['create_company', 'approve']

const animateClass = 'animate__animated animate__fadeIn animate__faster'

const CreateCompany = forwardRef(({ data }, formRef) => {
  const [select, setSelect] = useState()
  const { currentStep } = useStepData()
  const [createCompanyForm] = Form.useForm()
  const { category } = useOrder()
  const dispatch = useDispatch()
  const action = useOrderAction()
  useEffect(() => {
    setSelect({ ...category, value: category._id })
    formRef.current.setFields([
      {
        name: 'category',
        value: category._id,
      },
    ])
  }, [category])

  const handleSelect = (value, opt, pathName) => {
    let { type, name } = opt
    onSetFields([pathName], { type, name, value }, formRef)
    let originPerson = [...BASE_FORM, 'origin_person']
    let legelRespon = [...BASE_FORM, 'legal_respon']
    onSetFields([pathName], { type, name, value }, formRef)
    onSetFields([originPerson], undefined, formRef)
    onSetFields([legelRespon], undefined, formRef)
    setSelect({ type, name, value })
  }

  const rowClassName = clsx([
    styles.hide,
    {
      [styles.visible]: currentStep === 0,
    },
  ])
  const handleFieldsChange = ([field], fields) => {
    console.log('field', field)
    console.log('fields', fields)
    const { name, value } = field
    dispatch(action.onUpdateForm({ [name]: value }))
  }
  console.log('CC UPDATE STATE')
  return (
    <Form
      layout="vertical"
      ref={formRef}
      autoComplete="off"
      validateMessages={VALIDATE_MESSAGE}
      form={createCompanyForm}
      onFieldsChange={handleFieldsChange}
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
            <Select
              placeholder="Bấm vào đây"
              onChange={(v, opt) => handleSelect(v, opt, ['category'])}
              options={data}
              fieldNames={{ label: 'name', value: '_id' }}
            />
          </Form.Item>
        </Col>
      </Row>
      {currentStep === 1 && <GiaTriGopVon className={animateClass} BASE_FORM={BASE_FORM} data={select} />}
      {currentStep === 2 && <ThanhVienGopVon className={animateClass} BASE_FORM={BASE_FORM} data={select} />}
      {currentStep === 3 && <NguoiDaiDienPhapLuat className={animateClass} BASE_FORM={BASE_FORM} data={select} />}
      {currentStep === 4 && <TenCongTy className={animateClass} BASE_FORM={BASE_FORM} data={select} />}
      {currentStep === 5 && <DiaChiTruSoChinh className={animateClass} BASE_FORM={BASE_FORM} data={select} />}
      {currentStep === 6 && <NgangNgheDangKi className={animateClass} BASE_FORM={BASE_FORM} data={select} />}
    </Form>
  )
})

export default CreateCompany
