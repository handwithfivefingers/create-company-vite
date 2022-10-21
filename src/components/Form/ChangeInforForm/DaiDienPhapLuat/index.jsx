import { Button, Form, Select, Row, Col, message, Divider, Radio, Space, Card } from 'antd'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import CCInput from '@/components/CCInput'
import { SELECT } from '@/constant/Common'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import CCAddress from '../../../CCAddress'
import CCSelect from '../../../CCSelect'
import { onSetFields, htmlContent } from '@/helper/Common'
import styles from './styles.module.scss'
import _, { isEqual } from 'lodash'

const BASE_FORM = ['change_info', 'legal_representative']

const DaiDienPhapLuat = forwardRef((props, ref) => {
  const [radio, setRadio] = useState([null, null, null])

  const [present, setPresent] = useState([null, null, null])

  const [listLegal, setListLegal] = useState([])

  const [listIncludesOrExclude, setListIncludesOrExclude] = useState([])

  let listForm = {}

  const addNewLegal = () => {
    let val = JSON.parse(JSON.stringify(listLegal))

    setListLegal([...val, listForm])

    let value = ref.current.getFieldValue(BASE_FORM)
    console.log(value)
  }

  const handleIncludesOrExludesPeople = () => {
    setListIncludesOrExclude([...listIncludesOrExclude, {}])
  }

  return (
    <Form.Item
      label={<h3>Đăng ký thay đổi người đại diện theo pháp luật</h3>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label={htmlContent('<b>Bỏ bớt hoặc thêm mới người đại diện</b>')}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Button type="primary" onClick={handleIncludesOrExludesPeople}>
              Thêm mới
            </Button>
          </Col>
          {listIncludesOrExclude?.map((item, index) => (
            <PeoppleWrapper {...props} BASE_FORM={BASE_FORM} ref={ref} index={index} />
          ))}
        </Row>
      </Form.Item>

      <Divider />

      <Form.Item label={htmlContent('<b>Danh sách người đại diện pháp luật sau khi thay đổi</b>')}>
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

const PERSON_TYPE = {
  ADD: 'includes',
  REMOVE: 'exludes',
}
const PeoppleWrapper = forwardRef((props, ref) => {
  const { BASE_FORM, index, type } = props

  const [legalType, setLegalType] = useState()

  const handleSelectPeopleType = (value) => {
    setLegalType(value)
    onSetFields([...BASE_FORM, 'in_out', index, 'type'], value, ref)
  }

  const renderFormByType = () => {
    let html = null

    if (legalType === PERSON_TYPE.REMOVE) {
      html = (
        <Card className={'box__shadow m-tb-5'}>
          <CCInput
            label="Họ và tên"
            name={[...BASE_FORM, 'in_out', index, 'name']}
            onChange={(e) => onSetFields([...BASE_FORM, 'in_out', index, 'name'], e.target.value, ref, true)}
          />
          <CCSelect.SelectTitle
            name={[...BASE_FORM, 'in_out', index, 'title']}
            label="Chức danh"
            placeholder="Bấm vào đây"
            options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
            ref={ref}
          />
        </Card>
      )
    } else if (legalType === PERSON_TYPE.ADD) {
      html = (
        <Card className={'box__shadow m-tb-5'}>
          <CCInput
            label="Họ và tên"
            name={[...BASE_FORM, 'in_out', index, 'name']}
            onChange={(e) => onSetFields([...BASE_FORM, 'in_out', index, 'name'], e.target.value, ref, true)}
          />
          <CCInput type="select" name={[...BASE_FORM, 'in_out', index, 'gender']} label="Giới tính" options={SELECT.GENDER} />
          <CCInput type="select" name={[...BASE_FORM, 'in_out', index, 'title']} label="Chức danh" options={SELECT.TITLE} />
          <CCInput name={[...BASE_FORM, 'in_out', index, 'birth_day']} label="Sinh ngày" type="date" />
          <CCSelect.SelectPersonType ref={ref} name={[...BASE_FORM, 'in_out', index, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" />
          <CCInput type="select" name={[...BASE_FORM, 'in_out', index, 'doc_type']} label="Loại giấy tờ pháp lý" options={SELECT.DOC_TYPE} />
          <CCInput name={[...BASE_FORM, 'in_out', index, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />
          <CCInput name={[...BASE_FORM, 'in_out', index, 'doc_time_provide']} label="Ngày cấp" type="date" />
          <CCSelect.SelectDocProvide ref={ref} name={[...BASE_FORM, 'in_out', index, 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />
          <CCAddress name={[...BASE_FORM, 'in_out', index]} ref={ref} />
        </Card>
      )
    }

    return html
  }

  return (
    <Col span={12}>
      <Select onSelect={handleSelectPeopleType} placeholder="Bấm vào đây" name={[...BASE_FORM, 'in_out', index, 'type']}>
        <Select.Option value={PERSON_TYPE.REMOVE}>Bỏ bớt người đại diện</Select.Option>
        <Select.Option value={PERSON_TYPE.ADD}>Thêm mới người đại diện</Select.Option>
      </Select>

      {renderFormByType()}
    </Col>
  )
})

const PeopleExclude = forwardRef((props, ref) => {
  const { type, BASE_FORM, index } = props

  return (
    <Card className={'box__shadow m-tb-5'}>
      <CCInput
        label="Họ và tên"
        name={[...BASE_FORM, 'in_out', index, 'name']}
        onChange={(e) => onSetFields([...BASE_FORM, 'in_out', index, 'name'], e.target.value, ref, true)}
      />
      <CCSelect.SelectTitle
        name={[...BASE_FORM, 'in_out', index, 'title']}
        label="Chức danh"
        placeholder="Bấm vào đây"
        options={+type === 1 ? SELECT.TITLE_1TV : +type === 2 ? SELECT.TITLE_2TV : +type === 3 ? SELECT.TITLE_CP : ''}
        ref={ref}
      />
    </Card>
  )
})

const PeopleIncludes = forwardRef((props, ref) => {
  const { BASE_FORM, index } = props

  return (
    <Card className={'box__shadow m-tb-5'}>
      <CCInput
        label="Họ và tên"
        name={[...BASE_FORM, 'in_out', index, 'name']}
        onChange={(e) => onSetFields([...BASE_FORM, 'in_out', index, 'name'], e.target.value, ref, true)}
      />
      <CCInput type="select" name={[...BASE_FORM, 'in_out', index, 'gender']} label="Giới tính" options={SELECT.GENDER} />
      <CCInput type="select" name={[...BASE_FORM, 'in_out', index, 'title']} label="Chức danh" options={SELECT.TITLE} />
      <CCInput name={[...BASE_FORM, 'in_out', index, 'birth_day']} label="Sinh ngày" type="date" />
      <CCSelect.SelectPersonType ref={ref} name={[...BASE_FORM, 'in_out', index, 'per_type']} label="Dân tộc" placeholder="Bấm vào đây" />
      <CCInput type="select" name={[...BASE_FORM, 'in_out', index, 'doc_type']} label="Loại giấy tờ pháp lý" options={SELECT.DOC_TYPE} />
      <CCInput name={[...BASE_FORM, 'in_out', index, 'doc_code']} label="Số CMND/ CCCD/ Hộ chiếu" />
      <CCInput name={[...BASE_FORM, 'in_out', index, 'doc_time_provide']} label="Ngày cấp" type="date" />
      <CCSelect.SelectDocProvide ref={ref} name={[...BASE_FORM, 'in_out', index, 'doc_place_provide']} label="Nơi cấp" placeholder="Bấm vào đây" />
      <CCAddress name={[...BASE_FORM, 'in_out', index]} ref={ref} />
    </Card>
  )
})

const PeronalType = forwardRef((props, ref) => {
  const { index, handleForm, BASE_FORM, presentState, radioState } = props

  const { state: present, setState: setPresent } = presentState

  // const { state: radio, setState: setRadio } = radioState

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
    let pathName = [...BASE_FORM, 'in_out']

    let originPerson = ref?.current?.getFieldValue(pathName)

    let listUser = originPerson?.filter((item) => item.type === PERSON_TYPE.ADD) || []

    let options =
      listUser?.map(({ name, organization }, index) => ({
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

    // let originUser = ref?.current?.getFieldValue([...BASE_FORM], 'in_out')

    let originPathName = [...BASE_FORM, 'in_out', val]

    let legalPathName = [...BASE_FORM, 'after_change', index]

    let originPerson = ref?.current?.getFieldValue(originPathName)

    if (originPerson) {
      onSetFields(legalPathName, originPerson, ref)
    }

    // let originPerson = ref?.current?.getFieldValue(originPathName)

    // if (!originPerson) {
    // } else {
    //   if (_.isEqual(originPerson?.current, originPerson?.contact)) {
    //     // setting display radio
    //     let event = {
    //       target: {
    //         value: 1,
    //       },
    //     }
    //     onRadioChange(event, index)
    //   } else {
    //     let event = {
    //       target: {
    //         value: null,
    //       },
    //     }
    //     onRadioChange(event, index)
    //   }
    //   onSetFields(legalPathName, originPerson, ref)
    // }
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
        // radioState={{ state: radio, setState: onRadioChange }}
        BASE_FORM={BASE_FORM}
        i={index}
        type={props?.type}
      />
    </>
  )
})

const FormListPersonType = forwardRef((props, ref) => {
  const { i, presentState, listFormState, BASE_FORM } = props

  const { state, setState } = listFormState

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

        <CCSelect.RadioAddress
          ref={ref}
          prevField={[...BASE_FORM, 'after_change', i, 'current']}
          nextField={[...BASE_FORM, 'after_change', i, 'contact']}
          label="<b>Nơi ở hiện tại</b>"
        />
      </div>
    </Form.Item>
  )
})

export default DaiDienPhapLuat
