import CCInput from '@/components/CCInput'
import {
  CCInputDateProvideIdentify,
  CCInputNumberIdentify,
  CCInputProviderIdentify,
  CCInputTypeIdentify,
} from '@/components/CCInputIdentify'
import { SELECT } from '@/constant/Common'
import { useStepData } from '@/context/StepProgressContext'
import { Button, Col, Form, Row } from 'antd'
import clsx from 'clsx'
import CCInputBirthDay from '../../../CCInputBirthDay'
import styles from '../CreateCompany.module.scss'

const ChuTichHoiDongThanhVien = (props) => {
  const { BASE_FORM } = props
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'per_main', 'doc_type'], formInstance)

  const handleAutoFill = () => {
    let { create_company } = formInstance.getFieldsValue()
    let { origin_person } = create_company.approve
    if (origin_person) {
      let { name, gender, birth_day, per_type, reg_address, current_address } = origin_person

      formInstance.setFieldsValue({
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
    formInstance.setFields([
      {
        name: ['create_company', 'approve', 'per_main'],
        value: null,
      },
    ])
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
            <CCInputTypeIdentify name={[...BASE_FORM, 'per_main', 'doc_type']} required />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInputNumberIdentify
              indentifyType={doctypeWatch}
              name={[...BASE_FORM, 'per_main', 'doc_code']}
              required
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInputDateProvideIdentify
              name={[...BASE_FORM, 'per_main', 'doc_time_provide']}
              required
              inputReadOnly={false}
              indentifyType={doctypeWatch}
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInputProviderIdentify
              name={[...BASE_FORM, 'per_main', 'doc_place_provide']}
              required
              indentifyType={doctypeWatch}
            />
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
}

export default ChuTichHoiDongThanhVien
