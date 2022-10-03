import { Button, Form, Select, Row, Col, message, Divider, Radio, Space } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import { onSetFields, htmlContent } from '@/helper/Common'
import styles from './styles.module.scss'
import _ from 'lodash'

const BASE_FORM = ['change_info', 'legal_representative']

const DaiDienPhapLuat = forwardRef((props, ref) => {
  const [legalType, setLegalType] = useState()

  const [radio, setRadio] = useState([null, null, null])

  const [present, setPresent] = useState([null, null, null])

  const [listLegal, setListLegal] = useState([])

  let listForm = {}

  const addNewLegal = () => {
    let val = JSON.parse(JSON.stringify(listLegal))
    setListLegal([...val, listForm])
  }

  const handleSelectPeopleType = (value) => {
    setLegalType(value)

    let includes = [...BASE_FORM, 'includes']
    let exclude = [...BASE_FORM, 'exclude']

    onSetFields(includes, null, ref)
    onSetFields(exclude, null, ref)
  }
  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi người đại diện theo pháp luật</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Bỏ bớt hoặc thêm mới người đại diện">
        <Select onSelect={handleSelectPeopleType}>
          <Select.Option value={1}>Bỏ bớt người đại diện</Select.Option>
          <Select.Option value={2}>Thêm mới người đại diện</Select.Option>
        </Select>
      </Form.Item>

      {legalType === 1 && <PeopleExclude {...props} BASE_FORM={BASE_FORM} ref={ref} />}

      {legalType === 2 && <PeopleIncludes {...props} BASE_FORM={BASE_FORM} ref={ref} />}

      <Divider />

      <Form.Item label="Danh sách người đại diện pháp luật sau khi thay đổi">
        <Button onClick={addNewLegal}>Thêm người đại diện</Button>
        <Row gutter={[12]}>
          {listLegal.map((item, i) => {
            return (
              <Col lg={8} md={12} sm={24} xs={24} key={i}>
                <PeronalType
                  index={i}
                  ref={ref}
                  BASE_FORM={BASE_FORM}
                  handleForm={{ state: listLegal, setState: setListLegal }}
                  presentState={{ state: present, setState: setPresent }}
                  radioState={{ state: radio, setState: setRadio }}
                  type={props?.data.type}
                />
              </Col>
            )
          })}
        </Row>
      </Form.Item>
    </Form.Item>
  )
})

const PeopleExclude = forwardRef((props, ref) => {
  const { type, BASE_FORM } = props

  const [formExclude, setFormExclude] = useState([])

  const formExcludeField = {
    name: '',
    title: '',
  }

  const addItem = () => {
    setFormExclude([...formExclude, formExcludeField])
  }

  const removeItem = (index) => {
    let val = ref.current.getFieldsValue().change_info?.legal_representative?.exclude

    if (!val) return message.error('Something went wrong')

    val = [...val?.slice(0, index), ...val?.slice(index + 1)]

    onSetFields([...BASE_FORM, 'exclude'], val, ref)

    setFormExclude(val)
  }

  return (
    <>
      <Button onClick={addItem} type="primary">
        Thêm mới
      </Button>
      <Row gutter={[12]}>
        {formExclude?.map((item, index) => {
          return (
            <Col span={8}>
              <Form.Item
                label={
                  <div className={styles.label}>
                    <Button
                      type="text"
                      shape="circle"
                      danger
                      icon={<MinusCircleOutlined onClick={() => removeItem(index)} />}
                      style={{
                        display: formExclude.length > 1 ? 'block' : 'none',
                      }}
                    />
                  </div>
                }
              >
                <CCInput
                  label="Họ và tên"
                  name={[...BASE_FORM, 'exclude', index, 'name']}
                  onChange={(e) => onSetFields([...BASE_FORM, 'exclude', index, 'name'], e.target.value, ref, true)}
                />
                <CCSelect.SelectTitle
                  name={[...BASE_FORM, 'exclude', index, 'title']}
                  label="Chức danh"
                  placeholder="Bấm vào đây"
                  options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
                  ref={ref}
                />
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    </>
  )
})

const PeopleIncludes = forwardRef((props, ref) => {
  const { type, BASE_FORM } = props

  const [formIncludes, setFormIncludes] = useState([])

  const formIncludesField = {
    name: '',
    gender: '',
    title: '',
    birth_day: '',
    per_type: '',
    national: '',
    doc_type: '',
    doc_code: '',
    doc_time_provide: '',
    doc_place_provide: '',
    contact: '',
    current: '',
  }

  const addItem = () => {
    setFormIncludes([...formIncludes, formIncludesField])
  }

  const removeItem = (index) => {
    let val = ref.current.getFieldsValue().change_info?.legal_representative?.includes

    if (!val) return message.error('Something went wrong')

    val = [...val?.slice(0, index), ...val?.slice(index + 1)]

    onSetFields([...BASE_FORM, 'includes'], val, ref)

    setFormIncludes(val)
  }

  return (
    <>
      <Button onClick={addItem} type="primary">
        Thêm mới
      </Button>
      <Row gutter={[12]}>
        {formIncludes?.map((item, index) => {
          return (
            <Col span={8}>
              <Form.Item
                label={
                  <div className={styles.label}>
                    <Button
                      type="text"
                      shape="circle"
                      danger
                      icon={<MinusCircleOutlined onClick={() => removeItem(index)} />}
                      style={{
                        display: formIncludes.length > 1 ? 'block' : 'none',
                      }}
                    />
                  </div>
                }
              >
                <CCInput
                  label="Họ và tên"
                  name={[...BASE_FORM, 'includes', index, 'name']}
                  onChange={(e) => onSetFields([...BASE_FORM, 'includes', index, 'name'], e.target.value, ref, true)}
                />
                <CCInput type="select" name={[...BASE_FORM, 'includes', index, 'gender']} label="Giới tính" options={SELECT.GENDER} />
                <CCInput type="select" name={[...BASE_FORM, 'includes', index, 'title']} label="Chức danh" options={SELECT.TITLE} />
                <CCInput name={[...BASE_FORM, 'includes', index, 'birth_day']} label="Sinh ngày" type="date" />
                <CCSelect.SelectPersonType ref={ref} name={[...BASE_FORM, 'includes', index, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" />
                <CCInput type="select" name={[...BASE_FORM, 'includes', index, 'doc_type']} label="Loại giấy tờ pháp lý" options={SELECT.DOC_TYPE} />
                <CCInput name={[...BASE_FORM, 'includes', index, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />
                <CCInput name={[...BASE_FORM, 'includes', index, 'doc_time_provide']} label="Ngày cấp" type="date" />
                <CCSelect.SelectDocProvide ref={ref} name={[...BASE_FORM, 'includes', index, 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />
                <CCAddress name={[...BASE_FORM, 'includes', index]} ref={ref} />
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    </>
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
    let pathName = [...BASE_FORM, 'includes']

    let originPerson = ref?.current?.getFieldValue(pathName)

    let options =
      originPerson?.map(({ name, organization }, index) => ({
        name: name || '...',
        value: index,
      })) || []

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

    let originPathName = [...BASE_FORM, 'includes', val]

    let legalPathName = [...BASE_FORM, 'after_change', index]

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
        placeholder="Bấm vào đây"
        options={getPersonType}
        value={present[index]}
        label={htmlContent('<b>Chọn người đại diện</b>')}
        required
      />

      <FormListPersonType
        ref={ref}
        listFormState={handleForm}
        presentState={presentState}
        radioState={{ state: radio, setState: onRadioChange }}
        BASE_FORM={BASE_FORM}
        i={index}
        type={props?.type}
      />
    </>
  )
})

const FormListPersonType = forwardRef((props, ref) => {
  const { i, presentState, radioState, listFormState, BASE_FORM, type } = props

  const { state, setState } = listFormState

  const { state: radio, setState: onRadioChange } = radioState

  const { state: present, setState: setPresent } = presentState

  const removeItem = (index) => {
    let val = ref.current.getFieldValue([...BASE_FORM, 'after_change'])

    val = [...val.slice(0, index), ...val.slice(index + 1)]

    let objPresent = [...present]

    objPresent[index] = null

    objPresent = [...objPresent.filter((item) => item !== null), null]

    setPresent(objPresent)

    onSetFields([...BASE_FORM, 'after_change'], val, ref)

    setState(val)
  }
  return (
    <Form.Item
      label={
        <div className={styles.label}>
          <div className={styles.title}>Thông tin người đại diện thứ {i + 1}</div>
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
      <div style={{ display: +present[i] != -1 ? 'none' : 'block' }}>
        <CCInput
          label="Họ và tên"
          name={[...BASE_FORM, 'after_change', i, 'name']}
          onChange={(e) => onSetFields([...BASE_FORM, 'after_change', i, 'name'], e.target.value, ref, true)}
        />

        <CCInput type="select" name={[...BASE_FORM, 'after_change', i, 'gender']} label="Giới tính" options={SELECT.GENDER} />

        <CCInput type="select" name={[...BASE_FORM, 'after_change', i, 'title']} label="Chức danh" options={SELECT.TITLE} />

        <CCInput name={[...BASE_FORM, 'after_change', i, 'birth_day']} label="Sinh ngày" type="date" />

        <CCSelect.SelectPersonType ref={ref} name={[...BASE_FORM, 'after_change', i, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" />

        <CCInput type="select" name={[...BASE_FORM, 'after_change', i, 'doc_type']} label="Loại giấy tờ pháp lý" options={SELECT.DOC_TYPE} />

        <CCInput name={[...BASE_FORM, 'after_change', i, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />

        <CCInput name={[...BASE_FORM, 'after_change', i, 'doc_time_provide']} label="Ngày cấp" type="date" />

        <CCSelect.SelectDocProvide ref={ref} name={[...BASE_FORM, 'after_change', i, 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />

        <Form.Item label={htmlContent('<b>Địa chỉ thường trú</b>')}>
          <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'after_change', i, 'current']} />
        </Form.Item>

        <Form.Item label={htmlContent('<b>Nơi ở hiện tại</b>')}>
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
              <CCSelect.SelectProvince ref={ref} name={[...BASE_FORM, 'after_change', i, 'contact']} label="Nơi ở hiện tại" />
            </div>
          }
        </Form.Item>
      </div>
    </Form.Item>
  )
})

export default DaiDienPhapLuat
