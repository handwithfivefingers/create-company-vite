import { Col, Form, Row, InputNumber, Select, Card } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import styles from '../DaiDienPhapLuat/styles.module.scss'
import { onSetFields, htmlContent, numToWord } from '@/helper/Common'
import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import { SELECT } from '@/constant/Common'
import { useState } from 'react'
import moment from 'moment'
const BASE_FORM = ['change_info', 'update_info']

const CapNhatThongTinDangKy = forwardRef((props, ref) => {
  //   useEffect(() => {
  //     if (ref) {
  //       onSetFields(['change_info', 'update_info', 'type'], 'Tăng vốn góp', ref)
  //     }
  //   }, [ref])

  const [select, setSelect] = useState([])

  useEffect(() => {
    if (ref) {
      let selectValue = ref.current.getFieldValue([...BASE_FORM, 'select'])

      console.log(selectValue)

      setSelect(selectValue)
    }
  }, [ref])

  //   const handleInpChange = (e, pathName) => {
  //     let numInp = ref.current.getFieldValue([...pathName, 'num'])

  //     if (timer) clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       let transform = numToWord(numInp)
  //       let upperLetter = transform.charAt(0).toUpperCase() + transform.slice(1)

  //       onSetFields([...pathName, 'char'], upperLetter, ref)
  //     }, 500)
  //   }

  const handleSelect = (val) => {
    // console.log('select', val)
    setSelect(val)
    // console.log(ref.current.getFieldsValue())
  }

  const InformationField = () => {
    return (
      <Card className="box__shadow" title="Cập nhật thông tin cá nhân">
        <CCInput name={[...BASE_FORM, 'information', 'name']} label="Họ và tên" required />
        <CCInput
          name={[...BASE_FORM, 'information', 'birth_day']}
          label="Ngày sinh"
          type="date"
          placeholder="15/01/1966 - ENTER"
          required
          // onChange={(date, dateString) => {
          //   // console.log(date, dateString)

          //   // console.log(dateString)
          //   // console.log(new Date(dateString))
          //   // console.log()

          //   let d = moment(dateString, 'DD/MM/YYYY')
          //   console.log(d, dateString)

          //   onSetFields([...BASE_FORM, 'information', 'birth_day'], d, ref)

          //   // console.log(moment(new Date('12/12/2022')))
          //   // console.log(ref.current.getFieldValue([...BASE_FORM, 'information']))
          // }}
        />

        <CCInput
          name={[...BASE_FORM, 'information', 'doc_type']}
          label="Loại giấy tờ pháp lý"
          options={SELECT.DOC_TYPE}
          required
          type="select"
        />

        <CCInput name={[...BASE_FORM, 'information', 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />

        <CCInput
          name={[...BASE_FORM, 'information', 'doc_time_provide']}
          label="Ngày cấp"
          type="date"
          placeholder="15/01/2015 - ENTER"
          required
        />

        <CCSelect.SelectDocProvide
          ref={ref}
          name={[...BASE_FORM, 'information', 'doc_place_provide']}
          label="Nơi cấp"
          placeholder="Bấm vào đây"
          required
        />

        <CCAddress name={[...BASE_FORM, 'information']} ref={ref} required />
      </Card>
    )
  }

  const PhoneField = () => {
    return (
      <Card className="box__shadow" title="Cập nhật số điện thoại">
        <CCInput name={[...BASE_FORM, 'phone']} label="Số điện thoại" />
      </Card>
    )
  }

  const EmailField = () => {
    return (
      <Card className="box__shadow" title="Cập nhật địa chỉ email">
        <CCInput name={[...BASE_FORM, 'email']} label="Email" />
      </Card>
    )
  }

  const WebsiteField = () => {
    return (
      <Card className="box__shadow" title="Cập nhật địa chỉ website">
        <CCInput name={[...BASE_FORM, 'website']} label="Website" />
      </Card>
    )
  }

  console.log('rendered')
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
            rules={[{ required: true, message: 'Vui lòng nhập Vốn điều lệ đã đăng ký!' }]}
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
                <InformationField key={[item, index]} />
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
