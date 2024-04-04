/* eslint-disable react/display-name */
import { VALIDATE_MESSAGE } from '@/constant/InputValidate'
import { Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import { forwardRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { STATE_METHOD } from '../../../constant/Common'
import { useStepData } from '../../../context/StepProgressContext'
import { useOrderAction } from '../../../store/actions/order.actions'
import { useCreateCompanyOrder, useGetOrderMethod, useOrder } from '../../../store/reducer'
import styles from './CreateCompany.module.scss'
import DiaChiTruSoChinh from './DiaChiTruSoChinh'
import GiaTriGopVon from './GiaTriGopVon'
import NgangNgheDangKi from './NgangNgheDangKi'
import NguoiDaiDienPhapLuat from './NguoiDaiDienPhapLuat'
import TenCongTy from './TenCongTy'
import ThanhVienGopVon from './ThanhVienGopVon'
import CreateCompanyPreview from '../PreviewData/CreateCompanyPreview'

const BASE_FORM = ['create_company', 'approve']

const animateClass = 'animate__animated animate__fadeIn animate__faster'

const CreateCompany = forwardRef(({ data }, formRef) => {
  const { currentStep } = useStepData()
  const [createCompanyForm] = Form.useForm()
  const { category } = useOrder()
  const createCompany = useCreateCompanyOrder()
  const method = useGetOrderMethod()
  const dispatch = useDispatch()
  const action = useOrderAction()
  const watch = Form.useWatch(BASE_FORM, createCompanyForm)

  useEffect(() => {
    if (method === STATE_METHOD['UPDATE']) {
      createCompanyForm.setFieldsValue({ create_company: createCompany, category: category._id })
    }
  }, [method])

  const handleSelect = (value, opt, pathName) => {
    let { type, name } = opt
    dispatch(
      action.onUpdateCategory({
        type,
        name,
        value,
      }),
    )
  }

  useEffect(() => {
    window.form = createCompanyForm
  }, [])

  useEffect(() => {
    let timeout
    if (watch) {
      timeout = setTimeout(() => {
        const values = createCompanyForm.getFieldsValue(true)
        console.log('values', values)
        dispatch(action.onUpdateCreateCompany(values.create_company))
      }, 500)
    }
    return () => clearTimeout(timeout)
  }, [watch])

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
            <Select
              placeholder="Bấm vào đây"
              onChange={handleSelect}
              options={data}
              fieldNames={{ label: 'name', value: '_id' }}
            />
          </Form.Item>
        </Col>
      </Row>
      {currentStep === 1 && <GiaTriGopVon className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
      {currentStep === 2 && <ThanhVienGopVon className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
      {currentStep === 3 && <NguoiDaiDienPhapLuat className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
      {currentStep === 4 && <TenCongTy className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
      {currentStep === 5 && <DiaChiTruSoChinh className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
      {currentStep === 6 && <NgangNgheDangKi className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
      {currentStep === 7 && <CreateCompanyPreview className={animateClass} BASE_FORM={BASE_FORM} data={category} />}
    </Form>
  )
})

export default CreateCompany
