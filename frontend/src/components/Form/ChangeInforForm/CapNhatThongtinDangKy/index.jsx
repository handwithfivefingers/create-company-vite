import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { htmlContent } from '@/helper/Common'
import { Card, Col, Form, Row, Select } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import CCInputBirthDay from '../../../CCInputBirthDay'
const BASE_FORM = ['change_info', 'update_info']
import {
  CCInputTypeIdentify,
  CCInputNumberIdentify,
  CCInputDateProvideIdentify,
  CCInputOutdateIdentify,
  CCInputProviderIdentify,
} from '@/components/CCInputIdentify'
import { useStepData } from '../../../../context/StepProgressContext'

const InformationField = () => {
  const formInstance = Form.useFormInstance()
  const doctypeWatch = Form.useWatch([...BASE_FORM, 'information', 'doc_type'], formInstance)
  return (
    <Card className="box__shadow" title="Cập nhật thông tin cá nhân">
      <CCInput name={[...BASE_FORM, 'information', 'name']} label="Họ và tên" required />
      <CCInputBirthDay required name={[...BASE_FORM, 'information', 'birth_day']} />

      <CCInputTypeIdentify name={[...BASE_FORM, 'information', 'doc_type']} required />

      <CCInputNumberIdentify indentifyType={doctypeWatch} name={[...BASE_FORM, 'information', 'doc_code']} required />

      <CCInputDateProvideIdentify
        name={[...BASE_FORM, 'information', 'doc_time_provide']}
        required
        inputReadOnly={false}
        indentifyType={doctypeWatch}
      />

      <CCInputOutdateIdentify name={[...BASE_FORM, 'information', 'doc_outdate']} indentifyType={doctypeWatch} />

      <CCInputProviderIdentify
        name={[...BASE_FORM, 'information', 'doc_place_provide']}
        required
        indentifyType={doctypeWatch}
      />

      <CCAddress name={[...BASE_FORM, 'information']} required />
      <CCInput name={[...BASE_FORM, 'information', 'phone']} label="Số điện thoại" required />
      <CCInput name={[...BASE_FORM, 'information', 'email']} label="Địa chỉ email" required />
      <CCInput name={[...BASE_FORM, 'information', 'website']} label="Địa chỉ website" required />
    </Card>
  )
}

const PhoneField = () => {
  return (
    <Card className="box__shadow" title="Cập nhật số điện thoại">
      <CCInput name={[...BASE_FORM, 'phone']} label="Số điện thoại" required />
    </Card>
  )
}

const EmailField = () => {
  return (
    <Card className="box__shadow" title="Cập nhật địa chỉ email">
      <CCInput name={[...BASE_FORM, 'email']} label="Email" required />
    </Card>
  )
}

const WebsiteField = () => {
  return (
    <Card className="box__shadow" title="Cập nhật địa chỉ website">
      <CCInput name={[...BASE_FORM, 'website']} label="Website" required />
    </Card>
  )
}

const OptionsSelect = [
  {
    label: 'Thông tin cá nhân',
    value: 'information',
  },
  {
    label: 'Số điện thoại',
    value: 'phone',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Website',
    value: 'website',
  },
]

const SubComponent = {
  information: <InformationField />,
  phone: <PhoneField />,
  email: <EmailField />,
  website: <WebsiteField />,
}
const CapNhatThongTinDangKy = (props) => {
  const [select, setSelect] = useState([])
  const { currentStep } = useStepData()
  const formInstance = Form.useFormInstance()
  useEffect(() => {
    let selectValue = formInstance.getFieldValue([...BASE_FORM, 'select'])
    console.log(selectValue)
    setSelect(selectValue || [])
  }, [])

  const handleSelect = (val) => setSelect(val)

  return (
    <Form.Item
      label={<h3>Cập nhật thông tin đăng ký doanh nghiệp</h3>}
      className={clsx(styles.current, {
        [styles.active]: currentStep === props.index,
      })}
    >
      <Row gutter={[12, 12]}>
        <Col lg={24} md={24} sm={24} xs={24}>
          <Form.Item
            name={[...BASE_FORM, 'select']}
            label={htmlContent('Vui lòng chọn thông tin cần cập nhật')}
            required
            rules={[{ required: true, message: 'Vui lòng chọn thông tin cần cập nhật!' }]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              listHeight={300}
              placeholder="Bấm vào đây"
              onChange={handleSelect}
              options={OptionsSelect}
            />
          </Form.Item>
        </Col>

        {select.map((item, index) => {
          return (
            <Col lg={12} sm={24} key={[item, index]}>
              {SubComponent[item]}
            </Col>
          )
        })}
      </Row>
    </Form.Item>
  )
}

export default CapNhatThongTinDangKy
