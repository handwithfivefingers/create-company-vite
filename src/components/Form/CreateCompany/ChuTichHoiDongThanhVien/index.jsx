import { Button, Col, Form, Row } from 'antd'
import clsx from 'clsx'
import { forwardRef } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import styles from '../CreateCompany.module.scss'
import onSetFields from '@/helper/Commmon'
import { useStepData } from '@/context/StepProgressContext'
import CCInputBirthDay from '../../../CCInputBirthDay'

const ChuTichHoiDongThanhVien = forwardRef((props, ref) => {
  const { BASE_FORM } = props
  const { currentStep } = useStepData()

  const handleAutoFill = () => {
    let { create_company } = ref.current.getFieldsValue()
    let { origin_person } = create_company.approve
    if (origin_person) {
      let { name, gender, birth_day, per_type, reg_address, current_address } = origin_person

      ref.current.setFieldsValue({
        ...create_company,
        create_company: {
          approve: {
            ...create_company.approve,
            per_main: {
              name,
              gender,
              birth_day,
              per_type,
              reg_address,
              current_address,
            },
          },
        },
      })
    }
  }
  const handleClear = () => {
    let { create_company } = ref.current.getFieldsValue()
    onSetFields(['create_company', 'approve', 'per_main'], null, ref)
  }
  return (
    <>
      <Form.Item
        className={clsx([
          styles.hide,
          props.className,
          {
            [styles.visible]: currentStep === 4,
          },
        ])}
      >
        <div className={styles.titleSubForm}>
          <h2>Chủ tịch công ty/chủ tịch Hội đồng thành viên</h2>
          <div>
            <Button onClick={handleAutoFill}>Tự động nhập</Button>
            <Button onClick={handleClear}>Clear</Button>
          </div>
        </div>
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <CCInput name={[...BASE_FORM, 'per_main', 'name']} label="Họ và tên" required />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="select"
              name={[...BASE_FORM, 'per_main', 'gender']}
              label="Giới tính"
              options={SELECT.GENDER}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInputBirthDay name={[...BASE_FORM, 'per_main', 'birth_day']} required />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...BASE_FORM, 'per_main', 'per_type']} label="Dân tộc" required />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="select"
              name={[...BASE_FORM, 'per_main', 'doc_type']}
              label="Loại giấy tờ pháp lý"
              options={SELECT.DOC_TYPE}
              required
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...BASE_FORM, 'per_main', 'doc_code']} label="Số giấy tờ pháp lý" required />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="date"
              name={[...BASE_FORM, 'per_main', 'doc_time_provide']}
              label="Ngày cấp"
              inputReadOnly={false}
              required
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...BASE_FORM, 'per_main', 'doc_place_provide']} label="Nơi cấp" required />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...BASE_FORM, 'per_main', 'reg_address']} label="Nơi đăng kí hộ khẩu thường trú" required />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput name={[...BASE_FORM, 'per_main', 'current_address']} label="Chỗ ở hiện tại" required />
          </Col>
        </Row>
      </Form.Item>
    </>
  )
})

export default ChuTichHoiDongThanhVien
