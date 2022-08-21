import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Row, Space, Radio } from 'antd'
import React, { forwardRef, useState, useEffect } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { onSetFields } from '@/helper/Common'
import clsx from 'clsx'
import styles from '../CreateCompany.module.scss'
import CCSelect from '../../../CCSelect'
import _ from 'lodash'

const NguoiDaiDienPhapLuat = forwardRef(({ data, ...props }, ref) => {
  const { current, BASE_FORM } = props

  const [present, setPresent] = useState(null)

  const [listForm, setListForm] = useState([])

  const [radio, setRadio] = useState([null, null, null])

  const listField = {
    name: '',
    title: '',
    gender: '',
    birth_day: '',
    per_type: '',
    current: '',
    contact: '',
    doc_type: '',
    doc_code: '',
    doc_time_provide: '',
    doc_place_provide: '',
  }
  useEffect(() => {
    // if (present === 1) {
    //   let { create_company } = ref.current.getFieldsValue()

    //   let { origin_person } = create_company?.approve

    //   if (!origin_person) {
    //     let val = []

    //     val.push(listField)

    //     setListForm(val)
    //   } else {
    //     let { title, organization_name, ...rest } = origin_person?.[0]

    //     console.log('origin_person', origin_person)

    //     let val = []
    //     val.push(rest)

    //     if (_.isEqual(rest.current, rest.contact)) {
    //       // setting display radio
    //       setRadio([1, null, null])
    //     } else {
    //       setRadio([null, null, null])
    //     }
    //     onSetFields([...BASE_FORM, 'legal_respon'], [rest], ref)

    //     setListForm(val)
    //   }
    // } else {
    //   let val = []
    //   val.push(listField)
    //   setListForm(val)
    // }
    if(present !== -1) {
    //  let { create_company } = ref.current.getFieldsValue()

    //   let { origin_person } = create_company?.approve

    let pathName = [...BASE_FORM, 'origin_person']

    let originPerson = ref?.current?.getFieldValue(pathName)
    console.log(originPerson);

      if (!originPerson) {

        let val = []

        val.push(listField)

        setListForm(val)
      } else {

        let { title, ...rest } = originPerson?.[present] || {}

        // console.log('origin_person', origin_person)
        let val = []

        val.push(rest)

        if (_.isEqual(rest.current, rest.contact)) {
          // setting display radio
          setRadio([1, null, null])
        } else {
          setRadio([null, null, null])
        }
        onSetFields([...BASE_FORM, 'legal_respon'], [rest], ref)

        setListForm(val)
      }
    } else {
            let val = []
      val.push(listField)
      setListForm(val)
    }
  }, [present])

  const getPersonType = () => {

    let pathName = [...BASE_FORM, 'origin_person']

    // let result = ref?.current?.getFieldValue(pathName) || 'None'

    let originPerson = ref?.current?.getFieldValue(pathName)

    let options = originPerson?.map(({name},index) => ({name, value: index})) || []

    options.push({
      value: -1, name: 'Khác'
    })


    return options
  }

  const renderListForm = (i) => {
    let xhtml = null
    xhtml = (
      <Col lg={8} md={12} sm={24} xs={24} key={i}>
        <Form.Item
          label={
            <div className={styles.label}>
              <div className={styles.title}>
                Thông tin người đại diện thứ {i + 1}
              </div>
              <Button
                type="text"
                shape="circle"
                danger
                icon={<MinusCircleOutlined onClick={() => removeItem(i)} />}
                style={{
                  display: listForm.length > 1 ? 'block' : 'none',
                }}
              />
            </div>
          }
        >
          <CCInput
            name={[...BASE_FORM, 'legal_respon', i, 'name']}
            label="Họ và tên"
            onChange={(e) =>
              onSetFields(
                [...BASE_FORM, 'legal_respon', i, 'name'],
                e.target.value,
                ref,
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
          <div style={{ display: present !== -1 && i == 0 ? 'none' : 'block' }}>
            <CCInput
              type="select"
              name={[...BASE_FORM, 'legal_respon', i, 'gender']}
              label="Giới tính"
              options={SELECT.GENDER}
              placeholder="Bấm vào đây"
            />

            <CCInput
              type="date"
              name={[...BASE_FORM, 'legal_respon', i, 'birth_day']}
              label="Ngày sinh"
            />

            <CCSelect.SelectPersonType
              name={[...BASE_FORM, 'legal_respon', i, 'per_type']}
              label="Dân tộc"
              ref={ref}
            />

            <Form.Item label="Nơi đăng kí hộ khẩu thường trú">
              <CCSelect.SelectProvince
                ref={ref}
                name={[...BASE_FORM, 'legal_respon', i, 'current']}
              />
            </Form.Item>

            <Form.Item label="Nơi ở hiện tại">
              <Radio.Group
                onChange={(e) => onRadioChange(e, i)}
                value={radio[i]}
              >
                <Space direction="vertical">
                  <Radio value={1}>Giống với địa chỉ thường trú</Radio>
                  <Radio value={2}>Khác</Radio>
                </Space>
              </Radio.Group>

              {
                <div
                  style={{
                    padding: '8px 0',
                    opacity: radio[i] && radio[i] === 2 ? '1' : '0',
                    visibility:
                      radio[i] && radio[i] === 2 ? 'visible' : 'hidden',
                    display: radio[i] && radio[i] === 2 ? 'block' : 'none',
                  }}
                >
                  <CCSelect.SelectProvince
                    ref={ref}
                    name={[...BASE_FORM, 'legal_respon', i, 'contact']}
                    label="Nơi ở hiện tại"
                  />
                </div>
              }
            </Form.Item>

            <Form.Item label={<h4>Loại giấy tờ pháp lý </h4>}>
              <Row gutter={[16, 12]}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <CCInput
                    type="select"
                    name={[...BASE_FORM, 'legal_respon', i, 'doc_type']}
                    label="Loại giấy tờ"
                    options={SELECT.DOC_TYPE}
                    placeholder="Bấm vào đây"
                  />
                </Col>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <CCInput
                    name={[...BASE_FORM, 'legal_respon', i, 'doc_code']}
                    label="Số CMND/ CCCD/ Hộ chiếu"
                  />
                </Col>

                <Col lg={24} md={24} sm={24} xs={24}>
                  <CCInput
                    type="date"
                    name={[...BASE_FORM, 'legal_respon', i, 'doc_time_provide']}
                    label="Ngày cấp"
                    placeholder="Chọn ngày"
                  />
                </Col>

                <Col lg={24} md={24} sm={24} xs={24}>
                  <CCSelect.SelectDocProvide
                    name={[
                      ...BASE_FORM,
                      'legal_respon',
                      i,
                      'doc_place_provide',
                    ]}
                    label="Nơi cấp"
                    ref={ref}
                  />
                </Col>
              </Row>
            </Form.Item>
          </div>
        </Form.Item>
      </Col>
    )

    return xhtml
  }

  const addItem = () => {
    // const val = ref.current.getFieldValue([...BASE_FORM, 'legal_respon'])

    setListForm([...listForm, listField])
  }

  const removeItem = (index) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'legal_respon'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    onSetFields([...BASE_FORM, 'legal_respon'], val, ref)

    setListForm(val)
  }

  const onRadioChange = (e, index) => {
    let value = e.target.value

    let radioArray = radio

    radioArray[index] = value

    setRadio([...radioArray])

    if (value === 1) {
      let field = [...BASE_FORM, 'legal_respon']

      // let arrayProvince = ['address', 'town', 'district', 'city']
      let val = ref.current.getFieldValue([...field, index, 'current'])

      console.log('onRadioChange', val)
      onSetFields([...field, index, 'contact'], val, ref)
    }
  }

  return (
    <Form.Item
      label={<h5>Người đại diện pháp luật </h5>}
      className={clsx([
        styles.hide,
        props.className,
        {
          [styles.visible]: current === 3,
        },
      ])}
    >
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <CCInput
            type="select"
            onChange={(e) =>  setPresent(e)}
            placeholder="Chọn người đại diện"
            options={getPersonType}
          />
        </Col>
        <Col span={24}>
          {present  !== -1 && listForm.length < 3 && (
            <Button onClick={addItem} icon={<PlusOutlined />}>
              Thêm người đại diện
            </Button>
          )}
        </Col>

        {present !== -1 &&
          listForm.map((item, i) => {
            return renderListForm(i)
          })}
      </Row>
    </Form.Item>
  )
})

export default NguoiDaiDienPhapLuat
