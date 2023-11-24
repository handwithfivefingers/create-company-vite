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

const InformationField = ({ forwardRef }) => {
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

      <CCAddress name={[...BASE_FORM, 'information']} ref={forwardRef} required />
      <CCInput name={[...BASE_FORM, 'information', 'phone']} label="Số điện thoại" required />
      <CCInput name={[...BASE_FORM, 'information', 'email']} label="Địa chỉ email" required />
      <CCInput name={[...BASE_FORM, 'information', 'website']} label="Địa chỉ website" required />
    </Card>
  )
}

const PhoneField = ({ forwardRef }) => {
  return (
    <Card className="box__shadow" title="Cập nhật số điện thoại">
      <CCInput name={[...BASE_FORM, 'phone']} label="Số điện thoại" required />
    </Card>
  )
}

const EmailField = ({ forwardRef }) => {
  return (
    <Card className="box__shadow" title="Cập nhật địa chỉ email">
      <CCInput name={[...BASE_FORM, 'email']} label="Email" required />
    </Card>
  )
}

const WebsiteField = ({ forwardRef }) => {
  return (
    <Card className="box__shadow" title="Cập nhật địa chỉ website">
      <CCInput name={[...BASE_FORM, 'website']} label="Website" required />
    </Card>
  )
}
const CapNhatThongTinDangKy = forwardRef((props, ref) => {
  const [select, setSelect] = useState([])

  useEffect(() => {
    if (ref) {
      let selectValue = ref.current.getFieldValue([...BASE_FORM, 'select'])

      console.log(selectValue)

      setSelect(selectValue || [])
    }
  }, [ref])

  const handleSelect = (val) => setSelect(val)

  return (
    <Form.Item
      label={<h3>Cập nhật thông tin đăng ký doanh nghiệp</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
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
            >
              <Select.Option value="information">Thông tin cá nhân</Select.Option>
              <Select.Option value="phone">Số điện thoại</Select.Option>
              <Select.Option value="email">Email</Select.Option>
              <Select.Option value="website">Website</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        {select.map((item, index) => {
          if (item === 'information')
            return (
              <Col lg={12} sm={24}>
                <InformationField key={[item, index]} forwardRef={ref} />
              </Col>
            )
          else if (item === 'phone')
            return (
              <Col lg={12} sm={24}>
                <PhoneField key={[item, index]} />
              </Col>
            )
          else if (item === 'email')
            return (
              <Col lg={12} sm={24}>
                <EmailField key={[item, index]} />
              </Col>
            )
          else if (item === 'website')
            return (
              <Col lg={12} sm={24}>
                <WebsiteField key={[item, index]} />
              </Col>
            )
          return null
        })}
      </Row>
    </Form.Item>
  )
})

export default CapNhatThongTinDangKy
