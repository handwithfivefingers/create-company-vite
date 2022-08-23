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

  const [listForm, setListForm] = useState([])

  const [radio, setRadio] = useState([null, null, null])

  const [present, setPresent] = useState([null, null, null])

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

  const addItem = () => {
    setListForm([...listForm, listField])
  }

  const onRadioChange = (e, index) => {
    let value = e.target.value

    let radioArray = radio

    radioArray[index] = value

    setRadio([...radioArray])

    if (value === 1) {
      let field = [...BASE_FORM, 'legal_respon']

      let val = ref.current.getFieldValue([...field, index, 'current'])

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
          {listForm.length < 3 && (
            <Button onClick={addItem} icon={<PlusOutlined />} type="primary">
              Thêm người đại diện
            </Button>
          )}
        </Col>

        {listForm.map((item, i) => {
          return (
            <Col lg={8} md={12} sm={24} xs={24} key={i}>
              <PeronalType
                index={i}
                ref={ref}
                BASE_FORM={BASE_FORM}
                handleForm={{ state: listForm, setState: setListForm }}
                presentState={{ state: present, setState: setPresent }}
                radioState={{ state: radio, setState: setRadio }}
              />
            </Col>
          )
        })}
      </Row>
    </Form.Item>
  )
})

const PeronalType = forwardRef((props, ref) => {
  const { index, handleForm, BASE_FORM, presentState, radioState } = props

  const { state: present, setState: setPresent } = presentState

  const { state: radio, setState: setRadio } = radioState

  const onRadioChange = (e, index) => {
    let { value } = e.target

    let radioArray = radio

    radioArray[index] = value

    setRadio([...radioArray])


    if (value === 1) {
      let field = [...BASE_FORM, 'legal_respon']

      let val = ref.current.getFieldValue([...field, index, 'current'])

      onSetFields([...field, index, 'contact'], val, ref)
    }
  }

  const getPersonType = () => {
    let pathName = [...BASE_FORM, 'origin_person']

    let originPerson = ref?.current?.getFieldValue(pathName)

    let options = originPerson?.map(({ name, organization }, index) => ({
      name: organization ? organization?.name : name || '',
      value: index,
    })) || [{ value: null, name: 'None' }]

    options.push({
      value: -1,
      name: 'Khác',
    })

    return options
  }

  const handleSelectPersonType = (val, index) => {
    /**
     * @params {val} => index value need to get
     * @params {index} => index position of child list form
     */

    let data = [...present]

    data[index] = val

    setPresent(data)

    let originPathName = [...BASE_FORM, 'origin_person', val]

    let legalPathName = [...BASE_FORM, 'legal_respon', index]

    let originPerson = ref?.current?.getFieldValue(originPathName)


    if (!originPerson) {
    } else {
      if (_.isEqual(originPerson?.current, originPerson?.contact)) {
        // setting display radio
        let event = {
          target: {
            value: 1,
          },
        }
        onRadioChange(event, index)
      } else {
        let event = {
          target: {
            value: null,
          },
        }
        onRadioChange(event, index)
      }
      onSetFields(legalPathName, originPerson, ref)
    }
  }

  return (
    <>
      <CCInput
        type="select"
        onChange={(e) => handleSelectPersonType(e, index)}
        placeholder="Chọn người đại diện"
        options={getPersonType}
        value={present[index]}
      />

      <FormListPersonType
        ref={ref}
        listFormState={handleForm}
        presentState={presentState}
        radioState={{ state: radio, setState: onRadioChange }}
        BASE_FORM={BASE_FORM}
        i={index}
      />
    </>
  )
})

const FormListPersonType = forwardRef((props, ref) => {
  const { i, presentState, radioState, listFormState, BASE_FORM } = props

  const { state, setState } = listFormState

  const { state: radio, setState: onRadioChange } = radioState

  const { state: present, setState: setPresent } = presentState

  const removeItem = (index) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'legal_respon'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    let objPresent = [...present]

    objPresent[index] = null

    objPresent = objPresent.filter((item) => item !== null)

    objPresent = [...objPresent, null]

    setPresent(objPresent)

    onSetFields([...BASE_FORM, 'legal_respon'], val, ref)

    setState(val)
  }
  return (
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
              display: state.length > 1 ? 'block' : 'none',
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

      <div style={{ display: +present[i] != -1 ? 'none' : 'block' }}>
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
          <Radio.Group onChange={(e) => onRadioChange(e, i)} value={radio[i]}>
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
                visibility: radio[i] && radio[i] === 2 ? 'visible' : 'hidden',
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
                name={[...BASE_FORM, 'legal_respon', i, 'doc_place_provide']}
                label="Nơi cấp"
                ref={ref}
              />
            </Col>
          </Row>
        </Form.Item>
      </div>
    </Form.Item>
  )
})

export default NguoiDaiDienPhapLuat
