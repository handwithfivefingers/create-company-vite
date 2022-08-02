import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Space } from 'antd'
import clsx from 'clsx'
import { differenceBy } from 'lodash'
import React, { forwardRef } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { makeid } from '@/helper/Common'
import styles from '../CreateCompany.module.scss'
const NguoiDaiDienPhapLuat = forwardRef((props, ref) => {
  const { current, BASE_FORM } = props

  const handleAddmoreField = (lth, add) => {
    // lth : length
    // add : func
    if (lth >= 1) {
      add()
    } else {
      const { create_company } = ref.current.getFieldsValue()
      let { origin_person } = create_company?.approve
      if (!origin_person) add()
      else {
        let {
          name,
          gender,
          birth_day,
          per_type,
          reg_address,
          current_address,
          doc_type,
          doc_code,
          doc_time_provide,
          doc_place_provide,
        } = origin_person
        let data = {
          name,
          gender,
          birth_day,
          per_type,
          reg_address,
          current_address,
          doc_type,
          doc_code,
          doc_time_provide,
          doc_place_provide,
        }
        add(data)
      }
    }
  }

  const renderOptions = () => {
    let { create_company } = ref.current?.getFieldsValue();
    let optionsData = SELECT.TITLE
    // console.log(create_company)
    if (!create_company?.approve) return
    let { legal_respon } = create_company?.approve
    let matchItem
    if (legal_respon) {
      matchItem = legal_respon
        .filter((item) => item?.title)
        .map((item) => ({ ...item, value: item?.title }))
    }
    return differenceBy(optionsData, matchItem, 'value')
  }

  return (
    <Form.Item
      label={<h2>Người đại diện pháp luật </h2>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 3,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Form.List name={[...BASE_FORM, 'legal_respon']} key={makeid(5)}>
          {(fields, { add, remove }) => (
            <>
              <Col span={24}>
                {fields.length >= 3 ? (
                  ''
                ) : (
                  <Space>
                    <Button
                      type="dashed"
                      onClick={() => handleAddmoreField(fields?.length, add)}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm
                    </Button>
                  </Space>
                )}
              </Col>

              {fields?.map((field, i) => (
                <Col lg={8} md={12} sm={24} xs={24} key={i}>
                  <CCInput name={[field.name, 'name']} label="Họ và tên" />

                  <CCInput
                    type="select"
                    name={[field.name, 'title']}
                    label="Chức danh"
                    options={renderOptions}
                    onDropdownVisibleChange={renderOptions}
                  />

                  <CCInput
                    type="select"
                    name={[field.name, 'gender']}
                    label="Giới tính"
                    options={SELECT.GENDER}
                  />

                  <CCInput
                    type="date"
                    name={[field.name, 'birth_day']}
                    label="Ngày sinh"
                  />

                  <CCInput name={[field.name, 'per_type']} label="Dân tộc" />

                  <CCInput name={[field.name, 'national']} label="Quốc tịch" />

                  <CCInput
                    name={[field.name, 'reg_address']}
                    label="Nơi đăng kí hộ khẩu thường trú"
                  />

                  <CCInput
                    name={[field.name, 'current_address']}
                    label="Nơi ở hiện tại"
                  />

                  <Form.Item label={<h4>Loại giấy tờ pháp lý </h4>}>
                    <Row gutter={[16, 12]}>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <CCInput
                          type="select"
                          name={[field.name, 'doc_type']}
                          label="Loại giấy tờ"
                          options={SELECT.DOC_TYPE}
                        />
                      </Col>
                      <Col lg={24} md={24} sm={24} xs={24}>
                        <CCInput
                          name={[field.name, 'doc_code']}
                          label="Số CMND/ CCCD/ Hộ chiếu"
                        />
                      </Col>

                      <Col lg={24} md={24} sm={24} xs={24}>
                        <CCInput
                          type="date"
                          name={[field.name, 'doc_time_provide']}
                          label="Ngày cấp"
                        />
                      </Col>

                      <Col lg={24} md={24} sm={24} xs={24}>
                        <CCInput
                          name={[field.name, 'doc_place_provide']}
                          label="Nơi cấp"
                        />
                      </Col>
                    </Row>
                  </Form.Item>

                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                </Col>
              ))}
            </>
          )}
        </Form.List>
      </Row>
    </Form.Item>
  )
})

export default NguoiDaiDienPhapLuat
