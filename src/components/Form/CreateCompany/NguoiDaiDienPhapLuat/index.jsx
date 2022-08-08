import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Space } from 'antd'
import React, { forwardRef, useState, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { makeid } from '@/helper/Common'
import clsx from 'clsx'
import styles from '../CreateCompany.module.scss'
import CCSelect from '../../../CCSelect'

const NguoiDaiDienPhapLuat = forwardRef((props, ref) => {
  const { current, BASE_FORM } = props

  const [present, setPresent] = useState(null)
  const [trigger, setTrigger] = useState(false)
  let obj = [{}, {}, {}, {}, {}] // defaultObj

  useEffect(() => {
    let pathName = [...BASE_FORM, 'legal_respon', 0]

    let val

    if (present !== 2) {
      let { create_company } = ref.current.getFieldsValue()

      let { origin_person } = create_company?.approve

      if (!origin_person) {
        onSetFields(pathName, null)
      } else {
        val = { ...origin_person }
        onSetFields(pathName, val)
      }
    } else {
      onSetFields(pathName, null)
    }
  }, [present])

  const getPersonType = () => {
    let pathName = [...BASE_FORM, 'origin_person', 'name']
    let result = ref?.current?.getFieldValue(pathName) || 'None'
    return result
  }

  const onSetFields = async (pathName, val, upper = false) => {
    ref.current.setFields([
      {
        name: pathName,
        value: upper ? val.toUpperCase() : val,
      },
    ])
    await new Promise((resolve) => setTimeout(resolve, 200))
    setTrigger(!trigger)
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
        <Col span={24}>
          <CCInput
            type="select"
            onChange={(e) => setPresent(e)}
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
                        Thêm người đại diện
                      </Button>
                    </Space>
                  )}
                </Col>

                {fields?.map((field, i) => (
                  <Col lg={8} md={12} sm={24} xs={24} key={i}>
                    <Form.Item
                      label={<h5>Thông tin người đại diện thứ {i + 1}</h5>}
                    >
                      <CCInput
                        name={[field.name, 'name']}
                        label="Họ và tên"
                        onChange={(e) =>
                          onSetFields(
                            [...BASE_FORM, 'legal_respon', i, 'name'],
                            e.target.value,
                            true,
                          )
                        }
                      />

                      <CCSelect.SelectTitle
                        name={[...BASE_FORM, 'legal_respon', i, 'title']}
                        label="Chức danh"
                        placeholder="Bấm vào đây"
                        options={SELECT.TITLE_3}
                        ref={ref}
                      />

                      <CCInput
                        type="select"
                        name={[field.name, 'gender']}
                        label="Giới tính"
                        options={SELECT.GENDER}
                        placeholder="Bấm vào đây"
                      />

                      <CCInput
                        type="date"
                        name={[field.name, 'birth_day']}
                        label="Ngày sinh"
                      />

                      <CCSelect.SelectPersonType
                        name={[field.name, 'per_type']}
                        label="Dân tộc"
                        dependencies={[field.name, 'per_type']}
                        data={{
                          pathName: [
                            ...BASE_FORM,
                            'legal_respon',
                            i,
                            'per_type',
                          ],
                          value: ref?.current?.getFieldValue([
                            ...BASE_FORM,
                            'origin_person',
                            'per_type',
                          ]),
                        }}
                        ref={ref}
                      />

                      <Form.Item label="Nơi đăng kí hộ khẩu thường trú">
                        <CCSelect.SelectProvince
                          ref={ref}
                          name={[field.name, 'current']}
                          data={{
                            pathName: [
                              ...BASE_FORM,
                              'legal_respon',
                              i,
                              'current',
                            ],
                            value: ref?.current?.getFieldValue([
                              ...BASE_FORM,
                              'origin_person',
                              'current',
                            ]),
                          }}
                        />
                      </Form.Item>

                      <Form.Item label="Nơi ở hiện tại">
                        <CCSelect.SelectProvince
                          name={[field.name, 'contact']}
                          data={{
                            pathName: [
                              ...BASE_FORM,
                              'legal_respon',
                              i,
                              'contact',
                            ],
                            value: ref?.current?.getFieldValue([
                              ...BASE_FORM,
                              'origin_person',
                              'contact',
                            ]),
                          }}
                          ref={ref}
                        />
                      </Form.Item>

                      <Form.Item label={<h4>Loại giấy tờ pháp lý </h4>}>
                        <Row gutter={[16, 12]}>
                          <Col lg={24} md={24} sm={24} xs={24}>
                            <CCInput
                              type="select"
                              name={[field.name, 'doc_type']}
                              label="Loại giấy tờ"
                              options={SELECT.DOC_TYPE}
                              placeholder="Bấm vào đây"
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
                              placeholder="Chọn ngày"
                            />
                          </Col>

                          <Col lg={24} md={24} sm={24} xs={24}>
                            <CCSelect.SelectDocProvide
                              name={[field.name, 'doc_place_provide']}
                              label="Nơi cấp"
                              dependencies={[field.name, 'doc_place_provide']}
                              data={{
                                pathName: [
                                  ...BASE_FORM,
                                  'legal_respon',
                                  i,
                                  'doc_place_provide',
                                ],
                                value: ref?.current?.getFieldValue([
                                  ...BASE_FORM,
                                  'origin_person',
                                  'doc_place_provide',
                                ]),
                              }}
                              ref={ref}
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
                    </Form.Item>
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
