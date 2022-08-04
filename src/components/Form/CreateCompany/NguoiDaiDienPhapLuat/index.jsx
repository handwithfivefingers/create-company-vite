import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Space } from 'antd'
import { differenceBy } from 'lodash'
import React, { forwardRef, useState, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { makeid } from '@/helper/Common'
import clsx from 'clsx'
import styles from '../CreateCompany.module.scss'
import CCListForm from '../../../CCListForm'
import CCSelect from '../../../CCSelect'

const NguoiDaiDienPhapLuat = forwardRef((props, ref) => {
  const { current, BASE_FORM } = props
  const [present, setPresent] = useState(null)
  let obj = [{}, {}, {}, {}, {}] // defaultObj
  useEffect(() => {
    let pathName = [...BASE_FORM, 'legal_respon']
    let val
    if (present !== 2) {
      let { create_company } = ref.current.getFieldsValue()
      console.log(create_company)
      let { origin_person } = create_company?.approve
      if (!origin_person) val = obj.slice(0, 1)
      else {
        val = [{ ...origin_person }]
      }
    } else {
      val = [{}]
    }

    onSetFields(pathName, val)
  }, [present])

  const renderOptions = () => {
    let { create_company } = ref.current?.getFieldsValue()
    let optionsData = SELECT.TITLE
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

  const getPersonType = () => {
    let pathName = [...BASE_FORM, 'origin_person', 'name']
    let result = ref?.current?.getFieldValue(pathName) || 'None'
    return result
  }

  const onSetFields = (pathName, val) => {
    ref.current.setFields([
      {
        name: Array.isArray(pathName) ? [...pathName] : [pathName],
        value: val,
      },
    ])
  }

  // const listForm = [
  //   {
  //     label: 'Họ và tên',
  //     name: 'name',
  //   },
  //   {
  //     label: 'Chức danh',
  //     name: 'title',
  //     type: 'select',
  //     options: renderOptions(),
  //     onDropdownVisibleChange: renderOptions(),
  //   },
  //   {
  //     label: 'Giới tính',
  //     name: 'gender',
  //     type: 'select',
  //     options: SELECT.GENDER,
  //   },
  //   {
  //     label: 'Ngày sinh',
  //     name: 'birth_day',
  //     type: 'date',
  //   },
  //   {
  //     label: 'Dân tộc',
  //     name: 'per_type',
  //   },
  //   {
  //     label: 'Quốc tịch',
  //     name: 'national',
  //   },
  //   {
  //     label: 'Nơi đăng kí hộ khẩu thường trú',
  //     name: 'reg_address',
  //   },
  //   {
  //     label: 'Nơi ở hiện tại',
  //     name: 'current_address',
  //   },
  //   {
  //     label: 'Loại giấy tờ',
  //     name: 'doc_type',
  //     type: 'select',
  //     options: SELECT.DOC_TYPE,
  //   },
  //   {
  //     label: 'Số CMND/ CCCD/ Hộ chiếu',
  //     name: 'doc_code',
  //   },
  //   {
  //     label: 'Ngày cấp',
  //     name: 'doc_time_provide',
  //     type: 'date',
  //   },
  //   {
  //     label: 'Nơi cấp',
  //     name: 'doc_place_provide',
  //   },
  // ]

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
        <Col span={24}>
          <CCInput
            type="select"
            onSelect={(e) => setPresent(e)}
            placeholder="Bấm vào đây"
            options={[
              {
                value: 1,
                name: getPersonType(),
              },
              { value: 2, name: 'Khác' },
            ]}
          />
        </Col>

        {present && (
          <Form.List name={[...BASE_FORM, 'legal_respon']} key={makeid(9)}>
            {(fields, { add, remove }) => (
              <>
                <Col span={24}>
                  {fields.length >= 3 ? (
                    ''
                  ) : (
                    <Space>
                      <Button
                        type="dashed"
                        onClick={() => add()}
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

                    <CCSelect.SelectProvince
                      ref={ref}
                      name={[field.name, 'current']}
                      label="Nơi đăng kí hộ khẩu thường trú"
                    />

                    <CCSelect.SelectProvince
                      name={[field.name, 'contact']}
                      label="Nơi ở hiện tại"
                      ref={ref}
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

                    <Space
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      ) : (
                        ''
                      )}
                    </Space>
                  </Col>
                ))}
              </>
            )}
          </Form.List>
        )}
      </Row>
    </Form.Item>
  )
})

export default NguoiDaiDienPhapLuat
